<template>
    <section>
        <div>
            <p>
                長{{ currentModel?.size?.length ? currentModel?.size.length : '?' }}{{ currentModel?.size?.unit }}
            </p>
            <p>
                寬{{ currentModel?.size?.width ? currentModel?.size.width : '?' }}{{ currentModel?.size?.unit }}
            </p>
            <p>
                高{{ currentModel?.size?.height ? currentModel?.size.height : '?' }}{{ currentModel?.size?.unit }}
            </p>
        </div>
        <div>
            <UButton label="修改" color="primary" @click="showEditPanelHandel(currentModel?.size!)" />
            <UModal v-model="showEditPanel">
            <div class="p-4">
                <UFormGroup label="單位">
                    <USelect v-model="editSize.unit" :options="unitOptions" placeholder="選擇單位" />
                </UFormGroup>
                <UFormGroup label="長">
                    <UInput type="number" placeholder="長" v-model="editSize.length" />
                </UFormGroup>
                <UFormGroup label="寬">
                    <UInput type="number" placeholder="寬" v-model="editSize.width" />
                </UFormGroup>
                <UFormGroup label="高">
                    <UInput type="number" placeholder="高" v-model="editSize.height" />
                </UFormGroup>
                <UButton v-if="!modelSize" label="新增Size資料" color="primary" @click="fetchAddModelSize" />
                <UButton v-show="modelSize" class="mr-5" label="確認修改" color="primary" @click="fetchUpdateSize" />
                <UButton v-show="modelSize" label="重置資料" color="secondary" variant="outline" @click="setOriginData" />
            </div>
            </UModal>
        </div>
    </section>
</template>

<script setup lang="ts">
import useMyModelsAPI from "~/composables/api/useMyModelsAPI"
import { type ModelSize, SizeUnit, type Model } from "~/types/model"
import { useMyModelStore } from '~/store/useMyModelStore';

const props = defineProps<{
    currentModel: Model
}>()
const { setLoadingState } = useMyModelStore()
const { updateMyModelsSize, addMyModelsSize } = useMyModelsAPI()
const showEditPanel = ref(false)
const modelSize = ref<ModelSize>()
const editSize = ref<ModelSize>({
    unit: SizeUnit.MM,
    width: 0,
    height: 0,
    length: 0
})
const unitOptions = [SizeUnit.MM, SizeUnit.CM]

async function fetchUpdateSize() {
    setLoadingState(true)
    props.currentModel.size = await updateMyModelsSize(props.currentModel.id, editSize.value)
    modelSize.value = props.currentModel.size
    showEditPanel.value=false
    setLoadingState(false)
}

async function fetchAddModelSize(){
    setLoadingState(true)
    props.currentModel.size = await addMyModelsSize(props.currentModel.id, editSize.value)
    modelSize.value = props.currentModel.size
    showEditPanel.value=false
    setLoadingState(false)
}

function setOriginData(modelSize:ModelSize) {
    editSize.value = modelSize
}

function showEditPanelHandel(size:ModelSize) {
    showEditPanel.value = !showEditPanel.value
    if(props.currentModel?.size) modelSize.value = props.currentModel?.size
    setOriginData(size)
}
</script>