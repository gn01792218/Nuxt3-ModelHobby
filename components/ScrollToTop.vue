<template>  
  <div class="fixed bottom-4 right-4">  
    <button @click="scrollToTop" :class="[isVisible? '!translate-x-[30px]':'','w-[100px] p-2 transition-all duration-700 ease-in-out translate-x-full bg-main-600 text-white rounded-full shadow-lg']">  
        <UIcon name="i-heroicons-arrow-up-circle-16-solid"/>
    </button>  
  </div>  
</template>  

<script setup>  
import { ref, onMounted, onUnmounted } from 'vue';  

const isVisible = ref(false);  

const handleScroll = () => {  
  isVisible.value = window.scrollY > 250; // 阈值，可以根据需要调整  
  console.log(isVisible.value)
};  

const scrollToTop = () => {  
  window.scrollTo({ top: 0, behavior: 'smooth' });  
};  

onMounted(() => {  
  window.addEventListener('scroll', handleScroll);  
});  

onUnmounted(() => {  
  window.removeEventListener('scroll', handleScroll);  
});  
</script>  