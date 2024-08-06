<template>
    <div>
        模型藝廊
        <ul class="grid gap-2 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            <li v-for="model in finishedModels" :key="model.id">
                <MyModelGalleryCard :model="model"/>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { useMyModelStore } from '~/store/useMyModelStore';

const { finishedModels } = storeToRefs(useMyModelStore())

</script>