<script setup>
import { getImg } from "@/utils/assets";
import {
  alertPie,
  horizontalBar,
  payloadLine,
  predictLine,
  electricityBar,
  waterLine,
} from "@/view-charts/Home";
import router from "@/router/index.js";
import { useStore } from "@/store";
import { loadXLSX } from "@/utils/util";
import emitter from "@/utils/mitt";

const store = useStore();
store.isShowFeatureButton = true; // 解决 ue 调用按钮会闪的问题
const { hidePopup } = router.currentRoute.value.query;

if (hidePopup === "true") {
  store.isShowFeatureButton = false;
  store.isShowAlarm = false;
  store.isCollapsePanel = true;
  store.isShowBackButton = true;
  store.isHidePopup = true;
  // store.isShowSplitButton = true
}

// 数据总览
let allData = ref([
  {
    name: "机组数量",
    key: "groupNum",
    value: "",
    unit: "台",
  },
  {
    name: "总装机容量",
    key: "totalCapacity",
    value: "",
    unit: "kw",
  },
  {
    name: "安全运行",
    key: "safeRun",
    value: "",
    unit: "天",
  },
]);

// 发电统计
const electricityData = reactive({
  xAxisData: [],
  seriesData: [],
});
let electricityBarChart = ref("");
// 水位预测
const waterData = reactive({
  xAxisData: [],
  seriesData: [],
});
let waterOption = ref("");
// 社会效益
const socialEfficiencyData = ref([
  {
    title: "二氧化碳减排量",
    key: "CO2",
    value: "",
    unit: "kt",
  },
  {
    title: "节约标准煤碳量",
    key: "savingCoal",
    value: "",
    unit: "kt",
  },
  {
    title: "减少树木砍伐量",
    key: "treeCut",
    value: "",
    unit: "k",
  },
]);

// 故障诊断
const defaultObj = reactive({
  defaultGroupName: "",
  defaulTime: "",
  defaultDescription: "",
});

// 实时数据
let data1 = ref([
  {
    name: "总有功功率",
    value: 4000,
    key: "totalActivePower",
    unit: "kW",
  },
  {
    name: "总无功功率",
    key: "totalReactivePower",
    value: 2111,
    unit: "kVar",
  },
  {
    name: "前池水位",
    key: "poolWaterLevel",
    value: 162.8,
    unit: "m",
  },
  {
    name: "生态流量",
    key: "ecologyFlow",
    value: 0.23,
    unit: "m³/s",
  },
]);

let alertData = ref([
  {
    name: "一级警告",
    key: "level1",
    value: "",
    percent: "",
  },
  {
    name: "二级警告",
    key: "level2",
    value: "",
    percent: "",
  },
  {
    name: "三级警告",
    key: "level3",
    value: "",
    percent: "",
  },
  {
    name: "四级警告",
    key: "level4",
    value: "",
    percent: "",
  },
  {
    name: "五级警告",
    key: "level5",
    value: "",
    percent: "",
  },
]);
let option1 = ref("");
// 负荷水位
const payLoadDataObj = reactive({
  waterData: [],
  payLoadData: [],
  xPointData: [],
});
// const payLoadObj = computed(() => {
//   return {
//     xAxisData: ["01","02","03", "04", "05", "06", "07" ,"08","09","10","11", "12", "13", "14", "15","16","17","18","19", "20","21", "22", "23", "24"],
//     waterData: payLoadData.waterData.map(item => ({ series: "series1", value: item })),
//     payLoadData: payLoadData.payLoadData.map(item => ({ series: "series2", value: item }))
//   }
// })
let option3 = ref("");

// 发电预测
let predictData = reactive({
  plan: [],
  real: [],
  predict: [],
});
let option4 = ref("");
// 设备监测
const deviceDataObj = reactive({
  deviceTotal: "",
  onlineNum: "",
  defaultData: [],
  defaultName: [],
});
let option2 = ref("");
// let timer = setInterval(() => {
//   readData();
// }, 1 * 60 * 1000)

