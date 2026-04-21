<script setup>
import { useStore } from "../../store";
import { sendToUE } from '@/ktJS/UE'
const store = useStore();
import router from "@/router/index.js";
function handleBack() {
  const ueOptions = {
    type: 'back',
    data: {
      ...store.currentFeature,
    },
  }
  // ue4('ueEvent', ueOptions)
  sendToUE('ueEvent', ueOptions)
  console.log('发出信息退出四预',ueOptions);
  // store.clearCurrentFeature()
  // store.setCollapsePanel(false)
  // store.isClickAlarm = false
  // store.isShowAlarm = !store.isCollapsePanel
  // if(store.bootStatus) { // 进入开机或停机流程后返回主页面
  //   router.push('/home') // 页面刷新重定向至首页
  //   store.initAllData()
  // }
  store.isOpenRehearsal = false;
  store.setCurPath("/home");
  store.initAllData();
  router.push("/home");
}

function closeOpenRehearsal(params) {
  store.isOpenRehearsal = false;
}
</script>

<template>
  <div
    class="absolute top-80 right-5 z-[52]"
    :style="{
      right: `${store.currentFeature.id === '9' || store.currentFeature.id === '10' ? '5px' : '416px'}`,
      top: `${store.currentFeature.id === '9' || store.currentFeature.id === '10' ? '80px' : '120px'}`,
    }"
  >
    <img
      class="w-98 h-38 pointer-events-auto cursor-pointer mb-8"
      src="../../assets/img/return_home.webp"
      @click="handleBack"
    />
    <img
      v-if="store.isOpenRehearsal"
      class="w-98 h-38 pointer-events-auto cursor-pointer"
      src="../../assets/img/close_But.webp"
      @click="closeOpenRehearsal"
    />
  </div>
</template>
