<template>
  <div id="page-verification" class="page">
    <contribution-status-bar></contribution-status-bar>
    <main class="page-content">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 text-center">
            <h2 class="page-title">{{msg}}</h2>
            <verification-alert></verification-alert>
            <div class="tab-contribute tab-content text-center">
              <div class="tab-text">

                <form v-if="(submitFormVisible || formInputsReadOnly)" action="/api/kyc" class="form" method="post">
                  <div class="form-group text-left">
                    <label for="first_name">First Name</label>
                    <input type="text" name="first_name" id="first_name" class="form-control" :placeholder="formInputPlaceholder(kycStore.first_name, 'First Name')"
                           required v-bind:readonly="formInputsReadOnly" v-model="first_name"/>
                  </div>
                  <div class="form-group text-left">
                    <label for="last_name">Last Name</label>
                    <input type="text" name="last_name" id="last_name" class="form-control" :placeholder="formInputPlaceholder(kycStore.last_name, 'Surname / Family Name')"
                           required v-bind:readonly="formInputsReadOnly" v-model="last_name"/>
                  </div>
                  <div class="form-group text-left">
                    <label for="gender">Gender</label>
                    <input v-if="formInputsReadOnly" type="text" name="gender_placeholder" id="gender_placeholder" class="form-control" :placeholder="kycStore.gender | formatGender" readonly="readonly">
                    <select name="gender" id="gender" class="form-control" required
                            v-else
                            v-bind:readonly="formInputsReadOnly"
                            v-bind:disabled="formInputsReadOnly"
                            v-model="gender"
                            :placeholder="'Gender'">
                      <option value="f">Female</option>
                      <option value="m">Male</option>
                    </select>
                  </div>
                  <div class="form-group text-left">
                    <label for="date_of_birth">Date of birth</label>
                    <input v-if="formInputsReadOnly" type="text" name="date_of_birth_placeholder" id="date_of_birth_placeholder" class="form-control" :placeholder="kycStore.date_of_birth" readonly="readonly">
                    <dropdown v-model="dateOfBirthDropDownOpen"
                              v-else
                              ref="dateOfBirthDropDown">
                      <div class="input-group">
                        <input type="text" name="date_of_birth" id="date_of_birth" class="form-control clear-disabled-style" placeholder="Date of birth"
                               required readonly v-model="date_of_birth" v-on:click="showDateOfBirthDropDown()">
                        <div class="input-group-btn">
                          <btn class="dropdown-toggle" v-bind:disabled="formInputsReadOnly"><i class="fa fa-calendar"></i></btn>
                        </div>
                      </div>
                      <template slot="dropdown">
                        <li>
                          <date-picker :clear-btn="false"
                                       :today-btn="false"
                                       :width="'100%'"
                                       :icon-control-left="'fa fa-chevron-left'"
                                       :icon-control-right="'fa fa-chevron-right'"
                                       :limit-to="furthestDateOfBirth"
                                       :week-starts-with="1"
                                       v-model="date_of_birth"></date-picker>
                        </li>
                      </template>
                    </dropdown>
                  </div>
                  <div class="form-group text-left">
                    <label for="nationality">Nationality</label>
                    <input v-if="formInputsReadOnly" type="text" name="nationality_placeholder" id="nationality_placeholder" class="form-control" :placeholder="kycStore.nationality" readonly="readonly">
                    <select name="nationality" id="nationality" class="form-control" required
                            v-else
                            v-bind:readonly="formInputsReadOnly"
                            v-bind:disabled="formInputsReadOnly"
                            v-model="nationality">
                      <option v-for="nationality in nationalities" :key="nationality" v-bind:value="nationality">
                        {{nationality | capitalFirst}}
                      </option>
                    </select>
                  </div>
                  <div class="form-group text-left">
                    <label for="country_of_residence">Country of residence</label>
                    <input v-if="formInputsReadOnly" type="text" name="country_of_residence_placeholder" id="country_of_residence_placeholder" class="form-control" :placeholder="kycStore.country_of_residence" readonly="readonly">
                    <select name="country_of_residence" id="country_of_residence" class="form-control" required
                            v-else
                            v-bind:readonly="formInputsReadOnly"
                            v-bind:disabled="formInputsReadOnly"
                            v-model="country_of_residence">
                      <option v-for="country in countries" :key="country" v-bind:value="country">
                        {{country | capitalFirst}}
                      </option>
                    </select>
                  </div>
                  <div class="form-group text-left">
                    <label for="home_address">Home address</label>
                    <input type="text" name="home_address" id="home_address" class="form-control" :placeholder="formInputPlaceholder(kycStore.home_address,'Home address')"
                           required v-bind:readonly="formInputsReadOnly" v-model="home_address">
                  </div>
                  <div class="form-group text-left">
                    <label for="postal_code">Postal Code</label>
                    <input type="text" name="postal_code" id="postal_code" class="form-control" :placeholder="formInputPlaceholder(kycStore.postal_code,'Postal Code')"
                           required v-bind:readonly="formInputsReadOnly" v-model="postal_code">
                  </div>
                  <div class="form-group text-left">
                    <label for="identity_document_type">Identity document type</label>
                    <input v-if="formInputsReadOnly" type="text" name="identity_document_type_placeholder" id="identity_document_type_placeholder" class="form-control" :placeholder="kycStore.identity_document_type" readonly="readonly">
                    <select name="identity_document_type" id="identity_document_type" class="form-control" required
                            v-else
                            v-bind:readonly="formInputsReadOnly"
                            v-bind:disabled="formInputsReadOnly"
                            v-model="identity_document_type">
                      <option v-for="documentType in identityDocumentTypes" :key="documentType" v-bind:value="documentType.artemis">
                        {{documentType.display}}
                      </option>
                    </select>
                  </div>
                  <div class="form-group text-left" v-if="!formInputsReadOnly">
                    <label for="identity_document_number">Passport / Identification ID</label>
                    <input type="text" name="identity_document_number" id="identity_document_number"
                           class="form-control" required v-bind:readonly="formInputsReadOnly"
                           v-model="identity_document_number">
                  </div>
                  <div class="form-group text-left" v-if="formInputsReadOnly">
                    <label for="identity_document_number_readonly">Passport / Identification ID</label>
                    <!--<div class="input-group">-->
                      <input name="identity_document_number_readonly" id="identity_document_number_readonly"
                             type="text" class="form-control" readonly v-model="identity_document_number" :placeholder="formInputPlaceholder(kycStore.identity_document_number,'')">
                      <!--<span class="input-group-btn">-->
                        <!--<a v-if="identityDocumentId"-->
                           <!--type="button"-->
                           <!--class="btn btn-default"-->
                           <!--:href="'/api/kyc/document/' + identityDocumentId"-->
                           <!--target="_blank"><i class="fa fa-download"></i> Download</a>-->
                      <!--</span>-->
                    <!--</div>-->
                  </div>
                  <div class="form-group text-left" v-if="dropzoneVisible">
                    <label>Identity document scan/picture</label>
                    <p>
                      <small v-if="outsideEuropeanUnionAndAmericaIndividual">A scan of the photo page of the passport is required.</small>
                      <small v-if="europeanUnionIndividual">A scan of the front page of the passport or the national ID card is required.</small>
                      <small v-if="americanIndividual">A scan of the front page of the passport or the driver's license is required.</small>
                      <br/>
                      <small>Only color copy of passport and identification ID is accepted.</small>
                    </p>
                    <picture-input
                      :class="pictureInputClass"
                      v-if="dropzoneVisible"
                      ref="pictureInput"
                      @change="onDocumentChanged"
                      @remove="onDocumentRemoved"
                      buttonClass="btn btn-primary btn-sm"
                      removeButtonClass="btn btn-primary btn-sm"
                      :removable="true"
                      :width="999"
                      :height="350"
                      :size="30"
                      :crop="false"
                      :plain="true"
                      accept="image/jpeg, image/png, image/tiff, application/pdf, application/x-pdf, image/tiff, image/x-tiff"
                      :customStrings="{
                        tap: 'Tap here to select a document', // HTML allowed
                        change: 'Change document', // Text only
                        remove: 'Remove document', // Text only
                        select: 'Select a document', // Text only
                        selected: '<p>Document successfully selected!</p>', // HTML allowed
                        fileSize: 'The file size exceeds the limit', // Text only
                        fileType: 'This file type is not supported', // Text only
                        upload: '<h1>Upload it!</h1>',
                        drag: 'Drag and drop your document here'
                      }"></picture-input>
                    <small>Drag a file above or click to select the required identity document (accepted formats: png, jpg, tif, pdf.) Max file size: 30MB.</small>
                  </div>
                  <div class="form-group text-left" v-if="!formInputsReadOnly">
                    <label for="proof_of_residence_document_type">Proof of residence document type</label>
                    <select name="proof_of_residence_document_type" id="proof_of_residence_document_type" class="form-control" required
                            v-model="proof_of_residence_document_type">
                      <option v-for="documentType in proofOfResidenceDocumentTypes" :key="documentType" v-bind:value="documentType.artemis">
                        {{documentType.display}}
                      </option>
                    </select>
                  </div>
                  <div class="form-group text-left" v-if="formInputsReadOnly && proofOfResidenceDocumentId">
                    <label for="proof_of_residence_readonly">Proof of residence document type</label>
                    <!--<div class="input-group">-->
                      <input name="proof_of_residence_readonly" id="proof_of_residence_readonly"
                             type="text" class="form-control" required readonly :placeholder="proofOfResidenceDocumentType">
                      <!--<span class="input-group-btn">-->
                      <!--<a-->
                         <!--type="button"-->
                         <!--class="btn btn-default"-->
                         <!--:href="'/api/kyc/document/' + proofOfResidenceDocumentId"-->
                         <!--target="_blank"><i class="fa fa-download"></i> Download</a>-->
                      <!--</span>-->
                    <!--</div>-->
                  </div>
                  <div class="form-group text-left" v-if="dropzoneVisible">
                    <label>Proof of residence scan/picture</label>
                    <p><small>Please make sure that your Proof of Residency document is no older than 3 (three) months.</small></p>
                    <picture-input
                      :class="pictureInputProofOfResidenceClass"
                      v-if="dropzoneVisible"
                      ref="proofOfResidencePictureInput"
                      @change="onDocumentChangedProofOfResidence"
                      @remove="onDocumentRemovedProofOfResidence"
                      buttonClass="btn btn-primary btn-sm"
                      removeButtonClass="btn btn-primary btn-sm"
                      :width="999"
                      :removable="true"
                      :height="350"
                      :size="30"
                      :crop="false"
                      :plain="true"
                      accept="image/jpeg, image/png, image/tiff, application/pdf, application/x-pdf, image/tiff, image/x-tiff"
                      :customStrings="{
                        tap: 'Tap here to select a document', // HTML allowed
                        change: 'Change document', // Text only
                        remove: 'Remove document', // Text only
                        select: 'Select a document', // Text only
                        selected: '<p>Document successfully selected!</p>', // HTML allowed
                        fileSize: 'The file size exceeds the limit', // Text only
                        fileType: 'This file type is not supported', // Text only
                        upload: '<h1>Upload it!</h1>',
                        drag: 'Drag and drop your document here'
                      }"></picture-input>
                    <small>Drag a file above or click to select the required identity document (accepted formats: png, jpg, tif, pdf.) Max file size: 30MB.</small>
                  </div>
                  <div class="form-group text-left">
                    <label
                      for="contribution_source_address">Ethereum address from which contributions will be made</label>
                    <input type="text" name="contribution_source_address" id="contribution_source_address"
                           class="form-control" required v-bind:readonly="formInputsReadOnly"
                           v-model="contribution_source_address" :placeholder="formInputPlaceholder(kycStore.contribution_source_address,'')">
                    <br>
                    <span style="color:red" v-if="(verificationStatusCode === 'NONE' || verificationStatusCode === 'VERIFIED' || verificationStatusCode === 'REJECTED')">Warning: Do NOT use exchange wallet address!</span>
                    <br>
                    <br>
                    <span v-if="(verificationStatusCode === 'NONE' || verificationStatusCode === 'VERIFIED' || verificationStatusCode === 'REJECTED')"><strong>Contributions will only be allowed from this address and this is the address to which the tokens will be transferred automatically by the smart contract.</strong></span>
                  </div>
                  <div class="form-group"
                       v-if="(verificationStatusCode === 'NONE' || verificationStatusCode === 'REJECTED')">
                    <button type="submit" class="form-control btn btn-primary" v-on:click.prevent="submitVerification()"
                            v-bind:disabled="actionInProgress"><i class="fa fa-circle-o fa-spin"
                                                                  v-if="actionInProgress"></i> Submit Data
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
  import {utils} from 'web3';

  import PictureInput from 'vue-picture-input';

  import Cookie from 'js-cookie';
  import moment from 'moment';

  import ContributionStatusBar from './ContributionStatusBar.vue';
  import ContributionNavBar from './ContributionNavBar.vue';
  import VerificationAlert from './VerificationAlert.vue';

  import * as cc from 'change-case';
  import _ from 'underscore';

  import rawNationalities from '../nationalities.json';
  import rawCountries from '../countries.json';
