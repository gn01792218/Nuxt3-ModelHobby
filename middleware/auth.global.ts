export default defineNuxtRouteMiddleware((to, from) => {
  if (to.path.includes("MyModel") || to.path.includes("WishList")) {
    const user = useSupabaseUser();

    if (!user.value) {
      alert("使用者需要先登入");
      return navigateTo("/"); //一定要return 掉，否則navigate完後，又會跑去該路由XD
    }
  }
});
