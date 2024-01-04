<template>
    <div>
        <input class="block" type="email" placeholder="帳號" v-model="email">
        <input class="block" type="password" placeholder="密碼" v-model="password" autocomplete="true">
        <button class="block border-2" @click="login">Login</button>
        <button class="block border-2" @click="loginWithGoogle">Login with Google</button>
        <section>
            還沒有帳號?
            <NuxtLink to="/signUp">註冊一個</NuxtLink>
        </section>
        <NuxtLink to="/">回首頁</NuxtLink>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: "login"
})
const { login, loginWithGoogle, email, password } = useAuth()

</script>