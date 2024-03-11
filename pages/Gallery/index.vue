<template>
    <div>
        模型藝廊
        <ul>
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