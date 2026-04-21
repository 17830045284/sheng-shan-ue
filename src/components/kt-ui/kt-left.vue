<script setup>
import { useStore } from '@/store'
import { Transition } from 'vue';

const store = useStore()

</script>

<template>
  <Transition name="slide-fade">
    <div
      v-if="!store.isCollapsePanel"
      class="absolute w-384 left-20 bottom-40 h-[calc(100%-125px)] grid gap-10 pointer-events-auto"
    >
      <slot></slot>
    </div>
  </Transition>
</template>
