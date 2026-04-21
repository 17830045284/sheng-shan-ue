<script setup>
import {
  reservoirPrediction,
  inflowPrediction,
  efficiencyPrediction,
  loadPrediction,
  powerPrediction,
} from "@/view-charts/AllPredict";
import { computed } from "vue";
import { getImg } from "@/utils/assets";
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
const swiperMousewheelHorizontal = {
  ...swiperMousewheel,
  forceToAxis: false,
};

const activeWeather = ref(1);
const weaterList = [
  {
    id: 1,
    name: "白天",
    img: getImg("tq1.webp"),
    temperature: "24°",
  },
  {
    id: 2,
    name: "夜晚",
    img: getImg("tq2.webp"),
    temperature: "30°",
  },
  {
    id: 3,
    name: "雨天",
    img: getImg("tq3.webp"),
    temperature: "26°",
  },
  {
    id: 4,
    name: "雪天",
    img: getImg("tq4.webp"),
    temperature: "-5°",
  },
];
const currentWeater = computed(() => {
  return weaterList[activeWeather.value - 1];
});
const weekWeaterList = ref([
  {
    time: "07/23",
    value: "24°",
    rain: "1%",
  },
  {
    time: "07/23",
    value: "24°",
    rain: "1%",
  },
  {
    time: "07/23",
    value: "24°",
    rain: "1%",
  },
  {
    time: "07/23",
    value: "24°",
    rain: "1%",
  },
  {
    time: "07/23",
    value: "24°",
    rain: "1%",
  },
  {
    time: "07/23",
    value: "24°",
    rain: "1%",
  },
  {
    time: "07/23",
    value: "24°",
    rain: "1%",
  },
  {
    time: "07/23",
    value: "24°",
    rain: "1%",
  },
]);

