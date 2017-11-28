<template>
  <div class="masking" @click="toggleSideBar"></div>
</template>

<script>
  export default {
    methods: {
      toggleSideBar() {
        //暂时先注释，后面store之后那步再打开
        this.$store.dispatch('ToggleSideBar');
      },
    },
  }
</script>

<style lang="scss" scoped>
  /*masking*/
  .masking {
    display: block;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 100;
  }
</style>