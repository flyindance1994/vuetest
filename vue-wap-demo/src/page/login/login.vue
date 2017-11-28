<template>
  <div class="container" :style="'height:'+wHeight+'px;'">
    <div class="logo">
      <svg class="qq">
        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#qq"></use>
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="position:absolute;width:0;height:0;visibility:hidden">
        <defs>
          <symbol viewBox="0 0 120 120" id="qq">
            <g>
              <g>
                <path fill="#F9AE08" d="M72.2,97c-6.2-1.3-9.6-1.7-11.4-1.8c-0.2,0-0.4,0-0.6,0c-0.3,0-0.5,0-0.6,0c-1.8,0.1-5.2,0.5-11.4,1.8
                  c-12.5,2.6-20.6,7.6-18,9.3c2.6,1.7,8.2,1.4,8.2,1.4l20.5,0.1l0,0l1.4,0l1.4,0l0,0l20.5-0.1c0,0,5.6,0.2,8.2-1.4
                  C92.8,104.6,84.6,99.6,72.2,97z"/>
                <path d="M90.7,52.8V40.6C90.7,23.7,77,10,60.1,10c-16.9,0-30.6,13.7-30.6,30.6v12.3C19,71.7,17.2,90.7,19.2,91.3
                  c1.1,0.4,5.3-4.9,8.7-9.5c2.3,14.4,14.7,25.4,29.7,25.4h4c15.4,0,28.2-11.6,29.9-26.6c3.5,4.8,8.3,11.1,9.6,10.7
                  C103,90.7,101.2,71.6,90.7,52.8z"/>
                <path fill="#FFFFFF" d="M75.2,59.1H45.1c-5,0-9,4-9,9v13.5c0,12.5,10.1,22.5,22.6,22.5h3c12.5,0,22.6-10.1,22.6-22.5V68.1
                  C84.2,63.2,80.1,59.1,75.2,59.1z"/>
                <path fill="#EA1C27" d="M90.7,52.7c0,0-12.2,4.3-30.2,4.3c-18,0-30.9-4.4-30.9-4.4l-3.1,6.3l-2,4.7c0,0,7.2,2.1,16.1,3.7v15.4h14
                  V69c2.1,0.2,4.3,0.2,6.4,0.2c16.6,0,34.8-5.9,34.8-5.9l-2-4.5L90.7,52.7z"/>
                <g>
                  <ellipse fill="#FFFFFF" cx="51.8" cy="30.1" rx="5" ry="8"/>
                  <ellipse fill="#FFFFFF" cx="68.4" cy="30.1" rx="5" ry="8"/>
                  <ellipse cx="53.2" cy="30.7" rx="2.5" ry="3.5"/>
                  <g>
                    <path d="M65.1,31.9c-0.1,0-0.3,0-0.4-0.1c-0.4-0.2-0.5-0.7-0.2-1c1-1.6,3.8-3.9,7.6-1.5c0.4,0.2,0.5,0.7,0.2,1
                      c-0.2,0.4-0.7,0.5-1,0.2c-3.5-2.2-5.4,0.9-5.5,1.1C65.6,31.8,65.4,31.9,65.1,31.9z"/>
                  </g>
                </g>
                <path fill="#F9AE08" d="M60.3,40.2c-0.1,0-0.1,0-0.2,0c-0.1,0-0.1,0-0.2,0c-4.6,0-18.2,1.3-18.2,3.8c0,2.5,10.9,6,18.2,6
                  c0.1,0,0.1,0,0.2,0c0.1,0,0.1,0,0.2,0c7.3,0,18.2-3.6,18.2-6C78.5,41.5,64.9,40.2,60.3,40.2z"/>
              </g>
            </g>
          </symbol>
        </defs>
      </svg>
    </div>
    <form class="login_form">
      <section class="input_container">
        <input type="text" placeholder="邮箱" autocomplete="off" v-model.lazy="userAccount">
      </section>
      <section class="input_container">
        <input v-if="!showPassword" type="password" placeholder="密码" autocomplete="off" v-model="passWord">
        <input v-else type="text" placeholder="密码" autocomplete="off" v-model="passWord">
        <div class="btn_switch" :class="{change_to_text: showPassword}">
          <div class="btn_switch_circel" :class="{trans_to_right: showPassword}" @click="changePassWordType"></div>
          <span>abc</span>&nbsp;
          <span>***</span>
        </div>
      </section>
    </form>
    <div class="btn_block" @click="loginSubmit">登录</div>
    <div class="login_to clear">
      <router-link class="left" to="/signup">还没有账号？立即注册</router-link>
      <router-link class="right" to="/forget">忘记密码</router-link>
    </div>
    <alert-tip v-if="showAlert" :showHide="showAlert" @closeTip="closeTip" :alertText="alertText"></alert-tip>
  </div>
