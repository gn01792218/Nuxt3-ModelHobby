
<template>
    <section>
        <div class="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 sm:flex-wrap sm:overflow-visible">
            <UCard v-for="purchaseInfo in currentModel?.purchase_infos" :key="purchaseInfo.id"
                class="shrink-0 w-[85vw] snap-center sm:w-auto sm:shrink">
                <p>
                    購買平台 : {{ purchaseInfo?.e_commerce_name }}
                </p>
                <p>
                    購買價格 : {{ purchaseInfo?.price }} ( {{ purchaseInfo?.currency }} )
                    <template v-if="purchaseInfo.currency !== Currency.TW">
                        <span class="text-sm text-gray-500 dark:text-gray-400">約 {{ toTWD(purchaseInfo.currency, purchaseInfo.price, 1, purchaseInfo.exchangeRate)?.toFixed(2) }} TWD</span>
                    </template>
                    / 數量 {{ purchaseInfo.amount }}
                </p>
                <p>
                    賣出價格 : {{ purchaseInfo?.sellingPrice || 0 }} {{ purchaseInfo?.sellingCurrency?.toUpperCase() }}
                    <template v-if="getProfit(purchaseInfo) !== null">
                        ( <span :class="profitClass(getProfit(purchaseInfo)!)">{{ profitText(getProfit(purchaseInfo)!) }}</span> )
                    </template>
                </p>
                <p>
                    購買商家 : {{ purchaseInfo?.shop_name }}
                </p>
                <p>
                    購買日期 :
                    <TimeFormator v-if="purchaseInfo.purchase_date" :date="purchaseInfo.purchase_date"/>
                    <span v-else>????/??/??</span>
                </p>
                <p>
                    賣出日期 :
                    <TimeFormator v-if="purchaseInfo.sellingDate" :date="purchaseInfo.sellingDate"/>
                    <span v-else>????/??/??</span>
                </p>
                <UButton class="mr-5" label="修改" color="primary" @click="openUpdatePanel(purchaseInfo)" />
                <UButton label="刪除" color="red" variant="outline" @click="fetchDeletePurchaseInfo(purchaseInfo.id)" />
            </UCard>
        </div>
        <div>
            <UButton label="新增購買資訊" color="primary" @click="showAddPurchaseInfoPanel = !showAddPurchaseInfoPanel" />
            <UModal v-model="showAddPurchaseInfoPanel">
            <div class="p-4">
                <MyFormGroup label="購買平台">
                    <MySelect v-model="createPurchaseInfo.e_commerce_name" :options="ecommerceOptions" placeholder="選擇購買平台" />
                </MyFormGroup>
                <MyFormGroup label="購買價格">
                    <div class="flex gap-2">
                        <MyInput type="number" placeholder="購買價格" v-model="createPurchaseInfo.price" />
                        <MySelect color="primary" v-model="createPurchaseInfo.currency" :options="currencyOptions"
                            placeholder="選擇幣種" />
                        <MyInput type="number" class="w-20" placeholder="購買數量" v-model="createPurchaseInfo.amount" />
                        <MyInput v-if="createPurchaseInfo.currency === Currency.RMB" type="number"
                            placeholder="匯率(留空使用預設匯率)" v-model="createPurchaseInfo.exchangeRate" />
                    </div>
                </MyFormGroup>
                <MyFormGroup label="賣出價格">
                    <div class="flex gap-2">
                        <MyInput type="number" placeholder="賣出價格" v-model="createPurchaseInfo.sellingPrice" />
                        <MySelect color="primary" v-model="createPurchaseInfo.sellingCurrency" :options="currencyOptions"
                            placeholder="選擇幣種" />
                        <MyInput v-if="createPurchaseInfo.sellingCurrency === Currency.RMB" type="number"
                            placeholder="匯率(留空使用預設匯率)" v-model="createPurchaseInfo.sellingExchangeRate" />
                    </div>
                </MyFormGroup>
                <MyFormGroup label="購買商家">
                    <MyInput placeholder="購買商家" v-model="createPurchaseInfo.shop_name" />
                </MyFormGroup>
                <MyFormGroup label="購買日期">
                    <VDatePicker v-model="createPurchaseInfo.purchase_date" />
                    <TimeFormator v-if="createPurchaseInfo.purchase_date" :date="createPurchaseInfo.purchase_date" />
                </MyFormGroup>
                <MyFormGroup label="賣出日期">
                    <VDatePicker v-model="createPurchaseInfo.sellingDate" />
                    <TimeFormator v-if="createPurchaseInfo.sellingDate" :date="createPurchaseInfo.sellingDate" />
                </MyFormGroup>
                <UButton class="mr-5" label="確認" color="primary" @click="fetchAddModelPurchaseInfo" />
            </div>
            </UModal>
        </div>
    </section>
    <ModelDetialPurchaseInfoUpdateModal
        :is-open="showUpdatePurchaseInfoPanel"
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
    currentModel:Model
}>()
const { sendToast } = useMyToast()
const { setLoadingState } = useMyModelStore()
const { updateMyModelPurchaseInfo, addMyModelPurchaseInfo, deleteMyModelPurchaseInfo} = useMyModelsAPI()
const { getProfit, profitText, profitClass } = useProfit()
const { toTWD } = useExchange()
const showAddPurchaseInfoPanel = ref(false)
const showUpdatePurchaseInfoPanel = ref(false)
const createPurchaseInfo = ref<CreatePurchaseInfoRequest>({
    e_commerce_name: Ecommerce.淘寶,
    currency: Currency.RMB,
    price: 0,
    exchangeRate: null,
    sellingPrice:0,
    sellingCurrency: Currency.TW,
    sellingExchangeRate: null,
    amount:1
})
const updatePurchaseInfo = ref<PurchaseInfo>()
const originUpdatePurchaseInfo = ref<PurchaseInfo>()
const ecommerceOptions = Object.values(Ecommerce)
const currencyOptions = [Currency.RMB, Currency.TW]

