<template>
   <main>
      <MyModelStatisticsBoard v-if="myModelList"/>
      <section class="w-full bg-acent-500 flex justify-end rounded-t-md p-1">
         <div>
            <UButton color="amber" variant="solid" @click="showAddModelPanel = !showAddModelPanel">
               <UIcon name="i-heroicons-plus-circle-16-solid" />
               添加模型
            </UButton>
            <UModal v-model="showAddModelPanel">
            <div class="p-4">
               <div>
                  <MyFormGroup label="中文名稱">
                     <MyInput placeholder="中文名稱" v-model="model.name_zh" />
                  </MyFormGroup>
                  <MyFormGroup label="英文名稱">
                     <MyInput placeholder="英文名稱" v-model="model.name_en" />
                  </MyFormGroup>
                  <MyFormGroup label="選擇狀態">
                     <MySelect v-model="model.status" :options="statusOptions" option-attribute="label"
                        value-attribute="value" placeholder="選擇狀態" />
                  </MyFormGroup>
                  <MyFormGroup label="品牌">
                     <MySelect v-model="model.brand" :options="brandOptions" placeholder="選擇品牌" />
                  </MyFormGroup>
                  <MyFormGroup label="類型">
                     <MySelect v-model="model.type" :options="typeOptions" placeholder="選擇類型" />
                  </MyFormGroup>
                  <MyFormGroup label="比例">
                     <MySelect v-model="model.scale" :options="scaleOptions" placeholder="選擇比例" />
                  </MyFormGroup>
                  <MyFormGroup label="產品編號">
                     <MyInput placeholder="產品編號" v-model="model.article_number" />
                  </MyFormGroup>
                  <MyFormGroup label="封面圖片">
                     <input type="file" id="model_main_img"
                        @change="async (e) => main_img_file =await handleUploadMutipleImgs(e, toRef(preview_main_Img))">
                     <NuxtImg v-show="preview_main_Img[0]" format="webp" width="200" :src="preview_main_Img[0]"
                        alt="預覽圖" />
                  </MyFormGroup>
                  <UDivider label="模型尺寸資訊" />
                  <MyFormGroup label="選擇尺吋單位">
                     <MySelect v-model="modelSize.unit" :options="sizeUnitOptions" placeholder="選擇尺吋單位" />
                  </MyFormGroup>
                  <MyFormGroup label="長度">
                     <MyInput type="number" step="0.0001" placeholder="長度" v-model="modelSize.length" />
                  </MyFormGroup>
                  <MyFormGroup label="寬度">
                     <MyInput type="number" step="0.0001" placeholder="寬度" v-model="(modelSize.width)" />
                  </MyFormGroup>
                  <MyFormGroup label="高度">
                     <MyInput type="number" step="0.0001" placeholder="高度" v-model="(modelSize.height)" />
                  </MyFormGroup>
                  <UDivider label="購買訊息" />
                  <MyFormGroup label="購買平台">
                     <MySelect v-model="modelPurchaseInfo.e_commerce_name" :options="ecommerceOptions" placeholder="選擇購買平台" />
                  </MyFormGroup>
                  <MyFormGroup label="幣種">
                     <MySelect v-model="modelPurchaseInfo.currency" :options="currencyOptions" placeholder="選擇幣種" />
                  </MyFormGroup>
                  <MyFormGroup label="價格">
                     <MyInput type="number" step="0.0001" placeholder="價格" v-model="(modelPurchaseInfo.price)" />
                  </MyFormGroup>
                  <MyFormGroup label="賣出價格">
                     <MyInput type="number" step="0.0001" placeholder="賣出價格" v-model="(modelPurchaseInfo.sellingPrice)" />
                  </MyFormGroup>
                  <MyFormGroup label="數量">
                     <MyInput type="number" placeholder="數量" v-model="(modelPurchaseInfo.amount)" />
                  </MyFormGroup>
                  <MyFormGroup label="店家名稱">
                     <MyInput placeholder="店家名稱" v-model="modelPurchaseInfo.shop_name" />
                  </MyFormGroup>
                  <MyFormGroup label="購買日期">
                     <VDatePicker v-model="modelPurchaseInfo.purchase_date" />
                     <TimeFormator v-if="modelPurchaseInfo.purchase_date" :date="modelPurchaseInfo.purchase_date" />
                  </MyFormGroup>
                  <MyFormGroup label="賣出日期">
                     <VDatePicker v-model="modelPurchaseInfo.sellingDate" />
                     <TimeFormator v-if="modelPurchaseInfo.sellingDate" :date="modelPurchaseInfo.sellingDate" />
                  </MyFormGroup>
                  <UDivider label="完成資訊" />
                  <MyFormGroup label="完成日期">
                     <VDatePicker v-model="modelFinishInfo.finished_date" />
                     <TimeFormator v-if="modelFinishInfo.finished_date" :date="modelFinishInfo.finished_date" />
                  </MyFormGroup>
                  <MyFormGroup label="製作圖片">
                     <input type="file" id="model_process_imgs" @change="async (e) => {
                        process_imgs_file_list =await handleUploadMutipleImgs(e, ref(previewProcessImgs))
                        previewProcessImgs.length = 0
                     }" multiple>
                     <div v-for="img in previewProcessImgs" :key="img">
                        <NuxtImg format="webp" width="200" :src="img" alt="預覽圖" />
                     </div>
                  </MyFormGroup>
                  <MyFormGroup label="完成圖片">
                     <input type="file" id="model_finished_imgs" @change="async (e) => {
                        gallery_imgs_file_list =await handleUploadMutipleImgs(e, ref(previewGalleryImgs))
                        previewGalleryImgs.length = 0
                     }" multiple>
                     <div v-for="img in previewGalleryImgs" :key="img">
                        <NuxtImg format="webp" width="200" :src="img" alt="預覽圖" />
                     </div>
                  </MyFormGroup>
               </div>
               <UButton class="ml-auto block" label="確認" color="primary" @click="fetchAddMyModel" />
            </div>
            </UModal>
         </div>
      </section>
      <MyModelTabsArea :un-stock-in-models="unStockInModels" :un-finished-models="unFinishedModels"
         :finished-models="finishedModels" :selled-models="selledModels" />
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
   ModelType,
   ModelScale
} from "~/types/model"
import {
   type CreatePurchaseInfoRequest
} from "~/types/purchaseInfo"
import { type ModelFinishInfo } from "~/types/finishInfo"
import { StorageBucket } from "~/types/storage"
import { useMyModelStore } from '~/store/useMyModelStore'

