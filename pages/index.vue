<template>
    <div>
        <p>總花費 : ????</p>
        <p>目前共有{{ myModelList.length }} 個模型</p>
        <p>未入庫:{{ unStockInModels.length }}個</p>
        <p>未組裝:{{ unFinishedModels.length }}個</p>
        <p>已組裝:{{ finishedModels.length }}個</p>
    </div>
</template>
<script setup lang="ts">
import { useMyModelStore } from '../store/useMyModelStore'
const { 
    myModelList,
    unStockInModels,
    unFinishedModels,
    finishedModels,
 } = storeToRefs(useMyModelStore())

</script>