import { type Model, ModelStatus } from "../types/model";

// 使用composition API模式定义store
export const useMyModelStore = defineStore("MyMOdelsStore", () => {
  // 初始状态
  const initState = {
    myModelList: [],
    loading: false,
    currentModelId:0,
    currentModeStatusTab:1
  };

  //state
  const myModelList = ref<Model[]>(initState.myModelList);
  const loading = ref<boolean>(initState.loading);
  const currentModelId = ref<number>(initState.currentModelId)
  const currentModeStatusTab = ref<number>(initState.currentModeStatusTab)

  //gatters
 const currentModel = computed(() =>
    myModelList.value.find((model) => model.id === currentModelId.value)
  );
  const unStockInModels = computed(() =>
    myModelList.value.filter((model) => model.status === ModelStatus.未入庫)
  );
  const unFinishedModels = computed(() =>
    myModelList.value.filter((model) => model.status <= ModelStatus.未組裝)
  );
  const finishedModels = computed(() =>
    myModelList.value.filter((model) => model.status === ModelStatus.已組裝)
  );
  //actions
  function setmyModelList(payload: Model[]) {
    myModelList.value = payload;
  }
  function addModel(payload: Model) {
    myModelList.value.push(payload);
  }
  function updateMyModelData(payload: Model) {
    const modelIndex = myModelList.value.findIndex(
      (model) => model.id === payload.id
    );
    myModelList.value[modelIndex] = payload;
  }
  function setLoadingState(payload: boolean) {
    loading.value = payload;
  }
  function setCurrentModelId(payload:number){
    currentModelId.value = payload
  }
  function setCurrentModelStatusTab(payload:number){
    currentModeStatusTab.value = payload
  }

  return {
    //data
    myModelList,
    loading,
    unStockInModels,
    unFinishedModels,
    finishedModels,
    currentModel,
    currentModeStatusTab,
    //methods
    setmyModelList,
    addModel,
    updateMyModelData,
    setLoadingState,
    setCurrentModelId,
    setCurrentModelStatusTab
  };
});
