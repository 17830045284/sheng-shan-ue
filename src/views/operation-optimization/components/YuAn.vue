<script setup>
import { useStore } from "@/store/index.js";
import { getImg } from "@/utils/assets";
const store = useStore();

const firstPop = ref(false);
const firstContent = ref([
  {
    size: "12px",
    content: "激进型发电方案（短期效益最大化）",
  },
  {
    size: "14px",
    content: "1.水位控制措施",
  },
  {
    size: "12px",
    content: "水库水位维持在正常蓄水位范围内，当水位接近防洪限制水位时，仅进行最小必要泄洪，保持高水位运行以维持高发电水头",
  },
  {
    size: "14px",
    content: "2.机组运行措施",
  },
  {
    size: "12px",
    content: "所有可用发电机组全开满发，各机组按额定容量运行，不进行负荷调整，持续监测机组效率，但优先保证发电量",
  },
  {
    size: "14px",
    content: "3.泄洪措施",
  },
  {
    size: "12px",
    content: "原则上不开启泄洪闸门，当水位超过防洪限制水位0.1m时，开启1-2孔闸门小开度（10-20%）泄洪",
  },
  {
    size: "14px",
    content: "4.用水策略",
  },
  {
    size: "12px",
    content: "所有入库水量优先用于发电，发电用水量等于或略小于入库流量",
  },
  {
    size: "12px",
    content: "不预留调节库容，全部库容用于发电",
  },
]);
const secondPop = ref(false);
const secondContent = ref([
  {
    size: "12px",
    content: "  稳健型发电策略（安全效益平衡）",
  },
  {
    size: "14px",
    content: "1.水位控制措施",
  },
  {
    size: "12px",
    content: "水库水位控制在正常蓄水位以下1-2m，预留10-15%的防洪库容",
  },
  {
    size: "12px",
    content: "水位变幅控制在±0.5m以内",
  },
  {
    size: "14px",
    content: "2.机组运行措施",
  },
  {
    size: "12px",
    content: "根据来水情况动态调整运行机组台数，发电功率与来水流量匹配，避免过度发电，保持1-2台机组处于热备用状态",
  },
  {
    size: "14px",
    content: "3.泄洪措施",
  },
  {
    size: "12px",
    content: "实施“预泄小流量”策略，当水位超过目标控制上限时，开启1孔闸门小开度（5-10%）持续泄洪，泄洪流量控制在入库流量的10-15%",
  },
  {
    size: "14px",
    content: "4.用水策略",
  },
  {
    size: "12px",
    content: "发电用水量约为入库流量的85-90%，保留部分水量用于维持水库调节能力，考虑后续可能来水，保持运行灵活性",
  },
]);

const receiverOptions = [
  { label: "张三", value: "zhangsan" },
  { label: "李四", value: "lisi" },
  { label: "王五", value: "wangwu" },
];

const receiver1 = ref("");
const receiver1Open = ref(false);
const receiver1DropdownEl = ref(null);
const receiver1Label = computed(() => {
  return (
    receiverOptions.find((o) => o.value === receiver1.value)?.label ||
    "请选择接收人"
  );
});

const receiver2 = ref("");
const receiver2Open = ref(false);
const receiver2DropdownEl = ref(null);
const receiver2Label = computed(() => {
  return (
    receiverOptions.find((o) => o.value === receiver2.value)?.label ||
    "请选择接收人"
  );
});

function toggleReceiver1Open() {
  receiver2Open.value = false;
  receiver1Open.value = !receiver1Open.value;
}

function toggleReceiver2Open() {
  receiver1Open.value = false;
  receiver2Open.value = !receiver2Open.value;
}

function selectReceiver1(value) {
  receiver1.value = value;
  receiver1Open.value = false;
}

function selectReceiver2(value) {
  receiver2.value = value;
  receiver2Open.value = false;
}

function onDocClick(e) {
  const el1 = receiver1DropdownEl.value;
  const el2 = receiver2DropdownEl.value;
  if (el1 && !el1.contains(e.target)) receiver1Open.value = false;
  if (el2 && !el2.contains(e.target)) receiver2Open.value = false;
}

