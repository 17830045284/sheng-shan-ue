<script setup>
import { getImg } from "@/utils/assets";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Mousewheel } from "swiper/modules";
import { floodLine } from "@/view-charts/OpenRehearsal";
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

const deformFirstRows = ref([
  {
    name: "无预警 (3h降雨量<50mm)",
    number: 0,
    bg: "rain_bg1.webp",
    itemBg: "rain_item1.webp",
    lamp: "rain_icon1.webp",
  },
  {
    name: "红色预警 (3h降雨量<50mm)",
    number: 0,
    bg: "rain_bg2.webp",
    itemBg: "rain_item2.webp",
    lamp: "rain_icon2.webp",
  },
  {
    name: "橙色预警 (3h降雨量<50mm)",
    number: 0,
    bg: "rain_bg3.webp",
    itemBg: "rain_item3.webp",
    lamp: "rain_icon3.webp",
  },
  {
    name: "黄色预警 (3h降雨量<50mm)",
    number: 0,
    bg: "rain_bg4.webp",
    itemBg: "rain_item4.webp",
    lamp: "rain_icon4.webp",
  },
  {
    name: "蓝色预警 (3h降雨量<50mm)",
    number: 0,
    bg: "rain_bg5.webp",
    itemBg: "rain_item5.webp",
    lamp: "rain_icon5.webp",
  },
]);
const deformSecondRows = ref([
  {
    station: "芙蓉江站",
    river: "芙蓉江",
    waterLevel: "3.24",
    exceed: "距3.24",
    level: "正常",
    levelClass: "text-[#00FF73]",
  },
  {
    station: "芙蓉江站",
    river: "芙蓉江",
    waterLevel: "3.24",
    exceed: "距3.24",
    level: "正常",
    levelClass: "text-[#00FF73]",
  },
  {
    station: "芙蓉江站",
    river: "芙蓉江",
    waterLevel: "3.24",
    exceed: "距3.24",
    level: "正常",
    levelClass: "text-[#00FF73]",
  },
  {
    station: "芙蓉江站",
    river: "芙蓉江",
    waterLevel: "3.24",
    exceed: "距3.24",
    level: "正常",
    levelClass: "text-[#00FF73]",
  },
  {
    station: "芙蓉江站",
    river: "芙蓉江",
    waterLevel: "3.24",
    exceed: "距3.24",
    level: "正常",
    levelClass: "text-[#00FF73]",
  },
  {
    station: "芙蓉江站",
    river: "芙蓉江",
    waterLevel: "3.24",
    exceed: "距3.24",
    level: "正常",
    levelClass: "text-[#00FF73]",
  },
]);
const yuJingMessage = ref([
  {
    name: "暴雨预警",
    img: "yujing_mes_item_04.webp",
    size: [29, 35],
    top: 8,
    number: 3,
  },
  {
    name: "河道预警",
    img: "yujing_mes_item_05.webp",
    size: [28, 30],
    top: 10,
    number: 3,
  },
  {
    name: "电站预警",
    img: "yujing_mes_item_06.webp",
    size: [27, 29],
    top: 10,
    number: 3,
  },
]);
const yuJingRiskRegister = ref([
  {
    time: "2024-09-11 15:00:00",
    name: "电站预警",
    warm: "水位过低",
    state: 1,
  },
  {
    time: "2024-09-11 15:00:00",
    name: "电站预警",
    warm: "水位过低",
    state: 1,
  },
  {
    time: "2024-09-11 15:00:00",
    name: "电站预警",
    warm: "温度过高",
    state: 1,
  },
  {
    time: "2024-09-11 15:00:00",
    name: "电站预警",
    warm: "橙色",
    state: 2,
  },
  {
    time: "2024-09-11 15:00:00",
    name: "电站预警",
    warm: "水位过低",
    state: 1,
  },
  {
    time: "2024-09-11 15:00:00",
    name: "电站预警",
    warm: "水位过低",
    state: 1,
  },
]);
const yuJingRiskPublic = ref([
  {
    name: "何春圣",
    type: "区域预警责任人",
  },
  {
    name: "张勇",
    type: "区域预警责任人",
  },
  {
    name: "张志连",
    type: "区域预警责任人",
  },
]);

