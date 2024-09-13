<template>
    <section>
        <header :class="[isScrolling? 'bg-main-500/50 transition-all ease-in duration-1000 text-main-200': 'bg-main']" class="p-5 w-full flex flex-col flex-wrap items-center sm:flex-row sm:justify-between fixed z-[10]">
            <NavBar />
            <div class="flex mt-2 sm:mt-0">
                <SearchBar :search-sorce="globalFinishedModel" :search-type="SearchModelType.Gallery" place-holder="藝廊搜尋" />
                <div v-if="user">
                    <p>歡迎 {{ user.user_metadata.full_name || user.user_metadata.display_name }}</p>
                    <UButton class="flex items-center" label="Logout" icon="i-heroicons-user-16-solid" size="sm"
                        color="gray" variant="outline" :trailing="false" @click="logout" />
                </div>
                <UButton v-else class="flex items-center" icon="i-heroicons-user" size="sm" color="primary"
                    variant="solid" :trailing="false">
                    <NuxtLink to="/login">Login</NuxtLink>
                </UButton>
            </div>
        </header>
        <div class="w-full h-[140px] xs:h-[112px] sm:h-[72px]"></div>
        <SwiperBase v-if="route.path === '/'" :slider-items="bannerItems" />
    </section>
</template>

<script setup lang="ts">
import { useMyModelStore } from "~/store/useMyModelStore"
import { SearchModelType, type Model } from "~/types/model"
import { type ModelFinishInfo } from "~/types/finishInfo"

const route = useRoute()
//user相關
const { user } = useUser()
const { logout } = useAuth()

//pinan資料取用
const { allModelList, allfinishedModels } = storeToRefs(useMyModelStore())
//基本資料
const isScrolling = ref(false)
const globalFinishedModel = computed(()=>{
    return allModelList.value.filter((m:Model)=>{
        return m.finish_infos.some((f:ModelFinishInfo)=>{
            return f.finished_date
        })
    })
})

onMounted(() => {
    window.addEventListener('scroll', handleScrolling)
})
onBeforeUnmount(() => {
    window.removeEventListener('scroll', handleScrolling)
})

//背景顏色
function handleScrolling (){
    if(window.scrollY > 10) isScrolling.value = true
    else isScrolling.value = false
} 

//banner相關
const bannerItems = computed(()=>{
    return allfinishedModels.value.filter((model:Model)=>model.finish_infos.length && model.finish_infos[0].gallery.length)
    .sort((a:Model,b:Model)=>new Date(b.finish_infos[0].finished_date).getTime() - new Date(a.finish_infos[0].finished_date).getTime() )
    .slice(0,9)
})
</script>