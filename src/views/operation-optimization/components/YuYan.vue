<script setup>
import { useStore } from "@/store/index.js";
import { getImg } from "@/utils/assets";
import {
  waterRegimeLine,
  loadLine,
  powerLine,
} from "@/view-charts/OpenRehearsal";
const store = useStore();

const rehearsalPlans = ref([
  {
    id: "1",
    time: "48h",
    title: "丰水期最大化发电",
  },
  {
    id: "2",
    time: "48h",
    title: "枯水期优化调度",
  },
  {
    id: "3",
    time: "48h",
    title: "防洪与发电平衡",
  },
]);
function openRehearsal() {
  store.isOpenRehearsal = true;
}
function gotoYuAn() {
  store.isOpenRehearsal = false;
  store.setCurrentFeature({
    id: "10",
    name: "预案",
  });
}

const waterRegimeDataObj = reactive({
  waterData: [
    2, 7, 8, 9, 10, 12, 13, 15, 14, 15, 2, 3, 15, 3, 5, 2, 8, 5, 2, 9, 12, 10,
    5, 7, 9,
  ],
  flowRateData: [
    110, 20, 50, 80, 60, 15, 21, 35, 41, 98, 56, 12, 28, 36, 45, 56, 66, 71, 80,
    88, 12, 10, 5, 7, 9,
  ],
  xPointData: [
    "4",
    "8",
    "12",
    "16",
    "20",
    "24",
    "24",
    "28",
    "32",
    "36",
    "40",
    "44",
    "48",
  ],
});
const option1 = waterRegimeLine(waterRegimeDataObj);
const loadDataObj = reactive({
  waterData: [
    2, 7, 8, 9, 10, 12, 13, 15, 14, 15, 2, 3, 15, 3, 5, 2, 8, 5, 2, 9, 12, 10,
    5, 7, 9,
  ],
  flowRateData: [
    110, 20, 50, 80, 60, 15, 21, 35, 41, 98, 56, 12, 28, 36, 45, 56, 66, 71, 80,
    88, 12, 10, 5, 7, 9,
  ],
  xPointData: [
    "4",
    "8",
    "12",
    "16",
    "20",
    "24",
    "24",
    "28",
    "32",
    "36",
    "40",
    "44",
    "48",
  ],
});
const option2 = loadLine(loadDataObj);
const powerDataObj = reactive({
  waterData: [
    2, 7, 8, 9, 10, 12, 13, 15, 14, 15, 2, 3, 15, 3, 5, 2, 8, 5, 2, 9, 12, 10,
    5, 7, 9,
  ],
  xPointData: [
    "4",
    "8",
    "12",
    "16",
    "20",
    "24",
    "24",
    "28",
    "32",
    "36",
    "40",
    "44",
    "48",
  ],
});
const option3 = powerLine(powerDataObj);
// console.log('option3',option3);
</script>

