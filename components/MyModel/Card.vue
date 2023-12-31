<template>
  <div class="flex justify-center items-center cursor-pointer" @click="navigateTo(`MyModel/ModelDetail-${modelData.id}`)">
    <div>
        <img v-if="modelData.imgs" :src="modelData.imgs[0]" :alt="modelData.name_zh">
        <img v-else src="" alt="">
    </div>
    <div>
        <p>{{ modelData.name_zh }}</p>
        <p>{{ modelData.name_en }}</p>
        <p v-if="modelData.scale">{{ modelData.scale }}</p>
    </div>
    <div>
      <button class="border-2 p-5" @click="fetchDeleteMyModel"> - 刪除</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type Model } from "~/types/model"
import useFetchMyModels from "~/composables/api/useFetchMyModels"

const props = defineProps<{
    modelData:Model
}>()

const { deleteMyModels } = useFetchMyModels()

async function fetchDeleteMyModel(){
  deleteMyModels(props.modelData.id!)
}
</script>