const { fetchALlModels } = useFetchMyModels()
const { handleUploadMutipleImgs } = useUploadImage()
const { addMyModel, addMyModelsSize, addMyModelPurchaseInfo, addMyModelFinishInfo } = useMyModelsAPI()
const {
   myModelList,
   unStockInModels,
   unFinishedModels,
   finishedModels,
   selledModels,
} = storeToRefs(useMyModelStore())

const { setLoadingState } = useMyModelStore()
const { uploadMultipleImagesToS3, removeImageFromS3Storage, processRemoveFinishInfoImgs } = useS3()
const { user } = useUser()
const { sendToast } = useMyToast()

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
   sellingPrice:0,
   amount: 1
})
const modelFinishInfo = ref<Partial<ModelFinishInfo>>({
   process_imgs: [],
   gallery: []
})
const model: Model = {
   status: ModelStatus.未入庫,
   name_zh: '',
   name_en: '',
   userId: '',
   scale: ModelScale.S72
}
const preview_main_Img = ref<string[]>([])
const previewProcessImgs = ref<string[]>([])
const previewGalleryImgs = ref<string[]>([])
const main_img_file = ref<FileList | null>(null)
const process_imgs_file_list = ref<FileList | null>(null)
const statusOptions = Object.keys(ModelStatus).filter(key => isNaN(Number(key))).map(key => ({
   value: ModelStatus[key as keyof typeof ModelStatus],
   label: key
}))
const brandOptions = Object.values(ModelBrand)
const typeOptions = Object.values(ModelType)
const scaleOptions = Object.values(ModelScale)
const sizeUnitOptions = [SizeUnit.MM, SizeUnit.CM]
const ecommerceOptions = Object.values(Ecommerce)
const currencyOptions = [Currency.RMB, Currency.TW]
const gallery_imgs_file_list = ref<FileList | null>(null)

async function fetchAddMyModel() {
   setLoadingState(true)
   if (!user.value) return alert('請先登入會員')
   //先處理圖片
   const {main_img, process_imgs, gallery} = await processGetUploadImages()
   model.userId = user.value?.id //紀錄userId
   let myModel:Model | null = null
   try{
      myModel = await addMyModel(model)
   }catch{
      sendToast({
      title: 'error',
      description: '添加模型失敗，請稍後再試'
      })
      await removeImageFromS3Storage({bucketName: StorageBucket.images, url:main_img})
      processRemoveFinishInfoImgs(process_imgs, gallery)
   }
   if(!myModel) return 
   //添加尺寸
   const size = addMyModelsSize(myModel.id, modelSize.value)
   //添加購買明細
   const purchaseInfo = addMyModelPurchaseInfo(myModel.id, modelPurchaseInfo.value)
   await Promise.allSettled([size, purchaseInfo])
   //添加完成資訊
   try{
      await addMyModelFinishInfo(myModel.id, modelFinishInfo.value)
   }catch{
      //沒能成功添加finishInfo時刪除圖片
      sendToast({
      title: 'error',
      description: '添加完成資訊失敗，請稍後再試'
      })
      processRemoveFinishInfoImgs(process_imgs, gallery)
   }
   //等待全部完成
   //重新拉取資料
   await fetchALlModels()
   //reset
   model.name_zh = ''
   model.name_en = ''
   showAddModelPanel.value = false
   resetAllUploadImageProcess()
   //關閉loading
   setLoadingState(false)
}
async function processGetUploadImages() {
  const [mainImgs, processImgs, gallery] = await Promise.all([
    uploadMultipleImagesToS3(main_img_file.value!, {
      bucketName: StorageBucket.images,
      modelId: -1,
      fileNameTitle: 'model_main_img'
    }),
    uploadMultipleImagesToS3(process_imgs_file_list.value!, {
      bucketName: StorageBucket.model_finish_info_images,
      modelId: -1,
      fileNameTitle: 'model_process_img'
    }),
    uploadMultipleImagesToS3(gallery_imgs_file_list.value!, {
      bucketName: StorageBucket.model_finish_info_images,
      modelId: -1,
      fileNameTitle: 'model_gallery_img'
    })
  ]);

  //獲取圖片路徑
  model.main_img = mainImgs[0];
  modelFinishInfo.value.process_imgs = processImgs;
  modelFinishInfo.value.gallery = gallery;

  return {
    main_img: model.main_img as string,
    process_imgs: modelFinishInfo.value.process_imgs as string[],
    gallery: modelFinishInfo.value.gallery as string[]
  };
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
