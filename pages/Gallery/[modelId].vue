<template>
    <div v-if="currentModel">
        <h1 class="w-full text-center text-primary-100 font-bold text-xl border-b-2 border-b-primary-950 pb-2 mb-3">
            {{ currentModel.name_zh }}
        </h1>
        <section v-for="finish_info, index in currentModel.finish_infos" :key="finish_info.id" class="mb-5">
            <p class="text-black font-bold text-lg mb-2 text-center bg-primary-300">
                <span v-if="finish_info.title">
                    塗裝{{ index + 1 }} :
                </span>
                 {{ finish_info.title }}
            </p>
            <p class="text-primary-500 text-center mb-5">
                {{ finish_info.description }}
            </p>
            <SwiperThumbs :slider-items="finish_info.gallery" />
            <p class=" text-xs text-primary-500 text-end mt-2">
                完成於 : {{ formateDateYYYYMM(finish_info.finished_date, '-') }}
            </p>
        </section>
    </div>
</template>

<script setup lang="ts">
import { useMyModelStore } from "~/store/useMyModelStore";

const modelId = Number(useRoute().params.modelId)
const { currentModel } = storeToRefs(useMyModelStore())
const { setCurrentModelId } = useMyModelStore()
const { formateDateYYYYMM } = useDate()

windowReloadInit()

function windowReloadInit() {
    if (!currentModel.value) setCurrentModelId(modelId)
}

</script>