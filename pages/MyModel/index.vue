<template>
   <section class="p-5 w-full h-[100px] bg-red-500 flex justify-start">
      <div class="">
         <UButton
            v-if="user?.id === 'a161fb29-6948-4f8c-94c9-1ac707f5dac1' || 
            user?.id === 'ba5171d3-299b-4f64-983b-7faf1621944d' || 
            user?.id === '66a7e0cc-99e5-4cbf-8bc7-72021b26b362'"
            color="amber" variant="solid" @click="showAddModelPanel = !showAddModelPanel">
            <UIcon name="i-heroicons-plus-circle-16-solid" />
            添加模型
         </UButton>
         <div class="bg-yellow-600 absolute p-5 z-[2]" v-show="showAddModelPanel">
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
                    <label for="model_name_en">品牌</label>
                    <select name="" id="" v-model="model.brand">
                        <option v-for="brand in ModelBrand" :key="brand" :value="brand">{{ brand }}</option>
                    </select>
                </div>
                <div>
                    <label for="model_name_en">產品編號</label>
                    <input id="model_name_en" type="text" v-model="model.article_number">
                </div>
               <div>
                  <label for="model_main_img">封面圖片</label>
                  <input type="file" id="model_main_img" @change="(e)=> main_img_file = handleUploadMutipleImgs(e, toRef(preview_main_Img))">
                  <img v-show="preview_main_Img[0]" :src="preview_main_Img[0]" alt="預覽圖">
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
                     <select name="" id="" v-model="modelPurchaseInfo.e_commerce_name">
                        <option :value="Ecommerce.淘寶">{{ Ecommerce.淘寶 }}</option>
                        <option :value="Ecommerce.蝦皮">{{ Ecommerce.蝦皮 }}</option>
                     </select>
                  </div>
                  <div>
                     <label for="model_purchase_info_currency">幣種</label>
                     <select name="" id="" v-model="modelPurchaseInfo.currency">
                        <option :value="Currency.RMB">{{ Currency.RMB }}</option>
                        <option :value="Currency.TW">{{ Currency.TW }}</option>
                     </select>
                  </div>
                  <div>
                     <label for="model_purchase_info_price">價格</label>
                     <input id="model_purchase_info_price" type="number" step="0.0001" v-model="(modelPurchaseInfo.price)">
                  </div>
                  <div>
                     <label for="model_purchase_info_amount">數量</label>
                     <input id="model_purchase_info_amount" type="number" v-model="(modelPurchaseInfo.amount)">
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
               <div>
                  --------------完成資訊------------
                  <div>
                     <label for="model_finish_info_finished_date">完成日期</label>
                     <input id="model_finish_info_finished_date" type="date" v-model="modelFinishInfo.finished_date">
                  </div>
                  <div>
                     <label for="model_process_imgs">製作圖片</label>
                     <input type="file" id="model_process_imgs" @change="(e)=>{
                        process_imgs = handleUploadMutipleImgs(e, ref(previewProcessImgs))
                        previewProcessImgs.length = 0
                        }" multiple>
                     <div v-for="img in previewProcessImgs" :key="img">
                        <img :src="img" alt="預覽圖">
                     </div>
                  </div>
                  <div>
                     <label for="model_finished_imgs">完成圖片</label>
                     <input type="file" id="model_finished_imgs" @change="(e)=>{
                        gallery_imgs = handleUploadMutipleImgs(e, ref(previewGalleryImgs))
                        previewGalleryImgs.length = 0
                        }" multiple>
                     <div v-for="img in previewGalleryImgs" :key="img">
                        <img :src="img" alt="預覽圖">
                     </div>
                  </div>
               </div>
            </div>
            <button class="ml-auto block border-2" @click="fetchAddMyModel">確認</button>
         </div>
      </div>
   </section>
   <MyModelTabsArea :un-stock-in-models="unStockInModels" :un-finished-models="unFinishedModels"
      :finished-models="finishedModels" />
</template>

