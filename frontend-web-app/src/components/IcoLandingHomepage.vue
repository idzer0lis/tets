<template>
  <div id="page-ico-landing" class="page">

    <!-- INTRO -->
    <section id="intro" class="section text-center">
      <div class="intro-overlay"></div>
      <div class="container">
        <div class="row">
          <div class="col-md-8 col-md-offset-2">
            <img src="../assets/img/ico-landing/intro-logo.svg" class="img-responsive intro-logo" alt="image">
            <div class="section-header text-center">
              <h1 class="section-title">Own A Utility Token That Powers The World’s First Tokenized Stock Exchange Ecosystem</h1>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
            <div class="counter-wrapper">
              <contribution-countdown-timer :contribution-countdown="contributionCountdown"></contribution-countdown-timer>
              <p>The Rock Token (RKT) Public Sale Commences 30 January 2018</p>
            </div>
          </div>
          <div class="links col-xs-12">
            <div class="btn">Token Sale platform</div>
            <div class="btn">Cryptocurrency Exchange</div>
            <div class="btn">Tokenized Securities Exchange</div>
            <div class="btn">Financial Services &amp; Fintech Solutions</div>
          </div>
          <div class="cta-buttons col-xs-12">
            <router-link class="btn btn-primary btn-lg" to="/ico/contribute">Contribute Now</router-link>
            <a href="#" class="btn btn-outline-white btn-lg btn-w-img-icon" role="button">
              <img src="../assets/img/icons/icon-whitepaper.svg" class="btn-icon" alt="Icon">
              <span class="btn-text">Read Whitepaper</span>
            </a>
          </div>
        </div>
      </div>
    </section>


    <!-- SPONSORS -->
    <section id="sponsors" class="section text-center">
      <div class="container">
        <div class="row">
          <div class="col-xs-12">
            <h2 class="section-title">Our sponsors</h2>
          </div>
          <div class="col-xs-12">
            <ul class="partners-list list-unstyled list-inline">
              <li class="partner">
                <a href="http://www.gibraltarlawyers.com/" target="_blank" rel="nofollow">
                  <img src="../assets/img/partners/isolas.png" alt="Isolas">
                </a>
              </li>
              <li class="partner">
                <a href="https://kenetic.capital/" target="_blank" rel="nofollow">
                  <img src="../assets/img/partners/kenetic-capital.png" alt="Kenetic Capital">
                </a>
              </li>
              <li class="partner">
                <a href="https://www.pwc.gi/" target="_blank" rel="nofollow">
                  <img src="../assets/img/partners/pwc.png" alt="PWC">
                </a>
              </li>
              <li class="partner">
                <a href="http://blockchainlab.com/" target="_blank" rel="nofollow">
                  <img src="../assets/img/partners/blockchain-lab.png" alt="Blockchain Lab">
                </a>
              </li>
              <li class="partner">
                <a href="http://www.blockarmour.com/" target="_blank" rel="nofollow">
                  <img src="../assets/img/partners/block-armour.png" alt="Block Armour">
                </a>
              </li>
              <li class="partner">
                <a href="http://www.blockchainworx.com/" target="_blank" rel="nofollow">
                  <img src="../assets/img/partners/blockchain-worx.png" alt="Blockchain Worx">
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>


    <!-- WELCOME -->
    <section id="welcome" class="section text-center">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <h2 class="section-title">Welcome to Gibraltar Blockchain Exchange</h2>
            <p>Blockchain technology dramatically boosts efficiencies whilst reducing costs and there is no doubt distributed ledger technology will shape the future of the finance industry. However, the lack of Regulation and Liquidity hinder the global adoption and progress of this otherwise limitless technology.</p>
          </div>
        </div>
      </div>
    </section>


    <!-- PUTTING AN END -->
    <section id="putting-an-end" class="section">
      <div class="container">
        <div class="row">
          <div class="left-column col-md-6">
            <h2 class="section-title">Putting an end to a period of Risk and Uncertainty</h2>
            <p>Token Listings (ICO) are the fastest way for start-ups to raise capital but lack of regulatory oversight leaves room for abuse and fraudulent acts. With no protection, investors pay the price.</p>
            <br>
            <router-link class="btn btn-primary btn-lg" to="/ico/contribute">Contribute Now</router-link>
          </div>
          <div class="right-column col-md-5 col-md-offset-1">
            <blockquote>
              <img src="../assets/img/ico-landing/logo-cnbc.svg" class="blockquote-logo" alt="Logo">
              <span class="blockquote-text">Cryptocurrency start-up disappears with $375,000 from an ICO, and nobody can find the founders</span>
            </blockquote>
          </div>
        </div>
      </div>
    </section>


    <!-- PROUDLY POWERED -->
    <section id="proudly-powered" class="section">
      <div class="container">
        <div class="row">
          <header class="section-header clearfix">
            <div class="col-md-6 text-right">
              <h2 class="section-title">Proudly powered by the</h2>
              <h5>The National Stock Exchange of Gibraltar</h5>
            </div>
            <div class="col-md-6">
              <img src="../assets/img/ico-landing/logo-gse-white.svg" class="logo-gse" alt="Logo">
            </div>
          </header>
        </div>
        <div class="row">
          <div class="left-column col-md-4 col-md-offset-1">
            <h4>
              <img src="../assets/img/icons/icon-licensed.svg" alt="Icon">
              <span>FULLY LICENSED AN COMPLIANT</span>
            </h4>
            <p>The Gibraltar Stock Exchange is licensed and regulated by the GFSC under license number FSC123B and operates as an EU regulated market recognised by ESMA and HMRC. The GSX also operates as a Multilateral Trading Facility (MTF) as defined under MiFID for funds and debt securities.</p>
          </div>
          <div class="col-md-1"></div>
          <div class="right-column col-md-4 col-md-offset-1">
            <h4>
              <img src="../assets/img/icons/icon-jurisdiction.svg" alt="Icon">
              <span>SUPPORTIVE JURISDICTION</span>
            </h4>
            <p>The GBX-GSX ecosystem operates under a government that is highly supportive of Distributed Ledger Technology. This provides regulatory  certainty and a responsive framework that will further fuel growth and consumer confidence.</p>
          </div>
        </div>
        <div class="row">
          <div class="col-md-8 col-md-offset-2">
            <br><br>
            <img src="../assets/img/ico-landing/proudly-powered.svg" class="img-responsive" alt="Image">
          </div>
        </div>
      </div>
    </section>


    <!-- WE ARE A PLATFORM-->
    <section id="we-are-a-platform" class="section">
      <div class="container">
        <div class="row">
          <header class="section-header left-column col-md-5">
            <h2 class="section-title">We are a Platform that guarantees the authenticity of all listed Tokens</h2>
            <p>A platform where the token listing (ICO) protocol requires validation of concept with a sponsor mechanism, stringent AML/KYC compliance and legal authorization of a token’s utility. A platform where admission is reserved only for high quality token listings with sound business models so investors can participate with confidence.</p>
          </header>
          <div class="token-listing-requests right-column col-md-5 col-md-offset-1">
            <h4>TOKEN LISTING REQUESTS</h4>
            <img src="../assets/img/ico-landing/token-listing-requests.svg" alt="Token Listing Requests">
          </div>
        </div>
        <br><br>
        <div class="row">
          <div class="col-md-4 left-column col-md-offset-1">
            <img src="../assets/img/ico-landing/logo-gse-red.svg" class="logo-gse" alt="Logo">
          </div>
          <div class="col-md-5 right-column col-md-offset-1">
            <h2 class="section-title">The GBX is a subsidiary of the EU-regulated Gibraltar Stock Exchange</h2>
            <p>For the first time ever, a nationally regulated stock exchange is stepping into the blockchain space to offer much needed regulatory certainty by bridging the gap between traditional finance and new age technology to usher in a new era of Blockchain Powered Finance.</p>
          </div>
        </div>
      </div>
    </section>


    <!-- WORLD FIRST NATIONALLY -->
    <section id="world-first-nationally" class="section">
      <div class="container">
        <div class="row text-center">
          <header class="section-header col-xs-12">
            <h5 class="section-top-subtitle">We are on a mission to launch</h5>
            <h2 class="section-title">The World’s First Nationally Licensed and Regulated Token Sale Platform and Cryptocurrency Exchange</h2>
            <p>Leveraging the management expertise and regulatory experience of Gibraltar Stock Exchange, its parent company, GBX will adopt the best principles of traditional business practices to create similar governance for admission and trading of tokens and cryptocurrencies.</p>
            <br><br><br>
          </header>
        </div>
        <div class="row">
          <div class="col-xs-12">
            <tabs justified>
              <tab title="Fully Licensed and complians">
                <div class="col-md-5">
                    <p>Using a sponsor and rules-based system in accordance with DLT Regulations,GBX expects to be the first fully regulated token sale and cryptocurrency exchange licensed under the GFSC    Financial Services DLT regulatory framework by Q1 2018.</p>
                </div>
                <div class="col-md-5 col-md-offset-1">
                  <p>Development, Implementation &amp; Integration of the GBX Token Sales and Crypto Exchange Platform with advanced KYC systems integration</p>
                  <p>Launch the GBX Alliance, Alliance Council, Blockchain Innovation Centre </p>
                  <p>Acquire the existing operating service companies and fund to be under the GBX Group</p>
                  <p>The GBX License Application (Gibraltar DLTRF) &amp; Capital Requirements</p>
                </div>
              </tab>
              <tab title="Common consensus governance">
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
              </tab>
              <tab title="Rigorous listing protocol">
                <p>Etsy mixtape wayfarers, ethical wes anderson tofu before they sold out mcsweeney's organic lomo retro fanny pack lo-fi farm-to-table readymade. Messenger bag gentrify pitchfork tattooed craft beer, iphone skateboard locavore carles etsy salvia banksy hoodie helvetica. DIY synth PBR banksy irony. Leggings gentrify squid 8-bit cred pitchfork.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
              </tab>
            </tabs>
          </div>
        </div>
      </div>
    </section>


    <!-- FIRST TOKENISED SECURITIES -->
    <section id="first-tokenised-securities" class="section">
      <div class="container">
        <div class="row text-center">
          <header class="section-header col-xs-12">
            <h5 class="section-top-subtitle">From a National Stock Exchange to</h5>
            <h2 class="section-title">First Tokenised Securities Exchange with a Full Fledged Financial Services and Fintech Ecosystem</h2>
            <p>GSX will leverage GBX technology to become a blockchain-based exchange for tokenized securities, providing a new level of access, liquidity and transparency in the capital markets. Issuers listed on GBX will receive fast-track access with faster processing times to list on GSX, giving more options for capital raising, and access to a more diverse investor base as they grow.</p>
            <br>
          </header>
        </div>
        <div class="row">
          <div class="left-column">
            <div class="col-md-2">
              <div class="hexagon">
                <h6>services<br>division</h6>
              </div>
            </div>
            <div class="col-md-4">
              <h3>Juno Services</h3>
              <p>The services division currently includes Juno Fund Services Limited, Juno Fiduciary Services Limited and its licensed nominee and company manager subsidiaries, all of which are former Grant Thornton service lines that were acquired by GBX. These former service lines are existing businesses with over 10 years operational history. Services provided will include fund services, corporate services (with ancillary nominee and management services), solutions and support.</p>
            </div>
          </div>
          <div class="right-column">
            <div class="col-md-2">
              <div class="hexagon">
                <h6>banking<br>division</h6>
              </div>
            </div>
            <div class="col-md-4">
              <h3>Digital Bank and e-money institution</h3>
              <p>The digital bank will facilitate business transactions and provision of services to both issuers and users and will serve to strengthen the ecosystem’s comprehensive offerings.</p>
              <p>An e-money institution will facilitate currency exchange, peer-to-peer payments and peer–to-business payments for fiat and cryptocurrency alike. The e-money institution will also support Rock Token and permit users to store and trade tokens, cryptocurrency and tokenised securities on GBX and GSX via their e-money wallet.</p>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="left-column">
            <div class="col-md-2">
              <div class="hexagon">
                <h6>funds<br>division</h6>
              </div>
            </div>
            <div class="col-md-4">
              <h3>Crypto Rock</h3>
              <p>Crypto Rock will operate multiple investment cells with differing strategies investing the crypto sector such as crypto-long, crypto-indexes, crypto fund-of-funds, token issuances and underwriting.</p>
              <p>Subjected to compliance with legal and regulatory requirements, Crypto Rock will provide select investors with the opportunity to gain exposure to the token and cryptocurrency sector via a listed fund structure in the controlled environment of the ecosystem.</p>
            </div>
          </div>
          <div class="right-column">
            <div class="col-md-2">
              <div class="hexagon">
                <h6>exchange<br>division</h6>
              </div>
            </div>
            <div class="col-md-4">
              <h3>GBX &amp; GSX</h3>
              <ul class="list-unstyled">
                <li>GBX Token Sales Platform</li>
                <li>GBX Cryptocurrency Exchange</li>
                <li>GSX Main and Global Market (Funds, Debts)</li>
                <li>GSX Tokenized Securities Exchange</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>


    <!-- WHO WILL BENEFIT -->
    <section id="who-will-benefit" class="section text-center">
      <div class="container">
        <div class="row">
          <header class="section-header col-xs-12">
            <h2 class="section-title">Who will benefit from GBX?</h2>
            <br><br>
          </header>
          <div class="clearfix"></div>
          <div class="feature col-sm-6 col-md-3">
            <div class="icon-wrapper">
              <img src="../assets/img/icons/icon-investors.svg" class="img-responsive" alt="Icon">
            </div>
            <h5>INVESTORS</h5>
            <p>will benefit directly from the high quality token listings that have been subjected to an institutional-grade approval process. In addition to the enhanced credibility and liquidity of the token listings on GBX, investors can also participate in full confidence knowing they are protected in a regulated environment.</p>
          </div>
          <div class="feature col-sm-6 col-md-3">
            <div class="icon-wrapper">
              <img src="../assets/img/icons/icon-businesses.svg" class="img-responsive" alt="Icon">
            </div>
            <h5>BUSINESSES</h5>
            <p>will gain access to an unprecedented ICO to IPO pathway made possible by the GBX-GSX Ecosystem.  From listing and trading initial token sales through to accessing funding via the traditional bond market or equity issuance route, token issuers now have the opportunity to issue tokenized securities to an even wider capital base.</p>
          </div>
          <div class="feature col-sm-6 col-md-3">
            <div class="icon-wrapper">
              <img src="../assets/img/icons/icon-community.svg" class="img-responsive" alt="Icon">
            </div>
            <h5>THE CRYPTO COMMUNITY</h5>
            <p>will experience greater collaborative empowerment as one voice under GBX’s initiatives through the blockchain innovation center and GBX Alliance. Spearheading the crypto-movement from a regulated position, GBX aims to bring institutional respectability and recognition to the global crypto community and forge mainstream acceptance and inclusion. </p>
          </div>
          <div class="feature col-sm-6 col-md-3">
            <div class="icon-wrapper">
              <img src="../assets/img/icons/icon-rkt-holders.svg" class="img-responsive" alt="Icon">
            </div>
            <h5>ROCK TOKEN HOLDERS</h5>
            <p>will not only be entitled to exclusive privileges and discounts within the GBX-GSX ecosystem, but will also benefit from future value creation. With the demand for Rock Tokens increasing along with more users and transaction volume, this utility token of limited supply is expected to grow in value. See details of a Rock Token Utility Map below.</p>
          </div>
        </div>
      </div>
    </section>


    <!-- INTRODUCING THE ROCK TOKEN -->
    <section id="introducing-rkt" class="section">
      <div class="container">
        <div class="row">
          <header class="section-header col-xs-12 text-center">
            <h2 class="section-title">Introducing the Rock Token (RKT)</h2>
            <br><br>
          </header>
          <div class="left-column col-md-5 col-md-offset-1">
            <br>
            <p>It Is The Currency Of Choice For The New Age Financial Services And Fintech Ecosystem.</p>
            <p>The Rock Token serves as the medium of exchange with a multitude of functionalities and utilities</p>
            <br>
            <router-link class="btn btn-primary btn-lg" to="/ico/contribute">Contribute Now</router-link>
          </div>
          <div class="right-column col-md-5 col-md-offset-1">
            <img src="../assets/img/ico-landing/introducing-rkt.svg" class="introducing-rkt-icon" alt="Rock Token Icon">
          </div>
        </div>
        <br><br><br>
        <tabs justified>
          <tab title="Member Privileges">
            <div class="left-column col-md-5">
              <p>Owners of RKT are granted membership within the GBX-GSX Ecosystem and with it, significant, tangible benefits.</p>
              <img src="../assets/img/ico-landing/pool-membership-card.svg" class="pool-membership-card-icon" alt="Icon">
            </div>
            <div class="right-column col-md-5 col-md-offset-1">
              <ul class="member-privileges-list list-unstyled">
                <li>Early access to token sales during private / presales</li>
                <li>Exclusive members-only discounts on transactions denominated in RKT</li>
                <li>Voting rights on select community developments</li>
                <li>Pioneering rights to purchase future release of RKT from the GBX reserve at special rates</li>
              </ul>
            </div>
          </tab>
          <tab title="Platform Utility">
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </tab>
          <tab title="Ecosystem Services">
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </tab>
        </tabs>
      </div>
    </section>


    <!-- ROCK TOKEN UTILITY MAP -->
    <section id="utility-map" class="section">
      <div class="container">
        <div class="row">
          <header class="section-header col-xs-12 text-center">
            <h2 class="section-title">Rock Token Utility Map</h2>
            <br>
          </header>
          <div class="col-xs-12">
            <img src="../assets/img/ico-landing/rkt-utility-map.svg" alt="Rock Token Utility Map">
          </div>
        </div>
      </div>
    </section>


    <!-- A ROCK SOLID FUTURE -->
    <section id="rock-solid-future" class="section">
      <div class="container">
        <div class="row">
          <header class="section-header col-xs-12 text-center">
            <h2 class="section-title">A Rock Solid Future</h2>
          </header>
        </div>
      </div>
      <div class="divider"></div>
      <div class="container">
        <div class="phases row">
          <div class="phase col-sm-6 col-md-4">
            <h5>Current Phase</h5>
            <div class="numbers">20+</div>
            <p>Avenues to utilize Rock Token</p>
          </div>
          <div class="phase col-sm-6 col-md-7">
            <h5>In the Pipeline</h5>
            <p>It is intended that the entire GBX-GSX ecosystem will make use of DLT. Integrating the full spectrum of exchange services onto blockchain would open up new practical utilities for Rock Token such as <strong>Execution, Clearing, Settlement, AML/KYC Controls and Processes, Security, Digital Identity Management and Custody</strong>, to name a few.</p>
          </div>
        </div>
        <div class="we-envision row text-center">
          <header class="section-header col-xs-12 text-center">
            <h2 class="section-title">We envision Rock Token to be the world’s currency standard for Blockchain Powered Finance</h2>
          </header>
          <div class="col-md-8 col-md-offset-2">
            <p>We will build the GBX-GSX ecosystem to be recognized not only for top grade token listings but also a large pool of high quality, AML/KYC cleared investor pool. This will create an efficient marketplace, and together with the continual expansion of services and utilities to better serve the greater Crpytocommunity, will fuel greater adoption of the Rock Token.</p>
            <p>We believe when we serve well, the community will grow, and with it, Rock Token will grow synergistically in value.</p>
          </div>
        </div>
      </div>
    </section>


    <!-- STAY TUNED -->
    <section id="stay-tuned" class="section text-center">
      <div class="container">
        <div class="row">
          <header class="section-header col-md-8 col-md-offset-2">
            <h2 class="section-title">Stay tuned with the latest news and updates from the Gibraltar Blockchain Exchange</h2>
          </header>
        </div>
        <div class="row">
          <div class="col-md-6 col-md-offset-3">
            <mailchimp-subscribe-stay-tuned-news-and-updates></mailchimp-subscribe-stay-tuned-news-and-updates>
            <p>Join our mailing list to keep up-to-date with the latest news and updates from the Gibraltar Blockchain Exchange</p>
          </div>
        </div>
      </div>
    </section>


    <!-- TOKEN STRUCTURE -->
    <section id="token-structure" class="section">
      <div class="container">
        <div class="row">
          <header class="section-header col-xs-12 text-center">
            <h2 class="section-title">Token Structure</h2>
            <br>
          </header>
          <div class="col-md-8 col-md-offset-2">
            <div class="row">
              <div class="left-column col-md-4">
                <img src="../assets/img/ico-landing/introducing-rkt.svg" class="rkt-logo img-responsive" alt="Rock Token">
              </div>
              <div class="token-specs right-column col-md-8">
                <div class="spec row">
                  <div class="col-md-6"><strong>Token Name:</strong></div>
                  <div class="col-md-6">Rock Token</div>
                </div>
                <div class="spec row">
                  <div class="col-md-6"><strong>Token Code:</strong></div>
                  <div class="col-md-6">RKT</div>
                </div>
                <div class="spec row">
                  <div class="col-md-6"><strong>Blockchain Platform:</strong></div>
                  <div class="col-md-6">Etherem</div>
                </div>
                <div class="spec row">
                  <div class="col-md-6"><strong>Token Standard:</strong></div>
                  <div class="col-md-6">ERC-20</div>
                </div>
                <p>Residents of the following countries are not eligible to participate in the token sale: United States of America, China</p>
              </div>
            </div>
            <div class="clearfix">
              <img src="../assets/img/ico-landing/token-structure-indicator.svg" class="indicator" alt="Indicator">
            </div>
          </div>
        </div>
        <div class="token-structure-list row text-center">
          <div class="col-md-8 col-md-offset-2">
            <div class="row">
              <div class="col-md-6">
                <div class="list-item">
                  <h5>TOKEN PUBLIC SALE START DATE</h5>
                  <p>30th Jan 2018</p>
                </div>
              </div>
              <div class="col-md-6">
                <div class="list-item">
                  <h5>TOKEN PUBLIC SALE END DATE</h5>
                  <p>7th Feb 2018 OR Hard Cap</p>
                </div>
              </div>
              <div class="col-md-6">
                <div class="list-item">
                  <h5>TOKEN PUBLIC SALE PRICE</h5>
                  <p>3000 RKT = 1 ETH</p>
                </div>
              </div>
              <div class="col-md-6">
                <div class="list-item">
                  <h5>TOKEN PUBLIC SALE PRICE (USD)</h5>
                  <p>$0.10*</p>
                </div>
              </div>
              <div class="col-md-6">
                <div class="list-item">
                  <h5>TOTAL TOKEN SUPPLY</h5>
                  <p>900,000,000 RKT finite supply</p>
                </div>
              </div>
              <div class="col-md-6">
                <div class="list-item">
                  <h5>MARKET CAP</h5>
                  <p>$90 mil*</p>
                </div>
              </div>
              <div class="col-md-6">
                <div class="list-item">
                  <h5>% FOR TOKEN PUBLIC SALE</h5>
                  <p>30% (270,000,000 RKT)</p>
                </div>
              </div>
              <div class="col-md-6">
                <div class="list-item">
                  <h5>PUBLIC SALE TOKEN SUPPLY (HARD CAP)</h5>
                  <p>270,000,000 RKT ($27 mil* in value)</p>
                </div>
              </div>
              <div class="col-md-6">
                <div class="list-item">
                  <h5>MINIMUM PURCHASE</h5>
                  <p>10 ETH</p>
                </div>
              </div>
              <div class="col-md-6">
                <div class="list-item">
                  <h5>MAXIMUM PURCHASE</h5>
                  <p>100 ETH</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>


    <!-- TOKEN ALLOCATION -->
    <section id="token-allocation" class="section text-center">
      <div class="container">
        <div class="row">
          <header class="section-header col-xs-12">
            <h2 class="section-title">Token Allocation</h2>
            <h5>
              <span>Total RKT issued</span>
              <span class="divider">|</span>
              <span class="issued">900,000,000</span>
              <img src="../assets/img/ico-landing/rkt-symbol-red.svg" class="rkt-logo-red" alt="Rock Token">
            </h5>
            <br><br>
          </header>
          <div class="feature col-md-2 col-md-offset-1">
            <h5 class="feature-title">Token Generation Event</h5>
            <img src="../assets/img/ico-landing/chart-30.svg" alt="Chart">
            <div>

            </div>
            <h5 class="feature-value">270,000,000 RKT</h5>
            <p>To be sold in 2 stages. Pre-sale up to 31st December 2017 and Public sale of balance tokens in January 2018.</p>
          </div>
          <div class="feature col-md-2">
            <h5 class="feature-title">GBX Reserve</h5>
            <img src="../assets/img/ico-landing/chart-30.svg" alt="Chart">
            <h5 class="feature-value">270,000,000 RKT</h5>
            <p>Kept in reserve and used responsibly for further development and stability of the ecosystem. Current investors will have priority access and discounts to future release of RKT from the GBX reserve.</p>
          </div>
          <div class="feature col-md-2">
            <h5 class="feature-title">Community (GBX Alliance, BIC) and Development</h5>
            <img src="../assets/img/ico-landing/chart-15.svg" alt="Chart">
            <h5 class="feature-value">135,000,000 RKT</h5>
            <p>To be sold in 2 stages. Pre-sale up to 31st December 2017 and Public sale of balance tokens in January 2018.</p>
          </div>
          <div class="feature col-md-2">
            <h5 class="feature-title">Founders and Early Backers</h5>
            <img src="../assets/img/ico-landing/chart-15.svg" alt="Chart">
            <h5 class="feature-value">135,000,000 RKT</h5>
            <p>To be sold in 2 stages. Pre-sale up to 31st December 2017 and Public sale of balance tokens in January 2018.</p>
          </div>
          <div class="feature col-md-2">
            <h5 class="feature-title">Partners and Advisors</h5>
            <img src="../assets/img/ico-landing/chart-10.svg" alt="Chart">
            <h5 class="feature-value">90,000,000 RKT</h5>
            <p>To be sold in 2 stages. Pre-sale up to 31st December 2017 and Public sale of balance tokens in January 2018.</p>
          </div>
        </div>
      </div>
    </section>


    <!-- USE OF PROCEEDS -->
    <section id="use-of-proceeds" class="section">
      <div class="container">
        <div class="row">
          <div class="left-column col-md-6">
            <header class="section-header">
              <h2 class="section-title">Use of Proceeds</h2>
            </header>
            <p>The GBX Token Sale embodies the ideals of the crypto-movement and sets out to realise the GBX’s vision: to develop a tokenized exchange within a FinTech ecosystem that provides access, liquidity and transparency to capital markets within a regulated environment.</p>
            <p>The bulk of the proceeds will be dedicated to technological development and security protocols to create a seamlessly integrated trading platform and  marketplace for cryptocurrencies while safeguarding the integrity of the rock token ecosystem.</p>
            <p>Other key designation of funds will be towards recruiting the right talents and expertise while concurrently expanding the global reach of the GBX brand.</p>
            <p>The remaining funds will contribute to the expansion of e-money                         infrastructures and the integration of digital banking into the GBX ecosystem. Funds will also be portioned for applications of banking licenses and correspondent channels in addition to external asset management and capital requirements.</p>
          </div>
          <div class="right-column col-md-5 col-md-offset-1">
            <img src="../assets/img/ico-landing/use-of-proceeds.svg" class="use-of-proceeds-chart" alt="Chart">
          </div>
        </div>
      </div>
    </section>


    <!-- ROADMAP -->
    <section id="roadmap" class="section">
      <div class="container">
        <div class="row">
          <header class="section-header col-xs-12 text-center">
            <h2 class="section-title">Roadmap</h2>
          </header>
        </div>
      </div>

      <ul class="timeline">
        <li v-for="(milestone, index) in roadmap" :key="index"
            :class="{ 'big-flag-container': milestone.firstOfYear }">

          <div v-if="milestone.firstOfYear" :class="{'direction-r':milestone.direction=='right', 'direction-l':milestone.direction=='left'}">
            <div class="big-flag">{{milestone.date}}</div>
            <div class="desc"><strong>{{milestone.title}}</strong><span v-html="milestone.description"></span></div>
          </div>

          <div v-else :class="{'direction-r':milestone.direction=='right', 'direction-l':milestone.direction=='left'}">
            <div class="flag-wrapper">
              <span class="flag">{{milestone.date}}</span>
            </div>
            <div class="desc"><strong>{{milestone.title}}</strong><span v-html="milestone.description"></span></div>
          </div>
        </li>
      </ul>

      <div class="key-dates">
        <h1 class="key-title">Key Dates</h1>

        <div class="key-dates-list">
          <div v-for="(item, index) in keyDates" :key="index" class="key-date-item">
            <h2>{{item.date}}</h2>
            <img :src="require('../assets/img/ico-landing/' + item.icon)" alt=""/>
            <h3><strong>{{item.title}}</strong></h3>
            <p>{{item.description}}</p>
          </div>
        </div>
      </div>


    </section>


    <!-- COMMUNITY COMES FIRST -->
    <section id="community-comes-first" class="section">
      <div class="container">
        <div class="row">
          <div class="left-column col-md-6">
            <header class="section-header">
              <h2 class="section-title">
                <img src="../assets/img/icons/icon-community-white.svg" class="title-icon" alt="Icon">
                <span>In all we do, community comes first</span>
              </h2>
            </header>
            <p>The Gibraltar Blockchain Exchange (GBX) will be a world-leading institutional grade token sale platform and cryptocurrency exchange. Built upon principles of decentralisation and community consensus, we seek to create a new era of trust, openness and global acceptance for the crypto industry, one quality token listing at a time.</p>
          </div>
          <div class="right-column col-md-4 col-md-offset-2">
            <h4>JOIN THE WHITELIST NOW</h4>
            <br>
            <p>The Gibraltar Blockchain Exchange (GBX) will be a world-leading institutional grade token sale platform and cryptocurrency exchange.</p>
            <br>
            <router-link class="btn btn-primary btn-lg" to="/ico/contribute">Contribute Now</router-link>
          </div>
        </div>
      </div>
    </section>


    <!-- TEAM -->
    <section id="team" class="section text-center">
      <div class="container">
        <div class="row">
          <header class="section-header col-xs-12">
            <h2 class="section-title">Meet the team behind crypto harbour</h2>
            <p>We believe ‘first in class’ corporate governance will be of immense service to the Crypto-community and the key to quality liquidity.We believe GBX is not only a solution that helps liberate crypto innovation — it helps the next generation finance world take structure.</p>
            <br><br>
          </header>
          <div class="col-xs-12">
            <tabs justified>
              <tab v-for="(team, index) in teams" :key="index" :title="team.category">
                <div class="team-members">
                  <div v-for="(member, index) in team.members" :key="index" class="team-member">
                    <div class="team-member-image-wrapper">
                      <img :src="require('../assets/img/team/' + member.imageFile)" class="team-member-image img-responsive" :alt="member.name">
                    </div>
                    <h4 class="team-member-name">{{member.name}}</h4>
                    <p class="team-member-role">{{member.role}}</p>
                    <a class="team-member-linkedin" :href="member.linkedinURL" target="_blank"><i v-if="member.linkedinURL" class="fa fa-linkedin"></i></a>
                  </div>
                </div>
              </tab>
            </tabs>
          </div>
        </div>
      </div>
    </section>


    <!-- GBX AROUND THE WORLD -->
    <section id="gbx-around-the-world" class="section">
      <div class="container">
        <div class="row">
          <header class="section-header col-xs-12 text-center">
            <h2 class="section-title">GBX Around the World</h2>
            <p>Exceptional track records and extensive collective experience puts us in aunique position to impact meaningful change to the crypto community.</p>
            <br><br>
          </header>
        </div>
        <div class="articles-list row">
          <article class="col-sm-6 col-md-4">
            <div class="article-image">
              <img src="../assets/img/ico-landing/news-thumb-1.jpg" class="img-responsive" alt="Article Image">
            </div>
            <div class="article-meta">
              <div class="article-country">
                <img src="../assets/img/ico-landing/news-flag-1.svg" class="img-responsive" alt="Country">
              </div>
              <div class="article-title">
                <h5>SINGAPORE FINTECH WEEK CONFERENCE</h5>
                <p class="article-date">15.11.2017</p>
              </div>
            </div>
          </article>
          <article class="col-sm-6 col-md-4">
            <div class="article-image">
              <img src="../assets/img/ico-landing/news-thumb-2.jpg" class="img-responsive" alt="Article Image">
            </div>
            <div class="article-meta">
              <div class="article-country">
                <img src="../assets/img/ico-landing/news-flag-2.svg" class="img-responsive" alt="Country">
              </div>
              <div class="article-title">
                <h5>SINGAPORE FINTECH WEEK CONFERENCE</h5>
                <p class="article-date">15.11.2017</p>
              </div>
            </div>
          </article>
          <article class="col-sm-6 col-md-4">
            <div class="article-image">
              <img src="../assets/img/ico-landing/news-thumb-3.jpg" class="img-responsive" alt="Article Image">
            </div>
            <div class="article-meta">
              <div class="article-country">
                <img src="../assets/img/ico-landing/news-flag-3.svg" class="img-responsive" alt="Country">
              </div>
              <div class="article-title">
                <h5>SINGAPORE FINTECH WEEK CONFERENCE</h5>
                <p class="article-date">15.11.2017</p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

  </div>
</template>

<script>
  import ContributionCountdownTimer from './ContributionCountdownTimer.vue';
  import moment from 'moment';
  import MailchimpSubscribeStayTunedNewsAndUpdates from "./MailchimpSubscribeStayTunedNewsAndUpdates.vue";
  import {EXPORT_TEAM_MEMBERS_DATA} from "../data/ico-landing/team-members";
  import {EXPORT_ROADMAP_DATA} from "../data/ico-landing/roadmap";
  import {EXPORT_KEY_DATES_DATA} from "../data/ico-landing/key-dates";

  export default {
    components: {
      MailchimpSubscribeStayTunedNewsAndUpdates,
      ContributionCountdownTimer,
    },
    name: 'IcoLandingHomepage',
    data() {
      return {
        teams: EXPORT_TEAM_MEMBERS_DATA(),
        roadmap: EXPORT_ROADMAP_DATA(),
        keyDates: EXPORT_KEY_DATES_DATA()
      };
    },
    computed: {
      contributionCountdown: function () {
        return '2018-01-15T00:00:00Z';
      }
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
