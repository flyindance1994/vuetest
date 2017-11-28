<template>
  <div class="app_wrapper">
    <!-- head -->
    <head-top></head-top>
    <!-- main -->
    <div class="main_wrapper">
      <img src="../assets/logo.png">
      <h1 class="title">{{msg}}</h1>
    </div>
  </div>
</template>

<script>
import headTop from "./header/head";
export default {
  components: {
    headTop
  },
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.app_wrapper {
  background-color: #f2f2f2;
  .main_wrapper {
    .title {
      font-size: 1rem;
      color: #f00;
    }
  }
}
</style>
