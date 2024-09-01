<template>
    <section>
        <header class="p-5 w-full bg-main flex flex-col flex-wrap items-center sm:flex-row sm:justify-between fixed z-[10]">
            <NavBar />
            <div class="flex mt-2 sm:mt-0">
                <SearchBar :search-sorce="allModelList" place-holder="全站模型搜尋"/>
                <div v-if="user">
                    <p>歡迎 {{ user.user_metadata.full_name || user.user_metadata.display_name }}</p>
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
</template>

<script setup lang="ts">
import { useMyModelStore } from "~/store/useMyModelStore"
import { type Model } from "~/types/model"

const route = useRoute()
//user相關
const { user } = useUser()
const { logout } = useAuth()

//pinan資料取用
const { allModelList, allfinishedModels } = storeToRefs(useMyModelStore())

//banner相關
const bannerItems = computed(()=>{
    return allfinishedModels.value.filter((model:Model)=>model.finish_infos.length && model.finish_infos[0].gallery.length)
    .sort((a:Model,b:Model)=>new Date(b.finish_infos[0].finished_date).getTime() - new Date(a.finish_infos[0].finished_date).getTime() )
    .slice(0,9)
})
</script>