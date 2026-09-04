<template>
    <UCard
        class="relative cursor-pointer transition-transform duration-150 hover:-translate-y-1"
        :ui="{ base: 'overflow-hidden', rounded: 'rounded-md', ring: 'ring-1 ring-olive-950', background: 'bg-olive-800', shadow: 'shadow-lg shadow-black/40', body: { padding: 'p-0' } }"
        @click="navergateToGallery(model.id)"
    >
        <!-- 圖片區：固定比例 + object-cover，避免圖片被拉伸變形 -->
        <div class="relative aspect-[4/3] w-full overflow-hidden bg-olive-950">
            <NuxtImg
                v-if="model.finish_infos?.[0]?.gallery?.[0]"
                class="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
                :modifiers="{rotate: null}"
                format="webp"
                :src="getModelFinishImagePublicUrl(model.finish_infos[0].gallery[0])"
                :alt="model.name_zh"
            />
            <NuxtImg
                v-else-if="model.main_img"
                class="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
                :modifiers="{rotate: null}"
                format="webp"
                :src="getModelMainImagePublicUrl(model.main_img)"
                :alt="model.name_zh"
            />
            <NuxtImg
                v-else
                class="absolute inset-0 h-full w-full object-cover opacity-50"
                loading="lazy"
                :modifiers="{rotate: null}"
                src="/imagePlaceHolder.jpg"
                format="webp"
                alt="沒有上傳圖片"
            />
            <div class="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-olive-950/95 to-transparent" />
            <FavoriteButton class="absolute top-2 right-2 z-10 rounded-sm bg-olive-950/80 px-2 py-1 text-orange-400 ring-1 ring-olive-600/60" :model="model" />
        </div>

        <!-- 資訊區 -->
        <div class="p-2 sm:p-3">
            <p class="truncate text-sm sm:text-base font-black uppercase tracking-wide text-olive-50">{{ model.name_zh }}</p>
            <div class="mt-2 flex flex-wrap gap-1">
                <span v-if="model.scale" class="rounded-sm bg-olive-950/70 px-1.5 py-0.5 text-[11px] font-mono uppercase tracking-widest text-olive-300 ring-1 ring-olive-600/60">{{ model.scale }}</span>
                <span v-if="model.brand" class="rounded-sm bg-olive-950/70 px-1.5 py-0.5 text-[11px] font-mono uppercase tracking-widest text-olive-300 ring-1 ring-olive-600/60">{{ model.brand }}</span>
                <span v-if="model.type" class="rounded-sm bg-olive-950/70 px-1.5 py-0.5 text-[11px] font-mono uppercase tracking-widest text-olive-300 ring-1 ring-olive-600/60">{{ model.type }}</span>
            </div>
            <p class="mt-2 text-[11px] text-olive-300">作者：{{ authorName }}</p>
        </div>
    </UCard>
</template>

<script setup lang="ts">
import { type Model } from "~/types/model"

defineProps<{
    model:Model,
}>()

const { getModelMainImagePublicUrl, getModelFinishImagePublicUrl } = useMyModelImg()
const { navergateToGallery } = useMyModel()
const { authorName } = useModelAuthor()

</script>
