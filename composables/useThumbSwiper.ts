export default () => {
  const thumbsSwiper = ref<Swiper | null>(null);
  const mainSwiper = ref<Swiper | null>(null);
  const currentIndex = ref<number>(0);
  const openImgPanel = ref<boolean>(false);

  function setMainSwiper(swiper: any) {
    mainSwiper.value = swiper;
  }
  function setThumbsSwiper(swiper: any) {
    thumbsSwiper.value = swiper;
  }
  function processOpenImgPanel() {
    openImgPanel.value = true;
  }
  // 由於Modal中的Swiper會每次都重生( NuxtUI的modal機制 )
  // 所以要控制modal中的swiper index就得透過 initialSlide 參數來設置
  // 這裡當主要的swiper index有變動時，就會更改currentIndex
  const onMainSwiperActiveIndexChange = (swiper: Swiper) => {
    currentIndex.value = swiper.activeIndex;
  };
  return {
    //data
    openImgPanel,
    thumbsSwiper,
    mainSwiper,
    currentIndex,
    //methods
    setThumbsSwiper,
    setMainSwiper,
    processOpenImgPanel,
    onMainSwiperActiveIndexChange
  };
};
