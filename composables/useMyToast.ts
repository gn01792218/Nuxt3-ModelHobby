import type { ToastOptions } from "~/types/toast";

export default () => {
  const toast = useToast()
  function sendToast(option:ToastOptions){
   toast.add(option as Partial<Notification>) 
  }

  return {
    //data
    //methods
    sendToast,
  };
};