const handleData = (data) => {
  // console.log('ueData: ', data);
  data.forEach((item) => {
    switch (item.group) {
      case 1: //数据总览数据
        const curItem = allData.value.find((it) => it.key === item.key);
        curItem.value = item.value;
        break;
      case 2: //发电统计数据
        item.key === "xAxisData" &&
          (electricityData.xAxisData = JSON.parse(item.value));
        item.key === "seriesData" &&
          (electricityData.seriesData = JSON.parse(item.value));
        electricityBarChart.value = electricityBar(electricityData);
        break;
      case 3: //水位预测数据
        item.key === "xAxisData" &&
          (waterData.xAxisData = JSON.parse(item.value));
        item.key === "seriesData" &&
          (waterData.seriesData = JSON.parse(item.value));
        waterOption.value = waterLine(waterData);
        break;
      case 4: //社会效益数据
        const curData = socialEfficiencyData.value.find(
          (it) => it.key === item.key
        );
        curData.value = item.value;
        break;
      case 5: //故障诊断数据
        item.key === "defaultGroupName" &&
          (defaultObj.defaultGroupName = item.value);
        item.key === "defaultTime" && (defaultObj.defaulTime = item.value.replaceAll("\"", ""));
        item.key === "defaultDescription" &&
          (defaultObj.defaultDescription = item.value);
        break;
      case 6: //实时数据
        const curData1 = data1.value.find((it) => it.key === item.key);
        curData1.value = item.value;
        break;
      case 7: //智能告警
        const curItem1 = alertData.value.find((it) => it.key === item.key);
        curItem1.value = item.value;
        if (item.key === "level5") {
          const total = alertData.value.reduce(
            (acc, cur) => acc + +cur.value,
            0
          );
          alertData.value.forEach((it) => {
            it.percent = ((it.value / total) * 100).toFixed(0) + "%";
          });
          option1.value = alertPie(alertData.value);
        }
        break;
      case 8: //负荷水位
        item.key === "waterData" &&
          (payLoadDataObj.waterData = JSON.parse(item.value));
        item.key === "payLoadData" &&
          (payLoadDataObj.payLoadData = JSON.parse(item.value));
        item.key === "payLoadXpointData" &&
          (payLoadDataObj.xPointData = JSON.parse(item.value));
        option3.value = payloadLine(payLoadDataObj);
        break;
      case 9: //发电预测
        item.key === "plan" && (predictData.plan = JSON.parse(item.value));
        item.key === "real" && (predictData.real = JSON.parse(item.value));
        item.key === "predict" &&
          (predictData.predict = JSON.parse(item.value));
        option4.value = predictLine(predictData);
        break;
      case 10: //设备监测
        item.key === "deviceTotal" && (deviceDataObj.deviceTotal = item.value);
        item.key === "onlineNum" && (deviceDataObj.onlineNum = item.value);
        item.key === "defaultData" &&
          (deviceDataObj.defaultData = JSON.parse(item.value));
        item.key === "defaultName" &&
          (deviceDataObj.defaultName = JSON.parse(item.value));
        option2.value = horizontalBar({
          defaultData: deviceDataObj.defaultData,
          defaultName: deviceDataObj.defaultName,
        });
        break;
      case 11: // 诊断报告数据
        item.key === "reportTime" && (store.reportInfo.reportTime = item.value.replaceAll("\"", ""));
        item.key === "plantStation" &&
          (store.reportInfo.plantStation = item.value);
        item.key === "eventTime" && (store.reportInfo.eventTime = item.value.replaceAll("\"", ""));
        item.key === "eventObject" &&
          (store.reportInfo.eventObject = item.value);
        item.key === "eventType" && (store.reportInfo.eventType = item.value);
        item.key === "eventContent" &&
          (store.reportInfo.eventContent = item.value);
        item.key === "analysisReason" &&
          (store.reportInfo.analysisReason = item.value.replaceAll("\n", "<br>"));
        item.key === "checkSuggestion" &&
          (store.reportInfo.checkSuggestion = item.value.replaceAll("\n", "<br>"));
        break;
      case 12: // 报警数据信息
        item.key === "alarmData" && (store.alarmData = JSON.parse(item.value));
        break;
    }
  });
};
const readData = async () => {
  store.isShowAlarm = !store.isCollapsePanel;
  const { data } = await loadXLSX("/data.xlsx", "data");
  handleData(data);
};


onMounted(() => {
  readData();
  emitter.on('update:excelData', handleData);
});
</script>

