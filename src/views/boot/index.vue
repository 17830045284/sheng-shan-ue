<script setup>
import { defineProps } from 'vue';
import { useStore } from "../../store";
import { getVideo } from "@/utils/assets";
const store = useStore();
// 开机流程
const bootProcess = [
    {
        id: 1,
        name: '停机状态',
        unitObj: [{
            title: 'H',
            value: '1.50'
        }]
    },
    {
        id: 2,
        name: '开机准备好',
    },
    {
        id: 3,
        name: '主阀全开',
    },
    {
        id: 4,
        name: '转速>起励转速',
        unitObj:[
            {
                title: 'N',
                value: '0.00'
            }
        ]
    },
    {
        id: 5,
        name: '机端电压>70%',
        unitObj: [
            {
                title: 'Uab',
                value: '0.00'
            }
        ]
    },
    {
        id: 6,
        name: '断路器合位',
        unitObj: [
            {
                title: 'P',
                value:  '0.00'
            },
            {
                title: 'Q',
                value: '0.00'
            },
        ]
    },
    {
        id: 7,
        name: '发电状态',
    },
]

// 开机播放视频
const bootVideoUrl = [
    {
        id: 1,
        url: getVideo("1号发电机.mpeg4.aac.mp4")
    },
    {
        id: 2,
        url: getVideo("1号发电机.mpeg4.aac.mp4")
    },
    {
        id: 3,
        url: getVideo("出水口.mpeg4.aac.mp4")
    },
    {
        id: 4,
        url: getVideo("1号发电机.mpeg4.aac.mp4")
    },
    {
        id: 5,
        url: getVideo("1号发电机.mpeg4.aac.mp4")
    },
    {
        id: 6,
        url: getVideo("1号发电机.mpeg4.aac.mp4")
    },
    {
        id: 7,
        url: getVideo("主楼楼顶.mpeg4.aac.mp4")
    },
]
const curVideoUrl = computed(() => {
    return bootVideoUrl.find((item) => item.id === store.curBootId)?.url
})

</script>

<template>
    <div class="kt-full">
        <Transition name="slide-fade">
            <kt-boot-panel :curProcess="bootProcess"/>
        </Transition>
        <kt-boot-button />
        <Transition name="slide-fade-right">
            <kt-video :curVideoUrl="curVideoUrl" />
        </Transition>
    </div>
</template>

<style lang='less' scoped>
</style>