import useFetchMyModels from "~/composables/api/useMyModelsAPI";
import { useMyModelStore } from '../store/useMyModelStore'
export default () => {
  const { getMyModels } = useFetchMyModels();
  const { setmyModelList } = useMyModelStore()

  async function fetchMyModels() {
    const data = await getMyModels();
    setmyModelList(data);
  }

  return {
    //data
    //methods
    fetchMyModels
  };
};
