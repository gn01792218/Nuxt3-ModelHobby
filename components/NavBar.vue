<template>
    <nav>
        <ul class="flex min-w-[250px] justify-between">
            <li v-for="navItem in navs" :key="navItem.label">
                <section v-if="!navItem.childs">
                    <UIcon v-if="navItem.icon" :name="navItem.icon" />
                    <NuxtLink :class="[!user && navItem.authority !== Authority.All ? 'text-slate-400' : '']"
                        :to="navItem.to"> {{ navItem.label }} </NuxtLink>
                </section>
                <section v-else>
                    <UIcon v-if="navItem.icon" :name="navItem.icon" />
                    <span>{{ navItem.label }}</span>
                    <ul>
                       <li v-for="nav in navItem.childs" :key="nav.label">
                        <NuxtLink :class="[!user && nav.authority !== Authority.All ? 'text-slate-400' : '']"
                        :to="nav.to"> {{ nav.label }} </NuxtLink> 
                       </li> 
                    </ul>
                </section>
            </li>
        </ul>
    </nav>
</template>

<script setup lang="ts">
import { Authority } from '~/types/Auth';

interface NavItem {
    label: string
    to: string
    icon?: string
    authority: Authority
    childs?: NavItem[]
}
const user = useSupabaseUser()
const navs: NavItem[] = [
    {
        label: '首頁',
        to: '/',
        icon: 'i-heroicons-home-solid',
        authority: Authority.All
    },
    {
        label: '藝廊',
        to: '/Gallery',
        icon: 'i-heroicons-paint-brush-16-solid',
        authority: Authority.All
    },
    {
        label: '我的',
        to: '',
        icon: 'i-heroicons-user-16-solid',
        authority: Authority.MEMBER,
        childs: [
            {
                label:'願望清單',
                to:'/User/WishList',
                authority:Authority.MEMBER
            },
            {
                label:'我的模型',
                to:'/User/MyModel',
                authority:Authority.MEMBER
            },
        ]
    }

]

</script>