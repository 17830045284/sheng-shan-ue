<script setup>
import { useStore } from "../../store";
import YuYan from "./components/YuYan.vue";
import YuAn from "./components/YuAn.vue";
import YuJing from "./components/YuJing.vue";
import YuCe from "@/views/electromechanical-equipment/components/YuCe.vue";
const store = useStore();

store.setCurPath("/electromechanical-equipment");
if (!store.currentFeature?.id) {
  store.setCurrentFeature({
    id: "7",
    name: "预警",
  });
}
</script>

<template>
  <div class="w-full h-full z-10 absolute top-0 pt-110">
    <YuJing v-if="store.currentFeature.id === '7'" />
    <YuYan v-else-if="store.currentFeature.id === '9'" />
    <YuAn v-else-if="store.currentFeature.id === '10'" />
    <YuCe v-else-if="store.currentFeature.id === '8'"/>
  </div>
</template>

<style lang="less" scoped></style>
