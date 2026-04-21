<script setup>
import { getImg } from "@/utils/assets";

import router from "@/router/index.js";
import { useStore } from "@/store";
import { waterChangeLine } from "@/view-charts/Home";
import { sendToUE } from '@/ktJS/UE'
const store = useStore();
let showWaterChange = ref(false);
const data = ref([
  {
    id: 1,
    time: 48,
    title: "5年一遇洪水",
  },
  {
    id: 2,
    time: 48,
    title: "20年一遇洪水",
  },
  {
    id: 3,
    time: 48,
    title: "50年一遇洪水",
  },
  {
    id: 4,
    time: 48,
    title: "100年一遇洪水",
  },
]);
const buttonData = ["开始预演", "查看预案"];
let activeId = ref(0);
const handleButtonClick = (index, curItemId) => {
  activeId.value = curItemId;
  if (!index) {
    // 开始预演
    const ueOptions = {
      type: "water_start",
      data: {
        id: activeId.value + "级",
      },
    };
    // ue4("ueEvent", ueOptions);
    sendToUE('ueEvent', ueOptions)
    showWaterChange.value = true;
  } else {
    // 查看预案
    const ueOptions = {
      type: "feature_button",
      data: {
        id: "20",
        name: "预案",
      },
    };
    // ue4("ueEvent", ueOptions);
    sendToUE('ueEvent', ueOptions)
    store.setCurrentFeature({
      id: "20",
      name: "预案",
    });
  }
};

const rightButtonData = ["退出", "关闭预演"];
const handleRightButtonClick = (index) => {
  if (!index) {
    // 退出
    const ueOptions = {
      type: "back",
      data: {
        id: "16",
      },
    };
    // ue4("ueEvent", ueOptions);
    sendToUE('ueEvent', ueOptions)
    activeId.value = 0;
    router.push("/home"); // 页面刷新重定向至首页
    store.initAllData();
    store.clearPreviewDataObj();
    showWaterChange.value = false;
  } else {
    // 关闭预演
    const ueOptions = {
      type: "water_close",
      data: {
        id: activeId.value + "级",
      },
    };
    // ue4("ueEvent", ueOptions);
    sendToUE('ueEvent', ueOptions)
    showWaterChange.value = false;
  }
};

const prePlanButton = ["退出", "返回"];
const handlePreButton = (index) => {
  if (!index) {
    handleRightButtonClick(0);
  } else {
    const ueOptions = {
      type: "feature_button",
      data: {
        id: "19",
        name: "预演",
      },
    };
    // ue4("ueEvent", ueOptions);
    sendToUE('ueEvent', ueOptions)
    store.setCurrentFeature({
      id: "19",
      name: "预演",
    });
  }
};
const defaultData = [
  {
    id: 1,
    maxTime: "05:26:26",
  },
  {
    id: 2,
    maxTime: "16:32:23",
  },
  {
    id: 3,
    maxTime: "14:42:33",
  },
  {
    id: 4,
    maxTime: "12:22:22",
  },
];
let waterOption = ref("");
watch(
  () => activeId.value,
  (newValue, oldValue) => {
    if (newValue !== oldValue) {
      store.clearPreviewDataObj();
    }
    const item = defaultData.find((it) => it.id === newValue);
    const option = computed(() => {
      return {
        maxTime: item.maxTime,
        waterData: store.previewDataObj.waterData,
        flowRateData: store.previewDataObj.flowRateData,
      };
    });
    waterOption.value = waterChangeLine(option.value);
  }
);

watch(
  () => store.isShowAlarm,
  () => {
    store.isShowAlarm = false;
  },
  {
    immediate: true,
  }
);
const iframeBaseUrl = window._iframeBaseUrl;
let iframeUrl = ref("");
watch(
  () => store.currentFeature.id,
  (newValue, oldValue) => {
    if (newValue == "17") {
      iframeUrl.value = iframeBaseUrl + "/forecast";
    } else if (newValue == "18") {
      iframeUrl.value = iframeBaseUrl + "/forewarning";
    } else if (newValue == "20") {
      let url = "/prePlan1";
      if (activeId.value === 1) {
        url = "/prePlan1";
      } else if (activeId.value === 2) {
        url = "/prePlan2";
      } else if (activeId.value === 3) {
        url = "/prePlan3";
      } else if (activeId.value === 4) {
        url = "/prePlan4";
      }
      iframeUrl.value = iframeBaseUrl + url;
    } else {
      iframeUrl.value = "";
    }
    if (["17", "18", "20"].includes(newValue)) {
      showWaterChange.value = false;
      const ueOptions = {
        type: "water_close",
        data: {
          id: activeId.value + "级",
        },
      };
      // ue4("ueEvent", ueOptions);
      sendToUE('ueEvent', ueOptions)
    }
  },
  {
    immediate: true,
  }
);
watch(
  () => store.isCollapsePanel,
  (newValue) => {
    const msg = {
      isShow: !newValue,
    };
    let frame = document.querySelector("#Bframe").contentWindow; //用获取iframe
    frame.postMessage(msg, window._iframeBaseUrl);
  }
);
onMounted(() => {
  const msg = {
    isShow: !store.isCollapsePanel,
  };
  let frame = document.querySelector("#Bframe").contentWindow;
  frame.postMessage(msg, window._iframeBaseUrl);
});
</script>