onMounted(() => {
  document.addEventListener("click", onDocClick, true);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", onDocClick, true);
});
</script>

<template>
  <div
    class="w-[1103px] h-[590px] bg-[url('@/assets/img/conPla_bg.webp')] absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] flex items-center justify-between pl-20 pr-20 pt-16 pb-16"
  >
    <!-- 左 -->
    <div
      class="w-[521px] h-full flex flex-col justify-around items-center relative"
    >
      <span class="w-full flex items-center justify-center">
        <img :src="getImg(`conPla_title_1.webp`)" class="w-[68px] h-[27px]" />
      </span>
      <div
        class="w-full h-[480px] bg-[url('@/assets/img/conPla_item_bg.webp')]"
      >
        <div class="w-full h-full px-12 pt-12 pb-12">
          <ul class="w-full h-full overflow-auto">
            <li
              v-for="(item, idx) in firstContent"
              :key="idx"
              class="flex tracking-[1px] text-[#fff] leading-22 SourceHanSansCNRegular mb-0"
              :style="{
                fontSize: item.size,
                marginTop: item.size === '14px' ? '6px' : '0',
                marginBottom: item.size === '14px' ? '6px' : '0',
              }"
            >
              <span class="flex-1">{{ item.content }}</span>
            </li>
          </ul>
        </div>
      </div>
      <span
        @click="
          firstPop = true;
          receiver1Open = false;
        "
        class="selectPop"
      ></span>
      <transition name="bounce">
        <div
          v-if="firstPop"
          class="absolute w-[416px] h-[165px] bg-[url('@/assets/img/conPla_pop_bg.webp')] p-20 pt-15 pb-10"
        >
          <div class="w-25 h-25 absolute right-5 top-4 cursor-pointer">
            <img
              :src="getImg(`close.webp`)"
              class="w-full h-full"
              @click="
                firstPop = false;
                receiver1Open = false;
              "
            />
          </div>
          <div class="w-full border-b-2 border-[rgb(255,255,255,0.2)]">
            <span
              class="pt-5 pb-5 SourceHanSansCNRegular text-[18px] color-[#fff] border-b-2 border-[rgb(255,255,255,1)]"
              >预案下发</span
            >
          </div>
          <div class="w-[95%] h-[75%] m-auto pt-35">
            <div class="flex items-center w-full">
              <span
                class="w-90 flex items-center SourceHanSansCNRegular text-[14px] text-[#fff]"
              >
                <span class="text-[#FF3B30] mr-4">*</span>接收人：
              </span>
              <div ref="receiver1DropdownEl" class="flex-1 relative h-44">
                <button
                  type="button"
                  class="w-full h-full border border-white bg-[#04121f] rounded pl-16 pr-15 bg-transparent text-[#fff] text-[14px] SourceHanSansCNRegular flex items-center justify-between"
                  @click="toggleReceiver1Open"
                >
                  <span :class="receiver1 ? 'text-[#fff]' : 'text-white/60'">{{
                    receiver1Label
                  }}</span>
                  <img
                    :src="getImg('conPla_arrow.webp')"
                    :class="[
                      'w-14 h-7 pointer-events-none transition-transform duration-200',
                      receiver1Open ? 'rotate-180' : '',
                    ]"
                  />
                </button>
                <transition name="dropdown">
                  <ul
                    v-if="receiver1Open"
                    class="absolute left-0 top-[calc(100%+6px)] w-full border border-white/40 rounded bg-[#04121f] overflow-hidden z-[50]"
                  >
                    <li
                      v-for="opt in receiverOptions"
                      :key="opt.value"
                      class="h-36 px-16 flex items-center text-[14px] SourceHanSansCNRegular text-[#fff] cursor-pointer hover:bg-white/10"
                      @click="selectReceiver1(opt.value)"
                    >
                      {{ opt.label }}
                    </li>
                  </ul>
                </transition>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
    <!-- 右 -->
    <div
      class="w-[521px] h-full flex flex-col justify-around items-center relative"
    >
      <span class="w-full flex items-center justify-center">
        <img :src="getImg(`conPla_title_2.webp`)" class="w-[68px] h-[27px]" />
      </span>
      <div
        class="w-full h-[480px] bg-[url('@/assets/img/conPla_item_bg.webp')]"
      >
        <div class="w-full h-full px-12 pt-12 pb-12">
          <ul class="w-full h-full overflow-auto">
            <li
              v-for="(item, idx) in secondContent"
              :key="idx"
              class="flex tracking-[1px] text-[#fff] leading-22 SourceHanSansCNRegular mb-0"
              :style="{
                fontSize: item.size,
                marginTop: item.size === '14px' ? '6px' : '0',
                marginBottom: item.size === '14px' ? '6px' : '0',
              }"
            >
              <span class="flex-1">{{ item.content }}</span>
            </li>
          </ul>
        </div>
      </div>
      <span
        @click="
          secondPop = true;
          receiver2Open = false;
        "
        class="selectPop"
      ></span>
      <transition name="bounce">
        <div
          v-if="secondPop"
          class="absolute w-[416px] h-[165px] bg-[url('@/assets/img/conPla_pop_bg.webp')] p-20 pt-15 pb-10"
        >
          <div class="w-25 h-25 absolute right-5 top-4 cursor-pointer">
            <img
              :src="getImg(`close.webp`)"
              class="w-full h-full"
              @click="
                secondPop = false;
                receiver2Open = false;
              "
            />
          </div>
          <div class="w-full border-b-2 border-[rgb(255,255,255,0.2)]">
            <span
              class="pt-5 pb-5 SourceHanSansCNRegular text-[18px] color-[#fff] border-b-2 border-[rgb(255,255,255,1)]"
              >预案下发</span
            >
          </div>
          <div class="w-[95%] h-[75%] m-auto pt-35">
            <div class="flex items-center w-full">
              <span
                class="w-90 flex items-center SourceHanSansCNRegular text-[14px] text-[#fff]"
              >
                <span class="text-[#FF3B30] mr-4">*</span>接收人：
              </span>
              <div ref="receiver2DropdownEl" class="flex-1 relative h-44">
                <button
                  type="button"
                  class="w-full h-full border border-white bg-[#04121f] rounded pl-16 pr-15 bg-transparent text-[#fff] text-[14px] SourceHanSansCNRegular flex items-center justify-between"
                  @click="toggleReceiver2Open"
                >
                  <span :class="receiver2 ? 'text-[#fff]' : 'text-white/60'">{{
                    receiver2Label
                  }}</span>
                  <img
                    :src="getImg('conPla_arrow.webp')"
                    :class="[
                      'w-14 h-7 pointer-events-none transition-transform duration-200',
                      receiver2Open ? 'rotate-180' : '',
                    ]"
                  />
                </button>
                <transition name="dropdown">
                  <ul
                    v-if="receiver2Open"
                    class="absolute left-0 top-[calc(100%+6px)] w-full border border-white/40 rounded bg-[#04121f] overflow-hidden z-[50]"
                  >
                    <li
                      v-for="opt in receiverOptions"
                      :key="opt.value"
                      class="h-36 px-16 flex items-center text-[14px] SourceHanSansCNRegular text-[#fff] cursor-pointer hover:bg-white/10"
                      @click="selectReceiver2(opt.value)"
                    >
                      {{ opt.label }}
                    </li>
                  </ul>
                </transition>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<style lang="less" scoped>
.selectPop {
  width: 170px;
  height: 34px;
  background: url("@/assets/img/conPla_sle.webp") no-repeat center center;
  background-size: contain;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}
.selectPop:hover {
  background: url("@/assets/img/conPla_sle_active.webp") no-repeat center center;
}
.dropdown-enter-active,
.dropdown-leave-active {
  transition:
    transform 160ms ease,
    opacity 160ms ease;
  transform-origin: top;
}
.dropdown-enter-from,
.dropdown-leave-to {
  transform: scaleY(0.8);
  opacity: 0;
}
.dropdown-enter-to,
.dropdown-leave-from {
  transform: scaleY(1);
  opacity: 1;
}
</style>
