import { useMyModelStore } from "~/store/useMyModelStore"
import useMyModelsAPI from "./api/useMyModelsAPI";
import type { Model } from '~/types/model'

export default () => {
  const { getMyModel } = useMyModelsAPI()
  const { setOpenSearchPanel } = useMyModelStore()
  const { allfinishedModels } = storeToRefs(useMyModelStore())
  const modelId = Number(useRoute().params.modelId)
  const currentModel = ref<Model |null>(null)

  //導航
  function navergateToMyModelDetial(id:number) {
    navigateTo(`/User/MyModel/ModelDetail-${id}`)
  }
  function navergateToGallery(id:number) {
    setOpenSearchPanel(false)
    navigateTo(`/Gallery/${id}`)
  }
  //取得單一模型資料
  async function initModel(){
    currentModel.value = await getMyModel(modelId)
  }

  return {
    //data
    modelId,
    currentModel,
    allfinishedModels,
    //methods
    navergateToMyModelDetial,
    navergateToGallery,
    initModel
  };
};