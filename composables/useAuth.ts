import { useMyModelStore } from "~/store/useMyModelStore";
import { useAuthStore } from "~/store/useAuthStore";

export default () => {
  const supabase = useSupabaseClient();
  const email = ref("");
  const password = ref("");
  const name = ref("");
  const { sendToast } = useMyToast();
  const { setmyModelList } = useMyModelStore();
  const { setLogin } = useAuthStore();

  async function signUp() {
    const { error } = await supabase.auth.signUp({
      email: email.value,
      password: password.value,
      options: {
        //往supabase的user table添加metadata, 之後就可以從user裡面拿到這個資料唷!
        data: {
          display_name: name.value,
        },
      },
    });
    if (error) return alert(error);
    sendToast({
      title: "註冊成功",
      icon: "i-heroicons-information-circle",
      color: "green",
      description: `註冊成功，請先到您的信箱進行驗證!並再次登入`,
    });
    navigateTo("/login");
  }
  async function login() {
    const { error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    });
    if (error) return alert(error);
    setUserLoginStatus(true)
    navigateTo("/");
  }
  async function loginWithGoogle() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    if (error) return alert(error);
    setUserLoginStatus(true);
  }
  async function logout() {
    const { error } = await supabase.auth.signOut();
    if (error) return console.log(error);
    setmyModelList([]); // 清空store中的資料，否則有時候網路太慢會看到別人的資料
    setUserLoginStatus(false);
    navigateTo("/");
  }
  //暫時沒有什麼特別鳥用的設置，但留著，以便之後要在程式中判斷使用者登入狀況時候可以使用
  function setUserLoginStatus(status: boolean) {
    setLogin(status);
  }

  return {
    //data
    name,
    email,
    password,
    //methods
    signUp,
    login,
    loginWithGoogle,
    logout,
  };
};
