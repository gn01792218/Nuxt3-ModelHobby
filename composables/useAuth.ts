export default () => {
  const supabase = useSupabaseClient();
  const email = ref("");
  const password = ref("");

  async function signUp() {
    const { error } = await supabase.auth.signUp({
      email: email.value,
      password: password.value,
    });
    if (error) alert(error);
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
    if (error) console.log(error)
}

  return {
    //data
    email,
    password,
    //methods
    signUp,
    login,
    loginWithGoogle,
    logout
  };
};
