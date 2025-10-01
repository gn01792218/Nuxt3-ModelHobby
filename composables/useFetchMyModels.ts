import useFetchMyModels from "~/composables/api/useMyModelsAPI";
import { useMyModelStore } from '../store/useMyModelStore'
import type { Model } from "~/types/model";
export default () => {
  const { getAllModels } = useFetchMyModels();
  const { setAllModelList } = useMyModelStore();
  async function fetchALlModels() {
    const {data} = await getAllModels();
    setAllModelList(data.value as Model[]);
  }

  return {
    //data
    //methods
    fetchALlModels
  };
};
