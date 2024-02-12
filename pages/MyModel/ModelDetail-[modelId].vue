<template>
    <div class="p-10">
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
const { myModelList, currentModel } = storeToRefs(useMyModelStore())
const { setCurrentModelId } = useMyModelStore()
const { fetchMyModels } = useFetchMyModels()

initModelDetial()
async function initModelDetial() {
    setCurrentModelId(modelId)
    if (!myModelList.value.length) fetchMyModels()
}
</script>