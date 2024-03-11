<template>
    <UCard class="cursor-pointer"  @click="gottoItem(model.id)">
        <p>{{ model.name_zh }}</p>
        <img class="w-[100px]" :src="getModelImagePublicUrl(model.main_img)" :alt="model.name_zh">
    </UCard>
</template>

<script setup lang="ts">
import { useMyModelStore } from "~/store/useMyModelStore"
import { type Model } from "~/types/model"

defineProps<{
    model:Model,
}>()

const { getModelImagePublicUrl } = useSupabase()

function gottoItem(modelId: number) {
    navigateTo(`/MyModel/ModelDetail-${modelId}`)
}
</script>