import { useMyModelStore } from "~/store/useMyModelStore"
export default () => {
  const { setCurrentModelId } = useMyModelStore()

  //導航
  function navergateToMyModelDetial(id:number) {
    setCurrentModelId(id)
    navigateTo(`/User/MyModel/ModelDetail-${id}`)
  }
  function navergateToGallery(id:number) {
    setCurrentModelId(id)
    navigateTo(`/Gallery/${id}`)
  }

  return {
    //methods
    navergateToMyModelDetial,
    navergateToGallery
  };
};