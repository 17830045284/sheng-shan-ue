<script setup>
import { computed } from "vue";
import { getImg } from "@/utils/assets";
import { useStore } from "@/store";
import { useRouter, useRoute } from "vue-router";
const router = useRouter();

const store = useStore();

const { width: windowWidth, height: windowHeight } = useWindowSize();

// 计算“有效设计高度”：基于 1920 宽度将当前窗口比例映射回设计尺寸
const effectiveDesignHeight = computed(() => {
  if (windowWidth.value === 0) return 1080;
  // 公式：设计宽度(1920) / 当前窗口宽高比
  return (1920 * windowHeight.value) / windowWidth.value;
});

// 中间导航宽度计算：1920*911下为480，1920*1080下为405
const middleNavWidth = computed(() => {
  const h = effectiveDesignHeight.value;
  // 线性公式: width = 480 - 75 * (h - 911) / 169
  const w = 480 - (75 * (h - 911)) / 169;
  return Math.round(Math.max(407, Math.min(500, w))); // 限制范围
});

// 侧边导航总宽度计算：1920*911下为1570，1920*1080下为1315
const sideNavWidth = computed(() => {
  const h = effectiveDesignHeight.value;
  // 线性公式: width = 1570 - 255 * (h - 911) / 169
  const w = 1570 - (255 * (h - 911)) / 169;
  // 限制最小宽度以避免窄屏下过度收缩
  return Math.round(Math.max(1315, Math.min(1800, w)));
});

let sceneList = ref([]);
sceneList.value = [
  {
    id: "7",
    name: "预警",
  },
  {
    id: "8",
    name: "预测",
  },
  {
    id: "9",
    name: "预演",
  },
  {
    id: "10",
    name: "预案",
  },
];
const leftNav = ref([
  {
    id: "1",
    path: "/building-structure",
    name: "建筑物结构安全",
  },
  {
    id: "2",
    path: "/ecological-regulation",
    name: "生态调控",
  },
]);
const rightNav = ref([
  {
    id: "3",
    path: "/operation-optimization",
    name: "运行优化",
  },
  {
    id: "4",
    path: "/electromechanical-equipment",
    name: "机电设备状态监测",
  },
]);
// 获取星期几
function getWeek() {
  var now = new Date();
  var week = now.getDay();
  switch (week) {
    case 0:
      return "星期日";
    case 1:
      return "星期一";
    case 2:
      return "星期二";
    case 3:
      return "星期三";
    case 4:
      return "星期四";
    case 5:
      return "星期五";
    case 6:
      return "星期六";
  }
}

const { now, pause, resume } = useNow({ controls: true });
const time1 = ref(useDateFormat(now, "HH:mm:ss"));
const time2 = ref(useDateFormat(now, "YYYY.MM.DD"));
const time3 = ref(getWeek());

function handleOut() {
  const ueOptions = {
    type: "user_out",
    data: {},
  };
  ue4("ueEvent", ueOptions);
}
const activeWeather = ref(1);
const isShowWeather = ref(false);

const weaterList = [
  {
    id: 1,
    name: "白天",
    img: getImg("tq1.webp"),
    temperature: "36℃",
  },
  {
    id: 2,
    name: "夜晚",
    img: getImg("tq2.webp"),
    temperature: "30℃",
  },
  {
    id: 3,
    name: "雨天",
    img: getImg("tq3.webp"),
    temperature: "26℃",
  },
  {
    id: 4,
    name: "雪天",
    img: getImg("tq4.webp"),
    temperature: "-5℃",
  },
];

function showWeather() {
  isShowWeather.value = !isShowWeather.value;
}

const currentWeater = computed(() => {
  return weaterList[activeWeather.value - 1];
});

function handleWeater(item) {
  activeWeather.value = item.id;
  const ueOptions = {
    type: "weather",
    data: {
      id: item.id,
      name: item.name,
    },
  };
  ue4("ueEvent", ueOptions);
}

function collapsePanel() {
  if (store.bootStatus) return;
  store.setCollapsePanel(!store.isCollapsePanel);
  store.isShowAlarm = !store.isCollapsePanel;
}
function handleSceneClick(item) {
  const it = {
    id: item.id,
    name: item.name,
  };
  ue4('ueEvent', it)
  console.log('发送了ue信息',);
  store.isOpenRehearsal = false;
  store.setCurrentFeature(it);
}
function routerTpNew(params) {
  store.isOpenRehearsal = false;
  store.isShowFeatureButton = false;
  store.setCurPath(params.path);
  store.setCurrentFeature({
    id: "7",
    name: "预警",
  });
  ue4('ueEvent', {
    id: "7",
    name: "预警",
  })
  console.log('发送了ue信息');
  router.push(params.path);
}

// watch(() => router.currentRoute.value.path, (to) => {
//   store.curPath = to
// }, {
//   immediate: true
// })
</script>

