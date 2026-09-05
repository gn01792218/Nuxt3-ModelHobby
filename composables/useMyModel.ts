import { useMyModelStore } from "~/store/useMyModelStore"
import type { Model } from "~/types/model";
import { pickRelatedModels } from "~/utils/relatedModels"
import { isShowcaseReady } from "~/utils/modelShowcase"

export default () => {
  const { setOpenSearchPanel, setAllModelList, setLoadingState } = useMyModelStore()
  const { allfinishedModels, allModelList } = storeToRefs(useMyModelStore())
  const modelId = Number(useRoute().params.modelId)

  const currentModel = computed(()=>{
    return allModelList.value.find((m:Model) => m.id === modelId)
  })

  // 展示頁「探索更多」：同類別/同品牌/同比例的其他已完成模型，隨機取 12 筆
  // 排除沒有完成圖片、沒有完成時間的模型，避免卡牌顯示不完整
  const showcaseReadyModels = computed(() => allfinishedModels.value.filter(isShowcaseReady))
  const sameTypeModels = computed(() => pickRelatedModels(showcaseReadyModels.value, currentModel.value, 'type', 12))
  const sameBrandModels = computed(() => pickRelatedModels(showcaseReadyModels.value, currentModel.value, 'brand', 12))
  const sameScaleModels = computed(() => pickRelatedModels(showcaseReadyModels.value, currentModel.value, 'scale', 12))

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
    showcaseReadyModels,
    sameTypeModels,
    sameBrandModels,
    sameScaleModels,
    //methods
    navergateToMyModelDetial,
    navergateToGallery,
    setAllModelList,
    setLoadingState
  };
};