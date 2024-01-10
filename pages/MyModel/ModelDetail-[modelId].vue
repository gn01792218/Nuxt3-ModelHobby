<template>
    <section>
        <img :src="`${supabaseBaseUrl}/storage/v1/object/public/images/${model.main_img}`" alt="">
        <p>{{ modelId }}</p>
        <p>{{ model?.name_zh }}</p>
        <p>{{ model?.name_en }}</p>
    </section>
    <ModelDetialModelSize
        :model-id="modelId"
    />
   <ModelDetialPurchaseInfo
    :model-id="modelId"
   /> 
</template>

<script setup lang="ts">
import useMyModelsAPI from '~/composables/api/useMyModelsAPI';
import { useMyModelStore } from '~/store/useMyModelStore';
import { type Model, type ModelSize, type PurchaseInfo } from '~/types/model';

const  modelId  = Number(useRoute().params.modelId)
const { myModelList } = storeToRefs(useMyModelStore())
const { supabaseBaseUrl } = useSupabase()
const { getModelSize, getModelPurchaseInfo, updateMyModelsSize, updateMyModelPurchaseInfo } = useMyModelsAPI()
const { fetchMyModels } = useFetchMyModels()
const model = computed<Model>(()=>{
    return myModelList.value.find(model => model.id === modelId) as Model
})
const purchaseInfo = ref<PurchaseInfo>()

initModelDetial()
console.log(`${supabaseBaseUrl}/storage/v1/object/sign/images/${model.value.main_img}`)
async function initModelDetial(){
    if(!myModelList.value.length) fetchMyModels()
}
</script>