const firstPop = ref(false);

const warnMessage = ref("");

const warnLevelOptions = [
  { label: "高", value: "major" },
  { label: "中", value: "large" },
  { label: "低", value: "normal" },
];
const warnLevel = ref("");
const warnLevelOpen = ref(false);
const warnLevelDropdownEl = ref(null);
const warnLevelLabel = computed(() => {
  return (
    warnLevelOptions.find((o) => o.value === warnLevel.value)?.label ||
    "请选择预警级别"
  );
});

const notifyChannel = ref("sms");

function toggleWarnLevelOpen() {
  warnLevelOpen.value = !warnLevelOpen.value;
}

function selectWarnLevel(value) {
  warnLevel.value = value;
  warnLevelOpen.value = false;
}

function onDocClick(e) {
  const el2 = warnLevelDropdownEl.value;
  if (el2 && !el2.contains(e.target)) warnLevelOpen.value = false;
}

onMounted(() => {
  document.addEventListener("click", onDocClick, true);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", onDocClick, true);
});



const waterDataObj = reactive({
  waterData: [
    2, 7, 8, 9, 10, 12, 13, 15, 14, 15, 2, 3, 15, 3, 5, 2, 8, 5, 2, 9, 12, 10,
    5, 7,
  ],
  flowRateData: [
    10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
  ],
  xPointData: Array.from({ length: 24 }, (_, i) => String(i + 1)),
});
const option1 = floodLine(waterDataObj);
</script>

