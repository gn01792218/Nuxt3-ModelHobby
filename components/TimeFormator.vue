<script setup lang="ts">
defineProps<{
  date:string | number | Date
}>()
</script>

<template>
  <NuxtTime :datetime="date" year="numeric"  month="long" day="numeric" />
</template>