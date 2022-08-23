<template>
  <div id="login">
    <div class="content">
      <input
        type="text"
        placeholder="请输入你的名字"
        v-model="username"
        @input="username = username.replace(/[ ]/g, '')"
      />
      <input
        class="weight"
        type="text"
        :placeholder="weightShow ? '请输入你的体重' : ''"
        v-model="weight"
        :style="weightStyle"
        @input="weightInput"
      />
      <van-button type="info" style="border-radius: 2vw" @click="loginBtn"
        >登录</van-button
      >
    </div>
  </div>
</template>

<script>
import { login } from "@/api/api";
import { setToken, setUserInfo } from "@/utils/me";
export default {
  data() {
    return {
      username: "",
      weight: "",
      weightShow: false,
      weightStyle: { height: "0", border: "none" },
    };
  },
  methods: {
    weightInput() {
      if (this.weight.length >= 3) return this.weight = this.weight.slice(0,3)
      this.weight = this.weight.replace(/[ ]/g, "");
      this.weight = this.weight.replace(/^0/, "");
      this.weight = this.weight.replace(/\D/, "");
    },
    loginBtn() {
      //为输入用户名弹出提示
      if (!this.username)
        return this.Notify({ type: "warning", message: "请输入你的名字" });
      //未检测到用户，显示体重输入框
      if (!this.weightShow) {
        login(this.username).then((res) => {
          //请求成功
          if (res.data.status) {
            //检测是否有token，没有则为新用户
            if (!res.data.token) {
              this.Dialog.alert({
                title: "提示",
                message: "未检测到该用户，首次登陆请先输入你的体重",
              }).then((value) => {
                this.weightShow = true;
                this.weightStyle.border = "0.2564vw solid #ccc";
                this.weightStyle.height = "10vw";
              });
              //登陆成功
            } else {
              setToken(res.data.token);
              setUserInfo(res.data.user);
              this.$router.replace("/mine");
            }
          }
        });
      } else {
        if (!this.weight)
          return this.Notify({ type: "warning", message: "请输入你的体重" });
        login(this.username, this.weight).then((res) => {
          setToken(res.data.token);
          setUserInfo(res.data.user);
          this.$router.replace("/mine");
        });
      }
    },
  },
  watch: {
    // username(newValue, oldValue) {
    //   const str = newValue.replace(/\0/, "");
    //   console.log(str)
    // },
  },
};
</script>

<style scoped lang="scss">
#login {
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  .content {
    display: flex;
    flex-direction: column;
    input {
      margin: 0 auto;
      width: 50vw;
      height: 10vw;
      text-align: center;
      border-radius: 2vw;
      box-sizing: border-box;
      border: 0.2564vw solid #ccc;
      margin-bottom: 2.1282vw;
      padding: 0;
      transition: 0.5s;
    }
    .weight {
      transition: 0.5s;
    }
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none !important;
      margin: 0;
    }
    input[type="number"] {
      -moz-appearance: textfield;
    }
  }
}
</style>