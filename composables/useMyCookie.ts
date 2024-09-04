export default () => {
  function getCookie(name:string) {
    return useCookie(name)
  }
  function setCookie(name:string, value:string | null) {
    const cookie = useCookie(name)
    cookie.value = value
  }

  return {
    //data
    
    //methods
    getCookie,
    setCookie,
  };
};