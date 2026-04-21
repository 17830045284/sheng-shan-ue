<script setup>
import { defineProps } from 'vue'
import { getImg } from '@/utils/assets'
const props = defineProps({
  type: String,
  name: String,
  value: Number,
  percent: String,
})
const bgUrl = getImg(`gj${props.type}.webp`)
</script>

<template>
  <div
    :class="['w-[107px] h-[42px] relative kt-bg-full']"
    :style="{ backgroundImage: `url(${bgUrl})` }"
  >
    <p
      class="font-['Source_Han_Sans_CN'] font-[500] text-[12px] text-[#fff] leading-[17px] tracking-[1px] absolute top-[2px] left-[10px]"
    >
      {{ props.name }}
    </p>
    <div
      class="absolute top-[23px] left-[8px] right-[10px] flex justify-between items-center"
    >
      <span
        class="Regular font-normal text-[16px] text-[#F9FDFF] tracking-[1px] leading-[19px]"
        >{{ props.value }}</span
      >
      <span
        class="font-['Source_Han_Sans_CN'] font-bold text-[12px] text-[#F9FDFF] tracking-[1px] leading-[14px]"
        >{{ props.percent }}</span
      >
    </div>
  </div>
</template>

<style lang="less" scoped></style>
