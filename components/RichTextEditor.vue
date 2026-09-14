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
            <div class="relative">
                <button type="button"
                    class="flex items-center justify-center w-8 h-8 rounded hover:bg-steel-200"
                    :class="activeFontColorClass ?? 'text-steel-700'" @click="showColorPicker = !showColorPicker">
                    <UIcon name="i-heroicons-swatch" class="w-4 h-4" />
                </button>
                <template v-if="showColorPicker">
                    <div class="fixed inset-0 z-10" @click="showColorPicker = false" />
                    <div class="absolute z-20 top-full left-0 mt-1 flex gap-1 p-1.5 rounded-md border border-steel-200 bg-white shadow">
                        <button v-for="c in FONT_COLORS" :key="c.key" type="button"
                            class="w-6 h-6 rounded-full border border-steel-200"
                            :class="c.bgClass" :title="c.label" @click="applyFontColor(c.key)" />
                        <button type="button"
                            class="w-6 h-6 rounded-full border border-steel-300 flex items-center justify-center"
                            title="清除顏色" @click="applyFontColor(null)">
                            <UIcon name="i-heroicons-x-mark" class="w-3.5 h-3.5 text-steel-500" />
                        </button>
                    </div>
                </template>
            </div>
        </div>
        <EditorContent :editor="editor" class="rich-text-content rich-text-editable px-3 py-2 max-h-[400px] overflow-y-auto" />
    </div>
</template>

<script setup lang="ts">
import { useEditor, EditorContent } from '@tiptap/vue-3'
import { Mark, mergeAttributes } from '@tiptap/core'
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

// 字體顏色僅限站上既有色階，跟 sanitizeDescriptionHtml.ts 的 allowedClasses 對齊
const FONT_COLORS = [
    { key: 'main', label: '藍', class: 'text-main-700', bgClass: 'bg-main-700' },
    { key: 'acent', label: '粉', class: 'text-acent-600', bgClass: 'bg-acent-600' },
    { key: 'earth', label: '棕', class: 'text-earth-700', bgClass: 'bg-earth-700' },
    { key: 'olive', label: '綠', class: 'text-olive-700', bgClass: 'bg-olive-700' },
    { key: 'steel', label: '灰', class: 'text-steel-700', bgClass: 'bg-steel-700' },
] as const

const FontColor = Mark.create({
    name: 'fontColor',
    addAttributes() {
        return {
            color: {
                default: null,
                parseHTML: (element) => FONT_COLORS.find((c) => element.classList.contains(c.class))?.key ?? null,
                renderHTML: (attributes) => {
                    const found = FONT_COLORS.find((c) => c.key === attributes.color)
                    return found ? { class: found.class } : {}
                },
            },
        }
    },
    parseHTML() {
        return [{ tag: 'span', getAttrs: (element) => FONT_COLORS.some((c) => (element as HTMLElement).classList.contains(c.class)) ? {} : false }]
    },
    renderHTML({ HTMLAttributes }) {
        return ['span', mergeAttributes(HTMLAttributes), 0]
    },
})

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
        FontColor,
    ],
    onUpdate: ({ editor }) => {
        modelValue.value = editor.getHTML()
    },
})

const showColorPicker = ref(false)

const activeFontColorClass = computed(() => {
    const e = editor.value
    if (!e) return null
    return FONT_COLORS.find((c) => e.isActive('fontColor', { color: c.key }))?.class ?? null
})

function applyFontColor(colorKey: string | null) {
    if (colorKey) {
        editor.value?.chain().focus().setMark('fontColor', { color: colorKey }).run()
    } else {
        editor.value?.chain().focus().unsetMark('fontColor').run()
    }
    showColorPicker.value = false
}

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
