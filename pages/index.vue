<template>
    <div>
        <p>總花費 : {{ totalCoast }} 台幣</p>
        <p>目前共有{{ myModelList.length }} 個模型</p>
        <p>未入庫:{{ unStockInModels.length }}個</p>
        <p>未組裝:{{ unFinishedModels.length }}個</p>
        <p>已組裝:{{ finishedModels.length }}個</p>
    </div>
</template>
<script setup lang="ts">
import { Currency } from '~/types/model'
import { useMyModelStore } from '../store/useMyModelStore'
const {
    myModelList,
    unStockInModels,
    unFinishedModels,
    finishedModels,
} = storeToRefs(useMyModelStore())
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
</script>