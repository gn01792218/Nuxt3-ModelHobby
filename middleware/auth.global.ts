import { useSupabaseToken } from '~/composables/useSupabaseToken'

export default defineNuxtRouteMiddleware((to, from) => {
  const token = useSupabaseToken()

  if (to.path.includes("MyModel") || to.path.includes("WishList")) {
    if (!token) {
      return navigateTo('/login')
    }
  }
})