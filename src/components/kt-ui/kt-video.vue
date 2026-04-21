<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    curVideoUrl: String
})
const video = ref()

</script>

<template>
  <div
    v-if="curVideoUrl"
    class="absolute top-240 right-10 w-540 h-331 bg-[url('@/assets/img/video_bg.webp')] kt-bg-full px-15 py-11"
  >
    <div class="w-full h-full" >
      <video
        ref="video"
        :src="curVideoUrl"
        autoplay
        muted
        playsinline
        class="w-full h-full"
      ></video>
    </div>
  </div>
</template>
