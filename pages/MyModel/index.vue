<template>
   <p>我的模型</p>
   <section class="p-5 w-full h-[100px] bg-red-500 flex justify-start">
      <div class="">
         <button v-if="user?.id === 'a161fb29-6948-4f8c-94c9-1ac707f5dac1' || user?.id === 'ba5171d3-299b-4f64-983b-7faf1621944d'" class="border-2 p-5" @click="showAddModelPanel = !showAddModelPanel">+添加模型</button>
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
                  <label for="model_main_img">封面圖片</label>
                  <input type="file" id="model_main_img" @change="handleUploadImg">
                  <img v-show="previewImg" :src="previewImg" alt="預覽圖">
               </div>
               <div>
                  --------------模型尺寸資訊------------
                  <div>
                     <label for="model_size_unit">選擇尺吋單位</label>
                     <select name="" id="" v-model="modelSize.unit">
                        <option :value="SizeUnit.MM">{{ SizeUnit.MM }}</option>
                        <option :value="SizeUnit.CM">{{ SizeUnit.CM }}</option>
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
               <div>
                  --------------購買訊息------------
                  <div>
                     <label for="model_purchase_info_ecommerce">購買平台</label>
                     <select name="" id="" :v-model="modelPurchaseInfo.e_commerce_name">
                        <option :value="Ecommerce.淘寶">{{ Ecommerce.淘寶 }}</option>
                        <option :value="Ecommerce.蝦皮">{{ Ecommerce.蝦皮 }}</option>
                     </select>
                  </div>
                  <div>
                     <label for="model_purchase_info_currency">幣種</label>
                     <select name="" id="" :v-model="modelPurchaseInfo.currency">
                        <option :value="Currency.RMB">{{ Currency.RMB }}</option>
                        <option :value="Currency.TW">{{ Currency.TW }}</option>
                     </select>
                  </div>
                  <div>
                     <label for="model_purchase_info_price">價格</label>
                     <input id="model_purchase_info_price" type="number" step="0.0001" v-model="(modelPurchaseInfo.price)">
                  </div>
                  <div>
                     <label for="model_purchase_info_shop_name">店家名稱</label>
                     <input id="model_purchase_info_shop_name" type="text" v-model="modelPurchaseInfo.shop_name">
                  </div>
                  <div>
                     <label for="model_purchase_info_shop_name">購買日期</label>
                     <input id="model_purchase_info_shop_name" type="date" v-model="modelPurchaseInfo.purchase_date">
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
// import useUtils from "~/composables/useUtils"
import useMyModelsAPI from "~/composables/api/useMyModelsAPI"
import {
   type ModelSize,
   type PurchaseInfo,
   type Model,
   ModelStatus,
   SizeUnit,
   Ecommerce,
   Currency,
} from "~/types/model"
import { useMyModelStore } from '../../store/useMyModelStore'
// const { handleUploadImg } = useUtils()
const { addMyModel, addMyModelsSize, addMyModelPurchaseInfo  } = useMyModelsAPI()
const {
   myModelList,
   unStockInModels,
   unFinishedModels,
   finishedModels,
} = storeToRefs(useMyModelStore())
const { fetchMyModels } = useFetchMyModels()
const user = useSupabaseUser()

if(!myModelList.value.length) fetchMyModels()

const showAddModelPanel = ref(false)
const modelSize = ref<ModelSize>({
   unit: SizeUnit.MM,
   width: 0,
   length: 0,
   height: 0
})
const modelPurchaseInfo = ref<PurchaseInfo>({
   e_commerce_name: Ecommerce.淘寶,
   currency: Currency.RMB,
   price: 0,
})
const model: Model = {
   status: ModelStatus.未入庫,
   name_zh: '',
   name_en: '',
}
const previewImg = ref("")
const main_img_file = ref<File>()

async function uploadSpabaseStorage():Promise<string>{
   if(!main_img_file.value) return ''
   const supabase = useSupabaseClient()

   const fileName = `model_main_img_${crypto.randomUUID()}`
   console.log(fileName)
   const { data, error } = await supabase.storage.from("images").upload(`public/${fileName}`, main_img_file.value)
   if(error) throw createError({
      ...error,
      message:'無法上傳圖片',
   })
   return data.path
}

async function fetchAddMyModel() {
   //先處理圖片
   model.main_img = await uploadSpabaseStorage()
   const myModel = await addMyModel(model)
   if (!myModel.id) return alert('出問題了')
   //添加尺寸
   const size = addMyModelsSize(myModel.id, modelSize.value)
   //添加購買明細
   const purchaseInfo = addMyModelPurchaseInfo(myModel.id, modelPurchaseInfo.value)
   await Promise.allSettled([size,purchaseInfo])
   //重新拉取資料
   await fetchMyModels()
   //reset
   model.name_zh = ''
   model.name_en = ''
   showAddModelPanel.value = false
}
async function handleUploadImg(event:InputEvent){
    const input = event.target as HTMLInputElement
    if(input.files){
        const img = input.files[0]
        const reader = new FileReader()
        reader.onload = (e)=>{
            //預覽圖
            previewImg.value = e.target?.result as string
        }
        reader.readAsDataURL(img)
      main_img_file.value = img
    }
  }
</script>
