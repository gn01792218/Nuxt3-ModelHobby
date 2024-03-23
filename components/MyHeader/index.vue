<template>
    <section>
        <header class="p-5 w-full bg-main flex flex-col items-center xs:flex-row xs:justify-between fixed z-[10]">
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
        <div class="w-full h-[112px] xs:h-[72px]"></div>
        <Carousel v-if="route.path === '/'" :model-list="bannerItems"/>
    </section>
    <SearchModal :search-result="searchResult" />
</template>

<script setup lang="ts">
import { useMyModelStore } from "~/store/useMyModelStore"
import { type Model } from "~/types/model"

const route = useRoute()
//user相關
const user = useSupabaseUser()
const { logout } = useAuth()

//pinan資料取用
const { myModelList, searchResult } = storeToRefs(useMyModelStore())

//搜尋相關
const { setOpenSearchPanel, setSearchResult } = useMyModelStore()
const { converTradictionalToSimple } = useChinessConverter()
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

//banner相關
const bannerItems = computed(()=>{
    return myModelList.value.sort((a:Model,b:Model)=>{
        return new Date(b.finish_infos[0].finished_date).getTime() - new Date(a.finish_infos[0].finished_date!).getTime()
    }).slice(0,6)
})

</script>