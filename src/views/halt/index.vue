<script setup>
import { defineProps } from 'vue';
import { useStore } from "../../store";
import { getVideo } from "@/utils/assets";
const store = useStore();
// 停机流程
const outageProcess = [
    {
        id: 1,
        name: '发电状态',
    },
    {
        id: 2,
        name: '断路器分位',
    },
    {
        id: 3,
        name: '电压<5%',
    },
    {
        id: 4,
        name: '开度全关',
        unitObj:[
            {
                title: 'KD',
                value: '64.87'
            }
        ]
    },
    {
        id: 5,
        name: '转速<制动转速',
    },
    {
        id: 6,
        name: '转速N<5%Ne',
    },
    {
        id: 7,
        name: '停机状态',
    },
]
// 停机播放视频
const outageVideoUrl = [
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
        url: getVideo("1号发电机.mpeg4.aac.mp4")
    },
    {
        id: 4,
        url: getVideo("出水口.mpeg4.aac.mp4")
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
        url: getVideo("1号发电机.mpeg4.aac.mp4")
    },
]
const curVideoUrl = computed(() => {
    return outageVideoUrl.find((item) => item.id === store.curBootId)?.url
})
</script>

<template>
    <div class="kt-full">
        <Transition name="slide-fade">
            <kt-boot-panel :curProcess="outageProcess"/>
        </Transition>
        <kt-boot-button />
        <Transition name="slide-fade-right">
            <kt-video :curVideoUrl="curVideoUrl" />
        </Transition>
    </div>
</template>

<style lang='less' scoped>
</style>