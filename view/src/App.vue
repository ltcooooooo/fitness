<template>
  <div id="app">
    <router-view />
    <van-tabbar v-model="active" v-if="tableIsShow">
      <van-tabbar-item icon="wap-home">首页</van-tabbar-item>
      <van-tabbar-item>
        <span>打卡</span>
        <template #icon="props">
          <img :src="props.active ? icon.active : icon.inactive" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item icon="chat">讨论区</van-tabbar-item>
      <van-tabbar-item icon="manager">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
export default {
  data() {
    return {
      active: 0,
      hideTabbar: ["login","clockinRecord"],
      tableIsShow: true,
      icon: {
        active: require("../public/images/clockinActive.png"),
        inactive: require("../public/images/clockinInactive.png"),
      },
    };
  },
  watch: {
    active(value) {
      if (value == 0) {
        if (this.$route.name != "home") this.$router.push("/home");
      } else if (value == 1) {
        if (this.$route.name != "clockin") this.$router.push("/clockin");
      } else if (value == 2) {
        if (this.$route.name != "forum") this.$router.push("/forum");
      } else if (value == 3) {
        if (this.$route.name != "mine") this.$router.push("/mine");
      }
    },
    $route(to, form) {
      if (to.name == "home") this.active = 0;
      if (to.name == "clockin") this.active = 1;
      if (to.name == "forum") this.active = 2;
      if (to.name == "mine") this.active = 3;
      
      if (this.hideTabbar.some((item) => item == to.name)) {
        this.tableIsShow = false;
      } else {
        this.tableIsShow = true;
      }
    },
  },
};
</script>
<style lang="scss">
#app {
  margin: 0;
  padding: 0;
}
</style>
