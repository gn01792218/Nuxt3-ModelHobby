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
// const { overrideSupabaseStorageImg, getFinishImagePublicUrl, getModelImagePublicUrl } = useSupabase()

initModelDetial()
async function initModelDetial() {
    if (!currentModel.value) setCurrentModelId(modelId)
}
// function allImageToWebp(){
//     //1.處理主照片
//     if(currentModel.value?.main_img) overrideSupabaseStorageImg(currentModel.value?.main_img, getModelImagePublicUrl(currentModel.value?.main_img))
//     //2.處理完成照片
//     currentModel.value?.finish_infos.forEach(f=>{
//         f.gallery.forEach(g=>overrideSupabaseStorageImg(g, getFinishImagePublicUrl(g)))
//         f.process_imgs.forEach(p=>overrideSupabaseStorageImg(p, getFinishImagePublicUrl(p)))
//     })
// }
</script>