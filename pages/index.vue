<template>
    <div>
        <p>總花費 : ????</p>
        <p>目前共有{{ myModels.length }} 個模型</p>
        <p>未入庫:{{ unStockInModels.length }}個</p>
        <p>未組裝:{{ unFinishedModels.length }}個</p>
        <p>已組裝:{{ finishedModels.length }}個</p>
    </div>
</template>
<script setup lang="ts">
import myModels from '../data/model'
import { useMyModelStore } from '../store/useMyModelStore'
const { 
    unStockInModels,
    unFinishedModels,
    finishedModels,
 } = storeToRefs(useMyModelStore())

</script>