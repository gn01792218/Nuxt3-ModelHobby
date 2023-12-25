<template>
  <div class="bg-black text-white">
    <p>HI~~~這是測試TailwindCss的頁面</p>
    <button @click="increment">++</button>
    <p>{{ count }}</p>
    <p>2倍 {{ doubleCount }}</p>
    <NuxtWelcome />
  </div>
</template>
<script lang="ts" setup>
  import { useExampleStore } from './store/exampleStore'
  const { increment } = useExampleStore()
  const { count, doubleCount } = storeToRefs(useExampleStore())

</script>
