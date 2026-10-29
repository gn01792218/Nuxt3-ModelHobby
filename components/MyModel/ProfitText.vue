<template>
    <p>
        毛利<span v-if="modelProfit !== null" :class="profitClass(modelProfit)">{{ profitText(modelProfit) }}</span><span v-else class="text-steel-400"> -</span>
    </p>
</template>

<script setup lang="ts">
import { type Model } from "~/types/model"

const props = defineProps<{
    model: Model
}>()

const { getModelProfit, profitText, profitClass } = useProfit()
const modelProfit = computed(() => getModelProfit(props.model))
</script>
