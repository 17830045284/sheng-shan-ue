<script setup>
import { useStore } from '../../store'
import { getImg } from '@/utils/assets';
import { sendToUE } from '@/ktJS/UE'
const props = defineProps({
    curProcess: Array
})
const store = useStore()
const imgUrl = computed(() => {
    return store.bootStatus === 1 ? getImg('bootText.webp') : getImg('outageText.webp')
})
const haltState = ref({})

const NintervalList = {
  3: 6, //主阀全开，0-30 (间隔5)
  4: 55, //转速>起励转速，30-360 (间隔53.4)
  5: 34, //机端电压>70%，360-500 (间隔100)
}

const loopNum = (timer, delay, initState, endNum, interval, increase = true, changeInterval = false, intervalList = {}) => {
    if (increase) {
        timer = setInterval(() => {
        let intervalNum = changeInterval? intervalList[store.curBootId] : interval;
        console.log('changeInterval: ', haltState.value[initState], intervalNum);
        if(+haltState.value[initState] < endNum && (+haltState.value[initState] + intervalNum) < endNum) {
            haltState.value[initState] = (+haltState.value[initState] + intervalNum).toFixed(2)
        } else {
            haltState.value[initState] = endNum.toFixed(2) 
            clearInterval(timer)
            timer = null
        }
        }, delay)
    } else {
        timer = setInterval(() => {
        let intervalNum = changeInterval? intervalList[store.curBootId] : interval;
        if(+haltState.value[initState] > endNum && (+haltState.value[initState] - intervalNum) > endNum) {
            haltState.value[initState] = (+haltState.value[initState] - intervalNum).toFixed(2)
        } else {
            haltState.value[initState] = endNum.toFixed(2)
            clearInterval(timer)
            timer = null
        }
        }, delay)
    }
    return timer;
}
let isLoop = ref(true)

let timer = null
let NTimer = null // 转速N定时器
let NUabTimer = null // 机端电压Uab定时器
let KDTimer = null // 电阻KD定时器
// 控制开始按钮
function handleStart() {
    if(isLoop.value) return
    store.curBootId = 1 // 初始化id
    handleStartLoop()
}
function initBootState() {
    haltState.value.H = props.curProcess[0].unitObj[0].value
    haltState.value.N = props.curProcess[3].unitObj[0].value
    haltState.value.Uab = props.curProcess[4].unitObj[0].value
    haltState.value.P = props.curProcess[5].unitObj[0].value
    haltState.value.Q = props.curProcess[5].unitObj[1].value
}

function initHaltState() {
    haltState.value.KD = props.curProcess[3].unitObj[0].value
}
function handleBoot(curBootId) {
    if(!isLoop.value) return;
    if (curBootId === 3) { // 主阀全开
        NTimer = loopNum(NTimer, 1000, 'N', 500, 5,true, true, NintervalList)
    } else if(curBootId === 4) { // 转速>起励转速
        haltState.value.Uab = '16.00'
        NUabTimer = loopNum(NUabTimer, 1000, 'Uab', 412.72, 52.8, true, false, NintervalList)
    } else if(curBootId === 5) { // 机端电压>70%
        haltState.value.Uab = '280.00'
    } else if(curBootId === 6) {
        haltState.value.Q = '10.00'
        haltState.value.P = '20.00'
    }
}

function handleHalt(curBootId) {
    if(!isLoop.value) return;
    if (curBootId === 2) {
        KDTimer = loopNum(KDTimer, 1000, 'KD', 0, 5, false)
    } else if(curBootId === 4) {
        haltState.value.KD = '0.00'
    }
}
 // 循环
function handleStartLoop() {
    isLoop.value = true
    timer = setInterval(() => {
        store.curBootId = store.curBootId === props.curProcess.length? 1 : store.curBootId + 1
        if(store.curBootId === 1) {
            clearInterval(timer)
            isLoop.value = false
            store.curBootId = 0
            store.bootStatus === 1 ?initBootState() : initHaltState()
        } else {
            store.bootStatus === 1 ? handleBoot(store.curBootId) : handleHalt(store.curBootId)
        }
    },
    6000)
    return timer;
}


