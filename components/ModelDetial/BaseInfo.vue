<template>
    <section>
        <section>
            <NuxtImg :modifiers="{rotate: null}" format="webp" width="300" :src="getModelMainImagePublicUrl(currentModel?.main_img || '')"/>
            <p>品牌 : {{ currentModel?.brand }} ({{ currentModel?.article_number }})</p>
            <p>比例 : {{ currentModel?.scale }}</p>
            <p class="text-3xl font-extrabold">{{ currentModel?.name_zh }}</p>
            <p class="text-2xl">{{ currentModel?.name_en }}</p>
        </section>
        <div>
            <UButton label="修改" color="primary" @click="showEditPanelHandel()" />
            <UModal v-model="showEditPanel">
            <div class="p-4">
                <MyFormGroup label="狀態">
                    <MySelect v-model="editModel.status" :options="statusOptions" option-attribute="label"
                        value-attribute="value" placeholder="選擇狀態" />
                </MyFormGroup>
                <MyFormGroup label="中文名稱">
                    <MyInput placeholder="中文名稱" v-model="editModel.name_zh" />
                </MyFormGroup>
                <MyFormGroup label="英文名稱">
                    <MyInput placeholder="英文名稱" v-model="editModel.name_en" />
                </MyFormGroup>
                <MyFormGroup label="品牌">
                    <MySelect v-model="editModel.brand" :options="brandOptions" placeholder="選擇品牌" />
                </MyFormGroup>
                <MyFormGroup label="類型">
                    <MySelect v-model="editModel.type" :options="typeOptions" placeholder="選擇類型" />
                </MyFormGroup>
                <MyFormGroup label="比例">
                    <MySelect v-model="editModel.scale" :options="scaleOptions" placeholder="選擇比例" />
                </MyFormGroup>
                <MyFormGroup label="產品編號">
                    <MyInput placeholder="產品編號" v-model="editModel.article_number" />
                </MyFormGroup>
                <MyFormGroup label="封面圖片">
                    <input type="file" id="model_main_img" @change="async (e)=> main_img_file =await handleUploadMutipleImgs(e, ref(previewImg))">
                    <NuxtImg v-show="previewImg[0]" format="webp" width="200" :src="previewImg[0]" alt="預覽圖"/>
                </MyFormGroup>
                <UButton class="mr-5" v-show="currentModel" label="確認修改" color="primary" @click="fetchUpdateModel" />
                <UButton v-show="currentModel" label="重置資料" color="secondary" variant="outline" @click="resetData" />
            </div>
            </UModal>
        </div>
    </section>
</template>

<script setup lang="ts">
import useMyModelsAPI from "~/composables/api/useMyModelsAPI"
import { type Model, ModelStatus, ModelBrand, ModelType, ModelScale } from "~/types/model"
import { useMyModelStore } from '~/store/useMyModelStore';
import { StorageBucket } from "~/types/storage";
const props = defineProps<{
    currentModel: Model
}>()

const { handleUploadMutipleImgs } = useUploadImage()
const { getModelMainImagePublicUrl } = useMyModelImg()
const { uploadMultipleImagesToS3, removeImageFromS3Storage } = useS3()
const { setLoadingState } = useMyModelStore()
const { updateMyModelData } = useMyModelStore()
const { updateMyModel } = useMyModelsAPI()

const showEditPanel = ref(false)

const editModel = ref<Model>({
    ...props.currentModel
})
const previewImg = ref<string[]>([])
const main_img_file = ref<FileList | null>(null)
const statusOptions = Object.keys(ModelStatus).filter(key => isNaN(Number(key))).map(key => ({
    value: ModelStatus[key as keyof typeof ModelStatus],
    label: key
}))
const brandOptions = Object.values(ModelBrand)
const typeOptions = Object.values(ModelType)
const scaleOptions = Object.values(ModelScale)

async function fetchUpdateModel() {
    setLoadingState(true)
    //上傳圖片到supabase storage中, 並獲取要存於DB的路徑string
    if(main_img_file.value){ //假如有上傳圖片的話
        //假如原本有圖片，先刪除
        if (props.currentModel?.main_img) removeImageFromS3Storage({bucketName:StorageBucket.images, url:props.currentModel?.main_img})

        const imgs = await uploadMultipleImagesToS3(main_img_file.value, {
            bucketName: StorageBucket.images,
            modelId: props.currentModel.id!,
            fileNameTitle: 'model_main_img'
        })
        editModel.value.main_img = imgs[0]

        main_img_file.value = null //釋放圖片資源，避免重複上傳
    }
    const updateModel = await updateMyModel(props.currentModel.id, editModel.value)
    updateMyModelData(updateModel)
    showEditPanel.value = false
    setLoadingState(false)
}
function resetData() {
    editModel.value = props.currentModel
}

function showEditPanelHandel() {
    showEditPanel.value = !showEditPanel.value
    editModel.value = props.currentModel
    previewImg.value = [getModelMainImagePublicUrl(props.currentModel?.main_img!)]
}
</script>