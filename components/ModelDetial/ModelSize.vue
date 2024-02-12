
<template>
    <section>
        <div>
            <p>
                長{{ modelSize?.length ? modelSize.length : '?' }}{{ modelSize?.unit }}
            </p>
            <p>
                寬{{ modelSize?.width ? modelSize.width : '?' }}{{ modelSize?.unit }}
            </p>
            <p>
                高{{ modelSize?.height ? modelSize.height : '?' }}{{ modelSize?.unit }}
            </p>
        </div>
        <div>
            <button @click="showEditPanelHandel">修改</button>
            <div v-show="showEditPanel" class="bg-red-200">
                <div>
                    <select name="" id="" v-model="editSize.unit">
                        <option :value="SizeUnit.MM">mm</option>
                        <option :value="SizeUnit.CM">cm</option>
                    </select>
                </div>
                <div>
                    <label for="modelSize_length">長</label>
                    <input id="modelSize_length" type="number" v-model="editSize.length">
                </div>
                <div>
                    <label for="modelSize_width">寬</label>
                    <input id="modelSize_width" type="number" v-model="editSize.width">
                </div>
                <div>
                    <label for="modelSize_height">高</label>
                    <input id="modelSize_height" type="number" v-model="editSize.height">
                </div>
                <button v-if="!modelSize" @click="fetchAddModelSize">新增Size資料</button>
                <button v-show="modelSize" class="mr-5" @click="fetchUpdateSize">確認修改</button>
                <button v-show="modelSize" @click="setOriginData">重置資料</button>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import useMyModelsAPI from "~/composables/api/useMyModelsAPI"
import { type ModelSize, SizeUnit, type Model } from "~/types/model"
import { useMyModelStore } from '~/store/useMyModelStore';

const props = defineProps<{
    modelId: number,
    currentModel:Model
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
init()
async function init(){
    modelSize.value = props.currentModel?.size
    setOriginData()
}
async function fetchUpdateSize() {
    setLoadingState(true)
    props.currentModel.size = await updateMyModelsSize(props.modelId, editSize.value)
    modelSize.value = props.currentModel.size
    showEditPanel.value=false
    setLoadingState(false)
}

async function fetchAddModelSize(){
    setLoadingState(true)
    props.currentModel.size = await addMyModelsSize(props.modelId, editSize.value)
    modelSize.value = props.currentModel.size
    showEditPanel.value=false
    setLoadingState(false)
}

function setOriginData() {
    editSize.value = modelSize.value!
}

function showEditPanelHandel() {
    showEditPanel.value = !showEditPanel.value
}
</script>