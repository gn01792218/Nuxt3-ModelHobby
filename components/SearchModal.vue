<template>
    <UModal v-model="isopen">
        <UCard>
            <template #header>
                <div class="flex items-center justify-between">
                    <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                        搜尋結果
                    </h3>
                    <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
                        @click="$emit('close')" />
                </div>
            </template>
            <section v-if="searchResult.length">
                <UCard class="cursor-pointer" v-for="model in searchResult" :key="model.id" @click="gottoItem(model.id)">
                    <p>{{ model.name_zh }}</p>
                    <img class="w-[100px]" :src="getModelImagePublicUrl(model.main_img)" :alt="model.name_zh">
                </UCard>
            </section>
            <section class="h-[200px] flex justify-center items-center" v-else>
                <p>沒有尋找到東西...</p>
            </section>
        </UCard>
    </UModal>
</template>

<script setup lang="ts">
import { type Model } from "~/types/model"
const { getModelImagePublicUrl } = useSupabase()
const emit = defineEmits(['close'])
const props = defineProps<{
    isOpen: boolean,
    searchResult: Model[]
}>()

const isopen = computed(() => props.isOpen)
function gottoItem(modelId: number) {
    emit('close')
    navigateTo(`/MyModel/ModelDetail-${modelId}`)
}
</script>