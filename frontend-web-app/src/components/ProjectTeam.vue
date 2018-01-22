<template>
  <div class="team-members row">
    <project-team-member-card v-for="member in teamMembers" :key="member.id" v-bind="member"></project-team-member-card>
  </div>
</template>

<script>
import ProjectTeamMemberCard from './ProjectTeamMemberCard.vue';

export default {
  name: 'ProjectTeam',
  data() {
    return {};
  },
  computed: {
    teamMembers() {
      return this.$store.state.listing.teamMembers;
    }
  },
  components: {
    ProjectTeamMemberCard,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
