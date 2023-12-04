<script>
import AllPostsComponent from "@/pages/AllPostsComponent.vue";

export default {
  components: {AllPostsComponent},

  name: "AllPostsModeratorComponent",
  data() {
    return {
      data: []
    }
  },
}
</script>

<template>
  <div>
    <AllPostsComponent/>
  </div>
</template>

<style scoped>

</style>