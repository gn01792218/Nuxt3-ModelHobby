<template>
    <div>
        <p>總花費 : {{ totalCoast }} 台幣</p>
        <p>目前共有{{ myModelList.length }} 個模型</p>
        <p>未入庫:{{ unStockInModels.length }}個</p>
        <p>未組裝:{{ unFinishedModels.length }}個</p>
        <p>已組裝:{{ finishedModels.length }}個</p>
    </div>
    <Divider title="完成統計"/>
    <div>
        <p>{{ getThisMonth() }} 月</p>
        <p class="cursor-pointer" @click="openModelsDetailModal(thisMonthFinishedModels)">已完成<span class="text-green-500">{{ thisMonthFinishedModels.length }}</span>個模型</p>
        <p class="cursor-pointer" @click="openModelsDetailModal(thisMonthPurchaseModels)">本月購入了<span class="text-green-800">{{ thisMonthPurchaseModelsCount }}個模型</span></p>
        <p>完成順逆差 :
            <span :class="[thisMonthFinishedModels.length - thisMonthPurchaseModelsCount >= 0 ? 'text-green-500' : 'text-red-500']">
                {{ thisMonthFinishedModels.length - thisMonthPurchaseModelsCount }}
            </span>
        </p>
    </div>
</template>
<script setup lang="ts">
import { Currency, type Model } from '~/types/model'
import { useMyModelStore } from '../store/useMyModelStore'
const {
    myModelList,
    unStockInModels,
    unFinishedModels,
    finishedModels,
    thisMonthFinishedModels,
    thisMonthPurchaseModels,
    thisMonthPurchaseModelsCount,
} = storeToRefs(useMyModelStore())
const { setOpenSearchPanel, setSearchResult } = useMyModelStore()
const { getThisMonth } = useDate()
const totalCoast = computed(()=>{
    let total =0
    myModelList.value.forEach(model=>{
        model.purchase_infos?.forEach(info=>{
            if(info.currency === Currency.RMB) total+= info.price*4.5*info.amount
            else total += info.price*info.amount
        })
    })
    return total
})

function openModelsDetailModal(models:Model[]){
    setOpenSearchPanel(true)
    setSearchResult(models)
}
</script>