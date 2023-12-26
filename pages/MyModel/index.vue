<template>
   <p>我的模型</p>
   <MyModelCardGroup group-title="未組裝" :card-list="unFinishedModels" />
   <MyModelCardGroup group-title="已組裝" :card-list="finishedModels" />
   <MyModelCardGroup group-title="未入庫" :card-list="unStockInModels" />
</template>

<script setup lang="ts">
import { ModelStatus } from "../../types/model"
import { useMyModelStore } from '../store/useMyModelStore'
const {
   unStockInModels,
   unFinishedModels,
   finishedModels,
} = storeToRefs(useMyModelStore())

</script>
