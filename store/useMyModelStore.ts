import { defineStore } from "pinia";
import { type Model, ModelStatus } from "../types/model";
import myModels from "../data/model";
// 使用composition API模式定义store
export const useMyModelStore = defineStore("myModelStore", () => {
  // 初始状态
  const initState = {
    myModelList: myModels,
  };

  //state
  const myModelList = ref<Model[]>(initState.myModelList);

  //gatters
  const unStockInModels = computed(()=> myModelList.value.filter(model => model.status === ModelStatus.未入庫))
  const unFinishedModels = computed(()=>  myModelList.value.filter(model => model.status <= ModelStatus.未組裝))
  const finishedModels = computed(() => myModelList.value.filter(model => model.status === ModelStatus.已組裝))
  //actions
  function addModel(payload: Model) {
    myModelList.value.push(payload);
  }

  return {
    //data
    myModelList,
    unStockInModels,
    unFinishedModels,
    finishedModels,
    //methods
    addModel,
  };
});
