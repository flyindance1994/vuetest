<template>
  <div class="app_wrapper">
    <div class="main_wrapper">
      <h1 class="title">{{msg}}</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.app_wrapper{
  background-color: #f2f2f2;
}

.main_wrapper{
  font-size: 1rem;
  color:#f00;
}
</style>
