<template>
    <UModal v-model="isOpen">
        <div class="p-4" v-if="editPurchaseInfo">
            <UFormGroup label="購買平台">
                <USelect icon="i-heroicons-magnifying-glass-20-solid" color="primary" size="md"
                    v-model="editPurchaseInfo.e_commerce_name" :options="ecommerceOptions" placeholder="選擇購買平台" />
            </UFormGroup>
            <UFormGroup label="購買價格">
                <div class="flex">
                    <UInput type="number" color="primary" variant="outline" placeholder="購買價格" v-model="editPurchaseInfo.price" />
                    <USelect color="primary" size="md" v-model="editPurchaseInfo.currency" :options="currencyOptions"
                        placeholder="選擇幣種" />
                    <UInput type="number" color="primary" variant="outline" placeholder="購買數量" v-model="editPurchaseInfo.amount" />
                </div>
            </UFormGroup>
            <UFormGroup label="購買商家">
                <UInput color="primary" variant="outline" placeholder="購買商家" v-model="editPurchaseInfo.shop_name" />
            </UFormGroup>
            <UFormGroup label="購買日期">
                <VDatePicker v-model="editPurchaseInfo.purchase_date" />
                <TimeFormator v-if="editPurchaseInfo.purchase_date" :date="editPurchaseInfo.purchase_date"/>
            </UFormGroup>
            <div class="ml-auto flex">
                <UButton class="block mr-5" label="確認修改" @click="$emit('update')" color="primary"/>
                <UButton class="block" label="取消" @click="$emit('close', originPurchaseInfo?.id)" color="secondary" variant="outline"/>
            </div>
        </div>
    </UModal>
</template>

<script setup lang="ts">
import { Ecommerce, Currency, type PurchaseInfo, type Model } from "~/types/model"
const props = defineProps<{
    isOpen: boolean,
    updatePurchaseInfo: PurchaseInfo | undefined,
    originPurchaseInfo:PurchaseInfo | undefined
}>()
const isOpen = computed(() => props.isOpen)
const ecommerceOptions = [Ecommerce.淘寶, Ecommerce.蝦皮]
const currencyOptions = [Currency.RMB, Currency.TW]
const editPurchaseInfo = computed<PurchaseInfo>(() => props.updatePurchaseInfo!)
</script>