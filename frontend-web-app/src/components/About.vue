<template>
  <div id="page-about" class="page">

    <section id="intro-about" class="section text-center">
      <div class="container">
        <div class="row">
          <div class="col-xs-12">
            <h1 class="section-title">The GBX Trusted Listing Process</h1>
            <h4 class="section-subtitle">A Crypto Harbour Established By The Community, For The Community.</h4>
          </div>
        </div>
      </div>
    </section>

    <section id="gbx-alliance" class="section">
      <div class="container">
        <div class="row">
          <div class="col-md-6">
            <h2 class="section-title">The GBX Alliance</h2>
            <h4 class="section-subtitle text-uppercase">A COMMUNITY MODEL</h4>
            <p>To bring clarity and order with a rules-based system that is anchored on community consensus, the GBX intends to establish an international forum with representatives from cross sections of the community to form the GBX Alliance.</p>
            <p>The GBX Alliance would enable the best minds of the crypto industry to gather and form thought leadership around the growing token industry. The GBX Alliance would also serve as a thinktank to shape the evolution of Gibraltar’s crypto economy.</p>
            <br>
            <router-link class="btn btn-primary" to="/ico/contribute">Apply for Token Listing</router-link>
          </div>
          <div class="col-md-6">
            <div class="infographic-wrapper">
              <img src="../assets/img/about-infographic.svg" class="img-responsive" alt="Infographic">
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="gbx-alliance-council" class="section">
      <div class="container">
        <div class="row">
          <div class="col-md-6">
            <div class="infographic-wrapper">
              <img src="../assets/img/about-infographic.svg" class="img-responsive" alt="Infographic">
            </div>
          </div>
          <div class="col-md-6">
            <h2 class="section-title">The GBX Alliance Council</h2>
            <h4 class="section-subtitle text-uppercase">COMMON CONSENSUS GOVERNANCE</h4>
            <p>From within the GBX Alliance, members are elected to form the GBX Alliance Council.</p>
            <p>The council, representing the voices of the community, works hand in hand with the GBX to establish and review guidelines and standards that govern token listing and trading. The council is also pivotal in instating codes of conduct, sponsor firm admission criteria as well as an appeals committee.</p>
          </div>
        </div>
      </div>
    </section>

    <section id="sponsor-firms" class="section">
      <div class="container">
        <div class="row">
          <div class="col-md-6">
            <h2 class="section-title">Sponsor Firms</h2>
            <h4 class="section-subtitle text-uppercase">PARTNERSHIP MODEL FOR QUALITY ENDORSMENT</h4>
            <p>In order to list on the GBX, a token candidate is required to appoint a GBX accredited Sponsor Firm. Sponsor firms are body corporates and key influencers, with proven industry expertise, that have met the admission criteria set forth by the GBX and the Alliance council to be enlisted in the GBX trusted partners network.</p>
            <p>Sponsor firms are responsible for rigorous due diligence, advice and communication between the token candidate and the GBX throughout the entire listing process. Sponsor firms are key to upholding best practices and assurance of quality.</p>
          </div>
          <div class="col-md-6">
            <div class="infographic-wrapper">
              <img src="../assets/img/about-infographic.svg" class="img-responsive" alt="Infographic">
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="listing-protocol" class="section">
      <div class="container">
        <div class="row">
          <div class="col-md-6">
            <div class="infographic-wrapper">
              <img src="../assets/img/about-infographic.svg" class="img-responsive" alt="Infographic">
            </div>
          </div>
          <div class="col-md-6">
            <h2 class="section-title">Listing Protocol</h2>
            <h4 class="section-subtitle text-uppercase">COMMON CONSENSUS GOVERNANCE</h4>
            <p>The nature of the listing protocol sets a high entry bar to ensure quality, safety and transparency in all token listings on the GBX.</p>
            <ol>
              <li>To initiate the Token Generation Event (TGE), token candidates must first possess substance and viable proof of concept in order to enlist the services of a Sponsor Firm.</li>
              <li>The Sponsor Firm (SF) then prepares the token candidate for their application review, adhering to the guidelines and codes of conduct put in place by the GBX Alliance Council. In addition, an innovative sponsor staking mechanism will further enhance the quality assessment of candidates.</li>
              <li>The GBX will make a final decision after a series of reviews in line with the regulatory framework and successful token admissions will then be announced and approved for trading on the secondary market. With the GBX governance, the community is rewarded with another high quality token listing and with it, synergy and opportunities.</li>
            </ol>
          </div>
        </div>
      </div>
    </section>

    <!--<list-your-ico></list-your-ico>-->

  </div>
</template>

<script>
import ListYourIco from './ListYourIco.vue';

export default {
  name: 'About',
  data() {
    return {};
  },
  components: {
    ListYourIco,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