<template>
  <div
    class="absolute w-full h-[108px] bg-[url(@/assets/img/head2.webp)] kt-bg-full pointer-events-auto text-[22px] z-[50]"
  >
    <!-- 时间 -->
    <p
      class="w-150 absolute top-16 left-135 flex justify-center items-center font-['PangMenZhengDao'] font-normal text-[26px] text-[#BFDFFF] value6"
    >
      {{ time1 }}
    </p>
    <!-- <p class="border-[#57B8FF] border-l-2 px-30 ls Regular">
      {{ time2 }}
    </p>
    <p
      class="border-[#57B8FF] border-l-2 px-30 text-[20px] SourceHanSansCNRegular"
    >
      {{ time3 }}
    </p> -->
    <div class="flex right-19 top-18 absolute items-center">
      <div class="flex relative mr-0 w-190 items-center -mt-5">
        <!-- <p class="mr-10 SourceHanSansCNRegular pt-3">
          天气：{{ currentWeater.name }}
        </p> -->
        <img
          :src="currentWeater.img"
          class="w-37 h-37 absolute right-100 top-1/2 -translate-y-1/2 cursor-pointer"
          @click="showWeather()"
        />
        <!-- <Transition name="bounce">
          <ul
            v-if="isShowWeather"
            class="w-253 h-75 z-[10] absolute bg-[url(@/assets/img/tq_kuang.webp)] kt-bg-full top-34 left-22 flex justify-around px-5"
          >
            <li
              class="w-39 cursor-pointer flex flex-col items-center"
              @click="handleWeater(item)"
              v-for="(item, index) in weaterList"
              :key="index"
            >
              <img :src="item.img" class="w-37 h-37 mt-10" />
              <span class="!text-[16px]">{{ item.name }}</span>
            </li>
            <img
              src="../../assets/img/active_tq.png"
              :class="[
                'w-39 h-70 absolute bottom-0 transition-all duration-300',
                `actiev-${activeWeather}`,
              ]"
            />
          </ul>
        </Transition> -->
        <p class="ml-100 SourceHanSansCNRegular pt-5">
          {{ currentWeater.temperature }}
        </p>
      </div>
      <img
        src="../../assets/img/toggle.webp"
        class="w-39 h-39 cursor-pointer mr-10"
        @click="collapsePanel"
      />
      <img
        src="../../assets/img/out.webp"
        class="w-39 h-39 cursor-pointer"
        @click="handleOut()"
      />
    </div>
  </div>
  <!-- <div
  class="flex justify-around items-center kt-x-center top-90  w-661 h-40 kt-bg-full bg-[url('@/assets/img/head_bg.webp')] px-90 z-[2]" 
  v-if="store.isShowHeadButton">
    <div
    class="w-96 h-27 kt-bg-full flex justify-center cursor-pointer"
    v-for="item in sceneList"
    :key="item.id"
    :style="{backgroundImage: store.currentFeature.id === item.id? `url(${getImg('button_active.webp')})`: ''}"
    @click="handleSceneClick(item)"
    >
      <span class="font-['Source_Han_Sans_CN'] font-[500] text-[18px] text-[#CEEAFD]">{{ item.name }}</span>
    </div>
  </div> -->

  <!-- 两边导航 -->
  <div
    v-if="store.curPath !== '/home'"
    class="h-42 top-42 flex justify-between items-center kt-x-center z-[51]"
    :style="{ width: sideNavWidth + 'px' }"
  >
    <div class="flex items-center w-[50%]">
      <div
        class="w-146 h-35 bg-[url(@/assets/img/head-left.webp)] kt-bg-full flex justify-center items-center cursor-pointer"
        v-for="item in leftNav"
        :key="item.id"
        :style="{
          backgroundImage:
            store.curPath === item.path
              ? `url(${getImg('head-left-active.webp')})`
              : '',
        }"
        @click="routerTpNew(item)"
      >
        <span
          class="font-['Source_Han_Sans_CN'] font-[500] text-[14px] text-[#CEEAFD]"
          >{{ item.name }}</span
        >
      </div>
    </div>
    <div class="flex justify-end items-center w-[50%]">
      <div
        class="w-146 h-35 bg-[url(@/assets/img/head-right.webp)] kt-bg-full flex justify-center items-center cursor-pointer"
        v-for="item in rightNav"
        :key="item.id"
        :style="{
          backgroundImage:
            store.curPath === item.path
              ? `url(${getImg('head-right-active.webp')})`
              : '',
        }"
        @click="routerTpNew(item)"
      >
        <span
          class="font-['Source_Han_Sans_CN'] font-[500] text-[14px] text-[#CEEAFD]"
          >{{ item.name }}</span
        >
      </div>
    </div>
  </div>

  <!-- 中间导航 -->
  <div
    v-if="store.curPath !== '/home'"
    class="w-[37.5%] h-[42px] bg-[url(@/assets/img/head_center_bg.webp)] kt-bg-full kt-x-center top-[83px] z-[51]"
  ></div>
  <div
    v-if="store.curPath !== '/home'"
    class="flex justify-around items-center kt-x-center top-105 h-42 z-[20] bg-[url(@/assets/img/head_center_item.webp)] kt-bg-full"
    :style="{ width: middleNavWidth + 'px' }"
  >
    <!-- head-rect.webp -->
    <div
      class="w-88 h-29 bg-[url(@/assets/img/head-rect.webp)] kt-bg-full flex justify-center cursor-pointer"
      v-for="item in sceneList"
      :key="item.id"
      :style="{
        backgroundImage:
          store.curPath !== '/home' && store.currentFeature.id === item.id
            ? `url(${getImg('head-rect-active.webp')})`
            : '',
      }"
      @click="handleSceneClick(item)"
    >
      <span
        class="font-['Source_Han_Sans_CN'] font-[500] text-[18px] text-[#CEEAFD]"
        >{{ item.name }}</span
      >
    </div>
  </div>
</template>

<style scoped>
.ls {
  letter-spacing: 0.2ch;
}
.actiev-1 {
  transform: translateX(-234%);
}
.actiev-2 {
  transform: translateX(-80%);
}
.actiev-3 {
  transform: translateX(76%);
}
.actiev-4 {
  transform: translateX(235%);
}
</style>
