<template>
    <main>
        <h1 class="font-bold text-xl mb-4">我的收藏</h1>
        <p v-if="!myFavoriteModels.length" class="text-primary-500">還沒有收藏任何模型</p>
        <section v-else class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 lg:gap-6 gap-1">
            <MyModelGalleryCard
                v-for="model in myFavoriteModels"
                :key="model.id"
                :model="model"
            />
        </section>
    </main>
</template>

<script setup lang="ts">
import { useMyModelStore } from "~/store/useMyModelStore"

const { myFavoriteModels } = storeToRefs(useMyModelStore())
</script>
