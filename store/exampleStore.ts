import { defineStore } from 'pinia';
// 使用composition API模式定义store
export const useExampleStore = defineStore('exampleStore', () => {
  // 初始状态
  const initState = {
    count: 0
  };

  //state
  const count = ref<number>(initState.count);

  //gatters
  const doubleCount = computed(() => count.value * 2);

  //actions
  function increment() {
    count.value++;
  }

  // 重写reset
  function reset() {
    count.value = initState.count;
  }

  return { count, doubleCount, increment, reset };
});