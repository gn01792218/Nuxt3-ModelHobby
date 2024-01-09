<template>
    <section>
        <p>{{ modelId }}</p>
        <p>{{ model?.name_zh }}</p>
        <p>{{ model?.name_en }}</p>
    </section>
    <ModelDetialModelSize
        :model-id="modelId"
        :model-size="modelSize"
    />
    <section class="border-2">
        <p>
            購買平台 : {{ purchaseInfo?.e_commerce_name }}
        </p>
        <p>
            購買商家 : {{ purchaseInfo?.shop_name }}
        </p>
        <p>
            購買價格 : {{ purchaseInfo?.price }} ( {{ purchaseInfo?.currency }} )
        </p>
        <p>
            購買日期 : {{ purchaseInfo?.purchase_date }}
        </p>
    </section>
</template>

<script setup lang="ts">
import useMyModelsAPI from '~/composables/api/useMyModelsAPI';
import { useMyModelStore } from '~/store/useMyModelStore';
import { type Model, type ModelSize, type PurchaseInfo } from '~/types/model';

const  modelId  = Number(useRoute().params.modelId)
const { myModelList } = storeToRefs(useMyModelStore())
const { getModelSize, getModelPurchaseInfo, updateMyModelsSize, updateMyModelPurchaseInfo } = useMyModelsAPI()
const { fetchMyModels } = useFetchMyModels()
const model = computed<Model>(()=>{
    return myModelList.value.find(model => model.id === modelId) as Model
})
const purchaseInfo = ref<PurchaseInfo>()

initModelDetial()
async function initModelDetial(){
    if(!myModelList.value.length) fetchMyModels()
    purchaseInfo.value = await getModelPurchaseInfo(modelId)
}
</script>