<template>
  <kt-left style="grid-template-rows: 342fr 303fr 282fr">
    <kt-item type="16" title="暴雨预警" :px="0">
      <div class="w-full h-full px-0 pt-0">
        <Swiper
          class="deform-swiper !h-full !pt-[0px]"
          :modules="swiperModules"
          direction="vertical"
          :slides-per-view="5"
          :loop="deformFirstRows.length > 5"
          :speed="600"
          :autoplay="swiperAutoplay"
          :mousewheel="swiperMousewheel"
          :allow-touch-move="true"
          :simulate-touch="true"
          :grab-cursor="true"
        >
          <SwiperSlide v-for="(row, idx) in deformFirstRows" :key="idx">
            <div class="w-full h-50 flex justify-between items-center relative">
              <img
                :src="getImg(row.bg)"
                class="w-[342px] h-[37px] absolute right-0 bottom-0"
                alt=""
              />
              <div class="z-10 flex justify-center items-center">
                <div
                  class="mt-[5px] w-[56px] h-[51px] kt-bg-full mr-[10px] flex items-center justify-center"
                  :style="{
                    background: `url(${getImg(row.itemBg)})`,
                  }"
                >
                  <img class="mt-[-10px]" :src="getImg(row.lamp)" alt="" />
                </div>
                <div class="pt-[15px] text-[14px] color-[#FFF9F9] SourceHanSansCNRegular">
                  {{ row.name }}
                </div>
              </div>
              <div
                class="pt-[15px] pr-[20px] z-10 text-[12px] color-[#FCFCFC] SourceHanSansCNRegular"
              >
                <span class="z-10 mr-[5px] text-[22px] color-[#FCFCFC] Regular">{{
                  row.number
                }}</span
                >个
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </kt-item>
    <kt-item type="17" title="河道预警" :px="0">
      <div class="w-full h-full px-0 pt-10">
        <div
          class="w-full h-34 bg-[#001D38]/[47%] grid grid-cols-[0.95fr_0.9fr_0.7fr_1.1fr_0.8fr] items-center text-[#EAF6FF] text-[12px] SourceHanSansCNRegular"
        >
          <div class="flex justify-center">站名</div>
          <div class="flex justify-center">河流</div>
          <div class="flex justify-center">水位(m)</div>
          <div class="flex justify-center">超(距)汛限(m)</div>
          <div class="flex justify-center">预警状态</div>
        </div>
        <Swiper
          class="deform-swiper !h-[calc(100%-40px)] !pt-[10px]"
          :modules="swiperModules"
          direction="vertical"
          :slides-per-view="5"
          :loop="deformSecondRows.length > 5"
          :speed="600"
          :autoplay="swiperAutoplay"
          :mousewheel="swiperMousewheel"
          :allow-touch-move="true"
          :simulate-touch="true"
          :grab-cursor="true"
        >
          <SwiperSlide v-for="(row, idx) in deformSecondRows" :key="idx">
            <div
              class="w-full h-32 grid grid-cols-[0.95fr_0.9fr_0.7fr_1.1fr_0.8fr] items-center text-[#fff] text-[12px] SourceHanSansCNRegular bg-[url('@/assets/img/yujing_seItem_bg.webp')] kt-bg-full"
            >
              <div class="flex justify-center">{{ row.station }}</div>
              <div class="flex justify-center">{{ row.river }}</div>
              <div class="flex justify-center">{{ row.waterLevel }}</div>
              <div class="flex justify-center">{{ row.exceed }}</div>
              <div
                class="flex justify-center font-[600]"
                :class="row.levelClass"
              >
                {{ row.level }}
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </kt-item>
    <kt-item type="18" title="防淹曲线" :px="0">
      <div class="w-full h-full px-0 pt-10">
        <div class="w-full h-[100%]">
          <kt-echart :option="option1"></kt-echart>
          <span
            class="absolute right-0 bottom-10 text-[10px] SourceHanSansCNRegular"
            style="color: rgba(255, 255, 255, 0.8)"
            >(时)</span
          >
          <span class="writing-mode-vertical SourceHanSansCNRegular">警戒水位</span>
        </div>
      </div>
    </kt-item>
  </kt-left>
  <kt-right style="grid-template-rows: 270fr 300fr 375fr">
    <kt-item type="12" title="预警信息" :px="0">
      <div class="w-full h-full px-0 pt-10">
        <div
          class="w-[360px] h-[37px] border-[1px] border-[#0071C0] rounded-[50px] flex items-center justify-center"
        >
          <div
            class="w-[354px] h-[31px] kt-bg-full bg-[url('@/assets/img/yujing_mes_bg.webp')] bg-cover flex justify-between items-center"
          >
            <div class="ml-[2px] flex justify-between items-center">
              <img
                class="w-[27px] h-[27px] mr-[10px]"
                :src="getImg(`yujing_mes_ring.webp`)"
                alt=""
              />
              <span class="SourceHanSansCNRegular text-[14px]"
                >近30天预警总数：</span
              >
            </div>
            <div
              class="mr-[27px] flex justify-between items-center text-[12px] SourceHanSansCNRegular"
            >
              <span class="text-[22px] Regular mr-[5px]">5</span>
              次
            </div>
          </div>
        </div>
        <div class="w-full flex justify-around items-center">
          <div
            v-for="(item, idx) in yuJingMessage"
            :key="idx"
            class="flex flex-col items-center justify-center"
            :style="{ '--delay': `${idx * 0.12}s` }"
          >
            <div
              class="yujing-msg-card mt-[20px] relative bg-[url('@/assets/img/yujing_mes_item_bg.webp')] kt-bg-full w-[70px] h-[62px] flex justify-center items-center"
            >
              <img
                class="yujing-msg-icon absolute w-[32px] h-[35px]"
                :style="{
                  top: `${item.top}px`,
                  width: `${item.size[0]}px`,
                  height: `${item.size[1]}px`,
                }"
                :src="getImg(item.img)"
                alt=""
              />
            </div>
            <div
              class="mt-[10px] text-[14px] flex justify-center items-center SourceHanSansCNRegular bg-[url('@/assets/img/yujing_mes_bottom.webp')] h-[23px] kt-bg-full"
              :style="{
                width: `${idx === 2 ? 97 : 70}px`,
              }"
            >
              {{ item.name }}
            </div>
            <div
              class="mt-[0px] flex justify-between items-center text-[12px] SourceHanSansCNRegular"
            >
              <span class="text-[22px] Regular mr-[5px]">{{
                item.number
              }}</span>
              次
            </div>
          </div>
        </div>
      </div>
    </kt-item>
    <kt-item type="14" title="风险清单" :px="0">
      <div class="w-full h-full px-0 pt-10">
        <Swiper
          class="deform-swiper !h-[calc(100%-10px)]"
          :modules="swiperModules"
          direction="vertical"
          :slides-per-view="5"
          :space-between="0"
          :loop="yuJingRiskRegister.length > 5"
          :speed="600"
          :autoplay="swiperAutoplay"
          :mousewheel="swiperMousewheel"
          :allow-touch-move="true"
          :simulate-touch="true"
          :grab-cursor="true"
        >
          <SwiperSlide
            v-for="(item, index) in yuJingRiskRegister"
            class="!pt-[15px]"
            :key="index"
          >
            <div
              class="flex justify-around items-center w-[360px] h-[21px] kt-bg-full pb-[20px]"
              :style="{
                backgroundImage: `url(${getImg('yujing_riskRegister_bg.webp')})`,
              }"
            >
              <div class="Regular text-[14px]">{{ item.time }}</div>
              <div
                class="SourceHanSansCNRegular text-[14px] w-[100px] flex justify-center"
              >
                {{ item.name }}
              </div>
              <div
                class="text-center w-[108px] h-[24px] px-[5px] pt-[2px] SourceHanSansCNRegular text-[12px] kt-bg-full overflow-hidden whitespace-nowrap text-ellipsis"
                :style="{
                  backgroundImage: `url(${getImg(
                    item.state === 1
                      ? 'yujing_riskRegister_item1.webp'
                      : 'yujing_riskRegister_item2.webp',
                  )})`,
                }"
              >
                {{ item.warm }}
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </kt-item>
    <kt-item type="15" title="预警发布" :px="0">
      <div
        class="cursor-pointer z-[10] absolute right-[5px] top-[0px] text-[14px] text-[#F9FDFF] bg-[url('@/assets/img/yujing_RiskPublic_more.webp')] kt-bg-full w-[71px] h-[17px] flex justify-center items-center SourceHanSansCNRegular"
      >
        更多
      </div>
      <div class="w-full h-full px-0 pt-5">
        <Swiper
          class="deform-swiper !h-[calc(100%-10px)]"
          :modules="swiperModules"
          direction="vertical"
          :slides-per-view="3"
          :space-between="0"
          :loop="yuJingRiskPublic.length > 3"
          :speed="600"
          :autoplay="swiperAutoplay"
          :mousewheel="swiperMousewheel"
          :allow-touch-move="true"
          :simulate-touch="true"
          :grab-cursor="true"
        >
          <SwiperSlide
            v-for="(item, index) in yuJingRiskPublic"
            class="!pt-[15px]"
            :key="index"
          >
            <div
              class="flex justify-between items-center w-full h-[84px] px-[10px]"
            >
              <div>
                <img
                  class="w-[67px] h-[84px] kt-bg-full"
                  :src="getImg('yujing_RiskPublic_img.webp')"
                  alt=""
                />
              </div>
              <div
                class="w-[261px] h-[82px] kt-bg-full bg-[url('@/assets/img/yujing_RiskPublic_item.webp')] flex justify-between items-center"
              >
                <div
                  class="flex flex-col justify-center items-start pl-[15px] w-[calc(100%-80px)] h-full SourceHanSansCNRegular"
                >
                  <span class="text-[14px] mb-[10px]">{{
                    item.name
                  }}</span>
                  <span class="text-[14px]"
                    >类别：{{ item.type }}</span
                  >
                </div>
                <div @click="firstPop = true" class="send-btn">发送预警</div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </kt-item>
  </kt-right>
  <transition name="bounce">
    <div
      v-if="firstPop"
      class="absolute left-[50%] translate-x-[-50%] top-[50%] translate-y-[-0%] w-[416px] h-[285px] bg-[url('@/assets/img/yujing_pop-bg.webp')] p-20 pt-15 pb-10 z-[50]"
    >
      <div class="w-25 h-25 absolute right-5 top-4 cursor-pointer">
        <img
          :src="getImg(`close.webp`)"
          class="w-full h-full"
          @click="firstPop = false"
        />
      </div>
      <div class="w-full border-b-2 border-[rgb(255,255,255,0.2)]">
        <span
          class="pt-5 pb-5 SourceHanSansCNRegular text-[18px] color-[#fff] border-b-2 border-[rgb(255,255,255,1)]"
          >发送预警</span
        >
      </div>
      <div
        class="w-[95%] h-[90%] m-auto pt-[10px] flex flex-col justify-around"
      >
        <div class="flex items-center w-full">
          <span
            class="w-85 flex items-center SourceHanSansCNRegular text-[14px] text-white"
          >
            <span class="text-[#FF3B30] mr-4">*</span>预警信息：
          </span>
          <input
            v-model="warnMessage"
            class="flex-1 h-36 border border-white bg-[#04121f] rounded px-10 bg-transparent text-[#fff] text-[14px] SourceHanSansCNRegular outline-none placeholder:text-white/60"
            placeholder="请输入预警信息"
          />
        </div>

        <div class="flex items-center w-full">
          <span
            class="w-85 flex items-center SourceHanSansCNRegular text-[14px] text-white"
          >
            <span class="text-[#FF3B30] mr-4">*</span>预警级别：
          </span>
          <div ref="warnLevelDropdownEl" class="flex-1 relative h-36">
            <button
              type="button"
              class="w-full h-full border border-white bg-[#04121f] rounded pl-10 pr-15 bg-transparent text-[#fff] text-[14px] SourceHanSansCNRegular flex items-center justify-between"
              @click="toggleWarnLevelOpen"
            >
              <span :class="warnLevel ? 'text-[#fff]' : 'text-white/60'">{{
                warnLevelLabel
              }}</span>
              <img
                :src="getImg('conPla_arrow.webp')"
                :class="[
                  'w-14 h-7 pointer-events-none transition-transform duration-200',
                  warnLevelOpen ? 'rotate-180' : '',
                ]"
              />
            </button>
            <transition name="dropdown">
              <ul
                v-if="warnLevelOpen"
                class="absolute left-0 top-[calc(100%+6px)] w-full border border-white/40 rounded bg-[#04121f] overflow-hidden z-[50]"
              >
                <li
                  v-for="opt in warnLevelOptions"
                  :key="opt.value"
                  class="h-36 px-16 flex items-center text-[14px] SourceHanSansCNRegular text-[#fff] cursor-pointer hover:bg-white/10"
                  @click="selectWarnLevel(opt.value)"
                >
                  {{ opt.label }}
                </li>
              </ul>
            </transition>
          </div>
        </div>

        <div class="flex items-center w-full">
          <span
            class="w-85 flex items-center SourceHanSansCNRegular text-[14px] text-white"
          >
            <span class="text-[#FF3B30] mr-4">*</span>发送方式：
          </span>
          <div class="flex-1 flex items-center gap-16">
            <label class="flex items-center cursor-pointer select-none">
              <input
                v-model="notifyChannel"
                type="radio"
                value="sms"
                class="hidden"
              />
              <span
                class="w-14 h-14 rounded-full border flex items-center justify-center mr-8"
                :class="notifyChannel === 'sms' ? '!border-[#57B8FF]' : ''"
              >
                <span
                  :class="
                    notifyChannel === 'sms'
                      ? 'w-8 h-8 rounded-full bg-[#57B8FF]'
                      : 'w-8 h-8 rounded-full'
                  "
                ></span>
              </span>
              <span class="SourceHanSansCNRegular text-[14px] text-[#fff]"
                >短信</span
              >
            </label>
            <label class="flex items-center cursor-pointer select-none">
              <input
                v-model="notifyChannel"
                type="radio"
                value="system"
                class="hidden"
              />
              <span
                class="w-14 h-14 rounded-full border flex items-center justify-center mr-8"
                :class="notifyChannel === 'system' ? '!border-[#57B8FF]' : ''"
              >
                <span
                  :class="
                    notifyChannel === 'system'
                      ? 'w-8 h-8 rounded-full bg-[#57B8FF]'
                      : 'w-8 h-8 rounded-full'
                  "
                ></span>
              </span>
              <span class="SourceHanSansCNRegular text-[14px] text-[#fff]"
                >邮件</span
              >
            </label>
          </div>
        </div>

        <div class="w-full flex justify-center items-center">
          <div class="submitForm SourceHanSansCNRegular text-[14px] mr-[40px]">
            <span>发送</span>
          </div>
          <div
            @click="firstPop = false"
            class="submitForm SourceHanSansCNRegular text-[14px]"
          >
            <span>取消</span>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<style lang="less" scoped>
