<template>
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
    <Loading />
    <UNotifications />
    <RouteGardModal/>
</template>

<script setup lang="ts">
const { fetchALlModels } = useFetchMyModels()

fetchALlModels()
</script>