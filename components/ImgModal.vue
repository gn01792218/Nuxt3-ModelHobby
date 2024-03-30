<template>
    <UModal class="w-full" v-model="openImgPanel">
        <img class="w-full touch-manipulation" :src="img" alt="img">
    </UModal>
</template>

<script setup lang="ts">
import { useMyModelStore } from "~/store/useMyModelStore"

defineProps<{
    img:string,
}>()
const { openImgPanel } = storeToRefs(useMyModelStore())
</script>