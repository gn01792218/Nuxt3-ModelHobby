import { defineStore } from "pinia";
import { type Model, ModelStatus } from "../types/model";

// 使用composition API模式定义store
export const useMyModelStore = defineStore("myModelStore", () => {
  // 初始状态
  const initState = {
    myModelList: [],
  };

  //state
  const myModelList = ref<Model[]>(initState.myModelList);

  //gatters
  const unStockInModels = computed(()=> myModelList.value.filter(model => model.status === ModelStatus.未入庫))
  const unFinishedModels = computed(()=>  myModelList.value.filter(model => model.status <= ModelStatus.未組裝))
  const finishedModels = computed(() => myModelList.value.filter(model => model.status === ModelStatus.已組裝))
  //actions
  function setmyModelList(payload:Model[]){
    myModelList.value = payload
  }
  function addModel(payload: Model) {
    myModelList.value.push(payload);
  }
  function updateMyModelData(payload:Model){
    const modelIndex = myModelList.value.findIndex(model=>model.id === payload.id)
    myModelList.value[modelIndex] = payload
  }

  return {
    //data
    myModelList,
    unStockInModels,
    unFinishedModels,
    finishedModels,
    //methods
    setmyModelList,
    addModel,
    updateMyModelData
  };
});