<script setup lang="ts">
import useMyModelsAPI from "~/composables/api/useMyModelsAPI"
import {
   type ModelSize,
   type ModelFinishInfo,
   type Model,
   ModelStatus,
   SizeUnit,
   Ecommerce,
   Currency,
   ModelBrand
} from "~/types/model"
import {  
   type PurchaseInfo,
   type CreatePurchaseInfoRequest
} from "~/types/purchaseInfo"
import { StorageBucket } from "~/types/supabase"
import { useMyModelStore } from '../../store/useMyModelStore'
const { handleUploadMutipleImgs } = useUploadImage()

const { addMyModel, addMyModelsSize, addMyModelPurchaseInfo, addMyModelFinishInfo } = useMyModelsAPI()
const {
   myModelList,
   unStockInModels,
   unFinishedModels,
   finishedModels,
} = storeToRefs(useMyModelStore())
const { setLoadingState } = useMyModelStore()
const { fetchMyModels } = useFetchMyModels()
const { uploadImageToSpabaseStorage, uploadMultipleImagesToSupabaseStorage } = useSupabase()
const user = useSupabaseUser()

const showAddModelPanel = ref(false)
const modelSize = ref<ModelSize>({
   unit: SizeUnit.MM,
   width: 0,
   length: 0,
   height: 0
})
const modelPurchaseInfo = ref<CreatePurchaseInfoRequest>({
   e_commerce_name: Ecommerce.淘寶,
   currency: Currency.RMB,
   price: 0,
   amount:1
})
const modelFinishInfo: ModelFinishInfo = ({})
const model: Model = {
   status: ModelStatus.未入庫,
   name_zh: '',
   name_en: '',
}
const preview_main_Img = ref<string[]>([])
const previewProcessImgs = ref<string[]>([])
const previewGalleryImgs = ref<string[]>([])
const main_img_file = ref<FileList | null>(null)
const process_imgs = ref<FileList | null>(null)
const gallery_imgs = ref<FileList | null>(null)

async function fetchAddMyModel() {
   setLoadingState(true)
   //先處理圖片
   // 這裡得改成非同步進行，才不會阻塞
   const mainImgs = await uploadMultipleImagesToSupabaseStorage(main_img_file.value!, {
      bucketName: StorageBucket.images,
      modelId: -1,
      fileNameTitle: 'model_main_img'
   })
   model.main_img = mainImgs[0]
   modelFinishInfo.process_imgs = await uploadMultipleImagesToSupabaseStorage(process_imgs.value!, {
      bucketName: StorageBucket.model_finish_info_images,
      modelId: -1,
      fileNameTitle: 'model_process_img'
   })
   modelFinishInfo.gallery = await uploadMultipleImagesToSupabaseStorage(gallery_imgs.value!, {
      bucketName: StorageBucket.model_finish_info_images,
      modelId: -1,
      fileNameTitle: 'model_gallery_img'
   })
   const myModel = await addMyModel(model)
   if (!myModel.id) return alert('出問題了')
   //添加尺寸
   const size = addMyModelsSize(myModel.id, modelSize.value)
   //添加購買明細
   const purchaseInfo = addMyModelPurchaseInfo(myModel.id, modelPurchaseInfo.value)
   //添加完成資訊
   const finishedInfo = addMyModelFinishInfo(myModel.id, modelFinishInfo)
   //等待全部完成
   await Promise.allSettled([size, purchaseInfo, finishedInfo])
   //重新拉取資料
   await fetchMyModels()
   //reset
   model.name_zh = ''
   model.name_en = ''
   showAddModelPanel.value = false
   resetAllUploadImageProcess()
   //關閉loading
   setLoadingState(false)
}
function resetAllUploadImageProcess() {
  preview_main_Img.value.length = 0
  main_img_file.value=null
  process_imgs.value=null
  gallery_imgs.value=null
  previewProcessImgs.value.length = 0
  previewGalleryImgs.value.length = 0
}
</script>
