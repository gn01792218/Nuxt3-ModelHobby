<template>
   <p>我的模型</p>
   <section class="p-5 w-full h-[100px] bg-red-500 flex justify-start">
      <div>
         <button class="border-2 p-5" @click="showAddModelPanel = !showAddModelPanel">+添加模型</button>
         <div class="bg-yellow-600" v-show="showAddModelPanel">
            <div>
               <div>
                  <label for="model_name_zh">中文名稱</label>
                  <input id="model_name_zh" type="text" v-model="model.name_zh">
               </div>
               <div>
                  <label for="model_name_en">英文名稱</label>
                  <input id="model_name_en" type="text" v-model="model.name_en">
               </div>
               <div>
                  <label for="model_status">選擇狀態</label>
                  <select name="" id="" v-model="model.status">
                     <option :value="ModelStatus.未入庫">未入庫</option>
                     <option :value="ModelStatus.未組裝">未組裝</option>
                     <option :value="ModelStatus.已組裝">已組裝</option>
                  </select>
               </div>
            </div>
            <button @click="fetchAddMyModel">確認</button>
         </div>
      </div>
   </section>
   <MyModelCardGroup group-title="未組裝" :card-list="unFinishedModels" />
   <MyModelCardGroup group-title="已組裝" :card-list="finishedModels" />
   <MyModelCardGroup group-title="未入庫" :card-list="unStockInModels" />
</template>

<script setup lang="ts">
import useFetchMyModels from "~/composables/api/useFetchMyModels"
import { ModelStatus, type Model } from "~/types/model"
import { useMyModelStore } from '../../store/useMyModelStore'
const { getMyModels, addMyModels } = useFetchMyModels()
const {
   unStockInModels,
   unFinishedModels,
   finishedModels,
} = storeToRefs(useMyModelStore())
const { setmyModelList } = useMyModelStore()

fetchMyModels()
const showAddModelPanel = ref(false)
const model:Model = {
   name_zh:'',
   name_en:'',
   status:ModelStatus.未入庫
}

async function fetchMyModels() {
   const data = await getMyModels()
   setmyModelList(data)
}

async function fetchAddMyModel(){
   console.log('測試')
//   await addMyModels(model) 
   model.name_zh = ''
   model.name_en = ''
   model.status = 0
  showAddModelPanel.value = false
}
</script>