//  import documentTypes from '../document-types.json';

  const restrictedCountries = [
    'AFGHANISTAN',
    'BOSNIA AND HERZEGOVINA',
    'CENTRAL AFRICAN REPUBLIC',
    'CUBA',
    'CONGO (REPUBLIC OF)',
    'DEMOCRATIC REPUBLIC OF THE CONGO',
    'NORTH KOREA',
    'ERITREA',
    'ETHIOPIA',
    'GUINEA-BISSAU',
    'IRAN',
    'IRAQ',
    'JAPAN',
    'LIBYA',
    'LEBANON',
    'SOMALIA',
    'SOUTH KOREA',
    'SOUTH SUDAN',
    'SUDAN',
    'SYRIA',
    'UGANDA',
    'UNITED STATES OF AMERICA',
    'VANUATU',
    'YEMEN',
  ];

  const restrictedNationalities = [
    'AFGHANI',
    'AMERICAN',
    'BOSNIAN',
    'CENTRAL AFRICAN',
    'CUBAN',
    'CONGOLESE',
    'NORTH KOREAN',
    'ERITREAN',
    'ETHIOPIAN',
    'GUINEAN',
    'IRANIAN',
    'IRAQI',
    'JAPANESE',
    'LIBYAN',
    'LEBANESE',
    'SOMALI',
    'SOUTH KOREAN',
    'SOUTH SUDANESE',
    'SUDANESE',
    'SYRIAN',
    'UGANDAN',
    'U.S. TERRITORY',
    'NI-VANUATU',
    'YEMENI',
  ];

  // Filter out the restricted countries
  const countries = _.uniq(rawCountries).filter((country) => restrictedCountries.indexOf(country) === -1);
  // Filter out the restricted nationalities
  const nationalities = _.uniq(rawNationalities).filter((nationality) => restrictedNationalities.indexOf(nationality) === -1);

  const identityDocumentTypes = [{ artemis: 'PASSPORT', display: 'Passport' }, { artemis: 'NRIC', display: 'Identity document - only for residents of European countries' }];
  const proofOfResidenceDocumentTypes = [{ artemis: 'UTILITY/TELEPHONE BILL', display: 'Utility/telephone bill' }, { artemis: 'BANK STATEMENT', display: 'Bank statement' }, { artemis: 'OTHERS', display: 'Others' }];

  // Latest date of birth is 16 years ago
  const LATEST_DATE_OF_BIRTH = moment().startOf('day').subtract(16, 'years').add(1, 'day').format('YYYY-MM-DD');

  export default {
    name: 'Verification',
    data() {
      return {
        first_name: null,
        last_name: null,
        gender: null,
        nationality: null,
        country_of_residence: null,
        home_address: null,
        postal_code: null,
        date_of_birth: null,
        contribution_source_address: null,
        identity_document_type: null,
        identity_document_number: null,
        proof_of_residence_document_type: null,
        dateOfBirthDropDownOpen: false,
        // Furthest date of birth is 16 years ago
        furthestDateOfBirth: LATEST_DATE_OF_BIRTH,
        nationalities,
        countries,
        identityDocumentTypes,
        proofOfResidenceDocumentTypes,
        pictureInputClass: '',
        pictureInputProofOfResidenceClass: '',
        kycStore: {},
      };
    },
    computed: {
      msg: function () {
        return this.verificationStatusCode === 'PROCESSING' ? 'Verification in progress' : 'Identity Verification';
      },
      outsideEuropeanUnionAndAmericaIndividual: function () {
        return !this.europeanUnionIndividual && !this.americanIndividual;
      },
      europeanUnionIndividual: function () {
        [
          'ALANDIC',
          'ALANDISH',
          'AUSTRIAN',
          'BELGIAN',
          'BULGARIAN',
          'CROATIAN',
          'CYPRIOT',
          'CZECH',
          'DANISH',
          'ESTONIAN',
          'FAROESE',
          'FINNISH',
          'FRENCH',
          'FRENCH GUIANESE',
          'GERMAN',
          'GIBRALTAR',
          'GREEK',
          'HUNGARIAN',
          'IRISH',
          'MANX',
          'ITALIAN',
          'LATVIAN',
          'LITHUANIAN',
          'LUXEMBOURGER',
          'MALTESE',
          'DUTCH',
          'POLISH',
          'PORTUGUESE',
          'ROMANIAN',
          'SLOVAK',
          'SLOVENE',
          'SPANISH',
          'SWEDISH',
          'BRITISH',
        ].indexOf((this.nationality || '').toUpperCase() > -1);
      },
      americanIndividual: function () {
        return this.nationality === 'AMERICAN';
      },
      chineseIndividual: function () {
        return this.nationality === 'CHINESE';
      },
      verificationStatusCode: function () {
        return this.$store.state.user.verificationStatusCode;
      },
      formInputsReadOnly: function () {
        return this.$store.state.globalActionInProgress ||
          this.$store.state.user.verificationStatusCode === 'PROCESSING' ||
          this.$store.state.user.verificationStatusCode === 'VERIFIED';
      },
      actionInProgress: function () {
        return this.$store.state.globalActionInProgress;
      },
      dropzoneVisible: function () {
        return !(this.verificationStatusCode === 'PROCESSING' || this.verificationStatusCode === 'VERIFIED');
      },
      bundlePayload: function () {
        return this.$store.state.user.kyc.bundlePayload;
      },
      savedContributionSourceAddress: function () {
        return this.$store.state.user.kyc.contributionSourceAddress;
      },
      submitFormVisible: function () {
//        return ['PRE_START', 'START', 'FULL_GAS'].indexOf(this.$store.state.icoContributionSettings.status.currentStatusName) !== -1;
        return true; // KYC submit should always be available, per GBXB-287
      },
      identityDocumentId: function () {
        return (this.$store.state.user.kyc.documents.find((doc) => this.identityDocumentTypes.map((type) => type.artemis).indexOf(doc.document_type) !== -1) || {}).site_user_kyc_bundle_uploaded_document_id;
      },
      proofOfResidenceDocumentId: function () {
        return (this.$store.state.user.kyc.documents.find((doc) => this.proofOfResidenceDocumentTypes.map((type) => type.artemis).indexOf(doc.document_type) !== -1) || {}).site_user_kyc_bundle_uploaded_document_id;
      },
      proofOfResidenceDocumentType: function () {
        return (this.$store.state.user.kyc.documents.find((doc) => this.proofOfResidenceDocumentTypes.map((type) => type.artemis).indexOf(doc.document_type) !== -1) || {}).document_type;
      },
    },
    watch: {
      dateOfBirthDropDownOpen: function (newVal) {
        if (newVal && !this.date_of_birth) {
          this.date_of_birth = moment(LATEST_DATE_OF_BIRTH).startOf('day').subtract(1, 'day').format('YYYY-MM-DD');
        }
      },
      bundlePayload: function (newVal) {
        if (this.$store.state.user.verificationStatusCode === 'PROCESSING' || this.$store.state.user.verificationStatusCode === 'VERIFIED') {
          if(!this.formInputsReadOnly) {
            this.first_name = newVal.first_name;
            this.last_name = newVal.last_name;
            this.gender = newVal.gender;
            this.nationality = newVal.nationality;
            this.country_of_residence = newVal.country_of_residence;
            this.home_address = newVal.home_address;
            this.postal_code = newVal.postal_code;
            this.date_of_birth = newVal.date_of_birth;
            this.identity_document_type = newVal.identity_document_type;
            this.identity_document_number = newVal.identity_document_number;
            this.contribution_source_address = newVal.contribution_source_address;
          } else {
            this.kycStore.first_name = newVal.first_name;
            this.kycStore.last_name = newVal.last_name;
            this.kycStore.gender = newVal.gender;
            this.kycStore.nationality = newVal.nationality;
            this.kycStore.country_of_residence = newVal.country_of_residence;
            this.kycStore.home_address = newVal.home_address;
            this.kycStore.postal_code = newVal.postal_code;
            this.kycStore.date_of_birth = newVal.date_of_birth;
            this.kycStore.identity_document_type = newVal.identity_document_type;
            this.kycStore.identity_document_number = newVal.identity_document_number;
            this.kycStore.contribution_source_address = newVal.contribution_source_address;
          }

        }
      },
      savedContributionSourceAddress: function (newVal) {
        if (this.$store.state.user.verificationStatusCode === 'PROCESSING' || this.$store.state.user.verificationStatusCode === 'VERIFIED') {
          if(!this.formInputsReadOnly) {
            this.contribution_source_address = newVal;
          } else {
            this.kycStore.contribution_source_address = newVal;
          }
        }
      },
    },
    mounted: function () {
      this.$store.dispatch('getSession', {$http: this.$http});
      this.$store.dispatch('getKyc', {$http: this.$http});
    },
    methods: {
      onDocumentChanged: function () {
        if (this.$refs.pictureInput.file && this.$refs.pictureInput.fileName && this.$refs.pictureInput.fileName.toLowerCase().endsWith('pdf')) {
          this.pictureInputClass = 'file-input-pdf';
        } else {
          this.pictureInputClass = '';
        }
      },
      onDocumentRemoved: function() {
        this.pictureInputClass = '';
      },
      onDocumentChangedProofOfResidence: function () {
        if (this.$refs.proofOfResidencePictureInput.file && this.$refs.proofOfResidencePictureInput.fileName && this.$refs.proofOfResidencePictureInput.fileName.toLowerCase().endsWith('pdf')) {
          this.pictureInputProofOfResidenceClass = 'file-input-pdf';
        } else {
          this.pictureInputProofOfResidenceClass = '';
        }
      },
      onDocumentRemovedProofOfResidence: function() {
        this.pictureInputProofOfResidenceClass = '';
      },
      showDateOfBirthDropDown: function () {
        if (this.formInputsReadOnly) {
          return;
        }

        this.$refs.dateOfBirthDropDown.toggle();
      },
      formInputPlaceholder: function (value, staticText) {
        return this.formInputsReadOnly? value : staticText;
      },

      submitVerification: function () {
        if (!this.first_name || (this.first_name || '').trim() === '') {
          this.$notify({
            type: 'danger',
            content: 'First name not provided',
          });
          return;
        }

        if (!this.last_name || (this.last_name || '').trim() === '') {
          this.$notify({
            type: 'danger',
            content: 'Last name not provided',
          });
          return;
        }

        if (!this.gender || (this.gender || '').trim() === '') {
          this.$notify({
            type: 'danger',
            content: 'Gender not provided',
          });
          return;
        }

        if (!this.date_of_birth || (this.date_of_birth || '').trim() === '') {
          this.$notify({
            type: 'danger',
            content: 'Date of birth not provided',
          });
          return;
        } else if (moment(this.date_of_birth).isAfter(moment(LATEST_DATE_OF_BIRTH))) {
          this.$notify({
            type: 'danger',
            content: 'Date of birth is too close to the present',
          });
          return;
        }

        if (!this.nationality || (this.nationality || '').trim() === '') {
          this.$notify({
            type: 'danger',
            content: 'Nationality not provided',
          });
          return;
        }

        if (!this.country_of_residence || (this.country_of_residence || '').trim() === '') {
          this.$notify({
            type: 'danger',
            content: 'Country of residence not provided',
          });
          return;
        }

        if (!this.home_address || (this.home_address || '').trim() === '') {
          this.$notify({
            type: 'danger',
            content: 'Home address not provided',
          });
          return;
        }

        if (!this.postal_code || (this.postal_code || '').trim() === '') {
          this.$notify({
            type: 'danger',
            content: 'Postal code not provided',
          });
          return;
        }

        if (!this.identity_document_type || (this.identity_document_type || '').trim() === '') {
          this.$notify({
            type: 'danger',
            content: 'Identity document type not provided',
          });
          return;
        }

        if (!this.identity_document_number || (this.identity_document_number || '').trim() === '') {
          this.$notify({
            type: 'danger',
            content: 'Identity document number not provided',
          });
          return;
        }

        if (!this.proof_of_residence_document_type || (this.proof_of_residence_document_type || '').trim() === '') {
          this.$notify({
            type: 'danger',
            content: 'Proof of residence document type not provided',
          });
          return;
        }

        if (!this.$refs.proofOfResidencePictureInput.file) {
          this.$notify({
            type: 'danger',
            content: 'Please select a proof of residence document for upload',
          });
          return;
        }

        if (!this.$refs.pictureInput.file) {
          this.$notify({
            type: 'danger',
            content: 'Please select an identity document for upload',
          });
          return;
        }

        if (!this.contribution_source_address ||
          typeof this.contribution_source_address !== 'string' ||
          this.contribution_source_address.indexOf('0x') !== 0 ||
          !utils.isAddress(this.contribution_source_address)) {
          this.$notify({
            type: 'danger',
            content: 'Invalid Ethereum contribution address provided',
          });
          return;
        }

        if (this.verificationStatusCode !== 'NONE' &&
          this.verificationStatusCode !== 'REJECTED') {
          this.$notify({
            type: 'danger',
            content: 'Identity verification cannot be performed at this time',
          });
          return;
        }

        if (this.actionInProgress) {
          this.$notify({
            type: 'warning',
            content: 'Processing, please wait',
          });
          return;
        }

        this.$store.dispatch('getSession', { $http: this.$http })
          .then(async () => {
            if (!this.$store.state.isLoggedIn) {
              this.$router.push('/login');
              return;
            }

            await this.$store.dispatch('submitKyc', {
              $http: this.$http,
              $notify: this.$notify,
              first_name: this.first_name,
              last_name: this.last_name,
              gender: this.gender,
              date_of_birth: this.date_of_birth,
              nationality: this.nationality,
              country_of_residence: this.country_of_residence,
              home_address: this.home_address,
              postal_code: this.postal_code,
              contribution_source_address: this.contribution_source_address,
              identity_document_file: this.$refs.pictureInput.file,
              identity_document_type: this.identity_document_type,
              identity_document_number: this.identity_document_number,
              proof_of_residence_file: (this.$refs.proofOfResidencePictureInput &&
              this.$refs.proofOfResidencePictureInput.file) || null,
              proof_of_residence_document_type: this.proof_of_residence_document_type,
            });

            await this.$store.dispatch('getSession', {$http: this.$http});
            await this.$store.dispatch('getKyc', {$http: this.$http});
          });

      },
    },
    components: {
      ContributionStatusBar,
      ContributionNavBar,
      PictureInput,
      VerificationAlert,
    },
    filters: {
      capitalFirst: function (value) {
        if (!value) { return ''; }
        value = value.toString();
        return cc.titleCase(value);
      },
      formatGender: function (value) {
        switch(value) {
            case 'm':
                return 'Male';
            case 'f':
                return 'Female';
        }
      },
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.clear-disabled-style {
  cursor: initial !important;
  background-color: #fff;
}
</style>
