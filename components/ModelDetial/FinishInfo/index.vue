<template>
    <button @click="processAddFinishInfo">新增完成資料</button>
    <section v-for="finish_info in currentModel.finish_infos" :key="finish_info.id">
        <div>
            <p>{{ finish_info.title }}</p>
            <p>{{ finish_info.description }}</p>
            <p>
                完成日期 : <TimeFormator v-if="finish_info.finished_date" :date="finish_info.finished_date" /><span v-else>?????</span>
            </p>
            <div>
                製作過程圖片
                <ul v-for="img in finish_info?.process_imgs" :key="img">
                    <li>
                        <NuxtImg loading="lazy" :modifiers="{rotate: null}" class="object-cover" format="webp" width="300" :src="getFinishImagePublicUrl(img)"/>
                    </li>
                </ul>
            </div>
            <div>
                完成圖片
                <ul v-for="img in finish_info?.gallery" :key="img">
                    <li>
                        <NuxtImg loading="lazy" :modifiers="{rotate: null}" class="object-cover" format="webp" width="300" :src="getFinishImagePublicUrl(img)"/>
                    </li>
                </ul>
            </div>
        </div>
        <div>
            <button class="mr-2" @click="processUpdateFinishInfo(finish_info)">修改</button>
            <button @click="fetchDeleteFinishInfo(finish_info.id)">刪除</button>
        </div>
    </section>
    <ModelDetialFinishInfoCreateModal :is-open="openCreatePanel" :model-id="modelId"
        @close="openCreatePanel = false" @success="onCreateFinishInfoSuccess" />
    <ModelDetialFinishInfoUpdateModal :is-open="openUpdatePanel" :model-id="modelId" :finish-info="updateFinishInfo"
        @close="openUpdatePanel = false"  @success="onUpdateFinishInfoSuccess" />
</template>

<script setup lang="ts">
import useMyModelsAPI from "~/composables/api/useMyModelsAPI"
import { type Model } from "~/types/model"
import { StorageBucket } from "~/types/supabase"
import { type ModelFinishInfo, type UpdateFinishInfoRequest } from "~/types/finishInfo"
import { useMyModelStore } from '~/store/useMyModelStore';

const props = defineProps<{
    modelId: number,
    currentModel: Model
}>()

const { setLoadingState } = useMyModelStore()
const { deleteMyModelFinishInfo } = useMyModelsAPI()
const { getFinishImagePublicUrl, removeImageFromSupabaseStorage } = useSupabase()

// 以下是修改面板的資訊
const openCreatePanel = ref(false)
const openUpdatePanel = ref(false)
const updateFinishInfo = ref<UpdateFinishInfoRequest | null>(null)

async function processAddFinishInfo() {
    openCreatePanel.value = true
}
async function processUpdateFinishInfo(updateTarget:ModelFinishInfo) {
    openUpdatePanel.value = true
    updateFinishInfo.value = updateTarget
}
async function fetchDeleteFinishInfo(id: number) {
    setLoadingState(true)
    const deleteFinishInfo = await deleteMyModelFinishInfo(id)
    processRemoveSupabaseImgs(deleteFinishInfo);
    const deleteIndex = props.currentModel?.finish_infos?.findIndex((info: ModelFinishInfo) => info.id === deleteFinishInfo.id)
    if (deleteIndex! >= 0) props.currentModel?.finish_infos?.splice(deleteIndex!, 1)
    setLoadingState(false)
}
function processRemoveSupabaseImgs(deleteFinishInfo: ModelFinishInfo) {
  deleteFinishInfo.process_imgs.forEach((img: string) => removeImageFromSupabaseStorage(StorageBucket.model_finish_info_images, img));
  deleteFinishInfo.gallery.forEach((img: string) => removeImageFromSupabaseStorage(StorageBucket.model_finish_info_images, img));
}

async function onCreateFinishInfoSuccess(finish_info: ModelFinishInfo) {
    props.currentModel.finish_infos.push(finish_info)
    openCreatePanel.value = false
    setLoadingState(false)
}
async function onUpdateFinishInfoSuccess() {
    openUpdatePanel.value = false
    setLoadingState(false)
}
</script>