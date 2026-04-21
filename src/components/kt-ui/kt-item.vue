<script setup>
import { getImg } from "@/utils/assets";
const props = defineProps({
  type: {
    type: String,
    default: "1",
  },
  title: String,
  px: {
    type: Number,
    default: 0,
  },
  isOverHide: {
    type: Boolean,
    default: true,
  },
});
const bgUrl = getImg(`item${props.type}.webp`);
</script>

<template>
  <div
    :class="['w-full h-full relative kt-bg-full']"
    :style="{ backgroundImage: `url(${bgUrl})` }"
  >
    <div class="w-full h-full relative">
      <span
        class="absolute -top-1 left-52 font-['PangMenZhengDao'] font-normal text-[22px] text-[#fff] tracking-[1px] value8"
        >{{ title }}</span
      >
      <div
        class="h-[calc(100%-48px)] bottom-8 w-[calc(100%-20px)] left-10 absolute"
        :style="{
          paddingLeft: `${props.px}px`,
          paddingRight: `${props.px}px`,
          overflow: props.isOverHide ? 'hidden' : 'visible',
        }"
      >
        <slot></slot>
      </div>
    </div>
  </div>
</template>
