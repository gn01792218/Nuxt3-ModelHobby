<template>
    <section class="p-0">
        <p>{{ groupTitle }} {{ cardList.length }}</p>
        <ul class="grid gap-2 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
            <li class="border-2 mb-5" v-for="model in cardList" :key="model.id">
                <MyModelCard :model-data="model" />
            </li>
        </ul>
    </section>
</template>
<script lang="ts" setup>
import { type Model } from "../../types/model"
defineProps<{
    groupTitle:string,
    cardList: Model[],
}>()
</script>