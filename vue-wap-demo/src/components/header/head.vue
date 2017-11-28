<template>
    <header class="header">
        <span class="head_toggle" @click="toggleSideBar">
            <img class="top_image" src="https://cn.bing.com/az/hprichbg/rb/GreatSaltLake_ZH-CN12553220159_1920x1080.jpg"/>
        </span>
        <span class="head_logo">logo</span>
    </header>
</template>

<script>
export default {
  methods: {
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar');
    }
  }
};
</script>

<style lang="scss" scoped>
/*header*/
.header {
  background-color: #3190e8;
  background: -webkit-linear-gradient(
    right top,
    #61b8f8,
    #5e8bf7
  ); /* Safari 5.1 - 6.0 */
  background: -o-linear-gradient(
    bottom left,
    #61b8f8,
    #5e8bf7
  ); /* Opera 11.1 - 12.0 */
  background: -moz-linear-gradient(
    bottom left,
    #61b8f8,
    #5e8bf7
  ); /* Firefox 3.6 - 15 */
  background: linear-gradient(to bottom left, #61b8f8, #5e8bf7); /* 标准的语法 */
  position: fixed;
  left: 0;
  top: 0;
  text-align: center;
  width: 100%;
  height: 1.95rem;
  z-index: 10;
  /*头像菜单按钮*/
  .head_toggle {
    position: absolute;
    left: 0.5rem;
    img {
      width: 1.5rem;
      height: 1.5rem;
      border-radius: 1rem;
      margin-top: 0.2rem;
    }
    i {
      line-height: 1.95rem;
      font-size: 1rem;
    }
  }
  /*文字*/
  .head_text {
    line-height: 1.95rem;
    font-size: 0.7rem;
    color: #fff;
    display: inline-block;
  }
}
</style>