const reservoirDataObj = reactive({
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
const option1 = reservoirPrediction(reservoirDataObj);

const inflowDataObj = reactive({
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
const option2 = inflowPrediction(inflowDataObj);

const efficiencyDataObj = reactive({
  line1Data: [2, 7, 8, 9, 10, 12, 13],
  line2Data: [8, 3, 6, 2, 3, 9, 5],
  line3Data: [6, 7, 4, 3, 3, 6, 8],
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
const option3 = efficiencyPrediction(efficiencyDataObj);

const loadDataObj = reactive({
  line1Data: [2, 7, 8, 9, 10, 12, 13],
  line2Data: [8, 3, 6, 2, 3, 9, 5],
  line3Data: [6, 7, 4, 3, 3, 6, 8],
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
const option4 = loadPrediction(loadDataObj);

const powerDataObj = reactive({
  line1Data: [2, 7, 8, 9, 10, 12, 13, 4, 3, 7, 6, 9],
  line2Data: [8, 3, 6, 2, 3, 9, 5, 3, 8, 4, 2, 5],
  line3Data: [6, 7, 4, 3, 3, 6, 8, 2, 6, 7, 2, 4],
  xPointData: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
});
const option5 = powerPrediction(powerDataObj);

const hydrologicalList = ref([
  {
    name: "库口水情站",
    curWater: "3.22",
    overWater: "449.85",
    futureWater: "3.22",
    overDistance: "距2.68",
  },
  {
    name: "坝下水情站",
    curWater: "3.22",
    overWater: "148.2",
    futureWater: "3.22",
    overDistance: "距2.68",
  },
  {
    name: "正坝水文站",
    curWater: "3.22",
    overWater: "7.95",
    futureWater: "3.22",
    overDistance: "距2.68",
  },
  {
    name: "库口水情站",
    curWater: "3.22",
    overWater: "449.85",
    futureWater: "3.22",
    overDistance: "距2.68",
  },
]);

</script>

<template>
  <kt-left style="grid-template-rows: 356fr 282fr 282fr">
    <kt-item type="19" title="气象预报" :px="0">
      <div class="w-full h-full px-0 pt-10">
        <div
          class="relative w-full h-[152px] flex justify-center items-center bg-[url('@/assets/img/weather_bg1.webp')] kt-bg-full overflow-hidden"
        >
          <span
            class="absolute top-[18px] left-[16px] w-[92px] h-[21px] bg-[url('@/assets/img/weather_top_bg1.webp')] kt-bg-full text-center leading-5 pl-[5px]"
            >2024-10-10</span
          >
          <div
            class="weather-center-card w-[305px] h-[76px] bg-[url('@/assets/img/weather_top_center.webp')] kt-bg-full flex justify-center items-center"
          >
            <img
              :src="currentWeater.img"
              class="w-63 h-63 mr-[50px] mt-[-10px]"
            />
            <p class="DINPro text-[28px]">
              {{ currentWeater.temperature }}
            </p>
          </div>
          <div
            class="flex justify-start pl-[12px] items-center w-[118px] h-[21px] bg-[url('@/assets/img/weather_top_bg2.webp')] kt-bg-full absolute bottom-[10px] left-[50px] text-[#B7E5FF] text-[14px] SourceHanSansCNRegular"
          >
            降雨量：
            <span class="text-[#fff] font-bold">0.1mm</span>
          </div>
          <div
            class="flex justify-start pl-[12px] items-center w-[118px] h-[21px] bg-[url('@/assets/img/weather_top_bg2.webp')] kt-bg-full absolute bottom-[10px] right-[50px] text-[#B7E5FF] text-[14px] SourceHanSansCNRegular"
          >
            湿度：
            <span class="text-[#fff] font-bold">87%</span>
          </div>
        </div>
        <div class="w-full h-[calc(100%-160px)] mt-[16px]">
          <div
            class="w-full h-[26px] flex justify-center items-center bg-[url('@/assets/img/weather_mid_bg.webp')] kt-bg-full SourceHanSansCNRegular text-[12px]"
          >
            一周天气预报
          </div>
          <div class="w-full h-[calc(100%-26px)]">
            <Swiper
              class="deform-swiper !h-full !pt-[0px]"
              :modules="swiperModules"
              direction="horizontal"
              :slides-per-view="7"
              :loop="weekWeaterList.length > 7"
              :speed="600"
              :autoplay="swiperAutoplay"
              :mousewheel="swiperMousewheelHorizontal"
              :allow-touch-move="true"
              :simulate-touch="true"
              :grab-cursor="true"
            >
              <SwiperSlide
                v-for="(row, idx) in weekWeaterList"
                :key="idx"
                class="!mr-[1px]"
              >
                <div
                  class="w-[45px] h-[107px] bg-[url('@/assets/img/weather_item_bg.webp')] kt-bg-full flex flex-col justify-center items-center"
                >
                  <span class="SourceHanSansCNRegular text-[12px]">{{
                    row.time
                  }}</span>
                  <span class="SourceHanSansCNRegular text-[14px] my-[8px]">{{
                    row.value
                  }}</span>
                  <span
                    class="SourceHanSansCNRegular text-[#B7E5FF] text-[10px] w-[37px] text-center"
                    >降雨量{{ row.rain }}</span
                  >
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </div>
    </kt-item>
    <kt-item type="18" title="库水位预报" :px="0">
      <div class="w-full h-full px-0 pt-10">
        <div class="w-full h-[100%]">
          <kt-echart :option="option1"></kt-echart>
        </div>
      </div>
    </kt-item>
    <kt-item type="18" title="入库流量预报" :px="0">
      <div class="w-full h-full px-0 pt-10">
        <div class="w-full h-[100%]">
          <kt-echart :option="option2"></kt-echart>
        </div>
      </div>
    </kt-item>
  </kt-left>
  <kt-right style="grid-template-rows: 244fr 320fr 358fr">
    <kt-item type="20" title="效率预报" :px="0">
      <div class="w-full h-full px-0 pt-10">
        <div class="w-full h-[100%]">
          <kt-echart :option="option3"></kt-echart>
        </div>
      </div>
    </kt-item>
    <kt-item type="21" title="负荷预报" :px="0">
      <div class="w-full h-full px-0 pt-10">
        <div class="w-full h-[100%]">
          <kt-echart :option="option4"></kt-echart>
        </div>
      </div>
    </kt-item>
    <kt-item type="19" title="发电预报" :px="0">
      <div class="w-full h-full px-0 pt-10">
        <div class="w-full h-[100%]">
          <kt-echart :option="option5"></kt-echart>
        </div>
      </div>
    </kt-item>
  </kt-right>
</template>

<style lang="less" scoped>
.weather-center-card {
  position: relative;
  isolation: isolate;
}

.weather-center-card::before,
.weather-center-card::after {
  content: "";
  position: absolute;
  left: 50%;
  top: 50%;
  width: 305px;
  height: 76px;
  transform: translate(-50%, -50%) scale(1);
  border-radius: 10px;
  background: url("@/assets/img/weather_top_center.webp") no-repeat center
    center;
  background-size: 100% 100%;
  opacity: 0;
  pointer-events: none;
  z-index: -1;
  animation: weatherCenterRipple 2200ms ease-out infinite;
}

.weather-center-card::after {
  animation-delay: 900ms;
}

@keyframes weatherCenterRipple {
  0% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0;
  }
  10% {
    opacity: 0.28;
  }
  100% {
    transform: translate(-50%, -50%) scale(1.18);
    opacity: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .weather-center-card::before,
  .weather-center-card::after {
    animation: none;
  }
}
</style>
