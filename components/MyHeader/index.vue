<template>
    <section>
        <header class="p-5 w-full bg-main flex flex-col flex-wrap items-center sm:flex-row sm:justify-between fixed z-[10]">
            <NavBar />
            <div class="flex mt-2 sm:mt-0">
                <div class="flex items-center mr-2">
                    <input type="text" class="my-input mr-1" v-model="keyword" placeholder="search" @keypress.enter="search">
                    <UButton color="pink" icon="i-heroicons-magnifying-glass" size="sm" variant="solid" :trailing="false"
                        @click="search"/>
                </div>
                <div v-if="user">
                    <p>歡迎 {{ user.user_metadata.full_name }}</p>
                    <UButton class="flex items-center" label="Logout" icon="i-heroicons-user-16-solid" size="sm" color="gray" variant="outline" :trailing="false" @click="logout"/>
                </div>
                <UButton v-else class="flex items-center" icon="i-heroicons-user" size="sm" color="primary" variant="solid" :trailing="false">
                    <NuxtLink to="/login">Login</NuxtLink>
                </UButton>
            </div>
        </header>
        <div class="w-full h-[140px] xs:h-[112px] sm:h-[72px]"></div>
        <SwiperBase v-if="route.path === '/'" :slider-items="bannerItems"/>
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
const { myModelList, searchResult, finishedModels } = storeToRefs(useMyModelStore())

//搜尋相關
const { setOpenSearchPanel, setSearchResult } = useMyModelStore()
const { converTradictionalToSimple } = useChinessConverter()
const keyword = ref('')
function search() {
    console.log('按下Enter')
    setOpenSearchPanel(true)
    setSearchResult(
        myModelList.value.filter((model:Model) => {
            if (!keyword.value) return false
            const modelString = converTradictionalToSimple(JSON.stringify(model).toLocaleLowerCase())
            const keywordArray = converTradictionalToSimple(keyword.value.trim().toLowerCase()).split(" ") as string[]
            return keywordArray.some(keyword => modelString.includes(keyword))
        })
    )
    console.log('搜尋完畢')
}

//banner相關
const bannerItems = computed(()=>{
    return finishedModels.value.filter((model:Model)=>model.finish_infos.length && model.finish_infos[0].gallery.length)
    .sort((a:Model,b:Model)=>new Date(b.finish_infos[0].finished_date).getTime() - new Date(a.finish_infos[0].finished_date).getTime() )
    .slice(0,9)
})
</script>