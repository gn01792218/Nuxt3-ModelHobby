<template>
    <div v-if="currentModel">
        {{ currentModel.name_zh }}
        
        
    </div>
</template>

<script setup lang="ts">
import { useMyModelStore } from "~/store/useMyModelStore";

const modelId = Number(useRoute().params.modelId)
const { currentModel } = storeToRefs(useMyModelStore())
const { setCurrentModelId } = useMyModelStore()

windowReloadInit()

function windowReloadInit() {
    if (!currentModel.value) setCurrentModelId(modelId)
}

</script>