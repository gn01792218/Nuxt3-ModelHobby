<template>
    <UModal v-model="isOpen">
        <h1>創建面板</h1>
        <div class="p-4">
            <MyFormGroup label="標題">
                <MyInput placeholder="標題" v-model="finishInfo.title" />
            </MyFormGroup>
            <MyFormGroup label="描述">
                <MyInput placeholder="描述" v-model="finishInfo.description" />
            </MyFormGroup>
            <MyFormGroup label="完成日期">
                <VDatePicker v-model="finishInfo.finished_date" />
                <TimeFormator v-if="finishInfo.finished_date" :date="finishInfo.finished_date" />
            </MyFormGroup>
            <MyFormGroup label="製作圖片">
                <input type="file" id="model_process_imgs"
                    @change="async (e) =>await handleLoadProcessImgsFileList(e, previewProcessImgs)" multiple>
                <div v-for="img, index in previewProcessImgs" :key="img">
                    <NuxtImg :modifiers="{rotate: null}" format="webp" width="200" :src="img" alt="預覽圖"/>
                    <UButton icon="i-heroicons-trash-solid" size="sm" color="red" variant="solid" :trailing="false"
                        @click="deleteProcessUploadImg(index)" />
                </div>
            </MyFormGroup>
            <MyFormGroup label="完成圖片">
                <input type="file" id="model_finished_imgs"
                    @change="async (e) =>await handleLoadGallaryImgsFileList(e, previewGalleryImgs)" multiple>
                <div v-for="img, index in previewGalleryImgs" :key="img">
                    <NuxtImg :modifiers="{rotate: null}" format="webp" width="200" :src="img" alt="預覽圖"/>
                    <UButton icon="i-heroicons-trash-solid" size="sm" color="red" variant="solid" :trailing="false"
                        @click="deleteGalleryUploadImg(index)" />
                </div>
            </MyFormGroup>
            <div class="ml-auto flex">
                <UButton class="block mr-5" label="確認修改" @click="fetchCreateFinishInfo" color="primary" />
                <UButton class="block" label="取消" @click="$emit('close')" color="secondary" variant="outline" />
            </div>
        </div>
    </UModal>
</template>

<script setup lang="ts">
import { useMyModelStore } from '~/store/useMyModelStore';
import useMyModelsAPI from "~/composables/api/useMyModelsAPI"
import { StorageBucket } from "~/types/storage";

const emit = defineEmits(['success', 'close'])
const props = defineProps<{
    isOpen: boolean,
    modelId: number,
}>()

const { setLoadingState } = useMyModelStore()
const { 
    finishInfo,
    previewProcessImgs,
    previewGalleryImgs,
    deleteProcessImgs,
    deleteGalleryImgs,
    process_imgs_file_list, 
    gallery_imgs_file_list ,
    handleLoadProcessImgsFileList, 
    handleLoadGallaryImgsFileList,
    deleteProcessUploadImg,
    deleteGalleryUploadImg
} = useMyModelImg()
const { addMyModelFinishInfo } = useMyModelsAPI()
const { uploadMultipleImagesToS3, processRemoveFinishInfoImgs } = useS3()

const isOpen = computed(() => props.isOpen)

function resetData(){
    finishInfo.value = {
        process_imgs:[],
        gallery:[]
    }
    previewProcessImgs.value = []
    previewGalleryImgs.value = []
}   

async function fetchCreateFinishInfo() {
    setLoadingState(true);
    await fetchUploadImageToCloud();
    emit('success', await addMyModelFinishInfo(props.modelId, finishInfo.value))
    resetData()
}

async function fetchUploadImageToCloud() {
    //先處理要被刪除的圖片(WHY????)
    processRemoveFinishInfoImgs(deleteProcessImgs.value, deleteGalleryImgs.value)
    //再看看有沒有要新上傳的圖片
    if (process_imgs_file_list.value?.length) {
        const newImgUrls = await uploadMultipleImagesToS3(process_imgs_file_list.value, {
            bucketName: StorageBucket.model_finish_info_images,
            modelId: props.modelId!,
            fileNameTitle: 'model_process_img'
        })
        newImgUrls.forEach(imgUrl => finishInfo.value.process_imgs?.push(imgUrl))
        process_imgs_file_list.value.length = 0 //釋放圖片資源
    } 
    if (gallery_imgs_file_list.value?.length) {
        const newImgUrls = await uploadMultipleImagesToS3(gallery_imgs_file_list.value, {
            bucketName: StorageBucket.model_finish_info_images,
            modelId: props.modelId!,
            fileNameTitle: 'model_gallery_img'
        })
        newImgUrls.forEach(imgUrl => finishInfo.value.gallery?.push(imgUrl))
        gallery_imgs_file_list.value.length = 0 //釋放圖片資源
    } 
}
</script>