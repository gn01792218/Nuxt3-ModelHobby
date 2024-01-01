<template>
   <p>我的模型</p>
   <section class="p-5 w-full h-[100px] bg-red-500 flex justify-start">
      <div class="">
         <button class="border-2 p-5" @click="showAddModelPanel = !showAddModelPanel">+添加模型</button>
         <div class="bg-yellow-600 absolute p-5" v-show="showAddModelPanel">
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
               <div>
                  <div>
                     <label for="model_size_unit">選擇尺吋單位</label>
                     <select name="" id="" :v-model="modelSize.unit">
                        <option :value="SizeUnit.MM">{{ SizeUnit.MM }}</option>
                        <option :value="SizeUnit.MM">{{ SizeUnit.CM }}</option>
                     </select>
                  </div>
                  <div>
                     <label for="model_size_length">長度</label>
                     <input id="model_size_length" type="number" step="0.0001" v-model="modelSize.length">
                  </div>
                  <div>
                     <label for="model_size_width">寬度</label>
                     <input id="model_size_width" type="number" step="0.0001" v-model="(modelSize.width)">
                  </div>
                  <div>
                     <label for="model_size_height">高度</label>
                     <input id="model_size_height" type="number" step="0.0001" v-model="(modelSize.height)">
                  </div>
               </div>
            </div>
            <button class="ml-auto block border-2" @click="fetchAddMyModel">確認</button>
         </div>
      </div>
   </section>
   <MyModelCardGroup group-title="未組裝" :card-list="unFinishedModels" />
   <MyModelCardGroup group-title="已組裝" :card-list="finishedModels" />
   <MyModelCardGroup group-title="未入庫" :card-list="unStockInModels" />
</template>

<script setup lang="ts">
import useFetchMyModels from "~/composables/api/useFetchMyModels"
import { type ModelSize, ModelStatus, SizeUnit, type Model } from "~/types/model"
import { useMyModelStore } from '../../store/useMyModelStore'
const { getMyModels, addMyModels, addMyModelsSize } = useFetchMyModels()
const {
   unStockInModels,
   unFinishedModels,
   finishedModels,
} = storeToRefs(useMyModelStore())
const { setmyModelList } = useMyModelStore()

fetchMyModels()
const showAddModelPanel = ref(false)
const modelSize = ref<ModelSize>({
   unit: SizeUnit.MM,
   width: 0,
   length: 0,
   height: 0
})
const model: Model = {
   status: ModelStatus.未入庫,
   name_zh: '',
   name_en: '',
}

async function fetchMyModels() {
   const data = await getMyModels()
   setmyModelList(data)
}

async function fetchAddMyModel() {
   const myModel =await addMyModels(model) 
   //添加尺寸
   if(myModel.id) await addMyModelsSize(myModel.id, modelSize.value)
   model.name_zh = ''
   model.name_en = ''
   showAddModelPanel.value = false
}
</script>
