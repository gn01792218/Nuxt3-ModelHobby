<template>
   <p>我的模型</p>
   <MyModelCardGroup group-title="未組裝" :card-list="unFinishedModels" />
   <MyModelCardGroup group-title="已組裝" :card-list="finishedModels" />
   <MyModelCardGroup group-title="未入庫" :card-list="unStockInModels" />
</template>

<script setup lang="ts">
import useFetchMyModels from "~/composables/api/useFetchMyModels"
import { useMyModelStore } from '../../store/useMyModelStore'
const { getMyModels } = useFetchMyModels()
const {
   unStockInModels,
   unFinishedModels,
   finishedModels,
} = storeToRefs(useMyModelStore())
const { setmyModelList } = useMyModelStore()

fetchMyModels()

async function fetchMyModels() {
   const data = await getMyModels()
   setmyModelList(data)
}

</script>
