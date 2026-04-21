<script setup>
import {
  vibrationPrediction,
  temperaturePrediction,
  pressPrediction,
  wearPrediction,
  efficientPrediction,
} from "@/view-charts/AllPredict";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Mousewheel } from "swiper/modules";
import "swiper/css";

const swiperModules = [Autoplay, Mousewheel];
const swiperAutoplay = {
  delay: 2500,
  disableOnInteraction: false,
  pauseOnMouseEnter: true,
};
const swiperMousewheel = {
  forceToAxis: true,
  sensitivity: 0.6,
  thresholdDelta: 5,
};

const vibrationDataObj = reactive({
  line1Data: [2, 7, 8, 9, 10, 12, 13],
  line2Data: [8, 4, 6, 1, 2, 3, 7],
  line3Data: [10, 5, 2, 4, 6, 1, 7],
  xPointData: [
    "2025/7/20",
    "2025/7/21",
    "2025/7/22",
    "2025/7/23",
    "2025/7/24",
    "2025/7/25",
    "2025/7/26",
  ],
});
const option1 = vibrationPrediction(vibrationDataObj);

const temperatureDataObj = reactive({
  line1Data: [2, 7, 8, 9, 10, 12, 13],
  line2Data: [8, 4, 6, 1, 2, 3, 7],
  line3Data: [10, 5, 2, 4, 6, 1, 7],
  xPointData: [
    "2025/7/20",
    "2025/7/21",
    "2025/7/22",
    "2025/7/23",
    "2025/7/24",
    "2025/7/25",
    "2025/7/26",
  ],
});
const option2 = temperaturePrediction(temperatureDataObj);

const pressDataObj = reactive({
  line1Data: [2, 7, 8, 9, 10, 12, 13],
  line2Data: [8, 4, 6, 1, 2, 3, 7],
  xPointData: [
    "2025/7/20",
    "2025/7/21",
    "2025/7/22",
    "2025/7/23",
    "2025/7/24",
    "2025/7/25",
    "2025/7/26",
  ],
});
const option3 = pressPrediction(pressDataObj);

const wearDataObj = reactive({
  line1Data: [2, 7, 8, 9, 10, 12, 13],
  line2Data: [8, 4, 6, 1, 2, 3, 7],
  xPointData: [
    "2025/7/20",
    "2025/7/21",
    "2025/7/22",
    "2025/7/23",
    "2025/7/24",
    "2025/7/25",
    "2025/7/26",
  ],
});
const option4 = wearPrediction(wearDataObj);

const efficientDataObj = reactive({
  line1Data: [2, 7, 8, 9, 10, 12, 13],
  line2Data: [8, 3, 6, 2, 3, 9, 5],
  line3Data: [10, 5, 2, 4, 6, 1, 7],
  xPointData: [
    "2025/7/20",
    "2025/7/21",
    "2025/7/22",
    "2025/7/23",
    "2025/7/24",
    "2025/7/25",
    "2025/7/26",
  ],
});
const option5 = efficientPrediction(efficientDataObj);

const deformFirstRows = ref([
  {
    name: "推力轴承",
    curTime: "12,500h",
    setLife: "50,000h",
    remainingLife: "3.5年",
    state: "正常",
    color: "text-[#00FF73]",
  },
  {
    name: "水轮机转轮",
    curTime: "12,500h",
    setLife: "50,000h",
    remainingLife: "3.5年",
    state: "正常",
    color: "text-[#00FF73]",
  },
  {
    name: "发电机定子",
    curTime: "12,500h",
    setLife: "50,000h",
    remainingLife: "3.5年",
    state: "正常",
    color: "text-[#00FF73]",
  },
  {
    name: "推力轴承",
    curTime: "12,500h",
    setLife: "50,000h",
    remainingLife: "3.5年",
    state: "正常",
    color: "text-[#00FF73]",
  },
]);

const firstList = ref(1);
const secondList = ref(1);
const thirdList = ref(1);
const fourthList = ref(1);
</script>