</template>

<script>
import alertTip from "@/components/common/alertTip";
import { accountLogin } from "@/service/getData";
import { mapMutations } from "vuex";

export default {
  data() {
    return {
      wHeight: 0,
      userAccount: "admin@fusio.com.cn",
      passWord: "123456",
      showPassword: false,
      showAlert: false,
      alertText: ""
    };
  },
  components: {
    alertTip
  },
  mounted() {
    this.wHeight =
      document.documentElement.clientHeight || document.body.clientHeight;
  },
  methods: {
    changePassWordType() {
      this.showPassword = !this.showPassword;
    },
    async loginSubmit() {
      if (!this.userAccount) {
        this.showAlert = true;
        this.alertText = "请输入手机号/邮箱/用户名";
        return;
      } else if (!this.passWord) {
        this.showAlert = true;
        this.alertText = "请输入密码";
        return;
      }
      //用户名登录
      console.log(this.userAccount);
      console.log(this.passWord);

      // 哈咯，各位阅读文章的小伙伴，
      // 登录接口由于业务调整已经暂停，
      // 做到这里，可以注释，暂时当请求返回成功处理。
      // 晚些更新接口后，会再次更新文章内容。
      // 造成不便，十分抱歉。

      // 暂时注释
      // let response = await accountLogin(this.userAccount, this.passWord);
      // 开启这个模拟登录成功
      let response = {
        retCode: "10000",
        msg: "请求成功",
        data: {
          adminInfo:{
            email:"admin@fusio.com.cn"
          },
          tokenModel:{
            token:"123126473216213"
          }
        }
      };

      //如果返回的值不正确，则弹出提示框，返回的值正确则返回上一页
      if (response.retCode != "10000") {
        this.showAlert = true;
        this.alertText = response;
      } else {
        // 缓存用户数据（等下处理）
        let email = response.data.adminInfo.email;
        let token = response.data.tokenModel.token;
        this.$store.commit("SET_AUTH_INFO", [
          {
            email: email,
            token: token
          }
        ]);
        // 跳转到消息列表页
        this.$router.push({ path: "/messages" });
      }
    },
    closeTip() {
      this.showAlert = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  padding: 1rem;
  height: 100%;
  text-align: center;
  background-color: #a4e3ff;
  .logo {
    padding: 2rem 1rem 1rem;
    span {
      font-size: 1.4rem;
    }
  }
  .login_form {
    .input_container {
      display: flex;
      justify-content: space-between;
      padding: 0.6rem 0.8rem;
      background-color: #fff;
      border-bottom: 1px solid #f1f1f1;
      input {
        font-size: 0.7rem;
        color: #666;
        width: 100%;
      }
      button {
        font-size: 0.65rem;
        color: #fff;
        font-family: Helvetica Neue, Tahoma, Arial;
        padding: 0.28rem 0.4rem;
        border: 1px;
        border-radius: 0.15rem;
      }
      .right_phone_number {
        background-color: #4cd964;
      }
    }
  }
  .btn_switch {
    background-color: #ccc;
    display: flex;
    justify-content: center;
    width: 2.1rem;
    height: 1rem;
    padding: 0 0.2rem;
    border: 1px;
    border-radius: 0.5rem;
    position: relative;
    .btn_switch_circel {
      transition: all 0.3s;
      position: absolute;
      top: -0.1rem;
      left: -0.2rem;
      z-index: 1;
      width: 1.24rem;
      height: 1.24rem;
      box-shadow: 0 0.03rem 0.05rem 0 rgba(0, 0, 0, 0.1);
      background-color: #5cacf9;
      border-radius: 50%;
      cursor: pointer;
    }
    .trans_to_right {
      transform: translateX(1.4rem);
    }
    span {
      font-size: 0.4rem;
      line-height: 1rem;
      color: #fff;
    }
    span:nth-of-type(2) {
      transform: translateY(0.08rem);
    }
  }
  .btn_block {
    margin: 1rem 0;
    padding: 0.5rem 0;
    font-size: 0.7rem;
    color: #fff;
    background-color: #4eaaff;
    border: 1px;
    border-radius: 0.15rem;
    text-align: center;
  }
  .login_to {
    a {
      color: #666;
    }
  }
}
</style>