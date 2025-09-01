<template>
    <div class="">
        <!-- <UButton label="webp" color="red" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="allImageToWebp()" /> -->
        <ModelDetialBaseInfo :current-model="currentModel" />
        <Divider title="Size Info" icon-name="i-heroicons-rectangle-stack-solid"/>
        <ModelDetialModelSize :current-model="currentModel"/>
        <Divider title="Purchase Info" icon-name="i-heroicons-currency-dollar-20-solid"/>
        <ModelDetialPurchaseInfo :current-model="currentModel"/>
        <Divider title="Finish Info" icon-name="i-heroicons-flag-20-solid"/>
        <ModelDetialFinishInfo :model-id="modelId" :current-model="currentModel"/>
    </div>
</template>

<script setup lang="ts">
const { currentModel, modelId } = useMyModel()
</script>