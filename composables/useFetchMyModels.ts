import useFetchMyModels from "~/composables/api/useMyModelsAPI";
import { useMyModelStore } from '../store/useMyModelStore'
export default () => {
  const { getMyModels, getAllModels } = useFetchMyModels();
  const { setmyModelList, setAllModelList } = useMyModelStore()
  async function fetchALlModels() {
    const data = await getAllModels();
    setAllModelList(data);
  }
  async function fetchMyModels() {
    const data = await getMyModels();
    setmyModelList(data);
  }

  return {
    //data
    //methods
    fetchMyModels,
    fetchALlModels
  };
};
