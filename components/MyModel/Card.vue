<template>
  <div class="flex justify-center items-center cursor-pointer" @click="navigateTo(`MyModel/ModelDetail-${modelData.id}`)">
    <div>
        <img v-if="modelData.imgs" :src="modelData.imgs[0]" :alt="modelData.name.zh">
        <img v-else src="" alt="">
    </div>
    <div>
        <p>{{ modelData.name.zh }}</p>
        <p v-if="modelData.scale">{{ modelData.scale }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type Model } from "~/types/model"

const props = defineProps<{
    modelData:Model
}>()
</script>