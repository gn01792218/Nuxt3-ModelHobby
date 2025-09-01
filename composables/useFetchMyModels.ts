import useFetchMyModels from "~/composables/api/useMyModelsAPI";
import { useMyModelStore } from '../store/useMyModelStore'
export default () => {
  const { getAllModels } = useFetchMyModels();
  const { setAllModelList } = useMyModelStore();
  async function fetchALlModels() {
    const data = await getAllModels();
    setAllModelList(data);
  }

  return {
    //data
    //methods
    fetchALlModels
  };
};
