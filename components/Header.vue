<template>
    <header class="p-5 bg-red-200 flex justify-between">
        <NavBar/>
        <div>
            <div v-if="user">
                <p>歡迎 {{ user.user_metadata.full_name }}</p>
                <button @click="logout">Logout</button>
            </div>
            <NuxtLink v-else to="/login">Login</NuxtLink>
        </div>
    </header>
</template>

<script setup lang="ts">
const user = useSupabaseUser()
const supabase = useSupabaseClient()
async function logout(){
    const { error } =await supabase.auth.signOut()
    if(error) console.log(error)
}
</script>