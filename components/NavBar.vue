<template>
    <nav>
        <ul class="flex min-w-[250px] justify-between">
            <li
                v-for="navItem in navs" :key="navItem.title"
            ><NuxtLink :class="[ !user && navItem.authority !== Authority.All ? 'text-slate-400' : '']" :to="navItem.to"> {{ navItem.title }} </NuxtLink></li>
        </ul>
    </nav>
</template>

<script setup lang="ts">
import { Authority } from '~/types/Auth';

interface NavItem{
    title:string
    to:string
    authority:Authority
}
const user = useSupabaseUser()
const navs:NavItem[] = [
    {
        title:'首頁',
        to:'/',
        authority:Authority.All
    },
    {
        title:'藝廊',
        to:'/Gallery',
        authority:Authority.All
    },
    {
        title:'願望清單',
        to:'/WishList',
        authority:Authority.MEMBER
    },
    {
        title:'我的模型',
        to:'/MyModel',
        authority:Authority.MEMBER
    },
]

</script>