<template>
    <section class="section registration-template">
        <div class="container">
            <div class="columns">
                <div class="column is-half is-mobile">
                    <slot></slot>
                </div>
                <div class="column relative-column is-half">
                    <img class="force-absolute-image" :src="require('../assets/img/wealthe-golden-coin.svg')" alt="Wealthe Migrate"/>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
  name: 'RegistrationTemplate',

  data() {
    return {
      contentElement: this.contentElement,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
