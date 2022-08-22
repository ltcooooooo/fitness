<template>
  <div id="mine">
    <div class="userInfo">
      <div class="name">{{ user.name }}</div>
      <div class="info">
        <div>
          体重：<span style="font-weight: 600; color: #ff1744">{{
            user.weight
          }}</span>
        </div>
        <div>
          今日运动时间：<span style="font-weight: 600; color: #2979ff">{{
            `${user.movementTime} ${user.movementTime == "0" ? "" : "分钟"}`
          }}</span>
        </div>
      </div>
    </div>
    <div class="function">
      <div class="item" @click="goRecord">打卡记录</div>
      <div class="quit" @click="quit">退出登录</div>
    </div>
  </div>
</template>

<script>
import { getUserInfo, todayIsMovement, clearUser } from "@/utils/me";
export default {
  data() {
    return {
      user: {
        name: "",
        weight: "",
        movementTime: "0",
      },
    };
  },
  methods: {
    quit() {
      clearUser();
      this.$router.replace("/login");
    },
    goRecord() {
      this.$router.push("/clockinRecord");
    },
  },
  created() {
    this.user.name = getUserInfo().name;
    this.user.weight = getUserInfo().weight;
    todayIsMovement().then((res) => {
      if (!res) return;
      this.user.movementTime = res.movementTime;
    });
  },
};
</script>

<style lang="scss" scoped>
#mine {
  .userInfo {
    display: flex;
    align-items: center;
    height: 20vw;
    width: 90vw;
    margin: 0 auto;
    border-bottom: 1px solid #ccc;
    .name {
      height: 100%;
      padding: 0 5vw;
      width: 18.3846vw;
      line-height: 20vw;
      font-weight: 800;
      font-size: 5.1282vw;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      text-align: center;
    }
    .info {
      display: flex;
      height: 100%;
      justify-content: center;
      flex-direction: column;
      align-items: flex-start;
      div {
        margin: 0.2vw 0;
      }
    }
  }
  .function {
    margin-top: 10vw;
    div {
      display: flex;
      align-items: center;
      margin: 4vw auto;
      width: 84vw;
      padding: 0 3vw;
      height: 12vw;
      border-radius: 2vw;
      box-shadow: 0 3px 2px 2px #eaecf0;
    }
    .quit {
      justify-content: center;
      background-color: #ff1744;
      color: #fff;
      box-shadow: 0 3px 2px 0px #ca0930;
    }
  }
}
</style>