<template>
   <main>
      <MyModelStatisticsBoard v-if="myModelList"/>
      <section class="w-full bg-acent-500 flex justify-end rounded-t-md p-1">
         <div>
            <UButton color="amber" variant="solid" @click="showAddModelPanel = !showAddModelPanel">
               <UIcon name="i-heroicons-plus-circle-16-solid" />
               添加模型
            </UButton>
            <div class="bg-yellow-600 p-5 absolute z-[1] left-0" v-show="showAddModelPanel">
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
                        <option v-for="status, index in Object.keys(ModelStatus).filter(key => isNaN(Number(key)))" :key="status" :value="ModelStatus[status]">{{ ModelStatus[index] }}</option>
                     </select>
                  </div>
                  <div>
                     <label for="model_brand">品牌</label>
                     <select name="" id="" v-model="model.brand">
                        <option v-for="brand in ModelBrand" :key="brand" :value="brand">{{ brand }}</option>
                     </select>
                  </div>
                  <div>
                     <label for="model_type">類型</label>
                     <select name="" id="" v-model="model.type">
                        <option v-for="modelType in ModelType" :key="modelType" :value="modelType">{{ modelType }}</option>
                     </select>
                  </div>
                  <div>
                     <label for="model_name_en">產品編號</label>
                     <input id="model_name_en" type="text" v-model="model.article_number">
                  </div>
                  <div>
                     <label for="model_main_img">封面圖片</label>
                     <input type="file" id="model_main_img"
                        @change="(e) => main_img_file = handleUploadMutipleImgs(e, toRef(preview_main_Img))">
                     <NuxtImg v-show="preview_main_Img[0]" format="webp" width="200" :src="preview_main_Img[0]"
                        alt="預覽圖" />
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
                           <option v-for="ecommerce in Ecommerce" :key="ecommerce" :value="ecommerce">{{ ecommerce }}
                           </option>
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
                        <input id="model_purchase_info_price" type="number" step="0.0001"
                           v-model="(modelPurchaseInfo.price)">
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
                        <input type="file" id="model_process_imgs" @change="(e) => {
                           process_imgs_file_list = handleUploadMutipleImgs(e, ref(previewProcessImgs))
                           previewProcessImgs.length = 0
                        }" multiple>
                        <div v-for="img in previewProcessImgs" :key="img">
                           <NuxtImg format="webp" width="200" :src="img" alt="預覽圖" />
                        </div>
                     </div>
                     <div>
                        <label for="model_finished_imgs">完成圖片</label>
                        <input type="file" id="model_finished_imgs" @change="(e) => {
                           gallery_imgs_file_list = handleUploadMutipleImgs(e, ref(previewGalleryImgs))
                           previewGalleryImgs.length = 0
                        }" multiple>
                        <div v-for="img in previewGalleryImgs" :key="img">
                           <NuxtImg format="webp" width="200" :src="img" alt="預覽圖" />
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
   </main>
</template>

<script setup lang="ts">
import useMyModelsAPI from "~/composables/api/useMyModelsAPI"
import {
   type ModelSize,
   type Model,
   ModelStatus,
   SizeUnit,
   Ecommerce,
   Currency,
   ModelBrand,
   ModelType
} from "~/types/model"
import {
   type CreatePurchaseInfoRequest
} from "~/types/purchaseInfo"
import { type ModelFinishInfo } from "~/types/finishInfo"
import { StorageBucket } from "~/types/supabase"
import { useMyModelStore } from '~/store/useMyModelStore'

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
const { uploadMultipleImagesToSupabaseStorage } = useSupabase()
const { user } = useUser()

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
   amount: 1
})
const modelFinishInfo: ModelFinishInfo = ({})
const model: Model = {
   status: ModelStatus.未入庫,
   name_zh: '',
   name_en: '',
   userId: ''
}
const preview_main_Img = ref<string[]>([])
const previewProcessImgs = ref<string[]>([])
const previewGalleryImgs = ref<string[]>([])
const main_img_file = ref<FileList | null>(null)
const process_imgs_file_list = ref<FileList | null>(null)
const gallery_imgs_file_list = ref<FileList | null>(null)

await fetchMyModels()

async function fetchAddMyModel() {
   setLoadingState(true)
   if (!user.value) return alert('請先登入會員')
   //先處理圖片
   await processGetUploadImages()
   model.userId = user.value?.id //紀錄userId
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
async function processGetUploadImages() {
   const mainImgs: Promise<string[]> = uploadMultipleImagesToSupabaseStorage(main_img_file.value!, {
      bucketName: StorageBucket.images,
      modelId: -1,
      fileNameTitle: 'model_main_img'
   })
   const processImgs: Promise<string[]> = uploadMultipleImagesToSupabaseStorage(process_imgs_file_list.value!, {
      bucketName: StorageBucket.model_finish_info_images,
      modelId: -1,
      fileNameTitle: 'model_process_img'
   })
   const gallery: Promise<string[]> = uploadMultipleImagesToSupabaseStorage(gallery_imgs_file_list.value!, {
      bucketName: StorageBucket.model_finish_info_images,
      modelId: -1,
      fileNameTitle: 'model_gallery_img'
   })
   const imgsRes = await Promise.all([mainImgs, processImgs, gallery])

   //獲取圖片路徑
   model.main_img = imgsRes[0][0]
   modelFinishInfo.process_imgs = imgsRes[1]
   modelFinishInfo.gallery = imgsRes[2]
}

function resetAllUploadImageProcess() {
   preview_main_Img.value.length = 0
   main_img_file.value = null
   process_imgs_file_list.value = null
   gallery_imgs_file_list.value = null
   previewProcessImgs.value.length = 0
   previewGalleryImgs.value.length = 0
}
</script>
