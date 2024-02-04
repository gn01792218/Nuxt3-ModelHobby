<template>
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
    <Loading />
</template>

<script setup lang="ts">
import { useMyModelStore } from '~/store/useMyModelStore'

const {
   myModelList,
} = storeToRefs(useMyModelStore())
const { fetchMyModels } = useFetchMyModels()

if (!myModelList.value.length) fetchMyModels()
</script>