<script setup>
import { useStore } from '../../store'
import { getImg } from '@/utils/assets';
import router from '@/router'
const store = useStore()
const imgUrl = computed(() => {
    return store.bootStatus === 1 ?getImg('outage.webp') :getImg('boot.webp')
}) 

const handleClick = () => {
  if (store.bootStatus === 1) {
    store.bootStatus = 2
    router.push('/halt')
  } else if(store.bootStatus === 2) {
    store.bootStatus = 1
    router.push('/boot')
  }
}

</script>

<template>
  <img
    class="absolute top-170 w-98 h-38 pointer-events-auto cursor-pointer"
    :style="{right: `${store.isCollapsePanel ? '10px' : '416px'}`}"
    :src="imgUrl"
    @click="handleClick"
  />
</template>
