
<template>
    <section class="border-2">
        <div>
            <p>
                完成日期 : {{ finishInfo?.finished_date ? finishInfo?.finished_date : '????/??/??' }}
            </p>
            <div>
                製作過程圖片
                <ul v-for="img in finishInfo?.process_imgs" :key="img">
                    <li>
                        <img :src="getFinishImagePublicUrl(img)" alt="">
                    </li>
                </ul>
            </div>
            <div>
                完成圖片
                <ul v-for="img in finishInfo?.gallery" :key="img">
                    <li>
                        <img :src="getFinishImagePublicUrl(img)" alt="">
                    </li>
                </ul>
            </div>
        </div>
        <div>
            <button @click="showEditPanelHandel">修改</button>
            <div v-show="showEditPanel" class="bg-red-200">
                <div>
                    <label for="modelSize_height">完成日期</label>
                    <input id="modelSize_height" type="date" v-model="editFinishInfo.finished_date">
                </div>
                <div>
                    <label for="model_process_imgs">製作圖片</label>
                    <input type="file" id="model_process_imgs" @change="handleUploadProcessImgs" multiple>
                    <div v-for="img in previewProcessImgs" :key="img">
                        <img :src="img" alt="預覽圖">
                    </div>
                </div>
                <div>
                    <label for="model_finished_imgs">完成圖片</label>
                    <input type="file" id="model_finished_imgs" @change="handleUploadFinishedImgs" multiple>
                    <div v-for="img in previewFinishedImgs" :key="img">
                        <img :src="img" alt="預覽圖">
                    </div>
                </div>
                <button v-if="!finishInfo" @click="fetchAddModelPurchaseInfo">新增完成資料</button>
                <button v-show="finishInfo" class="mr-5" @click="fetchUpdatePurchaseInfo">確認修改</button>
                <button v-show="finishInfo" @click="resetData">重置資料</button>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import useMyModelsAPI from "~/composables/api/useMyModelsAPI"
import { type ModelFinishInfo } from "~/types/model"

const props = defineProps<{
    modelId: number
}>()

const { getModelFinishInfo, addMyModelFinishInfo, updateMyModelFinishInfo } = useMyModelsAPI()
const supabase = useSupabaseClient()
const { getFinishImagePublicUrl } = useSupabase()

const showEditPanel = ref(false)
const finishInfo = ref<ModelFinishInfo>()
const editFinishInfo = ref<ModelFinishInfo>({
})

const previewProcessImgs = ref<string[]>([])
const previewFinishedImgs = ref<string[]>([])

const process_imgs_file_list = ref<FileList>()
const finished_imgs_file_list = ref<FileList>()

init()

async function init() {
    const purchaseInfoRes = await getModelFinishInfo(props.modelId)
    if (!purchaseInfoRes) return
    finishInfo.value = purchaseInfoRes
    resetData()
}
async function fetchUpdatePurchaseInfo() {
    if(finishInfo.value?.gallery?.length || finishInfo.value?.process_imgs?.length){
        //先刪除supabase storage裡原本的圖片
        const promises:Promise<any>[] = []
        if(finishInfo.value?.gallery?.length){
            finishInfo.value?.gallery?.forEach(img=>{
                promises.push(supabase.storage.from('model_finish_info_images').remove([img]))
            })
        }
        if(finishInfo.value?.process_imgs?.length){
            finishInfo.value?.process_imgs?.forEach(img=>{
                promises.push(supabase.storage.from('model_finish_info_images').remove([img]))
            })
        }
        await Promise.all(promises)
    }
    //1.先處理圖片
    editFinishInfo.value.process_imgs = await uploadModelProcessImagesStorage()
    editFinishInfo.value.gallery = await uploadModelGalleryImagesStorage()
    await updateMyModelFinishInfo(props.modelId, editFinishInfo.value)
    await fetchModelFinishInfo()
}

async function fetchAddModelPurchaseInfo() {
    //1.先處理圖片
    editFinishInfo.value.process_imgs = await uploadModelProcessImagesStorage()
    editFinishInfo.value.gallery = await uploadModelGalleryImagesStorage()
    await addMyModelFinishInfo(props.modelId, editFinishInfo.value)
    await fetchModelFinishInfo()
}
async function fetchModelFinishInfo() {
    finishInfo.value = await getModelFinishInfo(props.modelId)
    showEditPanel.value = false
}
function resetData() {
    editFinishInfo.value.gallery = finishInfo.value?.gallery
    editFinishInfo.value.process_imgs = finishInfo.value?.process_imgs
    editFinishInfo.value.description = finishInfo.value?.description
    editFinishInfo.value.finished_date = finishInfo.value?.finished_date
}

function showEditPanelHandel() {
    showEditPanel.value = !showEditPanel.value
}
async function uploadModelProcessImagesStorage(): Promise<any[]> {
    if (!process_imgs_file_list.value?.length) return []

    const paths: any[] = []
    const promises: Promise<any>[] = []
    for (let i = 0; i < process_imgs_file_list.value.length; i++) {
        const fileName = `model_process_imgs_modelId_${props.modelId}_${crypto.randomUUID()}`
        const imgRes = supabase.storage.from("model_finish_info_images").upload(`public/${fileName}`, process_imgs_file_list.value[i])
        promises.push(imgRes)
    }
    const reses = await Promise.allSettled(promises)
    reses.forEach((res: any) => {
        paths.push(res.value.data.path)
    })

    return paths
}
async function uploadModelGalleryImagesStorage(): Promise<any[]> {
    if (!finished_imgs_file_list.value?.length) return []

    const paths: any[] = []
    const promises: Promise<any>[] = []
    for (let i = 0; i < finished_imgs_file_list.value.length; i++) {
        const fileName = `model_finished_imgs_modelId_${props.modelId}_${crypto.randomUUID()}`
        const imgRes = supabase.storage.from("model_finish_info_images").upload(`public/${fileName}`, finished_imgs_file_list.value[i])
        promises.push(imgRes)
    }
    const reses = await Promise.allSettled(promises)
    reses.forEach((res: any) => {
        paths.push(res.value.data.path)
    })

    return paths
}
async function handleUploadProcessImgs(event: InputEvent) {
    const input = event.target as HTMLInputElement
    const files = input.files
    if (files) {
        previewProcessImgs.value.length = 0
        for (let i = 0; i < files.length; i++) {
            const img = files[i]
            if (img.type.startsWith('image/')) {
                const reader = new FileReader()
                reader.onload = (e) => {
                    //預覽圖
                    previewProcessImgs.value.push(e.target?.result as string)
                }
                reader.readAsDataURL(img)
                process_imgs_file_list.value = files
            }
        }
    }
}
async function handleUploadFinishedImgs(event: InputEvent) {
    const input = event.target as HTMLInputElement
    const files = input.files
    if (files) {
        previewFinishedImgs.value.length = 0
        for (let i = 0; i < files.length; i++) {
            const img = files[i]
            if (img.type.startsWith('image/')) {
                const reader = new FileReader()
                reader.onload = (e) => {
                    //預覽圖
                    previewFinishedImgs.value.push(e.target?.result as string)
                }
                reader.readAsDataURL(img)
                finished_imgs_file_list.value = files
            }
        }
    }
}
</script>