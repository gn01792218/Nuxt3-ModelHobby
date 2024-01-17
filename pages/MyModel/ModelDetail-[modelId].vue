<template>
    <ModelDetialBaseInfo :model-id="modelId" />
    <ModelDetialModelSize :model-id="modelId" />
    <ModelDetialPurchaseInfo :model-id="modelId" />
    <ModelDetialFinishInfo :model-id="modelId" />
</template>

<script setup lang="ts">
import { useMyModelStore } from '~/store/useMyModelStore';

const modelId = Number(useRoute().params.modelId)
const { myModelList } = storeToRefs(useMyModelStore())
const { fetchMyModels } = useFetchMyModels()

initModelDetial()
async function initModelDetial() {
    if (!myModelList.value.length) fetchMyModels()
}
</script>