<template>
  <div id="faq-aside">
    <a :href="getContributionFile" target="_blank" class="purchase-guidance"><strong>Please read the RKT Purchase Guide</strong></a>
    <hr>
    <h4 class="aside-title">Frequently asked questions</h4>
    <div class="panel-group">
      <div v-for="(item, index) in faqArray" :key="index" class="panel panel-default">
        <div class="panel-heading" role="button" @click="toggleAccordion(index)">
          <h4 class="panel-title">{{ item.question }}
            <i class="fa fa-chevron-right" :class="{ 'fa-rotate-90': showAccordion[index] }"></i>
          </h4>
        </div>
        <collapse v-model="showAccordion[index]">
          <div class="panel-body" v-html="item.answer"></div>
        </collapse>
      </div>
    </div>
    <a v-if="faqExternalLink" :href="faqExternalLink" target="_blank" class="more-questions">See more questions</a>
    <!--<p><strong>Didn't find what you're looking for?</strong></p>-->
    <!--<p><router-link to="/ico/faq">Go to FAQ page <i class="fa fa-arrow-right"></i></router-link></p>-->
  </div>
</template>

<script>
  import * as faqArray from '../faq.json';

  export default {
    name: 'FaqAside',
    data () {
      return {
        faqArray,
        showAccordion: [],
        faqExternalLink: process.env.FAQ_PAGE_URL,
      }
    },
    computed: {
      getContributionFile() {
        if (process.env.PURCHASE_GUIDE_URL) {
          return process.env.PURCHASE_GUIDE_URL;
        }
        return require('../assets/files/Contribution-Dashboard.pdf'); 
      },
    },
    methods: {
      toggleAccordion (index) {
        if (this.showAccordion[index]) {
          this.$set(this.showAccordion, index, false)
        } else {
          this.showAccordion = this.showAccordion.map((v, i) => i === index)
        }
      },
      initializeAccordion () {
        this.showAccordion = faqArray.map((item, index) => false)
      }
    },
    mounted: function () {
      this.initializeAccordion();
    },
  }
</script>

<style scoped>
</style>
