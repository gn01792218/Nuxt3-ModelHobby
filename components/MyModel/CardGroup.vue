<template>
    <section class="p-10">
        <p>{{ groupTitle }} {{ cardList.length }}</p>
        <ul class="flex flex-wrap flex-col md:flex-row justify-evenly">
            <li class="border-2 mb-5" v-for="model in cardList" :key="model.id">
                <MyModelCard :model-data="model" />
            </li>
        </ul>
    </section>
</template>
<script lang="ts" setup>
import { type Model } from "../../types/model"
const props = defineProps<{
    groupTitle:string,
    cardList: Model[],
}>()
</script>