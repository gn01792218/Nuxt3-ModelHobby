import { useMyModelStore } from "~/store/useMyModelStore";

export default defineNuxtRouteMiddleware((to, from) => {
  const { setOpenRouteGuardPanel } = useMyModelStore()

  if (to.path.includes("MyModel") || to.path.includes("WishList")) {
    const user = useSupabaseUser();

    if (!user.value) {
      setOpenRouteGuardPanel(true)
      return navigateTo(from.fullPath)
    }
  }
});