.deform-swiper {
  height: 168px;
}
.send-btn {
  cursor: pointer;
  font-size: 12px;
  color: #f9fdff;
  line-height: 26px;
  text-align: center;
  width: 80px;
  height: 34px;
  background: url("@/assets/img/yujing_RiskPublic_but.webp") no-repeat center
    center;
  background-size: 100% 100%;
  font-family: "SourceHanSansCNRegular";
  transition: all 0.2s ease-in-out;
}
.send-btn:hover {
  background: url("@/assets/img/yujing_RiskPublic_butAct.webp") no-repeat center
    center;
}
.fontNormal {
  font-style: normal;
}
.fontMedium {
  font-weight: bold;
}
.submitForm {
  width: 98px;
  height: 32px;
  background: url("@/assets/img/yujing_pop_bot_bg.webp") no-repeat center center;
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  cursor: pointer;
  span {
    width: 92px;
    height: 29px;
    background: url("@/assets/img/yujing_pop_bot_it.webp") no-repeat center
      center;
    background-size: 100% 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.2s ease-in-out;
  }
  span:hover {
    background: url("@/assets/img/yujing_pop_bot_itact.webp") no-repeat center
      center;
  }
}
.writing-mode-vertical {
  writing-mode: vertical-rl;
  text-orientation: upright;
  position: absolute;
  right: 0;
  top: 70px;
  font-size: 12px;
  color: #E70000;
}

