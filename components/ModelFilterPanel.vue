<template>
    <div class="mb-6 space-y-5 rounded-xl bg-olive-950/40 p-4 ring-1 ring-olive-400/20 sm:p-6">
        <MyInput
            v-model="selectedKeyword"
            placeholder="在目前篩選結果中搜尋名稱、品牌關鍵字"
            class="w-full"
        />
        <div class="flex flex-wrap gap-3">
            <MySelect
                v-model="selectedBrand"
                :options="brandOptions"
                placeholder="選擇品牌"
                select-class="rounded-sm bg-olive-900/60 font-mono text-sm text-olive-50 ring-1 ring-olive-400/30 focus:ring-2 focus:ring-acent-400"
                class="max-w-[10rem]"
            />
            <MySelect
                v-model="selectedType"
                :options="typeOptions"
                placeholder="選擇類型"
                select-class="rounded-sm bg-olive-900/60 font-mono text-sm text-olive-50 ring-1 ring-olive-400/30 focus:ring-2 focus:ring-acent-400"
                class="max-w-[10rem]"
            />
            <MySelect
                v-model="selectedScale"
                :options="scaleOptions"
                placeholder="選擇比例"
                select-class="rounded-sm bg-olive-900/60 font-mono text-sm text-olive-50 ring-1 ring-olive-400/30 focus:ring-2 focus:ring-acent-400"
                class="max-w-[10rem]"
            />
        </div>
        <slot name="extra" />
        <button
            type="button"
            class="rounded-sm bg-earth-700/50 px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-earth-50 ring-1 ring-earth-200/30 transition-colors hover:bg-earth-600/60 sm:text-sm"
            @click="emit('reset')"
        >
            重置篩選條件
        </button>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    brandOptions: string[]
    typeOptions: string[]
    scaleOptions: string[]
}>()

const selectedBrand = defineModel<string>('brand', { default: '' })
const selectedType = defineModel<string>('type', { default: '' })
const selectedScale = defineModel<string>('scale', { default: '' })
const selectedKeyword = defineModel<string>('keyword', { default: '' })

const emit = defineEmits<{ reset: [] }>()
</script>