<template>
  <kt-left style="grid-template-rows: 193fr 193fr 188fr 209fr 114fr">
    <kt-item type="6" title="数据总览" :px="18">
      <div class="w-full h-34 mt-10 flex justify-between">
        <img
          v-for="(_item, index) in 2"
          :key="index"
          class="w-140 h-full"
          :src="`${getImg(`data_img${index + 1}.webp`)}`"
        />
      </div>
      <div class="w-full flex justify-between">
        <div
          class="relative flex flex-col jusitfy-center items-center"
          v-for="(item, index) in allData"
        >
          <div class="w-89 h-50 relative">
            <img
              :src="getImg(`data_bg${index + 1}.webp`)"
              class="absolute w-50 h-full top-0 right-0"
            />
            <span
              class="absolute bottom-2 left-0 font-['SourceHanSansCN'] font-[500] text-[14px] text-[#F9FDFF] tracking-[1px]"
              >{{ item.name }}</span
            >
          </div>
          <span
            class="font-['WD-XL-Lubrifont-JP-N'] font-normal text-[24px] text-[#F9FDFF] value9 mr-2"
          >
            {{ item.value }}
            <span
              class="font-['SourceHanSansCN'] font-[500] text-[14px] text-[#F9FDFF] tracking-[1px]"
              >{{ item.unit }}</span
            >
          </span>
        </div>
      </div>
    </kt-item>
    <kt-item type="7" title="发电统计">
      <kt-echart
        :option="electricityBarChart"
        v-if="electricityBarChart"
      ></kt-echart>
    </kt-item>
    <kt-item type="8" title="水位预测">
      <kt-echart :option="waterOption" v-if="waterOption"></kt-echart>
    </kt-item>
    <kt-item type="9" title="社会效益" :px="12">
      <div
        class="mt-10 w-full h-41 relative kt-bg-full bg-[url('@/assets/img/social_bg.webp')] flex items-center justify-between"
        v-for="(item, index) in socialEfficiencyData"
        :key="index"
      >
        <span
          class="ml-70 font-['SourceHanSansCN'] font-normal text-[14px] text-[#FFF] tracking-[1px]"
          >{{ item.title }}</span
        >
        <span
          class="font-['WD-XL-Lubrifont-JP-N'] font-[400] mr-22 text-[20px] text-[#FFF] tracking-[1px]"
        >
          {{ item.value }}
          <span class="font-['SourceHanSansCN'] text-[14px] ml-2">{{
            item.unit
          }}</span>
        </span>
      </div>
    </kt-item>
    <kt-item type="10" title="故障诊断" :px="12">
      <div
        class="w-251 h-61 kt-bg-full bg-[url('@/assets/img/bg2.webp')] pl-10 font-['PangMenZhengDao'] font-normal"
      >
        <p class="text-[14px] text-[#FFF] tracking-[1px] mb-10">
          {{ defaultObj.defaultGroupName }}
        </p>
        <p
          class="text-[16px] text-[#FF5247]"
          style="
            text-shadow: 0px 0px 2px #0a90c9, 0px 0px 4px rgba(0, 0, 0, 0.91);
          "
        >
          {{ defaultObj.defaultDescription }}
        </p>
      </div>
      <span
        class="absolute top-5 right-10 font-['WD-XL-Lubrifont-JP-N'] font-normal text-[14px] text-[#FFF] tracking-[1px]"
        style="
          text-shadow: 0px 0px 2px #0a90c9, 0px 0px 4px rgba(0, 0, 0, 0.91);
        "
        >{{ defaultObj.defaulTime }}</span
      >
      <img
        src="../../assets/img/button.webp"
        class="w-105 h-30 absolute right-16 bottom-10 cursor-pointer"
        @click="store.isShowDiagnosticReport = true"
      />
    </kt-item>
  </kt-left>
  <kt-right style="grid-template-rows: 166fr 184fr 182fr 193fr 172fr">
    <kt-item type="1" title="实时数据">
      <ul class="w-full h-full flex justify-between flex-wrap">
        <li v-for="(item, index) in data1" :key="index" class="flex w-1/2 px-4">
          <img :src="getImg(`tb${index + 1}.webp`)" class="w-58 h-50" />
          <div class="ml-2">
            <p
              class="w-71 h-11 kt-bg-full bg-[url('@/assets/img/text_bg.webp')] relative mb-10"
            >
              <span
                class="absolute w-80 left-10 top-0 SourceHanSansCNRegular font-[500] text-[14px] text-[#F9FDFF] tracking-[1px]"
                >{{ item.name }}</span
              >
            </p>
            <p class="value1">
              <span class="text-[24px] Regular">{{ item.value }}</span>
              <span class="text-[14px] pl-5">{{ item.unit }}</span>
            </p>
          </div>
        </li>
      </ul>
    </kt-item>
    <kt-item type="2" title="智能告警">
      <div
        class="w-145 h-145 kt-bg-full bg-[url('@/assets/img/alarm.webp')] absolute kt-y-center left-10"
      ></div>
      <kt-echart :option="option1" v-if="option1"></kt-echart>
      <div class="w-183 h-120 absolute top-10 right-10 grid gap-5">
        <div
          class="w-183 h-16 kt-bg-full flex relative"
          v-for="(item, index) in alertData"
          :key="index"
          :style="{
            backgroundImage: `url(${getImg(`alarm_bg${index + 1}.webp`)})`,
          }"
        >
          <span
            class="absolute left-20 bottom-2 font-['SourceHanSansCN'] font-normal text-[12px] text-[#FFFFFFCC] tracking-[1px]"
            >{{ item.name }}</span
          >
          <p
            class="absolute bottom-2 right-0 w-1/3 font-['SourceHanSansCN'] font-bold text-[12px] text-[#F9FDFF] tracking-[1px] value9 flex justify-between items-center"
          >
            <span>{{ item.value }}</span>
            <span>{{ item.percent }}</span>
          </p>
        </div>
      </div>
    </kt-item>
    <kt-item type="3" title="负荷水位">
      <kt-echart :option="option3" v-if="option3"></kt-echart>
    </kt-item>
    <kt-item type="4" title="发电预测">
      <kt-echart :option="option4" v-if="option4"></kt-echart>
    </kt-item>
    <kt-item type="5" title="设备监测">
      <div class="w-full h-full flex">
        <div class="mt-10 ml-12 w-[150px]">
          <div class="flex w-full h-50 items-center">
            <img
              src="../../assets/img/device1.webp"
              class="w-[58px] h-[50px]"
            />
            <div>
              <p
                class="w-71 h-17 relative font-['WD-XL-Lubrifont-JP-N'] font-normal text-[22px] text-[#FFF] tracking-[1px] kt-bg-full bg-[url('@/assets/img/text_bg1.webp')]"
              >
                <span class="absolute left-10 bottom-0 value10">{{
                  deviceDataObj.deviceTotal
                }}</span>
              </p>
              <p
                class="font-['SourceHanSansCN'] font-[500] text-[14px] text-[ #F9FDFF] tracking-[1px] mt-2"
              >
                设备总数
              </p>
            </div>
          </div>
          <div
            class="mt-[10px] bg-[url('@/assets/img/device3.webp')] kt-bg-full w-[133px] h-[33px] flex items-center"
          >
            <span
              class="font-['SourceHanSansCN'] font-[500] text-[12px] text-[#F9FDFF] tracking-[1px] ml-4 mr-[11px]"
              >在线设备总数</span
            >
            <span
              class="font-['WD-XL-Lubrifont-JP-N'] font-normal text-[22px] text-[#fff] tracking-[1px]"
            >
              {{ deviceDataObj.onlineNum }}
            </span>
          </div>
        </div>
        <div class="flex-1 relative h-full">
          <div
            class="px-2 w-[51px] h-[19px] kt-bg-full bg-[url('@/assets/img/bt_bgt.webp')] absolute left-0 -top-2 flex items-center"
          >
            <span
              class="font-['SourceHanSansCN'] font-[500] text-[12px] text-[#F9FDFF] tracking-[1px]"
              >缺陷率</span
            >
          </div>
          <div class="mt-20 h-full">
            <kt-echart :option="option2" v-if="option2"></kt-echart>
          </div>
        </div>
      </div>
    </kt-item>
  </kt-right>
</template>

<style scoped>
.shadow {
  text-shadow: 0px 6px 4px #000c12, 0px 4px 4px #00151a;
}
</style>
