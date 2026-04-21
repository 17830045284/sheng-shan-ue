<script setup lang="ts">
import { onMounted, Transition, watch } from "vue";
import autofit from "autofit.js";
import { useStore } from "@/store";
import { useRouter } from "vue-router";

const router = useRouter();
const store = useStore();
let alarmTimer = setInterval(
  () => {
    store.isShowAlarm = true;
  },
  16 * 60 * 1000,
);
onMounted(() => {
  autofit.init(
    {
      el: "#app-main", //默认是 "body" 支持所有 css 选择器 (推荐使用 id )
      dw: 1920,
      dh: 1080,
      resize: true, //默认是 true 关闭后无法自动计算拖动后的大小
    },
    false, // 默认是 false 检查autofit.js是否正在运行
  );
});
const isShowBtn = ref(false);
watch(
  () => router.currentRoute.value.path,
  (newPath) => {
    isShowBtn.value = newPath === '/home';
    store.setCurPath(newPath); // 确保 store.curPath 始终与路由同步
  },
  {
    immediate: true,
  },
);
</script>

<template>
  <div id="app-main">
    <!-- <kt-timer></kt-timer> -->
    <kt-head />
    <TransitionGroup name="slide-fade">
      <!-- <div class="w-450 h-full absolute top-0 left-0" v-if="!store.isCollapsePanel">
        <kt-info1 />
        <kt-info />
      </div> -->
    </TransitionGroup>
    <!-- 报警弹窗 -->
    <!-- <kt-alarm-container v-if="store.isShowAlarm" /> -->
    <kt-alarm-container v-if="false" />
    <!-- 返回按钮 -->
    <!-- <kt-back-button v-if="store.isShowBackButton && (store.isHidePopup || Object.keys(store.currentFeature).length || store.isClickAlarm)" /> -->
    <kt-back-button v-if="!isShowBtn" />
    <kt-assemble v-if="store.isShowSplitButton" />
    <kt-start v-if="store.showStart" />
    <!-- 上下蒙层 -->
    <img
      src="../../assets/img/bg_y.webp"
      class="w-full h-full pointer-events-none absolute top-0 left-0 -z-[1]"
    />
    <img
      src="../../assets/img/bg.webp"
      class="w-full h-full pointer-events-none"
      v-if="!store.isCollapsePanel"
    />
    <img
      src="../../assets/img/bottom_bg.webp"
      class="w-full h-22 absolute bottom-0 pointer-events-none"
    />
    <!-- 功能按钮 -->
    <kt-feature-button v-if="isShowBtn" />
    <router-view></router-view>
  </div>
</template>

<style scoped lang="less">
#app-main {
  height: 100%;
  width: 100%;
  position: relative;
  top: 0;
  left: 0;
  z-index: 2;
  // pointer-events: none;
}
</style>
