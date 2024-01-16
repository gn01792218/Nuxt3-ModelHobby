<template>
    <ModelDetialBaseInfo :model-id="modelId" />
    <ModelDetialModelSize :model-id="modelId" />
    <ModelDetialPurchaseInfo :model-id="modelId" />
    <ModelDetialFinishInfo :model-id="modelId" />
</template>

<script setup lang="ts">
import useMyModelsAPI from '~/composables/api/useMyModelsAPI';
import { useMyModelStore } from '~/store/useMyModelStore';
import { type Model, type ModelSize, type PurchaseInfo } from '~/types/model';

const modelId = Number(useRoute().params.modelId)
const { myModelList } = storeToRefs(useMyModelStore())
const { getModelSize, getModelPurchaseInfo, updateMyModelsSize, updateMyModelPurchaseInfo } = useMyModelsAPI()
const { fetchMyModels } = useFetchMyModels()

const purchaseInfo = ref<PurchaseInfo>()

initModelDetial()
async function initModelDetial() {
    if (!myModelList.value.length) fetchMyModels()
}
</script>