<template>
  <div id="page-faq" class="page">
    <contribution-status-bar></contribution-status-bar>
    <main class="page-content">
      <div class="container">
        <div class="row">
          <div class="col-xs-12">
            <h2 class="page-title">FAQ</h2>
          </div>
          <div class="col-xs-12">
            <div class="tab-contribute tab-content text-center">
              <div class="tab-text">
                <div class="faqs-wrapper text-left">
                  <div class="faq-block" v-for="item in faqArray">
                    <h3 class="faq-question">{{ item.question }}</h3>
                    <p class="faq-answer">{{ item.answer }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import ContributionStatusBar from './ContributionStatusBar.vue';
import ContributionNavBar from './ContributionNavBar.vue';

import * as faqArray from '../faq.json';

export default {
  name: 'Faq',
  data() {
    return {
        faqArray,
    };
  },
  components: {
    ContributionStatusBar,
    ContributionNavBar,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
