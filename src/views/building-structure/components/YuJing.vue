<script setup>
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

const deformFirstRows = ref([
  {
    name: "坝顶",
    metric: "水平位移",
    level: "重大",
    levelClass: "text-[#FCBA41]",
  },
  {
    name: "芙蓉洞",
    metric: "垂直位移",
    level: "较大",
    levelClass: "text-[#F6FB68]",
  },
  {
    name: "防渗体",
    metric: "裂缝",
    level: "一般",
    levelClass: "text-[#3EDDF9]",
  },
  {
    name: "坝顶",
    metric: "水平位移",
    level: "重大",
    levelClass: "text-[#FCBA41]",
  },
]);
const deformSecondRows = ref([
  {
    name: "坝体渗流汇集廊道",
    metric: "渗流量",
    level: "重大",
    levelClass: "text-[#FCBA41]",
  },
  {
    name: "消力池集水廊道",
    metric: "渗压",
    level: "较大",
    levelClass: "text-[#F6FB68]",
  },
  {
    name: "绕坝渗流出口",
    metric: "渗流量",
    level: "一般",
    levelClass: "text-[#3EDDF9]",
  },
  {
    name: "坝体渗流汇集廊道",
    metric: "渗流量",
    level: "重大",
    levelClass: "text-[#FCBA41]",
  },
]);
const deformThirdRows = ref([
  {
    name: "重力坝上游面受压区",
    metric: "应力",
    level: "重大",
    levelClass: "text-[#FCBA41]",
  },
  {
    name: "水闸底板",
    metric: "应力",
    level: "较大",
    levelClass: "text-[#F6FB68]",
  },
  {
    name: "重力坝上游面受压区",
    metric: "应变",
    level: "一般",
    levelClass: "text-[#3EDDF9]",
  },
  {
    name: "重力坝上游面受压区",
    metric: "应力",
    level: "重大",
    levelClass: "text-[#FCBA41]",
  },
]);
const yuJingMessage = ref([
  {
    name: "变形预警",
    img: "yujing_mes_item_01.webp",
    size: [32, 35],
    top: 5,
    number: 3,
  },
  {
    name: "渗流预警",
    img: "yujing_mes_item_02.webp",
    size: [33, 33],
    top: 8,
    number: 1,
  },
  {
    name: "应力应变预警",
    img: "yujing_mes_item_03.webp",
    size: [37, 32],
    top: 10,
    number: 1,
  },
]);
const yuJingRiskRegister = ref([
  {
    time: "2024-09-11 15:00:00",
    name: "变形预警",
    warm: "坝顶水平位移过大",
    state: 1,
  },
  {
    time: "2024-09-11 15:00:00",
    name: "变形预警",
    warm: "防渗体裂缝过大",
    state: 1,
  },
  {
    time: "2024-09-11 15:00:00",
    name: "渗流预警",
    warm: "消力池集水廊道渗流量过大",
    state: 2,
  },
  {
    time: "2024-09-11 15:00:00",
    name: "应力应变预警",
    warm: "水闸底板应力过大",
    state: 1,
  },
  {
    time: "2024-09-11 15:00:00",
    name: "应力应变预警",
    warm: "水闸底板应力过大",
    state: 1,
  },
  {
    time: "2024-09-11 15:00:00",
    name: "变形预警",
    warm: "坝顶水平位移过大",
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
</script>

<template>
  <kt-left style="grid-template-rows: 333fr 333fr 333fr">
    <kt-item type="13" title="变形预警" :px="0">
      <div class="w-full h-full px-0 pt-10">
        <div
          class="w-full h-34 bg-[#001D38]/[47%] flex items-center text-[#EAF6FF] text-[12px] SourceHanSansCNRegular"
        >
          <div class="flex-1 flex justify-center">名称</div>
          <div class="flex-1 flex justify-center">指标</div>
          <div class="flex-1 flex justify-center">预警状态</div>
        </div>
        <Swiper
          class="deform-swiper !h-[calc(100%-40px)] !pt-[10px]"
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
              class="w-full h-46 flex items-center text-[#fff] text-[12px] SourceHanSansCNRegular bg-[url('@/assets/img/yujing_item_bg.webp')] bg-cover"
            >
              <div class="flex-1 flex justify-center">{{ row.name }}</div>
              <div class="flex-1 flex justify-center">{{ row.metric }}</div>
              <div
                class="flex-1 flex justify-center font-[600]"
                :class="row.levelClass"
              >
                {{ row.level }}
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </kt-item>
    <kt-item type="13" title="渗流预警" :px="0">
      <div class="w-full h-full px-0 pt-10">
        <div
          class="w-full h-34 bg-[#001D38]/[47%] flex items-center text-[#EAF6FF] text-[12px] SourceHanSansCNRegular"
        >
          <div class="flex-1 flex justify-center">名称</div>
          <div class="flex-1 flex justify-center">指标</div>
          <div class="flex-1 flex justify-center">预警状态</div>
        </div>
        <Swiper
          class="deform-swiper !h-[calc(100%-40px)] !pt-[10px]"
          :modules="swiperModules"
          direction="vertical"
          :slides-per-view="3"
          :loop="deformSecondRows.length > 3"
          :speed="600"
          :autoplay="swiperAutoplay"
          :mousewheel="swiperMousewheel"
          :allow-touch-move="true"
          :simulate-touch="true"
          :grab-cursor="true"
        >
          <SwiperSlide v-for="(row, idx) in deformSecondRows" :key="idx">
            <div
              class="w-full h-46 flex items-center text-[#fff] text-[12px] SourceHanSansCNRegular bg-[url('@/assets/img/yujing_item_bg.webp')] bg-cover"
            >
              <div class="flex-1 flex justify-center">{{ row.name }}</div>
              <div class="flex-1 flex justify-center">{{ row.metric }}</div>
              <div
                class="flex-1 flex justify-center font-[600]"
                :class="row.levelClass"
              >
                {{ row.level }}
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </kt-item>
    <kt-item type="13" title="应力预警" :px="0">
      <div class="w-full h-full px-0 pt-10">
        <div
          class="w-full h-34 bg-[#001D38]/[47%] flex items-center text-[#EAF6FF] text-[12px] SourceHanSansCNRegular"
        >
          <div class="flex-1 flex justify-center">名称</div>
          <div class="flex-1 flex justify-center">指标</div>
          <div class="flex-1 flex justify-center">预警状态</div>
        </div>
        <Swiper
          class="deform-swiper !h-[calc(100%-40px)] !pt-[10px]"
          :modules="swiperModules"
          direction="vertical"
          :slides-per-view="3"
          :loop="deformThirdRows.length > 3"
          :speed="600"
          :autoplay="swiperAutoplay"
          :mousewheel="swiperMousewheel"
          :allow-touch-move="true"
          :simulate-touch="true"
          :grab-cursor="true"
        >
          <SwiperSlide v-for="(row, idx) in deformThirdRows" :key="idx">
            <div
              class="w-full h-46 flex items-center text-[#fff] text-[12px] SourceHanSansCNRegular bg-[url('@/assets/img/yujing_item_bg.webp')] bg-cover"
            >
              <div class="flex-1 flex justify-center">{{ row.name }}</div>
              <div class="flex-1 flex justify-center">{{ row.metric }}</div>
              <div
                class="flex-1 flex justify-center font-[600]"
                :class="row.levelClass"
              >
                {{ row.level }}
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
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
                <div
                  @click="
                    firstPop = true;
                  "
                  class="send-btn"
                >
                  发送预警
                </div>
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
          @click="
            firstPop = false;
          "
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
            @click="
              firstPop = false;
            "
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
