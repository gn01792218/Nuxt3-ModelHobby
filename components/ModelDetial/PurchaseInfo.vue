
<template>
    <section>
        <div class="flex">
            <UCard v-for="purchaseInfo in currentModel?.purchase_infos" :key="purchaseInfo.id">
                {{ purchaseInfo.id }}
                <p>
                    購買平台 : {{ purchaseInfo?.e_commerce_name }}
                </p>
                <p>
                    購買價格 : {{ purchaseInfo?.price }} ( {{ purchaseInfo?.currency }} ) / 數量 {{ purchaseInfo.amount }}
                </p>
                <p>
                    購買商家 : {{ purchaseInfo?.shop_name }}
                </p>
                <p>
                    購買日期 :
                    <TimeFormator v-if="purchaseInfo.purchase_date" :date="purchaseInfo.purchase_date"/>
                    <span v-else>????/??/??</span>
                </p>
                <button class="mr-5" @click="openUpdatePanel(purchaseInfo)">修改</button>
                <button class="mr-5" @click="fetchDeletePurchaseInfo(purchaseInfo.id)">刪除</button>
            </UCard>
        </div>
        <div>
            <button @click="showEditPanelHandel">新增購買資訊</button>
            <div v-show="showEditPanel" class="bg-red-200">
                <div>
                    <select name="" id="" v-model="createPurchaseInfo.e_commerce_name">
                        <option :value="Ecommerce.淘寶">淘寶</option>
                        <option :value="Ecommerce.蝦皮">蝦皮</option>
                    </select>
                </div>
                <div>
                    <select name="" id="" v-model="createPurchaseInfo.currency">
                        <option :value="Currency.RMB">RMB</option>
                        <option :value="Currency.TW">TW</option>
                    </select>
                </div>
                <div>
                    <label for="purchase_price">購買價格</label>
                    <input id="purchase_price" type="number" v-model="createPurchaseInfo.price">
                </div>
                <div>
                    <label for="purchase_price">購買數量</label>
                    <input id="purchase_price" type="number" v-model="createPurchaseInfo.amount">
                </div>
                <div>
                    <label for="purchase_shop_name">購買商家</label>
                    <input id="purchase_shop_name" type="text" v-model="createPurchaseInfo.shop_name">
                </div>
                <div>
                    <label for="modelSize_height">購買日期</label>
                    <input id="modelSize_height" type="date" v-model="createPurchaseInfo.purchase_date">
                </div>
                <button class="mr-5" @click="fetchAddModelPurchaseInfo">確認</button>
            </div>
        </div>
    </section>
    <ModelDetialPurchaseInfoUpdateModal
        :is-open="isOpenUpdatePanel"
        :update-purchase-info="updatePurchaseInfo"
        :origin-purchase-info="originUpdatePurchaseInfo"
        @update="fetchUpdate"
        @close="resetData"
    />
</template>

<script setup lang="ts">
import useMyModelsAPI from "~/composables/api/useMyModelsAPI"
import { Ecommerce, Currency, type Model } from "~/types/model"
import { useMyModelStore } from '~/store/useMyModelStore';
import { type PurchaseInfo, type CreatePurchaseInfoRequest } from "~/types/purchaseInfo";
import useMyToast from "~/composables/useMyToast";
const props = defineProps<{
    modelId: number
    currentModel:Model
}>()
const { sendToast } = useMyToast()
const { setLoadingState } = useMyModelStore()
const { updateMyModelPurchaseInfo, addMyModelPurchaseInfo, deleteMyModelPurchaseInfo} = useMyModelsAPI()
const showEditPanel = ref(false)
const isOpenUpdatePanel = ref(false)
const createPurchaseInfo = ref<CreatePurchaseInfoRequest>({
    e_commerce_name: Ecommerce.淘寶,
    currency: Currency.RMB,
    price: 0,
    amount:1
})
const updatePurchaseInfo = ref<PurchaseInfo>()
const originUpdatePurchaseInfo = ref<PurchaseInfo>()

async function openUpdatePanel(purchaseInfo: PurchaseInfo) {
    isOpenUpdatePanel.value = true
    updatePurchaseInfo.value = purchaseInfo
    originUpdatePurchaseInfo.value = {...purchaseInfo} //舊的保留給取消用
}
async function fetchUpdate() {
    setLoadingState(true)
    const purchaseInfo = await updateMyModelPurchaseInfo(updatePurchaseInfo.value?.id!, updatePurchaseInfo.value!)
    setLoadingState(false)
    isOpenUpdatePanel.value = false
    sendToast({
        title: '修改成功',
        icon: "i-heroicons-information-circle",
        color: "green",
        description: `對id為:${purchaseInfo.id}的購買訊息修改成功`
    })
}

async function fetchAddModelPurchaseInfo() {
    setLoadingState(true)
    const purchaseInfo = await addMyModelPurchaseInfo(props.modelId, createPurchaseInfo.value)
    //為該Model添加購買資訊
    props.currentModel?.purchase_infos?.push(purchaseInfo)
    setLoadingState(false)
}
async function fetchDeletePurchaseInfo(purchaseInfoId:number){
    setLoadingState(true)
    const deleteData = await deleteMyModelPurchaseInfo(purchaseInfoId)
    const deleteIndex = props.currentModel?.purchase_infos?.findIndex((info:PurchaseInfo)=> info.id === deleteData.id)
    if(deleteIndex!>=0) props.currentModel?.purchase_infos?.splice(deleteIndex!,1)
    setLoadingState(false)
}
function resetData(originPurchaseInfoId:number) {
    isOpenUpdatePanel.value = false
    const infoList = props.currentModel?.purchase_infos
    const targetDataIndex = infoList?.findIndex((info:PurchaseInfo) => info.id === originPurchaseInfoId)
    if(!targetDataIndex) return 
    if(infoList) infoList[targetDataIndex] = originUpdatePurchaseInfo.value!
}

function showEditPanelHandel() {
    showEditPanel.value = !showEditPanel.value
}
</script>