<template>
  <div
    class="absolute z-[2] top-150 w-98 h-38 kt-flex cursor-pointer kt-bg-full bg-[url('@/assets/img/button_bg.webp')]"
    :style="{right: store.isCollapsePanel ? '20px' : '440px'}"
    @click="handleRightButtonClick(0)"
    v-if="['17', '18'].includes(store.currentFeature.id)"
  >
    <span class="font-['SourceHanSansCN'] font-bold text-[17px] value11"
      >退出</span
    >
  </div>
  <div
    class="flex flex-col items-end absolute top-112 right-20 z-[2]"
    v-if="store.currentFeature.id === '20'"
  >
    <div
      v-for="(item, index) in prePlanButton"
      :key="index"
      class="mb-10 w-98 h-38 kt-flex cursor-pointer kt-bg-full bg-[url('@/assets/img/button_bg.webp')]"
      @click="handlePreButton(index)"
    >
      <span class="font-['SourceHanSansCN'] font-bold text-[17px] value11">{{
        item
      }}</span>
    </div>
    <div
      class="relative w-504 h-313 kt-bg-full bg-[url('@/assets/img/water_bg.webp')] px-23 py-16"
      v-if="showWaterChange"
    >
      <div class="w-75 h-27 border-b-[1px] border-solid border-white">
        <span
          class="font-['SourceHanSansCN'] font-[500] text-[18px] text-[#FFFFFF]"
          >水情变化</span
        >
      </div>
      <div class="w-full h-1 bg-[#FFFFFF36]"></div>
      <div class="w-full h-242">
        <kt-echart :option="waterOption" v-if="waterOption" :animation="true" />
      </div>
    </div>
  </div>
  <div
    class="flex flex-col items-end absolute top-112 right-20"
    v-if="store.currentFeature.id === '19'"
  >
    <div
      v-for="(item, index) in rightButtonData"
      :key="index"
      class="mb-10 w-98 h-38 kt-flex cursor-pointer kt-bg-full bg-[url('@/assets/img/button_bg.webp')]"
      @click="handleRightButtonClick(index)"
    >
      <span class="font-['SourceHanSansCN'] font-bold text-[17px] value11">{{
        item
      }}</span>
    </div>
    <div
      class="relative w-504 h-313 kt-bg-full bg-[url('@/assets/img/water_bg.webp')] px-23 py-16"
      v-if="showWaterChange"
    >
      <div class="w-75 h-27 border-b-[1px] border-solid border-white">
        <span
          class="font-['SourceHanSansCN'] font-[500] text-[18px] text-[#FFFFFF]"
          >水情变化</span
        >
      </div>
      <div class="w-full h-1 bg-[#FFFFFF36]"></div>
      <div class="w-full h-242">
        <kt-echart :option="waterOption" v-if="waterOption" :animation="true" />
      </div>
    </div>
  </div>
  <div class="w-384 h-318 absolute top-100 left-20 z-[2]">
    <kt-item
      type="11"
      title="预演方案"
      :px="19"
      v-if="store.currentFeature.id === '19'"
    >
      <div
        v-for="item in data"
        :key="item.id"
        class="relative w-full h-54 mt-10 kt-bg-full bg-[url('@/assets/img/preview_item1.webp')]"
      >
        <span
          class="absolute top-1 left-2 font-['SourceHanSansCN'] font-normal text-[12px] text-[#F9FDFF]"
          >模拟时长{{ item.time }}h</span
        >
        <span
          class="absolute top-28 left-4 font-['SourceHanSansCN'] font-[500] text-[14px] text-[#F9FDFF]"
          >{{ item.title }}</span
        >
        <div class="absolute top-18 right-16 flex">
          <div
            v-for="(it, ind) in buttonData"
            :key="ind"
            :style="{
              backgroundImage: `url(${getImg(`button_${ind + 1}.webp`)})`,
            }"
            class="w-60 h-25 relative kt-bg-full cursor-pointer"
            @click="handleButtonClick(ind, item.id)"
          >
            <span
              class="absolute top-1 left-8 font-['SourceHanSansCN'] font-[500] text-[10px] text-[#F9FDFF]"
              >{{ it }}</span
            >
          </div>
        </div>
      </div>
    </kt-item>
  </div>
  <iframe
    id="Bframe"
    v-if="iframeUrl"
    :src="iframeUrl"
    class="w-full h-full absolute top-0 left-0 z-[1]"
  >
  </iframe>
</template>

<style scoped></style>
