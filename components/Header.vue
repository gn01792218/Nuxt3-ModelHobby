<template>
    <header class="p-5 bg-main flex flex-col items-center xs:flex-row xs:justify-between">
        <NavBar />
        <div class="flex">
            <div class="flex items-center mr-2">
                <input type="text" class="my-input mr-1" v-model="keyword" placeholder="search">
                <UButton color="pink" icon="i-heroicons-magnifying-glass" size="sm" variant="solid" :trailing="false"
                    @click="search" />
            </div>
            <div v-if="user">
                <p>歡迎 {{ user.user_metadata.full_name }}</p>
                <button @click="logout">Logout</button>
            </div>
            <NuxtLink v-else to="/login">Login</NuxtLink>
        </div>
    </header>
    <SearchModal :search-result="searchResult" />
</template>

<script setup lang="ts">
import { useMyModelStore } from "~/store/useMyModelStore"
import { type Model } from "~/types/model"

const { converTradictionalToSimple } = useChinessConverter()
const user = useSupabaseUser()
const { setOpenSearchPanel, setSearchResult } = useMyModelStore()
const { myModelList, searchResult } = storeToRefs(useMyModelStore())
const supabase = useSupabaseClient()
const keyword = ref('')


function search() {
    setOpenSearchPanel(true)
    setSearchResult(
        myModelList.value.filter(model => {
            if (!keyword.value) return false
            const modelString = converTradictionalToSimple(JSON.stringify(model).toLocaleLowerCase())
            const keywordArray = converTradictionalToSimple(keyword.value.trim().toLowerCase()).split(" ") as string[]
            return keywordArray.some(keyword => modelString.includes(keyword))
        })
    )
}
async function logout() {
    const { error } = await supabase.auth.signOut()
    if (error) console.log(error)
}
</script>