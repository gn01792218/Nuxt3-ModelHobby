<template>
    <div class="rounded-md border border-steel-300 bg-white overflow-hidden">
        <div class="flex flex-wrap gap-1 border-b border-steel-200 bg-steel-50 p-1">
            <button v-for="btn in toolbarButtons" :key="btn.key" type="button"
                class="flex items-center justify-center w-8 h-8 rounded hover:bg-steel-200"
                :class="btn.isActive ? 'bg-main-200 text-main-900' : 'text-steel-700'" @click="btn.action">
                <UIcon :name="btn.icon" class="w-4 h-4" />
            </button>
            <label class="flex items-center justify-center w-8 h-8 rounded hover:bg-steel-200 text-steel-700 cursor-pointer">
                <UIcon name="i-heroicons-photo" class="w-4 h-4" />
                <input type="file" accept="image/*" class="hidden" @change="handleImageUpload">
            </label>
        </div>
        <EditorContent :editor="editor" class="rich-text-content rich-text-editable px-3 py-2 max-h-[400px] overflow-y-auto" />
    </div>
</template>

<script setup lang="ts">
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import { StorageBucket } from '~/types/storage'

const props = defineProps<{
    modelId: number
}>()

const modelValue = defineModel<string>({ default: '' })

const { uploadMultipleImagesToS3 } = useS3()
const { getModelFinishImagePublicUrl } = useMyModelImg()
const { compressImg } = useImageCompress()

const editor = useEditor({
    content: modelValue.value,
    extensions: [
        StarterKit.configure({
            heading: { levels: [2, 3] },
            codeBlock: false,
            blockquote: false,
            horizontalRule: false,
            code: false,
        }),
        Underline,
        Link.configure({ openOnClick: false, autolink: true }),
        Image,
    ],
    onUpdate: ({ editor }) => {
        modelValue.value = editor.getHTML()
    },
})

//描述可能被外部重置(例如編輯面板載入既有資料)，需要同步進編輯器
watch(modelValue, (value) => {
    if (!editor.value) return
    if (value === editor.value.getHTML()) return
    editor.value.commands.setContent(value ?? '', false)
})

onBeforeUnmount(() => editor.value?.destroy())

function setLink() {
    const previousUrl = editor.value?.getAttributes('link').href
    const url = window.prompt('請輸入連結網址', previousUrl)
    if (url === null) return
    if (url === '') {
        editor.value?.chain().focus().extendMarkRange('link').unsetLink().run()
        return
    }
    editor.value?.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
}

async function handleImageUpload(e: Event) {
    const input = e.target as HTMLInputElement
    const file = input.files?.[0]
    input.value = ''
    if (!file) return

    const compressedFile = await compressImg(file)
    if (!compressedFile) return

    const [imgPath] = await uploadMultipleImagesToS3([compressedFile], {
        bucketName: StorageBucket.model_finish_info_images,
        modelId: props.modelId,
        fileNameTitle: 'model_description_img',
    })
    if (!imgPath) return

    const publicUrl = getModelFinishImagePublicUrl(imgPath)
    editor.value?.chain().focus().setImage({ src: publicUrl }).run()
}

const toolbarButtons = computed(() => {
    const e = editor.value
    if (!e) return []
    return [
        { key: 'bold', icon: 'i-heroicons-bold', isActive: e.isActive('bold'), action: () => e.chain().focus().toggleBold().run() },
        { key: 'italic', icon: 'i-heroicons-italic', isActive: e.isActive('italic'), action: () => e.chain().focus().toggleItalic().run() },
        { key: 'underline', icon: 'i-heroicons-underline', isActive: e.isActive('underline'), action: () => e.chain().focus().toggleUnderline().run() },
        { key: 'strike', icon: 'i-heroicons-strikethrough', isActive: e.isActive('strike'), action: () => e.chain().focus().toggleStrike().run() },
        { key: 'h2', icon: 'i-heroicons-h2', isActive: e.isActive('heading', { level: 2 }), action: () => e.chain().focus().toggleHeading({ level: 2 }).run() },
        { key: 'h3', icon: 'i-heroicons-h3', isActive: e.isActive('heading', { level: 3 }), action: () => e.chain().focus().toggleHeading({ level: 3 }).run() },
        { key: 'bulletList', icon: 'i-heroicons-list-bullet', isActive: e.isActive('bulletList'), action: () => e.chain().focus().toggleBulletList().run() },
        { key: 'orderedList', icon: 'i-heroicons-numbered-list', isActive: e.isActive('orderedList'), action: () => e.chain().focus().toggleOrderedList().run() },
        { key: 'link', icon: 'i-heroicons-link', isActive: e.isActive('link'), action: setLink },
    ]
})
</script>
