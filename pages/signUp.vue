<template>
    <div>
        <input class="block" type="email" placeholder="帳號" v-model="email">
        <input class="block" type="password" placeholder="密碼" v-model="password" autocomplete="true">
        <button class="block border-2" @click="signUp">註冊</button>
        <section>
            已經有帳號了?
            <button class="block border-2" @click="login">Login</button>
            <button class="block border-2" @click="loginWithGoogle">Login with Google</button>
            <NuxtLink to="/">回首頁</NuxtLink>
        </section>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: "login"
})
const { signUp, login, loginWithGoogle, email, password } = useAuth()
</script>