<template>
  <kt-left style="grid-template-rows: 280fr 692fr">
    <kt-item type="12" title="预演方案" :px="0">
      <div class="w-full h-full flex flex-col justify-around items-center">
        <div
          class="w-356 h-54 bg-[url('@/assets/img/rehearsal_plan_bg.webp')] relative flex items-center justify-end pr-10"
          v-for="(item, index) in rehearsalPlans"
          :key="index"
        >
          <span
            class="SourceHanSansCNRegular kt-bg-full pl-5 text-[12px]/[20px] absolute top-0 left-0 w-102 h-20 bg-[url('@/assets/img/rehearsal_plan_title.webp')]"
            >模拟时长{{ item.time }}</span
          >
          <span
            class="SourceHanSansCNRegular kt-bg-full absolute bottom-3 left-0 pl-5 text-[14px]"
            >{{ item.title }}</span
          >
          <span @click="openRehearsal" class="openBtn">开始预演</span>
          <span @click="gotoYuAn" class="openBtn">查看预案</span>
        </div>
      </div>
    </kt-item>
  </kt-left>
  <Transition name="bounce">
    <kt-right v-if="store.isOpenRehearsal">
      <div
        class="w-506 p-20 pt-10 pb-10 h-315 absolute top-[26%] right-[-13px] translate-y-[-50%] kt-bg-full bg-[url('@/assets/img/rehearsal_plan_pop.webp')]"
      >
        <div class="w-25 h-25 absolute right-5 top-4 cursor-pointer">
          <img
            :src="getImg(`close.webp`)"
            class="w-full h-full"
            @click="store.isOpenRehearsal = false"
          />
        </div>
        <div class="w-full border-b-2 border-[rgb(255,255,255,0.2)]">
          <span
            class="pt-5 pb-5 SourceHanSansCNRegular text-[18px] color-[#fff] border-b-2 border-[rgb(255,255,255,1)]"
            >水情变化</span
          >
        </div>
        <div class="w-full h-[85%]">
          <kt-echart :option="option1"></kt-echart>
          <span
            class="absolute right-45 bottom-20 text-[10px] SourceHanSansCNRegular"
            style="color: rgba(255, 255, 255, 0.8)"
            >(时)</span
          >
        </div>
      </div>
      <div
        class="w-506 p-20 pt-10 pb-10 h-265 absolute top-[57%] right-[-13px] translate-y-[-50%] kt-bg-full bg-[url('@/assets/img/rehearsal_plan1_pop.webp')]"
      >
        <div class="w-25 h-25 absolute right-5 top-4 cursor-pointer">
          <img
            :src="getImg(`close.webp`)"
            class="w-full h-full"
            @click="store.isOpenRehearsal = false"
          />
        </div>
        <div class="w-full border-b-2 border-[rgb(255,255,255,0.2)]">
          <span
            class="pt-5 pb-5 SourceHanSansCNRegular text-[18px] color-[#fff] border-b-2 border-[rgb(255,255,255,1)]"
            >负荷变化</span
          >
        </div>
        <div class="w-full h-[85%]">
          <kt-echart :option="option2"></kt-echart>
          <span
            class="absolute right-30 bottom-15 text-[10px] SourceHanSansCNRegular"
            style="color: rgba(255, 255, 255, 0.8)"
            >(时)</span
          >
        </div>
      </div>
      <div
        class="w-506 p-20 pt-10 pb-10 h-265 absolute top-[85%] right-[-13px] translate-y-[-50%] kt-bg-full bg-[url('@/assets/img/rehearsal_plan1_pop.webp')]"
      >
        <div class="w-25 h-25 absolute right-5 top-4 cursor-pointer">
          <img
            :src="getImg(`close.webp`)"
            class="w-full h-full"
            @click="store.isOpenRehearsal = false"
          />
        </div>
        <div class="w-full border-b-2 border-[rgb(255,255,255,0.2)]">
          <span
            class="pt-5 pb-5 SourceHanSansCNRegular text-[18px] color-[#fff] border-b-2 border-[rgb(255,255,255,1)]"
            >发电变化</span
          >
        </div>
        <div class="w-full h-[85%]">
          <kt-echart :option="option3"></kt-echart>
          <span
            class="absolute right-30 bottom-15 text-[10px] SourceHanSansCNRegular"
            style="color: rgba(255, 255, 255, 0.8)"
            >(时)</span
          >
        </div>
      </div>
    </kt-right>
  </Transition>
  <div
    v-if="store.isOpenRehearsal"
    class="w-706 h-54 absolute left-[50%] translate-x-[-50%] bottom-100"
  >
    <img class="w-full h-full" :src="getImg(`video_play.webp`)" alt="" />
  </div>
</template>

<style lang="less" scoped>
.openBtn {
  font-family: "SourceHanSansCNRegular";
  width: 68px;
  height: 27px;
  background: url("@/assets/img/rehearsal_plan_item.webp") no-repeat center
    center;
  background-size: 100% 100%;
  cursor: pointer;
  margin-top: 5px;
  text-align: center;
  font-size: 10px;
  line-height: 20px;
  transition: all 0.2s ease-in-out;
}
.openBtn:hover {
  background: url("@/assets/img/rehearsal_plan_active.webp") no-repeat center
    center;
}
</style>
