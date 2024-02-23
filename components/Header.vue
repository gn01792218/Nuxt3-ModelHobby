<template>
    <header class="p-5 bg-red-200 flex justify-between">
        <NavBar/>
        <div class="flex">
            <div class="flex items-center mr-2">
                <UInput type="text" color="primary" variant="outline" placeholder="search" v-model="keyword"/>
                <UButton icon="i-heroicons-magnifying-glass" size="sm" color="red" variant="solid" :trailing="false" @click="search"/>
            </div>
            <div v-if="user">
                <p>歡迎 {{ user.user_metadata.full_name }}</p>
                <button @click="logout">Logout</button>
            </div>
            <NuxtLink v-else to="/login">Login</NuxtLink>
        </div>
    </header>
    <SearchModal :is-open="openSearchResultModal" :search-result="searchResult" @close="openSearchResultModal = false"/>
</template>

<script setup lang="ts">
import { useMyModelStore } from "~/store/useMyModelStore"
import { type Model } from "~/types/model"

const { converTradictionalToSimple } = useChinessConverter()
const user = useSupabaseUser()
const { myModelList } = storeToRefs(useMyModelStore())
const supabase = useSupabaseClient()
const keyword = ref('')
const searchResult = ref<Model[]>([])
const openSearchResultModal = ref(false)
function search(){
    openSearchResultModal.value = true
    searchResult.value = myModelList.value.filter(model=>{
        if(!keyword.value) return false
        const modelString = converTradictionalToSimple(JSON.stringify(model).toLocaleLowerCase())
        const keywordArray = converTradictionalToSimple(keyword.value.toLowerCase()).split(" ") as string[]
        return keywordArray.some(keyword=> modelString.includes(keyword))
    })
}
async function logout(){
    const { error } =await supabase.auth.signOut()
    if(error) console.log(error)
}
</script>