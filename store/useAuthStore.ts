// 使用composition API模式定义store
export const useAuthStore = defineStore("AuthStore", () => {
  // 初始状态
  const initState = {
    isLogin: false,
  };

  //state
  const isLogin = ref(initState.isLogin);

  //gatters
  function setLogin(payload: boolean) {
    isLogin.value = payload;
  }

  return {
    //data
    isLogin,
    //methods
    setLogin
  };
});