async function openUpdatePanel(purchaseInfo: PurchaseInfo) {
    showUpdatePurchaseInfoPanel.value = true
    updatePurchaseInfo.value = purchaseInfo
    originUpdatePurchaseInfo.value = {...purchaseInfo} //舊的保留給取消用
}
async function fetchUpdate() {
    setLoadingState(true)
    const purchaseInfo = await updateMyModelPurchaseInfo(updatePurchaseInfo.value?.id!, updatePurchaseInfo.value!)
    const infoList = props.currentModel?.purchase_infos
    const targetIndex = infoList?.findIndex((info: PurchaseInfo) => info.id === purchaseInfo.id)
    if (infoList && targetIndex !== undefined && targetIndex >= 0) infoList[targetIndex] = purchaseInfo
    setLoadingState(false)
    showUpdatePurchaseInfoPanel.value = false
    sendToast({
        title: '修改成功',
        icon: "i-heroicons-information-circle",
        color: "green",
        description: `對id為:${purchaseInfo.id}的購買訊息修改成功`
    })
}

async function fetchAddModelPurchaseInfo() {
    setLoadingState(true)
    const purchaseInfo = await addMyModelPurchaseInfo(props.currentModel.id, createPurchaseInfo.value)
    //為該Model添加購買資訊
    props.currentModel?.purchase_infos?.push(purchaseInfo)
    sendToast({
        title: '新增成功',
        icon: "i-heroicons-information-circle",
        color: "green",
        description: `新增購買資訊成功`
    })
    setLoadingState(false)
    showAddPurchaseInfoPanel.value = false
}
async function fetchDeletePurchaseInfo(purchaseInfoId:number){
    setLoadingState(true)
    const deleteData = await deleteMyModelPurchaseInfo(purchaseInfoId)
    const deleteIndex = props.currentModel?.purchase_infos?.findIndex((info:PurchaseInfo)=> info.id === deleteData.id)
    if(deleteIndex!>=0) props.currentModel?.purchase_infos?.splice(deleteIndex!,1)
    sendToast({
        title: '刪除成功',
        icon: "i-heroicons-information-circle",
        color: "green",
        description: `刪除Id : ${deleteData.id} 的購買資訊`
    })
    setLoadingState(false)
}
function resetData(originPurchaseInfoId:number) {
    showUpdatePurchaseInfoPanel.value = false
    const infoList = props.currentModel?.purchase_infos
    const targetDataIndex = infoList?.findIndex((info:PurchaseInfo) => info.id === originPurchaseInfoId)
    if(targetDataIndex === undefined || targetDataIndex < 0) return
    if(infoList) infoList[targetDataIndex] = originUpdatePurchaseInfo.value!
}
</script>