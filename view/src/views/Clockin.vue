<template>
  <div id="clockin">
    <div>
      <div v-if="todayClock.isTrue">
        今日
        <span style="font-weight: 600">{{ todayClock.clockinTime }}</span>
        已打卡
      </div>
      <div v-if="todayClock.isTrue">
        今日运动时间：
        <span style="font-weight: 600; color: #2979ff">{{
          `${todayClock.movementTime} `
        }}</span
        >{{ todayClock.movementTime == "0" ? "" : "分钟" }}
      </div>
    </div>
    <div></div>
    <van-button
      class="clockIn"
      type="info"
      size="large"
      :text="todayClock.isTrue ? '更新打卡' : '打 卡'"
      block
      round
      @click="startClockIn"
    />
    <div></div>
    <div></div>
    <div></div>
    <van-popup v-model="popupShow" style="border-radius: 2vw">
      <div class="popupContent">
        <van-picker
          style="width: 80vw"
          title="今日运动时间(分钟)"
          show-toolbar
          :columns="timeList"
          @confirm="onConfirm"
          @cancel="popupShow = false"
        />
      </div>
    </van-popup>
  </div>
</template>

<script>
import { clockin } from "@/api/admin";
import { todayIsMovement } from "@/utils/me";
export default {
  data() {
    return {
      active: 0,
      popupShow: false,
      timeList: [],
      todayClock: {
        isTrue: false,
        clockinTime: "",
        movementTime: "",
      },
    };
  },
  methods: {
    onConfirm(value) {
      clockin(value).then((res) => {
        if (res.data.status) {
          console.log(res.data.data);
          this.popupShow = false;
          this.Notify({ type: "success", message: "打卡成功" });
          todayIsMovement().then((res) => {
            if (!res) return;
            this.todayClock.clockinTime = res.clockinTime;
            this.todayClock.movementTime = res.movementTime;
            this.todayClock.isTrue = true;
          });
        }
      });
    },
    startClockIn() {
      this.popupShow = true;
    },
  },
  created() {
    todayIsMovement().then((res) => {
      if (!res) return;
      this.todayClock.clockinTime = res.clockinTime;
      this.todayClock.movementTime = res.movementTime;
      this.todayClock.isTrue = true;
    });
    for (let i = 5; i <= 200; i += 5) {
      this.timeList.push(i);
    }
  },
};
</script>

<style lang="scss" scoped>
#clockin {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 100vh;
  .clockIn {
    width: 50vw;
    height: 50vw;
    font-size: 7.6923vw;
  }
}
</style>