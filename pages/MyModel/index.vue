<template>
   <p>我的模型</p> 
   <section>
      <p>未組裝 [{{ unFinishedList.length }}]</p>
      <ul>
         <li class="border-2 mb-5" v-for="model in unFinishedList" :key="model.id">
            <ModelCard
               :model-data="model"
            /> 
         </li>
      </ul>
   </section>
   <section>
      <p>已組裝[ {{ finishedList.length }} ]</p>
      <ul>
         <li class="border-2 mb-5" v-for="model in finishedList" :key="model.id">
            <ModelCard
               :model-data="model"
            /> 
         </li>
      </ul>
   </section>
</template>

<script setup lang="ts">
import { ModelStatus } from "../../types/model"
import myModelList from "../../data/model"
const unFinishedList = computed(()=>{
   return myModelList.filter(model=>model.status <= ModelStatus.未組裝) 
})
const finishedList = computed(()=>{
   return myModelList.filter(model=>model.status == ModelStatus.已組裝) 
})
</script>
