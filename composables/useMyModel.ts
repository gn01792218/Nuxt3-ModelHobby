import { useMyModelStore } from "~/store/useMyModelStore"
import type { Model } from "~/types/model";

export default () => {
  const { setOpenSearchPanel, setAllModelList, setLoadingState } = useMyModelStore()
  const { allfinishedModels, allModelList } = storeToRefs(useMyModelStore())
  const modelId = Number(useRoute().params.modelId)

  const currentModel = computed(()=>{
    return allModelList.value.find((m:Model) => m.id === modelId)
  })

  //導航
  function navergateToMyModelDetial(id:number) {
    navigateTo(`/User/MyModel/ModelDetail-${id}`)
  }
  function navergateToGallery(id:number) {
    setOpenSearchPanel(false)
    navigateTo(`/Gallery/${id}`)
  }

  return {
    //data
    modelId,
    currentModel,
    allModelList,
    allfinishedModels,
    //methods
    navergateToMyModelDetial,
    navergateToGallery,
    setAllModelList,
    setLoadingState
  };
};