watch(
   () => store.curBootId,
    (newVal, oldVal) => {
        if (newVal) { // 在过程中
            let item = props.curProcess.find(item => item.id === newVal)
            const ueOptions = {
                type: store.bootStatus === 1? 'boot' : 'halt',
                data: {
                  id: item.id,
                  name: item.name
                },
            }
            // ue4('ueEvent', ueOptions)
            sendToUE('ueEvent', ueOptions)
            console.log('ueOptions: ', ueOptions);
        }else { // 结束一轮循环
            console.log('end', store.curBootId, isLoop.value);
            if(store.bootStatus) {
                const ueOptions = {
                type: 'end',
                data: {
                    name: store.bootStatus === 1? 'boot' : 'halt'
                },
            }
            // ue4('ueEvent', ueOptions)
            sendToUE('ueEvent', ueOptions)
            // console.log('aaa', ueOptions);
            }

        }

    },
    {
        immediate: true
    }
)

onMounted(() => {
    store.curBootId = 1
    handleStartLoop()
    haltState.value = store.bootStatus === 1 ? {
        'H': props.curProcess[0].unitObj[0].value,
        'N': props.curProcess[3].unitObj[0].value,
        'Uab': props.curProcess[4].unitObj[0].value,
        'P': props.curProcess[5].unitObj[0].value,
        'Q': props.curProcess[5].unitObj[1].value,
    } : {
        'KD': props.curProcess[3].unitObj[0].value,
    }
})
onBeforeUnmount(() => {
    clearInterval(timer)
    clearInterval(NTimer)
    clearInterval(NUabTimer)
    clearInterval(KDTimer)
})
</script>

<template>
  <div
    class="w-290 h-798 absolute top-145 left-20 bg-[url('@/assets/img/bg1.webp')] kt-bg-full px-12 py-12 flex flex-col"
  >
    <div class="flex justify-between items-center w-full">
      <img :src="imgUrl" class="w-106 h-27" />
      <div
        class="w-53 h-25 bg-[url('@/assets/img/start.webp')] kt-bg-full flex justify-center items-center cursor-pointer"
      >
        <span
          class="font-['Source_Han_Sans_CN'] font-normal text-[14px] text-[#FFFFFF]"
          @click="handleStart"
          >开始</span
        >
      </div>
    </div>
    <div class="w-full flex-1 pt-32">
      <div
        class="flex flex-col justify-between items-center"
        v-for="(item, index) in curProcess"
        :key="item.id"
      >
        <div
          class="w-162 h-35 kt-bg-full flex justify-center items-center"
          :style="{
            backgroundImage:
              store.curBootId === item.id
                ? `url(${getImg('active_bg.webp')})`
                : `url(${getImg('common_bg.webp')})`,
          }"
        >
          <span
            class="value4 font-['Source_Han_Sans_CN'] font-bold text-[18px]"
            :class="{ value5: store.curBootId === item.id }"
            >{{ item.name }}</span
          >
        </div>
        <div class="flex" v-show="index < curProcess.length - 1">
          <img
            src="@/assets/img/arrow.webp"
            class="w-28 h-28 block my-[23px]"
          />
          <div
            class="absolute right-30 mt-15 flex flex-col justify-center items-center"
            v-if="item.unitObj"
          >
            <span
              class="font-['Source_Han_Sans_CN'] font-[500] text-[14px] text-[#FFFFFF]"
              >{{ item.unitObj[0].title }}</span
            >
            <div
              class="w-88 h-24 bg-[url('@/assets/img/bt_bg.webp')] kt-bg-full flex justify-center items-center"
            >
              <span class="text-[#F0F09E] text-[16px]">{{
                haltState[item.unitObj[0].title]
              }}</span>
            </div>
          </div>
          <div
            class="absolute left-30 mt-15 flex flex-col justify-center items-center"
            v-if="item.unitObj && item.unitObj.length > 1"
          >
            <span
              class="font-['Source_Han_Sans_CN'] font-[500] text-[14px] text-[#FFFFFF]"
              >{{ item.unitObj[1].title }}</span
            >
            <div
              class="w-88 h-24 bg-[url('@/assets/img/bt_bg.webp')] kt-bg-full flex justify-center items-center"
            >
              <span class="text-[#F0F09E] text-[16px]">{{
                haltState[item.unitObj[1].title]
              }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
