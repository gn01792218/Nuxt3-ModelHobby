import { useMyModelStore } from "~/store/useMyModelStore"
export default () => {
  const { setCurrentModelId, setOpenSearchPanel } = useMyModelStore()

  //導航
  function navergateToMyModelDetial(id:number) {
    setCurrentModelId(id)
    navigateTo(`/User/MyModel/ModelDetail-${id}`)
  }
  function navergateToGallery(id:number) {
    setCurrentModelId(id)
    setOpenSearchPanel(false)
    navigateTo(`/Gallery/${id}`)
  }

  return {
    //methods
    navergateToMyModelDetial,
    navergateToGallery
  };
};