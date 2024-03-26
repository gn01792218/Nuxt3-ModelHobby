<template>
    <UCard class="cursor-pointer"  @click="navergateToGallery(model.id)">
        <p>{{ model.name_zh }}</p>
        <img class="w-[100px]" :src="getModelImagePublicUrl(model.main_img)" :alt="model.name_zh">
    </UCard>
</template>

<script setup lang="ts">
import { type Model } from "~/types/model"

defineProps<{
    model:Model,
}>()

const { getModelImagePublicUrl } = useSupabase()
const { navergateToGallery } = useMyModel()

</script>