import { type Model, ModelStatus } from "../types/model";

// 使用composition API模式定义store
export const useMyModelStore = defineStore("MyMOdelsStore", () => {
  const { thisMonth, getMonth } = useDate()
  const { toTWD } = useExchange()
  // 初始状态
  const initState = {
    myModelList: [],
    loading: false,
    currentModelId:0,
    currentModeStatusTab:1,
    openSearchPanel:false,
    openRouteGuardPanel:false,
    searchResult:[]
  };

  //state
  const myModelList = ref<Model[]>(initState.myModelList);
  const loading = ref<boolean>(initState.loading);
  const currentModelId = ref<number>(initState.currentModelId)
  const currentModeStatusTab = ref<number>(initState.currentModeStatusTab)
  const openSearchPanel = ref(initState.openSearchPanel)
  const openRouteGuardPanel = ref(initState.openRouteGuardPanel)
  const searchResult = ref<Model[]>(initState.searchResult)

  //gatters
 const currentModel = computed(() => myModelList.value.find((model) => model.id === currentModelId.value));
  const unStockInModels = computed(() =>
    myModelList.value.filter((model) => model.status === ModelStatus.未入庫)
  );
  const unFinishedModels = computed(() =>
    myModelList.value.filter((model) => model.status <= ModelStatus.未組裝)
  );
  const finishedModels = computed(() =>
    myModelList.value.filter((model) => model.status === ModelStatus.已組裝)
  );
  const thisMonthFinishedModels = computed(() =>{
    return myModelList.value.filter((model) => model.finish_infos.some(info=>getMonth(info.finished_date!) === thisMonth))
  });
  const thisMonthFinishedCount = computed(()=>{
    let count = 0
    thisMonthFinishedModels.value.forEach(model=>{
      model.finish_infos.forEach(info=>{
        if(getMonth(info.finished_date!) === thisMonth) count++
      })
    })
    return count
  })
  const thisMonthPurchaseModels = computed(() =>
    myModelList.value.filter((model) =>model.purchase_infos?.some(info=>getMonth(info.purchase_date!) === thisMonth))
  );
  const thisMonthPurchaseModelsCount = computed(()=> {
    let count = 0
    thisMonthPurchaseModels.value.forEach(model => model.purchase_infos?.forEach(info=>{
      if(getMonth(info.purchase_date!) === thisMonth) count += info.amount
    }))
    return count
  })
  const thisMonthPurchaseCoast = computed(()=> {
    let coast = 0
    thisMonthPurchaseModels.value.forEach(model => model.purchase_infos?.forEach(info=>{
      if(getMonth(info.purchase_date!) === thisMonth) coast += toTWD(info.currency, info.price, info.amount)
    }))
    return coast
  })
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
  function setSearchResult(payload:Model[]) {
    searchResult.value = payload
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
  function setOpenSearchPanel(payload:boolean){
    openSearchPanel.value = payload
  }
  function setOpenRouteGuardPanel(payload:boolean){
    openRouteGuardPanel.value = payload
  }

  return {
    //data
    myModelList,
    loading,
    unStockInModels,
    unFinishedModels,
    finishedModels,
    thisMonthFinishedModels,
    thisMonthFinishedCount,
    thisMonthPurchaseModels,
    thisMonthPurchaseModelsCount,
    thisMonthPurchaseCoast,
    currentModel,
    currentModeStatusTab,
    openSearchPanel,
    openRouteGuardPanel,
    searchResult,
    //methods
    setmyModelList,
    addModel,
    updateMyModelData,
    setLoadingState,
    setCurrentModelId,
    setCurrentModelStatusTab,
    setOpenSearchPanel,
    setOpenRouteGuardPanel,
    setSearchResult
  };
});
