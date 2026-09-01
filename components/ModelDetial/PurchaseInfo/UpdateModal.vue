<template>
    <UModal v-model="isOpen">
        <div class="p-4" v-if="editPurchaseInfo">
            <MyFormGroup label="購買平台">
                <MySelect v-model="editPurchaseInfo.e_commerce_name" :options="ecommerceOptions" placeholder="選擇購買平台" />
            </MyFormGroup>
            <MyFormGroup label="購買價格">
                <div class="flex gap-2">
                    <MyInput type="number" placeholder="購買價格" v-model="editPurchaseInfo.price" />
                    <MySelect color="primary" v-model="editPurchaseInfo.currency" :options="currencyOptions"
                        placeholder="選擇幣種" />
                    <MyInput type="number" class="w-20" placeholder="購買數量" v-model="editPurchaseInfo.amount" />
                    <MyInput v-if="editPurchaseInfo.currency === Currency.RMB" type="number"
                        placeholder="匯率(留空使用預設匯率)" v-model="editPurchaseInfo.exchangeRate" />
                </div>
            </MyFormGroup>
            <MyFormGroup label="賣出價格">
                <div class="flex gap-2">
                    <MyInput type="number" placeholder="賣出價格" v-model="editPurchaseInfo.sellingPrice" />
                    <MySelect color="primary" v-model="editPurchaseInfo.sellingCurrency" :options="currencyOptions"
                        placeholder="選擇幣種" />
                    <MyInput v-if="editPurchaseInfo.sellingCurrency === Currency.RMB" type="number"
                        placeholder="匯率(留空使用預設匯率)" v-model="editPurchaseInfo.sellingExchangeRate" />
                </div>
            </MyFormGroup>
            <MyFormGroup label="購買商家">
                <MyInput placeholder="購買商家" v-model="editPurchaseInfo.shop_name" />
            </MyFormGroup>
            <MyFormGroup label="購買日期">
                <VDatePicker v-model="editPurchaseInfo.purchase_date" />
                <TimeFormator v-if="editPurchaseInfo.purchase_date" :date="editPurchaseInfo.purchase_date" />
            </MyFormGroup>
            <MyFormGroup label="賣出日期">
                <VDatePicker v-model="editPurchaseInfo.sellingDate" />
                <TimeFormator v-if="editPurchaseInfo.sellingDate" :date="editPurchaseInfo.sellingDate" />
            </MyFormGroup>
            <div class="ml-auto flex">
                <UButton class="block mr-5" label="確認修改" @click="$emit('update')" color="primary" />
                <UButton class="block" label="取消" @click="$emit('close', originPurchaseInfo?.id)" color="secondary"
                    variant="outline" />
            </div>
        </div>
    </UModal>
</template>

<script setup lang="ts">
import { Ecommerce, Currency } from "~/types/model"
import { type PurchaseInfo } from '~/types/purchaseInfo'
const props = defineProps<{
    isOpen: boolean,
    updatePurchaseInfo: PurchaseInfo | undefined,
    originPurchaseInfo: PurchaseInfo | undefined
}>()
const isOpen = computed(() => props.isOpen)
const currencyOptions = [Currency.RMB, Currency.TW]
const ecommerceOptions = Object.values(Ecommerce)
const editPurchaseInfo = computed<PurchaseInfo>(() => props.updatePurchaseInfo!)
</script>