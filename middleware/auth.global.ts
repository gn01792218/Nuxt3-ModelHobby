import { useMyModelStore } from "~/store/useMyModelStore";

export default defineNuxtRouteMiddleware((to, from) => {
  const { setOpenRouteGuardPanel } = useMyModelStore()
  const { user } = useUser()

  if (to.path.includes("MyModel") || to.path.includes("WishList")) {
    if (!user.value) {
      setOpenRouteGuardPanel(true)
      return navigateTo(from.fullPath)
    }
  }
});
