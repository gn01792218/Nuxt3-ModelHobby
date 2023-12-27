<template>
    <div>
        <p>{{ modelId }}</p>
        <p>{{ model?.name.zh }}</p>
        <p>{{ model?.name.en }}</p>
    </div>
</template>

<script setup lang="ts">
import { useMyModelStore } from '~/store/useMyModelStore';

const { modelId } = useRoute().params
const { myModelList } = storeToRefs(useMyModelStore())
const model = computed(()=>{
    return myModelList.value.find(model=>model.id === modelId)
})
</script>