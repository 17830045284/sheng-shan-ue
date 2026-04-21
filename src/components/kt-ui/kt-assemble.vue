<script setup>
import { defineProps } from 'vue';
import { useStore } from '@/store';
import { getImg } from '@/utils/assets'
import { sendToUE } from '@/ktJS/UE'
const store = useStore();
const props = defineProps({});
const data = [
    {
        id: 1,
        name: '拆分',
        img: getImg('split.webp'),
        img_active: getImg('split_active.webp')
    },
    {
        id: 2,
        name: '组装',
        img: getImg('assemble.webp'),
        img_active: getImg('assemble_active.webp')
    }
]
const handleClick = (item) => {
    store.setShowStatus(item.id)
    const ueOptions = {
    type: 'split_button',
    data: {
        id: item.id,
        name: item.name,
    },
    }
    sendToUE('ueEvent', ueOptions)
    // ue4('ueEvent', ueOptions)
}
</script>

<template>
    <div 
    class="absolute top-180 grid grid-rows-2 grid-cols-1 gap-10"
    :style="{right: `${store.isCollapsePanel ? '10px' : '416px'}`}"
    >
        <img 
        v-for="item in data" 
        :key="item.id" 
        :src="item.id === store.showStatus? item.img_active : item.img"
        class="w-92 h-35 cursor-pointer pointer-events-auto"
        @click="handleClick(item)" 
        />
    </div>
</template>

<style lang='less' scoped>
</style>