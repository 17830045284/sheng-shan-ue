<script setup>
import { getImg } from "@/utils/assets";
import { useStore } from "@/store";
import router from "@/router";
import { sendToUE } from '@/ktJS/UE'

const store = useStore();
const featureButton = [
  {
    id: "16",
    name: "四预功能",
  },
  {
    id: "1",
    name: "场景漫游",
  },
  {
    id: "3",
    name: "视频监控",
  },
  {
    id: "4",
    name: "视频融合",
  },
  {
    id: "6",
    name: "发电流程",
  },
  {
    id: "12",
    name: "开机流程",
  },
  {
    id: "13",
    name: "停机流程",
  },
  {
    id: "14",
    name: "设备拆解",
  },
  {
    id: "15",
    name: "设备分层",
  },
  {
    id: "5",
    name: "无人机巡检",
  },
];
const videoButton = [
  {
    id: 1,
    name: "开机流程",
  },
  {
    id: 2,
    name: "停机流程",
  },
];

function handleFeature(item) {
  // const ueOptions = {
  //   type: 'feature_button',
  //   data: {
  //     ...item,
  //   },
  // }
  // store.setCurrentFeature(item)
  // store.isShowFeatureButton = false
  // store.isShowAlarm = false
  // if(!['12', '13'].includes(item.id)) {
  //   store.setCollapsePanel(true)
  //   ue4('ueEvent', ueOptions)
  //   if (item.id === '16' ) { // 四预
  //     router.push('/four-preview')
  //     store.setCurrentFeature({
  //       id: '17',
  //       name: '预报',
  //     })
  //     store.setCollapsePanel(false)
  //     store.isShowFeatureButton = false
  //     store.isShowBackButton  = false
  //   }
  // } else { // 开机关机流程
  //   let curBt = item.id === '12'? 0 : 1
  //   handleVedio(videoButton[curBt])
  // }
  
  const ueOptions = {
    type: 'feature_button',
    data: {
      ...item,
    },
  }
  // ue4('ueEvent', ueOptions)
  sendToUE('ueEvent', ueOptions)
  console.log('发送了信息',ueOptions);
  if (item.id === "16") {
    store.setCurrentFeature({
      id: "7",
      name: "预警",
    });
    router.push("/building-structure");
  }
}

function handleVedio(bt) {
  store.bootStatus = bt.id;
  store.curBootId = 1;
  store.setCollapsePanel(true);
  store.isShowFeatureButton = false;
  // store.isShowAlarm = false
  if (bt.id === 1) {
    router.push("/boot");
  } else if (bt.id === 2) {
    router.push("/halt");
  }
}
</script>

<template>
  <ul
    class="absolute flex flex-col bottom-80 gap-10"
    :style="{ right: `${store.isCollapsePanel ? '10px' : '416px'}` }"
  >
    <li
      v-for="item in featureButton"
      :key="item.id"
      class="w-128 h-38 pointer-events-auto cursor-pointer flex"
    >
      <img
        :src="
          store.currentFeature.id === item.id
            ? `${getImg(`b${item.id}_active.webp`)}`
            : `${getImg(`b${item.id}.webp`)}`
        "
        class="menu pointer"
        @click="handleFeature(item)"
      />
    </li>
  </ul>
  <!-- <div 
  class="absolute bottom-30" v-if="store.currentFeature.id === '11' && !store.bootStatus"
  :style="{right: `${store.isCollapsePanel ? '150px' : '650px'}`}">
    <div
    class="w-73 h-25 kt-bg-full mb-6 kt-flex cursor-pointer bg-[url('@/assets/img/boot_bg.webp')] hover:bg-[url('@/assets/img/boot_active_bg.webp')]"
    v-for="bt in videoButton"
    @click="handleVedio(bt)"
    :key="bt.id"
    >
    <span class="font-['Source_Han_Sans_CN'] font-[400] text-[14px] text-[#BFE0FF]" >{{ bt.name }}</span>
    </div>
  </div> -->
</template>
