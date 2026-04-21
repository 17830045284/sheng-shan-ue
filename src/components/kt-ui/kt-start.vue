<script setup>
import { defineProps } from 'vue';
import { useStore } from '@/store';
import { getImg } from '@/utils/assets'
const store = useStore();

const handleClick = () => {
    const ueOptions = {
        type: 'start',
        data: {}
    }
    ue4('ueEvent', ueOptions)
}
</script>

<template>
    <div 
    class="absolute top-180 kt-bg-full bg-[url('@/assets/img/bt_bg.png')] w-98 h-38 cursor-pointer pointer-events-auto kt-flex"
    :style="{right: `${store.isCollapsePanel ? '10px' : '416px'}`}"
    @click="handleClick" 
    >
        <span class="font-['Source_Han_Sans_CN'] font-bold text-[17px] value7">开始</span>
    </div>
</template>

<style lang='less' scoped>
</style>