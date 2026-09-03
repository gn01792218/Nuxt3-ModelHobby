import { useSupabaseToken } from '~/composables/useSupabaseToken'

export default defineNuxtRouteMiddleware((to, from) => {
  const token = useSupabaseToken()

  if (to.path.includes("MyModel")) {
    const user = useSupabaseUser()
    const { ownerEmail } = useRuntimeConfig().public
    if (!token || user.value?.email !== ownerEmail) {
      return navigateTo('/')
    }
    return
  }

  if (to.path.includes("WishList")) {
    if (!token) {
      return navigateTo('/login')
    }
  }
})
