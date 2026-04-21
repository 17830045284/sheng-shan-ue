<script setup>
import { useStore } from "@/store/index.js";
import { getImg } from "@/utils/assets";
const store = useStore();

const firstPop = ref(false);
const firstContent = ref([
  {
    size: "12px",
    content:
      "加强监测： 将相关部位监测频率提升至每小时1次，启动无人机巡检和视频监控自动识别。",
  },
  {
    size: "12px",
    content: "准备资源： 检查抢险物资（灌浆材料、反滤料等）和设备，队伍待命。",
  },
  {
    size: "12px",
    content: "小幅调整： 在保障下游安全的前提下，经批准后小幅降低水库水位。",
  },
]);

const secondPop = ref(false);
const secondContent = ref([
  {
    size: "12px",
    content: "立即执行“双降一强”：",
  },
  {
    size: "12px",
    content:
      "快速降低库水位：不经过分级讨论，直接按预定的紧急泄降方案，利用一切可用泄水能力，将库水位在24-48小时内降至汛限水位或更低。",
  },
  {
    size: "12px",
    content:
      "降低社会风险：同步启动下游受影响区域的预备性预警，通知地方防汛指挥部、重点单位及社区做好随时撤离的准备。",
  },
  {
    size: "12px",
    content:
      "强化工程措施：抢险队伍和重型设备立即就位，无论风险是否肉眼可见，立即对预演提示的风险部位进行预防性加固和反滤保护。",
  },
  {
    size: "12px",
    content:
      "进行诊断与确认：在采取上述强力措施的同时，组织专家团队进行密集的现场勘查、物探和模型反演，以措施换时间，快速诊断真实风险源。",
  },
  {
    size: "12px",
    content:
      "动态调整：根据诊断结果，决定是逐步恢复常态，还是启动更彻底的修复方案。",
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
