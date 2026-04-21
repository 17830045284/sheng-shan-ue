<script setup>
import { useStore } from "@/store/index.js";
import { getImg } from "@/utils/assets";
const store = useStore();

const firstPop = ref(false);
const firstContent = ref([
  {
    size: "12px",
    content: "立即执行措施（15分钟内）",
  },
  {
    size: "12px",
    content: "负荷调整：降低当前负荷10-15%",
  },
  {
    size: "12px",
    content: "运行点优化：调整导叶开度，避开易空蚀工况",
  },
  {
    size: "12px",
    content: "监测加密：振动监测频率提升至每15分钟",
  },
  {
    size: "12px",
    content: "保护屏障：保持上游高水位运行",
  },
  {
    size: "12px",
    content: "短期措施（3天内）",
  },
  {
    size: "12px",
    content: "临时防护：安装导流装置，调整补气系统",
  },
  {
    size: "12px",
    content: "运行轮换：多台机组时实施间歇运行",
  },
  {
    size: "12px",
    content: "备件准备：启动转轮修复材料采购流程",
  },
]);
const secondPop = ref(false);
const secondContent = ref([
  {
    size: "14px",
    content: "第一阶段（0-4小时）",
  },
  {
    size: "12px",
    content: "逐步降负荷：以每分钟5%速率降至50%",
  },
  {
    size: "12px",
    content: "准备停机：通知电网调度，准备解列操作",
  },
  {
    size: "12px",
    content: "加强监控：技术负责人现场指挥，5分钟报告一次",
  },
  {
    size: "12px",
    content: "紧急停机：如持续恶化，2-4小时内执行停机",
  },
  {
    size: "14px",
    content: "第二阶段（停机后）",
  },
  {
    size: "12px",
    content: "安全隔离：关闭进水阀门，机组完全隔离",
  },
  {
    size: "12px",
    content: "状态评估：48小时内完成水下检测和风险评估",
  },
  {
    size: "14px",
    content: "修复选择：",
  },
  {
    size: "12px",
    content: "方案A（现场修复）：7-14天，堆焊+机加工+涂层",
  },
  {
    size: "12px",
    content: "方案B（转轮更换）：15-30天，拆卸+安装+调试",
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
