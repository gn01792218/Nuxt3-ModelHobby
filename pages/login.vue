<template>
    <div>
        <button class="block border-2" @click="login">Login with Google</button>
    <NuxtLink to="/">回首頁</NuxtLink>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout:"login"
})
const { baseURL } = useRuntimeConfig()
const supabase = useSupabaseClient()
const user = useSupabaseUser()
async function login(){
    const { error } = await  supabase.auth.signInWithOAuth({
        provider:'google',
        options:{
            redirectTo:`${baseURL}`
        }
    })
    if(error) console.log(error)
}
</script>