<script setup>
import {
  horizontalPrediction,
  verticalPrediction,
  crackPrediction,
  seepagePrediction,
  stressPrediction,
  strainPrediction,
} from "@/view-charts/AllPredict";

const horizontalDataObj = reactive({
  YIPData: [2, 7, 8, 9, 10, 12, 13],
  ZIPData: [8, 4, 6, 1, 2, 3, 7],
  ZPL1Data: [10, 5, 2, 4, 6, 1, 7],
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
const option1 = horizontalPrediction(horizontalDataObj);

const verticalDataObj = reactive({
  YIPData: [2, 7, 8, 9, 10, 12, 13],
  ZIPData: [8, 4, 6, 1, 2, 3, 7],
  ZPL1Data: [10, 5, 2, 4, 6, 1, 7],
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
const option2 = verticalPrediction(verticalDataObj);

const crackDataObj = reactive({
  LF11Data: [2, 7, 8, 9, 10, 12, 13],
  LF16Data: [8, 4, 6, 1, 2, 3, 7],
  LF8Data: [10, 5, 2, 4, 6, 1, 7],
  WBH1Data: [3, 4, 5, 1, 7, 5, 2],
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
const option3 = crackPrediction(crackDataObj);

const seepageDataObj = reactive({
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
const option4 = seepagePrediction(seepageDataObj);

const stressDataObj = reactive({
  line1Data: [2, 7, 8, 9, 10, 12, 13],
  line2Data: [8, 3, 6, 2, 3, 9, 5],
  line3Data: [1, 5, 4, 4, 1, 5, 11],
  line4Data: [4, 9, 4, 3, 2, 5, 6],
  line5Data: [7, 4, 5, 8, 4, 8, 2],
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
const option5 = stressPrediction(stressDataObj);

const strainDataObj = reactive({
  SY1Data: [2, 7, 8, 9, 10, 12, 13],
  SY2Data: [8, 3, 6, 2, 3, 9, 5],
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
const option6 = strainPrediction(strainDataObj);
</script>

<template>
  <kt-left style="grid-template-rows: 282fr 282fr 356fr">
    <kt-item type="18" title="水平位移预报" :px="0">
      <div class="w-full h-full px-0 pt-10">
        <div class="w-full h-[100%]">
          <kt-echart :option="option1"></kt-echart>
        </div>
      </div>
    </kt-item>
    <kt-item type="18" title="垂直位移预报" :px="0">
      <div class="w-full h-full px-0 pt-10">
        <div class="w-full h-[100%]">
          <kt-echart :option="option2"></kt-echart>
        </div>
      </div>
    </kt-item>
    <kt-item type="19" title="裂缝预报" :px="0">
      <div class="w-full h-full px-0 pt-10">
        <div class="w-full h-[100%]">
          <kt-echart :option="option3"></kt-echart>
        </div>
      </div>
    </kt-item>
  </kt-left>
  <kt-right style="grid-template-rows: 282fr 282fr 356fr">
    <kt-item type="18" title="渗流量预报" :px="0">
      <div class="w-full h-full px-0 pt-10">
        <div class="w-full h-[100%]">
          <kt-echart :option="option4"></kt-echart>
        </div>
      </div>
    </kt-item>
    <kt-item type="18" title="应力预报" :px="0">
      <div class="w-full h-full px-0 pt-10">
        <div class="w-full h-[100%]">
          <kt-echart :option="option5"></kt-echart>
        </div>
      </div>
    </kt-item>
    <kt-item type="19" title="应变预报" :px="0">
      <div class="w-full h-full px-0 pt-10">
        <div class="w-full h-[100%]">
          <kt-echart :option="option6"></kt-echart>
        </div>
      </div>
    </kt-item>
  </kt-right>
</template>

<style lang="less" scoped></style>