.yujing-msg-card {
  animation: yujingCardGlow 2200ms ease-in-out infinite;
  animation-delay: var(--delay, 0s);
  filter: drop-shadow(0 0 6px rgba(87, 184, 255, 0.25));
  isolation: isolate;
}

.yujing-msg-card::after,
.yujing-msg-card::before {
  content: "";
  position: absolute;
  left: 50%;
  top: 50%;
  width: 66px;
  height: 58px;
  transform: translate(-50%, -50%);
  border-radius: 8px;
  background: url("@/assets/img/yujing_mes_item_bg.webp") no-repeat center center;
  background-size: 100% 100%;
  opacity: 0;
  pointer-events: none;
  animation: yujingRipple 2200ms ease-out infinite;
  animation-delay: var(--delay, 0s);
  z-index: -1;
}

.yujing-msg-card::before {
  animation-delay: calc(var(--delay, 0s) + 900ms);
}

.yujing-msg-icon {
  animation: yujingIconFloat 1800ms ease-in-out infinite;
  animation-delay: var(--delay, 0s);
  will-change: transform;
}

@keyframes yujingCardGlow {
  0% {
    filter: drop-shadow(0 0 4px rgba(87, 184, 255, 0.15));
    transform: translateY(0);
  }
  50% {
    filter: drop-shadow(0 0 10px rgba(87, 184, 255, 0.35));
    transform: translateY(-2px);
  }
  100% {
    filter: drop-shadow(0 0 4px rgba(87, 184, 255, 0.15));
    transform: translateY(0);
  }
}

@keyframes yujingIconFloat {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-4px);
  }
  100% {
    transform: translateY(0);
  }
}

@keyframes yujingRipple {
  0% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0;
  }
  10% {
    opacity: 0.35;
  }
  100% {
    transform: translate(-50%, -50%) scale(1.85);
    opacity: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .yujing-msg-card,
  .yujing-msg-icon,
  .yujing-msg-card::after,
  .yujing-msg-card::before {
    animation: none;
  }
}
</style>
