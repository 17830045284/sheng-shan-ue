<script setup>
import { useStore } from "@/store";
import dayjs from "dayjs";
const store = useStore();

const initalData = computed(() => {
  return [
    {
      id: 1,
      type: store.alarmData[0]?.text || '',
      time: store.alarmData[0]?.time || '',
    },
    {
      id: 2,
      type: store.alarmData[1]?.text || '',
      time: store.alarmData[1]?.time || '',
    },
    {
      id: 3,
      type: store.alarmData[2]?.text || '',
      time: store.alarmData[2]?.time || '',
    },
  ];
});

let alarms = ref([]);

// let index = 1
// let timer = setInterval(() => {
//   index > 2 ? index = 1 :index++
//   const data = {
//     id: index,
//     time: new Date().toLocaleString('zh'),
//     type: initalData.value[index - 1].type,
//   }
//   if (alarms.value.length >= 3) {
//     store.isShowAlarm = false
//   }
//   alarms.value.unshift(data)
// }, 2 * 60 * 1000)

// onBeforeUnmount(() => {
//   clearInterval(timer)
// })

function handleAlarmClick(item) {
  const ueOptions = {
    type: "alarm",
    data: {
      ...item,
    },
  };
  // clearInterval(timer);
  store.isShowBackButton = true;
  store.isClickAlarm = true;
  store.isShowAlarm = false;
  store.setCollapsePanel(true);
  store.isShowFeatureButton = false;
  console.log("ueOptions: ", ueOptions);
  ue4("ueEvent", ueOptions);
}
onMounted(() => {
  // setTimeout(() => {
  //   alarms.value.push({
  //     ...initalData.value[0],
  //     time: new Date().toLocaleString('zh')
  //   })
  // }, 1000)
});
</script>

<template>
  <!-- <ul class="alarm-container absolute w-390 h-80 kt-x-center top-150 overflow-hidden pointer-events-auto">
    <transition-group name="list">
      <li class="w-full h-71 relative mb-10 cursor-pointer" @click="handleAlarmClick(item)"
      v-for="item in alarms" :key="item.id">
        <img src="../../assets/img/wer_bg.webp" class="w-full h-full absolute" />
        <p class="absolute bottom-2 px-15 flex justify-between w-full h-30 items-center">
        <div class=" h-36 scroll-text relative" :title="item.type">
          <span class="absolute warn-value !text-[20px] span1">{{ item.type }}</span>
          <span class="absolute warn-value !text-[20px] span2">{{ item.type }}</span>
        </div>
        <span class="">{{ item.time }}</span>
        </p>
      </li>
    </transition-group>
  </ul> -->
  <ul class="absolute top-120 left-410 grid grid-rows-3 gap-10">
    <transition-group name="list">
    <li
      v-for="item in initalData"
      :key="item.id"
      class="relative w-266 h-52 kt-bg-full bg-[url('@/assets/img/alarm_bg.webp')] cursor-pointer"
      @click="handleAlarmClick(item)"
    >
    <p class="absolute top-30 px-15 flex justify-between w-full h-30 items-center">
      <div class="h-36 scroll-text relative" :title="item.type">
          <p class="absolute text-[16px] span1"><span class="warn-value">{{item.type}}</span>
            {{item.time }}
          </p>
          <p class="absolute text-[16px] span2"><span class="warn-value">{{item.type  }}</span>
            {{item.time }}
          </p>
      </div>
    </p>
  </li>
  </transition-group>
  </ul>
</template>

<style scoped>
.scroll-text {
  white-space: nowrap;
  width: 250px;
  position: relative;
  overflow: hidden;
}

.span1 {
  animation: scrollspan1 10s linear infinite;
}

.span2 {
  transform: translateX(102%);
  animation: scrollspan2 10s linear infinite;
}

@keyframes scrollspan1 {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-102%);
  }
}

@keyframes scrollspan2 {
  0% {
    transform: translateX(102%);
  }

  100% {
    transform: translateX(0);
  }
}

.alarm-container {
  max-height: 236px;
}

.alarm-container li:last-child {
  margin-bottom: 0;
}

.list-move,
/* 对移动中的元素应用的过渡 */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* 确保将离开的元素从布局流中删除
  以便能够正确地计算移动的动画。 */
.list-leave-active {
  position: absolute;
}
</style>
