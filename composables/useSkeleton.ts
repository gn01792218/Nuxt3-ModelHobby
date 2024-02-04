export default () => {
  const loadSkeleton = ref(true);

  onMounted(() => {
    loadSkeleton.value = false;
  });

  return {
    //data
    loadSkeleton,
  };
};
