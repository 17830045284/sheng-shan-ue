<script setup>
const props = defineProps({});
</script>

<template>
  <div :class="['bottom', 'animate__animated  animate__fadeIn']">
    <slot></slot>
  </div>
</template>

<style lang="less" scoped>
.bottom {
  grid-template-rows: 1fr;
  display: grid;
  width: 100%;
  background: rgba(19, 22, 24, 0.4);
  height: 300px;
  padding: 24px 40px;
  column-gap: 65px;
  pointer-events: all;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 2;
}
</style>
