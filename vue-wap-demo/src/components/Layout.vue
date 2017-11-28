<template>
  <div class="app_wrapper">
    <!-- head -->
    <head-top></head-top>
    <!-- sidebar -->
    <sidebar></sidebar>
    <!-- main -->
    <div class="main_wrapper">
      <img src="../assets/logo.png">
      <h1 class="title">{{msg}}</h1>
    </div>
  </div>
</template>

<script>
import headTop from "./header/head";
import sidebar from "./sidebar/sidebar";
export default {
  components: {
    headTop,
    sidebar
  },
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
/*layout*/
.app_wrapper {
  overflow-x: hidden;
  .header {
    transition: all 0.28s ease-out;
    transform: translateX(13rem);
  }
  .sidebar {
    width: 13rem;
    transition: all 0.28s ease-out;
    transform: translate(0);
  }
  /*main_wrapper*/
  .main_wrapper {
    padding-top: 1.95rem;
    transition: all 0.28s ease-out;
    transform: translateX(13rem);
  }

  &.hideSidebar {
    .header {
      transform: translateX(0);
    }
    .sidebar {
      transform: translateX(-13rem);
    }
    .main_wrapper {
      transform: translateX(0);
    }
  }
}
</style>
