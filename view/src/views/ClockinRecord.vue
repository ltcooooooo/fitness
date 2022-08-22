<template>
  <div id="record">
    <van-nav-bar
      title="打卡记录"
      left-text="返回"
      left-arrow
      @click-left="$router.back()"
    />
    <van-list
      v-model="loading"
      :finished="finished"
      :finished-text="list.length == 0 ? '还没有数据哦，赶紧开始运动吧' : '没有更多了'"
      @load="onLoad"
    >
      <van-cell
        v-for="item in list"
        :key="item.clockinTime"
        :title="`运动时间 ${item.movementTime} 分钟`"
        :value="item.clockinTime"
      />
    </van-list>
  </div>
</template>

<script>
import { getUserClickinData } from "@/api/admin";
export default {
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
    };
  },
  methods: {
    onLoad() {
      getUserClickinData().then((res) => {
        console.log("res.data.data", res.data.data);
        this.list = res.data.data;
        console.log("list", this.list);
        this.loading = false;
        this.finished = true;
      });
      // setTimeout(() => {
      //   for (let i = 0; i < 10; i++) {
      //     this.list.push(this.list.length + 1);
      //   }
      //   // 加载状态结束
      //   this.loading = false;
      //   // 数据全部加载完成
      //   if (this.list.length >= 40) {
      //     this.finished = true;
      //   }
      // }, 1000);
    },
  },
};
</script>

<style lang="scss" scoped>
#record {
  padding-bottom: 12.8205vw;
}
</style>