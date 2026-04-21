<script setup>
import { onMounted, ref } from 'vue'
import router from '@/router/index.js'
import KtWatermark from '@/components/kt-ui/kt-watermark.vue'
import KtLayout from '@/components/kt-ui/kt-layout.vue'
import { useStore } from '@/store'
import emitter from "@/utils/mitt"
import ktPixelStreamingPlayer from './components/kt-ui/kt-pixel-streaming-player.vue';

const store = useStore()

// router.push('/') // 页面刷新重定向至首页

// window.ue.interface.postUE = (message) => {
//   let data = message;
//   typeof data ==='string' && (data = JSON.parse(data));
//   console.log('dataaaaa: ', data);
//   if (data.type === 'feature_button') {
//     store.isShowFeatureButton = data.data.isShow
//   } else if (data.type === 'back') {
//     store.isShowBackButton = data.data.isShow
//   } else if (data.type === 'alarm') {
//     store.isShowAlarm = data.data.isShow
//   } else if (data.type === 'collapse_panel') {
//     store.isCollapsePanel = data.data.isCollapse
//   } else if (data.type === 'head_button') {
//     store.isShowHeadButton = data.data.isShow
//   } else if (data.type === 'split_button') {
//     store.isShowSplitButton = data.data.isShow
//   } else if (data.type === 'head_button_status') {
//     store.currentFeature = data.data
//   } else if (data.type === 'start') {
//     store.showStart = data.data
//   } else if (data.type === 'receive_water') {
//     store.previewDataObj.waterData.push(data.data.waterData)
//     store.previewDataObj.flowRateData.push(data.data.flow)
//     store.previewDataObj.index = data.data.index
//   } else if (data.type === 'excel_data') {
//     emitter.emit('update:excelData', data.data.data)
//   }
// }

// document.addEventListener('contextmenu', function(e) {
//   e.preventDefault()
// })
// let nameList = computed(() => ([
//   {
//     name: '厂站',
//     key: 'plantStation',
//     value: store.reportInfo.plantStation,
//   },
//   {
//     name: '发生时间',
//     key: 'eventTime',
//     value: store.reportInfo.eventTime,
//   },
//   {
//     name: '事件对象',
//     key: 'eventObject',
//     value: store.reportInfo.eventObject,
//   },
//   {
//     name: '事件类型',
//     key: 'eventType',
//     value: store.reportInfo.eventType,
//   }
// ]))

const showPixelStream = ref(false);
onMounted(() => {
  // #dev:修改默认路由
  showPixelStream.value = window.kt_config.usePixelStream;
});
</script>

<template>
  <kt-watermark :enable="false">
    <kt-layout></kt-layout>
    <kt-pixel-streaming-player v-if="showPixelStream" class="z-[1]" />

    <Transition name="bounce">
      <div
        v-if="store.isShowDiagnosticReport"
        class="kt-center z-[10] w-608 h-666 bg-[url('@/assets/img/p1.webp')] kt-bg-full pointer-events-auto px-16"
      >
        <div class="w-25 h-25 absolute right-5 top-4 cursor-pointer">
          <img
            src="./assets/img/close.webp"
            class="w-full h-full"
            @click="store.isShowDiagnosticReport = false"
          />
        </div>
        <img
          src="./assets/img/title.webp"
          class="w-150 h-29 kt-x-center top-10"
        />
        <div class="w-full mt-50">
          <p class="font-['SourceHanSansCN'] font-normal text-[14px] text-[#F9FFFF] tracking-[1px]">诊断时间：{{ store.reportInfo.reportTime }}</p>
          <div class="w-full h-1 rounded-xl line-gradient"></div>
        </div>
        <div class="w-full h-full py-10">
          <div class="flex justify-between flex-wrap">
              <ul 
              class="flex mt-10 font-['SourceHanSansCN'] font-normal text-[14px] text-[#F9FFFF]"
              v-for="(item, index) in nameList"
              :key="index"
              >
                  <li class="text-overflow kt-flex w-123 h-30 bg-[#FFFFFF1A] border-l-[1px] border-solid border-[#FFFFFF] mr-2">
                    {{ item.name }}
                  </li>
                  <li class="text-overflow kt-flex h-30 bg-[#FFFFFF1A]" :style="{width: !((index + 1) % 2) ?'169px' : '123px'}">{{ item.value }}</li>
              </ul>
              <ul 
              class="flex mt-10 w-full h-65 font-['SourceHanSansCN'] font-normal text-[14px] text-[#F9FFFF]"
              >
                  <li class="text-overflow kt-flex w-123 h-ful bg-[#FFFFFF1A] border-l-[1px] border-solid border-[#FFFFFF] mr-2">
                    事件内容
                  </li>
                  <li class="w-449 kt-flex overflow-y-auto hide-scrollbar h-full bg-[#FFFFFF1A]">
                    {{ store.reportInfo.eventContent }}
                  </li>
              </ul>
              <ul 
              class="mt-10 w-full h-406 font-['SourceHanSansCN'] font-normal text-[14px] text-[#F9FFFF]"
              >
                  <li v-html="store.reportInfo.analysisReason + '<br><br>' + store.reportInfo.checkSuggestion" class="py-25 px-32 overflow-y-auto hide-scrollbar bg-[#FFFFFF1A]">
                  </li>
              </ul>
          </div>
        </div>
      </div>
    </Transition>
  </kt-watermark>
</template>

<style lang="less" scoped>
:global(#app) {
  height: 100%;
  width: 100%;
  // pointer-events: none;
}
.p1-container {
  display: flex;
  flex-direction: column;
  // gap: 5px;
  justify-content: space-between;
  z-index: 22;
  * {
    font-size: 14px;
  }
  li {
    height: 30px;
    background: rgba(255, 255, 255, 0.1);
    display: flex;
    align-items: center;
    padding: 0 8px;
    &:first-child {
      background: none;
      border-bottom: 1px solid white;
      display: flex;
      justify-content: space-between;
    }
    &:nth-child(n + 7) {
      height: 114px;
    }
  }
}
</style>