<template>
  <kt-left style="grid-template-rows: 282fr 282fr 356fr">
    <kt-item type="18" title="振动预报" :px="0" :isOverHide="false">
      <div
        class="absolute top-[-35px] right-[-5px] flex items-center justify-end"
      >
        <span
          @click="firstList = 1"
          class="headItem mr-[4px]"
          :class="{ headItemActive: firstList === 1 }"
          >#1机组</span
        >
        <span
          @click="firstList = 2"
          class="headItem mr-[4px]"
          :class="{ headItemActive: firstList === 2 }"
          >#2机组</span
        >
        <span
          @click="firstList = 3"
          class="headItem"
          :class="{ headItemActive: firstList === 3 }"
          >#3机组</span
        >
      </div>
      <div class="w-full h-full px-0 pt-10">
        <div class="w-full h-[100%]">
          <kt-echart :option="option1"></kt-echart>
        </div>
      </div>
    </kt-item>
    <kt-item type="18" title="温度预报" :px="0" :isOverHide="false">
      <div
        class="absolute top-[-35px] right-[-5px] flex items-center justify-end"
      >
        <span
          @click="secondList = 1"
          class="headItem mr-[4px]"
          :class="{ headItemActive: secondList === 1 }"
          >#1机组</span
        >
        <span
          @click="secondList = 2"
          class="headItem mr-[4px]"
          :class="{ headItemActive: secondList === 2 }"
          >#2机组</span
        >
        <span
          @click="secondList = 3"
          class="headItem"
          :class="{ headItemActive: secondList === 3 }"
          >#3机组</span
        >
      </div>
      <div class="w-full h-full px-0 pt-10">
        <div class="w-full h-[100%]">
          <kt-echart :option="option2"></kt-echart>
        </div>
      </div>
    </kt-item>
    <kt-item type="19" title="压力预报" :px="0" :isOverHide="false">
      <div
        class="absolute top-[-35px] right-[-5px] flex items-center justify-end"
      >
        <span
          @click="thirdList = 1"
          class="headItem mr-[4px]"
          :class="{ headItemActive: thirdList === 1 }"
          >#1机组</span
        >
        <span
          @click="thirdList = 2"
          class="headItem mr-[4px]"
          :class="{ headItemActive: thirdList === 2 }"
          >#2机组</span
        >
        <span
          @click="thirdList = 3"
          class="headItem"
          :class="{ headItemActive: thirdList === 3 }"
          >#3机组</span
        >
      </div>
      <div class="w-full h-full px-0 pt-10">
        <div class="w-full h-[100%]">
          <kt-echart :option="option3"></kt-echart>
        </div>
      </div>
    </kt-item>
  </kt-left>
  <kt-right style="grid-template-rows: 282fr 303fr 337fr">
    <kt-item type="18" title="磨损预报" :px="0" :isOverHide="false">
      <div
        class="absolute top-[-35px] right-[-5px] flex items-center justify-end"
      >
        <span
          @click="fourthList = 1"
          class="headItem mr-[4px]"
          :class="{ headItemActive: fourthList === 1 }"
          >#1机组</span
        >
        <span
          @click="fourthList = 2"
          class="headItem mr-[4px]"
          :class="{ headItemActive: fourthList === 2 }"
          >#2机组</span
        >
        <span
          @click="fourthList = 3"
          class="headItem"
          :class="{ headItemActive: fourthList === 3 }"
          >#3机组</span
        >
      </div>
      <div class="w-full h-full px-0 pt-10">
        <div class="w-full h-[100%]">
          <kt-echart :option="option4"></kt-echart>
        </div>
      </div>
    </kt-item>
    <kt-item type="17" title="寿命预报" :px="0">
      <div class="w-full h-full px-0 pt-10">
        <div
          class="w-full h-46 bg-[#001D38]/[47%] grid grid-cols-[1.1fr_1.05fr_1fr_1.2fr_1fr] items-center text-[#EAF6FF] text-[12px] SourceHanSansCNRegular"
        >
          <div class="flex justify-center">设备名称</div>
          <div class="flex justify-center">已运行时间</div>
          <div class="flex justify-center">设计寿命</div>
          <div class="flex justify-center">预测剩余寿命</div>
          <div class="flex justify-center">健康状态</div>
        </div>
        <Swiper
          class="deform-swiper !h-[calc(100%-46px)] !pt-[10px]"
          :modules="swiperModules"
          direction="vertical"
          :slides-per-view="3"
          :loop="deformFirstRows.length > 3"
          :speed="600"
          :autoplay="swiperAutoplay"
          :mousewheel="swiperMousewheel"
          :allow-touch-move="true"
          :simulate-touch="true"
          :grab-cursor="true"
        >
          <SwiperSlide v-for="(row, idx) in deformFirstRows" :key="idx">
            <div
              class="w-full h-46 grid grid-cols-[1.1fr_1.05fr_1fr_1.2fr_1fr] items-center text-[#fff] text-[12px] SourceHanSansCNRegular bg-[url('@/assets/img/yuce_thItem_bg.webp')] kt-bg-full"
            >
              <div class="flex justify-center">{{ row.name }}</div>
              <div class="flex justify-center">{{ row.curTime }}</div>
              <div class="flex justify-center">{{ row.setLife }}</div>
              <div class="flex justify-center">{{ row.remainingLife }}</div>
              <div class="flex justify-center" :class="row.color">
                {{ row.state }}
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </kt-item>
    <kt-item type="22" title="效率预报" :px="0">
      <div class="w-full h-full px-0 pt-10">
        <div class="w-full h-[100%]">
          <kt-echart :option="option5"></kt-echart>
        </div>
      </div>
    </kt-item>
  </kt-right>
</template>

<style lang="less" scoped>
.headItem {
  width: 61px;
  height: 19px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  font-family: "SourceHanSansCNRegular";
  color: #dde5eb;
  cursor: pointer;
  background: url("@/assets/img/yuce_top_item.webp") no-repeat center center;
  background-size: 100% 100%;
  transition: all 0.2s ease-in-out;
}
.headItemActive {
  width: 61px;
  height: 19px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  font-family: "SourceHanSansCNRegular";
  cursor: pointer;
  background: url("@/assets/img/yuce_top_itemAct.webp") no-repeat center center;
  background-size: 100% 100%;
  color: #fff;
  transition: all 0.2s ease-in-out;
}
</style>
