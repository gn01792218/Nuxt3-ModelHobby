import { useMyModelStore } from "~/store/useMyModelStore";

export default () => {
  const supabase = useSupabaseClient();
  const email = ref("");
  const password = ref("");
  const name = ref("")
  const { sendToast } = useMyToast()
  const { setmyModelList } = useMyModelStore()

  async function signUp() {
    const { error } = await supabase.auth.signUp({
      email: email.value,
      password: password.value,
      options:{  //往supabase的user table添加metadata, 之後就可以從user裡面拿到這個資料唷!
        data:{
          display_name:name.value
        }
      }
    });
    if (error) return alert(error);
     sendToast({
        title: '註冊成功',
        icon: "i-heroicons-information-circle",
        color: "green",
        description: `註冊成功，請先到您的信箱進行驗證!並再次登入`
    })
    navigateTo("/login")
  }
  async function login() {
    const { error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    });
    navigateTo("/");
    if (error) alert(error);
  }
  async function loginWithGoogle() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    if (error) alert(error);
  }
  async function logout() {
    const { error } = await supabase.auth.signOut()
    setmyModelList([]) // 清空store中的資料，否則有時候網路太慢會看到別人的資料
    navigateTo('/')
    if (error) console.log(error)
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
    logout
  };
};
