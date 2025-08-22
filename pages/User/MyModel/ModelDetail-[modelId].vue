<template>
    <div class="">
        <!-- <UButton label="webp" color="red" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="allImageToWebp()" /> -->
        <ModelDetialBaseInfo :model-id="modelId" />
        <Divider title="Size Info" icon-name="i-heroicons-rectangle-stack-solid"/>
        <ModelDetialModelSize :model-id="modelId" :current-model="currentModel"/>
        <Divider title="Purchase Info" icon-name="i-heroicons-currency-dollar-20-solid"/>
        <ModelDetialPurchaseInfo :model-id="modelId" :current-model="currentModel"/>
        <Divider title="Finish Info" icon-name="i-heroicons-flag-20-solid"/>
        <ModelDetialFinishInfo :model-id="modelId" :current-model="currentModel"/>
    </div>
</template>

<script setup lang="ts">
import { useMyModelStore } from '~/store/useMyModelStore';

const modelId = Number(useRoute().params.modelId)
const { currentModel } = storeToRefs(useMyModelStore())
const { setCurrentModelId } = useMyModelStore()

initModelDetial()
async function initModelDetial() {
    if (!currentModel.value) setCurrentModelId(modelId)
    console.log(currentModel.value)
}

</script>