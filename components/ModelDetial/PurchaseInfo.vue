
<template>
    <section class="border-2">
        購買歷史資訊
        <div class="flex">
            <UCard v-for="purchaseInfo in myModel?.purchase_infos" :key="purchaseInfo.id">
                {{ purchaseInfo.id }}
                <p>
                    購買平台 : {{ purchaseInfo?.e_commerce_name }}
                </p>
                <p>
                    購買價格 : {{ purchaseInfo?.price }} ( {{ purchaseInfo?.currency }} )
                </p>
                <p>
                    購買商家 : {{ purchaseInfo?.shop_name }}
                </p>
                <p>
                    購買日期 : {{ purchaseInfo?.purchase_date ? purchaseInfo.purchase_date : '????/??/??' }}
                </p>
                <button class="mr-5" @click="fetchUpdatePurchaseInfo(purchaseInfo.id)">確認修改</button>
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
                    <label for="purchase_shop_name">購買商家</label>
                    <input id="purchase_shop_name" type="text" v-model="createPurchaseInfo.shop_name">
                </div>
                <div>
                    <label for="modelSize_height">購買日期</label>
                    <input id="modelSize_height" type="date" v-model="createPurchaseInfo.purchase_date">
                </div>
                <button class="mr-5" @click="fetchAddModelPurchaseInfo">確認</button>
                <!-- <button  @click="resetData">重置資料</button> -->
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import useMyModelsAPI from "~/composables/api/useMyModelsAPI"
import { Ecommerce, Currency, type PurchaseInfo, type Model } from "~/types/model"
import { useMyModelStore } from '~/store/useMyModelStore';
import { type UpdatePurchaseInfoRequest, type CreatePurchaseInfoRequest } from "~/types/purchaseInfo";

const props = defineProps<{
    modelId: number
}>()

const { setLoadingState } = useMyModelStore()
const { myModelList } = storeToRefs(useMyModelStore())
const { updateMyModelPurchaseInfo, addMyModelPurchaseInfo, deleteMyModelPurchaseInfo} = useMyModelsAPI()
const showEditPanel = ref(false)
const createPurchaseInfo = ref<CreatePurchaseInfoRequest>({
    e_commerce_name: Ecommerce.淘寶,
    currency: Currency.RMB,
    price: 0,
})
const myModel = computed(() => {
    return myModelList.value.find((model: Model) => model.id === props.modelId)
})

async function fetchUpdatePurchaseInfo(purchaseInfoId: number) {
    setLoadingState(true)
    const purchaseInfo = await updateMyModelPurchaseInfo(purchaseInfoId, createPurchaseInfo.value)
    myModel.value?.purchase_infos?.find((info: PurchaseInfo) => {
        if (info.id === purchaseInfo.id) info = purchaseInfo
    })
    setLoadingState(false)
}

async function fetchAddModelPurchaseInfo() {
    setLoadingState(true)
    const purchaseInfo = await addMyModelPurchaseInfo(props.modelId, createPurchaseInfo.value)
    //為該Model添加購買資訊
    myModel.value?.purchase_infos?.push(purchaseInfo)
    setLoadingState(false)
}
async function fetchDeletePurchaseInfo(purchaseInfoId:number){
    setLoadingState(true)
    const deleteData = await deleteMyModelPurchaseInfo(purchaseInfoId)
    const deleteIndex = myModel.value?.purchase_infos?.findIndex((info:PurchaseInfo)=> info.id === deleteData.id)
    if(deleteIndex) myModel.value?.purchase_infos?.splice(deleteIndex,1)
    setLoadingState(false)
}
function resetData() {
    // editPurchaseInfo.value.e_commerce_name = purchaseInfos.value?.e_commerce_name!
    // editPurchaseInfo.value.currency = purchaseInfos.value?.currency!
    // editPurchaseInfo.value.price = purchaseInfos.value?.price!
    // editPurchaseInfo.value.shop_name = purchaseInfos.value?.shop_name
    // editPurchaseInfo.value.purchase_date = purchaseInfos.value?.purchase_date
}

function showEditPanelHandel() {
    showEditPanel.value = !showEditPanel.value
}
</script>