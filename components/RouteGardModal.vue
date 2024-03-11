<template>
    <UModal v-model="openRouteGuardPanel">
        <UCard>
            <template #header>
                <div class="flex items-center justify-between">
                    <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                        會員限定功能
                    </h3>
                    <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
                        @click="setOpenRouteGuardPanel(false)" />
                </div>
            </template>
            <section>
                <UButton label="取消" color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
                        @click="setOpenRouteGuardPanel(false)" />
                <UButton label="登入會員" color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
                        @click="toLoginPage()" />
            </section>
        </UCard>
    </UModal>
</template>

<script setup lang="ts">
import { useMyModelStore } from "~/store/useMyModelStore"

const { setOpenRouteGuardPanel } = useMyModelStore()
const { openRouteGuardPanel } = storeToRefs(useMyModelStore())

function toLoginPage(){
   setOpenRouteGuardPanel(false)
   navigateTo('/login') 
}
</script>