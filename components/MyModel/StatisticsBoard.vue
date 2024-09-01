<template>
    <div>
        <p>總花費 : <span class="text-acent-500">{{ totalCoast }}</span>台幣</p>
        <p>目前共有{{ myModelList.length }} 個模型</p>
        <p>未入庫:{{ unStockInModels.length }}個</p>
        <p>未組裝:{{ unFinishedModels.length }}個</p>
        <p>已組裝:{{ finishedModels.length }}個</p>
        <div class="mt-3">
            <div class="flex items-center mr-2">
            <input type="text" class="my-input mr-1" v-model="keyword" placeholder="個人模型庫存搜尋" @keypress.enter="search">
             <UButton color="pink" icon="i-heroicons-magnifying-glass" size="sm" variant="solid" :trailing="false"
                @click="search" />
        </div>
      </div>
    </div>
    <UDivider>
        <p class="text-white">{{ purchaseDate }} 統計資訊</p>
        <USelect class="cursor-pointer" v-model="purchaseDate" :options="purchaseDateSelects" option-attribute="name" variant="none" @change="onPurchaseDateChange"/>
    </UDivider>
    <div>
        <p>本月花費 <span class="text-acent-500">{{ thisMonthPurchaseCoast }}</span>元</p>
        <p class="cursor-pointer" @click="openModelsDetailModal(thisMonthFinishedModels)">已完成<span
                class="text-green-500">{{ thisMonthFinishedCount }}</span>個模型</p>
        <p class="cursor-pointer" @click="openModelsDetailModal(thisMonthPurchaseModels)">本月購入了<span
                class="text-green-800">{{ thisMonthPurchaseModelsCount }}個模型</span></p>
        <p>模型完成數量順逆差 :
            <span
                :class="[thisMonthFinishedCount - thisMonthPurchaseModelsCount >= 0 ? 'text-green-500' : 'text-red-500']">
                {{ thisMonthFinishedCount - thisMonthPurchaseModelsCount }}
            </span>
        </p>
    </div>
</template>

<script setup lang="ts">
import { type Model } from '~/types/model'
import { useMyModelStore } from '~/store/useMyModelStore'
import type { PurchaseInfo } from '~/types/purchaseInfo';
const {
    targetDate,
    myModelList,
    unStockInModels,
    unFinishedModels,
    finishedModels,
    thisMonthFinishedModels,
    thisMonthFinishedCount,
    thisMonthPurchaseModels,
    thisMonthPurchaseModelsCount,
    thisMonthPurchaseCoast
} = storeToRefs(useMyModelStore())

const { setOpenSearchPanel, setSearchResult, setTargetDate } = useMyModelStore()
const { sortDateArray, formateDateYYYYMM } = useDate()
const { toTWD } = useExchange()
const { converTradictionalToSimple } = useChinessConverter()

const keyword = ref('')

const purchaseInfos = computed<PurchaseInfo[]>(()=>{
    const purchaseInfos:PurchaseInfo[] = []
    myModelList.value.forEach((model:Model)=>{
        model.purchase_infos?.forEach(info=>purchaseInfos.push(info))
    })
    return purchaseInfos
})
const purchaseDate = ref<string | Date>(targetDate.value)
const purchaseDateSelects = computed<string[] | Date[]>(()=>{
    const set = new Set<string>(purchaseInfos.value?.filter((info:PurchaseInfo)=>info.purchase_date).map((info:PurchaseInfo)=>{
        return `${formateDateYYYYMM(info.purchase_date!,'-')}`
    }))
    set.add(formateDateYYYYMM(new Date(),'-')) // 推入當月日期( 以免沒有當月購買資訊時，將無法選擇當月資訊 )
    return sortDateArray(Array.from(set))
})

const totalCoast = computed(()=>{
    let total =0
    myModelList.value.forEach((model:Model)=>{
        model.purchase_infos?.forEach(info=>{
            total += toTWD(info.currency, info.price, info.amount)
        })
    })
    return total
})
function search() {
   setOpenSearchPanel(true)
   setSearchResult(
      myModelList.value.filter((model: Model) => {
         if (!keyword.value) return false
         const modelString = converTradictionalToSimple(JSON.stringify(model).toLocaleLowerCase())
         const keywordArray = converTradictionalToSimple(keyword.value.trim().toLowerCase()).split(" ") as string[]
         return keywordArray.some(keyword => modelString.includes(keyword))
      })
   )
}
function openModelsDetailModal(models:Model[]){
    setOpenSearchPanel(true)
    setSearchResult(models)
}
function onPurchaseDateChange(){
    setTargetDate(purchaseDate.value)
}

</script>