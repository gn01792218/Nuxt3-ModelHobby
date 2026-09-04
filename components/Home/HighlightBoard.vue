<template>
    <section v-if="categories.length" class="pb-5">
        <SectionTitle title="熱門排行" icon="i-heroicons-fire-solid" icon-class="text-orange-500" />
        <div class="flex gap-2 overflow-x-auto pb-2">
            <ToggleChip
                v-for="category in categories"
                :key="category.key"
                :active="activeCategory?.key === category.key"
                @click="selectedCategoryKey = category.key"
            >
                {{ category.label }}
            </ToggleChip>
        </div>
        <div v-if="activeCategory" class="max-w-3xl mx-auto flex flex-col md:flex-row md:items-center gap-6 md:gap-16">
            <SwiperFavorites class="flex-shrink-0" :slider-items="carouselModels" />
            <ul class="flex-1 w-full space-y-1 min-w-0">
                <li
                    v-for="(model, index) in rankingModels"
                    :key="model.id"
                    class="flex items-center gap-3 cursor-pointer rounded-md p-2 transition-colors hover:bg-white/10"
                    :class="rankTiers[index]?.rowClass"
                    @click="navergateToGallery(model.id)"
                >
                    <span class="flex-shrink-0 flex flex-col items-center">
                        <span v-if="rankTiers[index]" class="flex flex-col items-center leading-none">
                            <UIcon
                                v-for="n in rankTiers[index].stripes"
                                :key="n"
                                name="i-heroicons-chevron-up-solid"
                                class="w-2.5 h-2.5 -mb-1.5 last:mb-0.5"
                                :class="rankTiers[index].stripeClass"
                            />
                        </span>
                        <span
                            class="flex items-center justify-center text-white text-xs font-bold"
                            :class="rankTiers[index] ? ['w-7 h-8 rank-shield-clip', rankTiers[index].badgeClass] : 'w-6 h-6 rounded-full bg-primary-500'"
                        >
                            {{ index + 1 }}
                        </span>
                    </span>
                    <NuxtImg
                        class="w-12 h-12 object-cover rounded-md flex-shrink-0"
                        :class="rankTiers[index]?.imgRingClass"
                        :modifiers="{rotate: null}"
                        format="webp"
                        :src="getModelFinishImagePublicUrl(model.finish_infos[0].gallery[0])"
                        :alt="model.name_zh"
                    />
                    <p class="flex-1 min-w-0 truncate text-white" :class="rankTiers[index] ? 'font-bold' : ''">{{ model.name_zh }}</p>
                    <FavoriteBadge class="flex-shrink-0 text-white" :model="model" variant="flame" />
                </li>
            </ul>
        </div>
    </section>
</template>

<script setup lang="ts">
import { ModelType } from "~/types/model"
import { groupMostFavoritedByType } from "~/utils/favorite"
import { enumToArray } from "~/utils/enumToArray"
import { useMyModelStore } from "~/store/useMyModelStore"

const { navergateToGallery } = useMyModel()
const { getModelFinishImagePublicUrl } = useMyModelImg()
const { favoriteCount } = useFavorite()
const { mostFavoritedModels, favoritedFinishedModels, latestFinishedModels } = storeToRefs(useMyModelStore())

const categories = computed(() => [
    { key: 'top', label: '人氣收藏', items: mostFavoritedModels.value },
    { key: 'latest', label: '最新創作', items: latestFinishedModels.value },
    ...groupMostFavoritedByType(favoritedFinishedModels.value, enumToArray(ModelType)),
].filter((category) => category.items.length > 0))

const selectedCategoryKey = ref('')
const activeCategory = computed(() =>
    categories.value.find((category) => category.key === selectedCategoryKey.value) ?? categories.value[0]
)
// 輪播卡牌跟排行榜不管在哪個頁籤，一律依收藏數排序；頁籤本身只決定候選名單（例如「最新創作」只從最近完成的作品裡選）
const sortedCategoryItems = computed(() => {
    const items = activeCategory.value?.items ?? []
    return [...items].sort((a, b) => favoriteCount(b) - favoriteCount(a))
})
const rankingModels = computed(() => sortedCategoryItems.value.slice(0, 5))
const carouselModels = computed(() => sortedCategoryItems.value.slice(0, 10))

// 前三名用軍階徽章凸顯：條紋數代表名次高低，1st用acent、2nd用earth、3rd用olive做出區隔
const rankTiers = [
    {
        badgeClass: 'bg-gradient-to-b from-acent-400 to-acent-600 ring-2 ring-acent-200/70 shadow-md shadow-acent-500/50',
        rowClass: 'bg-acent-500/10 ring-1 ring-acent-400/30',
        imgRingClass: 'ring-2 ring-acent-400',
        stripeClass: 'text-acent-100',
        stripes: 3,
    },
    {
        badgeClass: 'bg-gradient-to-b from-earth-400 to-earth-600 ring-2 ring-earth-200/70 shadow-md shadow-earth-500/50',
        rowClass: 'bg-earth-500/10 ring-1 ring-earth-400/30',
        imgRingClass: 'ring-2 ring-earth-400',
        stripeClass: 'text-earth-100',
        stripes: 2,
    },
    {
        badgeClass: 'bg-gradient-to-b from-olive-400 to-olive-600 ring-2 ring-olive-200/70 shadow-md shadow-olive-500/50',
        rowClass: 'bg-olive-500/10 ring-1 ring-olive-400/30',
        imgRingClass: 'ring-2 ring-olive-400',
        stripeClass: 'text-olive-100',
        stripes: 1,
    },
]
</script>
