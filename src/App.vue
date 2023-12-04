<template>
  <div >
<!--    <TopHeader v-if="this.$route.path !== '/login' && this.$route.path !== '/register' && this.$route.path !== '/moderator-login'">-->

<!--    </TopHeader>-->

    <router-view></router-view>

  </div>
</template>

<script>

// import HomeComponent from "@/pages/HomeComponent.vue";

// import TopHeader from "@/layouts/TopHeader.vue";

export default {
  name: 'App',

  // components: {TopHeader},
  // components: {HomeComponent},
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
