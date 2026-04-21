<script setup>
import { defineProps } from 'vue'
const props = defineProps({})
const info = ref([
  {
    name: '机组数量',
    value: '3',
    marginLeft: '60px',
    unit: '台',
  },
  {
    name: '总装机容量',
    value: '10500',
    marginLeft: '40px',
    unit: 'kW',
  },
  {
    name: '安全运行天数',
    value: '651',
    marginLeft: '20px',
    unit: '天',
  },
  {
    name: '安全评分等级',
    value: '安全评分一级电站',
    marginLeft: '20px',
    unit: '',
  },
  {
    name: '是否认证绿色',
    value: '绿色小水电示范电站',
    marginLeft: '20px',
    unit: '',
  },
])
</script>

<template>
  <div
    class="text-[#fff] absolute top-[110px] left-[20px] h-[328px] bg-[url('@/assets/img/circle.png')] bg-no-repeat"
  >
    <div
      class="mb-[40px] font-['PangMenZhengDao'] font-normal num"
      v-for="(item, index) in info"
      :key="index"
    >
      <span
        class="ml-[15px] text-[#fff] leading-[23px] tracking-[1px] text-[20px]"
        >{{ item.name }}</span
      >
      <span
        class="gradient1 text-[24px] text-[#F0F09E] leading-[28px] tracking-[1px]"
        :style="{
          'font-size': index < 3 ? '32px' : '24px',
          'font-family': index < 3 ? 'WD-XL Lubrifont JP N' : 'PangMenZhengDao',
          'margin-left': item.marginLeft,
        }"
        >{{ item.value }}</span
      >
      <span
        class="ml-[7px] font-['Source_Han_Sans_CN'] text-[16px] text-[#F0F09E]"
        >{{ item.unit }}</span
      >
    </div>
  </div>
</template>

<style lang="less" scoped>
.gradient1 {
  background: linear-gradient(to bottom, #fffff8 5%, #f0f09e 60%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.gradient2 {
  background: linear-gradient(
    to bottom,
    #fffff8 0%,
    rgba(255, 255, 248, 0.51) 49%,
    #f0f09e 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
