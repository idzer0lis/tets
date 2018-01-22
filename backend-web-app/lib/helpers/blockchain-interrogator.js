/**
 * Created by sandrastoicescu on 08/12/2017.
 */

/* Have a module header available for easy reference */
/* eslint-disable no-use-before-define */
module.exports = {
  getICOStatus,
  getUserTotalContribution,
};
/* eslint-enable no-use-before-define */

const Web3 = require('web3');
const env = require('../config/env');
const logger = require('../helpers/logger');
const cache = require('../modules/redis-cache');

const masterContractInfo = require('../contracts/GBxMasterContract.json');
const userContractInfo = require('../contracts/GBxUserContract.json');

const web3 = new Web3(`${env.GBX_ICO_ETHEREUM_NODE_PROTOCOL}://${env.GBX_ICO_ETHEREUM_NODE_IP}:${env.GBX_ICO_ETHEREUM_NODE_PORT}${env.GBX_ICO_ETHEREUM_NODE_ENDPOINT}`);

const CACHE_ACTIVE = env.CACHE_ICO_STATUS === 'YES';
const CACHE_KEY = 'global:ico_status';
const CACHE_DURATION = parseInt(env.CACHE_ICO_STATUS_DURATION_MS || '5000', 10);

const masterContractInstance = new web3.eth.Contract(masterContractInfo.abi, env.GBX_ICO_MASTER_CONTRACT);

function getRawICOStatus() {
  // returns (cold wallet address, ico max cap, start date, phase 2 start date, end date, cap for phase1/user, how much was raised on entire ico until now
  return masterContractInstance.methods.getICOStatus()
    .call()
    .catch((err) => {
      logger.error('Could not get ICO status from Web3 endpoint', err);
      throw err;
    });
}

function mapIcoStatus(statusObj) {
  const tags = ['cold_wallet_address', 'cold_wallet_second_address', 'contribution_total_cap', 'start_date', 'full_gas_date', 'end_date', 'user_contribution_limit', 'total_raised'];
  return Object.keys(statusObj).reduce((acc, key) => {
    acc[tags[parseInt(key, 10)]] = statusObj[key];
    return acc;
  }, {});
}

function translateBlockchainese(mappedObj) {
  if (!mappedObj) {
    return {};
  }
  return Object.assign(mappedObj, {
    // translate sums to ether; returns string if fed string, which hopefully it is being fed
    contribution_total_cap: web3.utils.fromWei(mappedObj.contribution_total_cap, 'ether'),
    user_contribution_limit: web3.utils.fromWei(mappedObj.user_contribution_limit, 'ether'),
    total_raised: web3.utils.fromWei(mappedObj.total_raised, 'ether'),
    // translate dates to milliseconds
    start_date: new Date(parseInt(mappedObj.start_date, 10) * 1000),
    full_gas_date: new Date(parseInt(mappedObj.full_gas_date, 10) * 1000),
    end_date: new Date(parseInt(mappedObj.end_date, 10) * 1000),
  });
}

async function getICOStatus() {
  if (env.GBX_ICO_ETHEREUM_NODE_MOCK === 'YES') {
    return Promise.resolve({
      cold_wallet_address: '0xbaadsh33p',
      cold_wallet_second_address: '0xf33dm333',
      start_date: (env.GBX_ICO_ETHEREUM_NODE_MOCK_START_DATE && new Date(parseInt(env.GBX_ICO_ETHEREUM_NODE_MOCK_START_DATE, 10))) || new Date(2017, 1, 1),
      full_gas_date: (env.GBX_ICO_ETHEREUM_NODE_MOCK_FULL_GAS_DATE && new Date(parseInt(env.GBX_ICO_ETHEREUM_NODE_MOCK_FULL_GAS_DATE, 10))) || new Date(2017, 12, 31),
      end_date: (env.GBX_ICO_ETHEREUM_NODE_MOCK_END_DATE && new Date(parseInt(env.GBX_ICO_ETHEREUM_NODE_MOCK_END_DATE, 10))) || new Date(2018, 1, 31),
      user_contribution_limit: parseFloat(env.GBX_ICO_ETHEREUM_NODE_MOCK_USER_CONTRIBUTION_LIMIT || '10'),
      total_raised: parseFloat(env.GBX_ICO_ETHEREUM_NODE_MOCK_TOTAL_RAISED || '999'),
      contribution_total_cap: parseFloat(env.GBX_ICO_ETHEREUM_NODE_MOCK_CONTRIBUTION_TOTAL_CAP || '10000'),
    });
  }

  if (CACHE_ACTIVE) {
    const cachedStatus = await cache.get(CACHE_KEY);
    if (cachedStatus) {
      return JSON.parse(cachedStatus);
    }
  }

  return getRawICOStatus()
    .then((rawStatus) => mapIcoStatus(rawStatus))
    .then((mappedStatus) => translateBlockchainese(mappedStatus))
    .then((translatedStatus) => {
      if (CACHE_ACTIVE) {
        cache.set(CACHE_KEY, JSON.stringify(translatedStatus), 'PX', CACHE_DURATION);
      }
      return translatedStatus;
    });
}

async function getUserTotalContribution(userIdentifier) {
  if (env.GBX_ICO_ETHEREUM_NODE_MOCK === 'YES') {
    return Promise.resolve({
      userIdentifier,
      amount_paid: 0,
      error: null,
    });
  }

  const userContractInstance = new web3.eth.Contract(userContractInfo.abi, userIdentifier);

  try {
    const amountPaid = await userContractInstance.methods.amountPaid().call();
    return Promise.resolve({ userIdentifier, amount_paid: web3.utils.fromWei(amountPaid, 'ether'), error: null });
  } catch (err) {
    logger.error('Could not get user contract data from Web3 endpoint', err);
    return Promise.resolve({ userIdentifier, amount_paid: null, error: err });
  }
}
