<script setup>
import { useStore } from '@/store'

const store = useStore()
</script>

<template>
  <div
    class="w-390 text-white flex flex-col gap-15 absolute left-18 bottom-51 pointer-events-auto"
  >
    <div
      class="bg-[url(@/assets/img/bar1.webp)] kt-bg-full w-full h-95 flex justify-around pt-30 text-[14px]"
    >
      <div class="flex justify-center items-center">
        <img src="../../assets/img/shandian.webp" class="w-58 h-58" />
        <ul class="text-white flex flex-col -ml-10">
          <li>日发电量</li>
          <li>
            <span>6.22万</span>
            <span>kwh</span>
          </li>
        </ul>
      </div>

      <div class="flex justify-center items-center">
        <img src="../../assets/img/shandian.webp" class="w-58 h-58" />
        <ul class="text-white flex flex-col -ml-10">
          <li>月发电量</li>
          <li>
            <span>670.53万</span>
            <span>kwh</span>
          </li>
        </ul>
      </div>

      <div class="flex justify-center items-center">
        <img src="../../assets/img/shandian.webp" class="w-58 h-58" />
        <ul class="text-white flex flex-col -ml-10">
          <li>年发电量</li>
          <li>
            <span>2529.46万</span>
            <span>kwh</span>
          </li>
        </ul>
      </div>
    </div>

    <div
      class="bg-[url(@/assets/img/bar2.webp)] kt-bg-full w-full h-95 pt-30 flex flex-col justify-around px-10"
    >
      <div class="flex justify-between">
        <span>1#电站</span>
        <span>2024-07-01 15:00:00</span>
      </div>
      <div class="flex justify-between">
        <span class="warn-value">温度过高</span>
        <img
          src="../../assets/img/baogao.webp"
          class="w-104 h-30 cursor-pointer"
          @click="store.isShowDiagnosticReport = true"
        />
      </div>
    </div>
  </div>
</template>
