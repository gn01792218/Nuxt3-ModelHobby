
<template>
    <section class="border-2">
        <div>
            <p>
                購買平台 : {{ purchaseInfo?.e_commerce_name}}
            </p>
            <p>
                購買價格 : {{ purchaseInfo?.price }} ( {{ purchaseInfo?.currency }} )
            </p>
            <p>
                購買商家 : {{ purchaseInfo?.shop_name }}
            </p>
            <p>
                購買日期 : {{ purchaseInfo?.purchase_date? purchaseInfo.purchase_date : '????/??/??' }}
            </p>
        </div>
        <div>
            <button @click="showEditPanelHandel">修改</button>
            <div v-show="showEditPanel" class="bg-red-200">
                <div>
                    <select name="" id="" v-model="editPurchaseInfo.e_commerce_name">
                        <option :value="Ecommerce.淘寶">淘寶</option>
                        <option :value="Ecommerce.蝦皮">蝦皮</option>
                    </select>
                </div>
                <div>
                    <select name="" id="" v-model="editPurchaseInfo.currency">
                        <option :value="Currency.RMB">RMB</option>
                        <option :value="Currency.TW">TW</option>
                    </select>
                </div>
                <div>
                    <label for="purchase_price">購買價格</label>
                    <input id="purchase_price" type="number" v-model="editPurchaseInfo.price">
                </div>
                <div>
                    <label for="purchase_shop_name">購買商家</label>
                    <input id="purchase_shop_name" type="text" v-model="editPurchaseInfo.shop_name">
                </div>
                <div>
                    <label for="modelSize_height">購買日期</label>
                    <input id="modelSize_height" type="date" v-model="editPurchaseInfo.purchase_date">
                </div>
                <button v-if="!purchaseInfo" @click="fetchAddModelPurchaseInfo">新增購買資料</button>
                <button v-show="purchaseInfo" class="mr-5" @click="fetchUpdatePurchaseInfo">確認修改</button>
                <button v-show="purchaseInfo" @click="resetData">重置資料</button>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import useMyModelsAPI from "~/composables/api/useMyModelsAPI"
import { Ecommerce, Currency, type PurchaseInfo } from "~/types/model"
import { useMyModelStore } from '~/store/useMyModelStore';

const props = defineProps<{
    modelId: number
}>()

const { setLoadingState } = useMyModelStore()
const { updateMyModelPurchaseInfo, getModelPurchaseInfo, addMyModelPurchaseInfo } = useMyModelsAPI()
const showEditPanel = ref(false)
const purchaseInfo = ref<PurchaseInfo>()
const editPurchaseInfo = ref<PurchaseInfo>({
    e_commerce_name:Ecommerce.淘寶,
    currency:Currency.RMB,
    price:0,
})

init()

async function init(){
    const purchaseInfoRes = await getModelPurchaseInfo(props.modelId)
    if(!purchaseInfoRes) return 
    purchaseInfo.value = purchaseInfoRes
    resetData()
}
async function fetchUpdatePurchaseInfo() {
    setLoadingState(true)
    await updateMyModelPurchaseInfo(props.modelId, editPurchaseInfo.value)
    await fetchModelPurchaseInfo()
    setLoadingState(false)
}

async function fetchAddModelPurchaseInfo(){
    setLoadingState(true)
    await addMyModelPurchaseInfo(props.modelId, editPurchaseInfo.value)
    await fetchModelPurchaseInfo()
    setLoadingState(false)
}
async function fetchModelPurchaseInfo() {
  purchaseInfo.value=await getModelPurchaseInfo(props.modelId)
  showEditPanel.value=false
}
function resetData() {
    editPurchaseInfo.value.e_commerce_name = purchaseInfo.value?.e_commerce_name!
    editPurchaseInfo.value.currency = purchaseInfo.value?.currency!
    editPurchaseInfo.value.price = purchaseInfo.value?.price!
    editPurchaseInfo.value.shop_name = purchaseInfo.value?.shop_name
    editPurchaseInfo.value.purchase_date = purchaseInfo.value?.purchase_date
}

function showEditPanelHandel() {
    showEditPanel.value = !showEditPanel.value
}
</script>