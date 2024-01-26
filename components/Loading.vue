<template>
   <UModal v-model="loading" prevent-close>
      <div class="p-4">
        資料加載中...
      </div>
    </UModal>
</template>

<script setup lang="ts">
import { useMyModelStore } from '../store/useMyModelStore';
const { loading } = storeToRefs(useMyModelStore())
</script>