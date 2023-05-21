<script lang="ts" setup>
import '@wangeditor/editor/dist/css/style.css'
import { onBeforeUnmount, shallowRef, computed } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'

// 值绑定
const props = defineProps({
  modelValue: {
    type: String
  }
})

const emits = defineEmits(['update:model-value'])

const value = computed({
  get: () => props.modelValue,
  set: (value) => emits('update:model-value', value)
})

// 编辑器实例，必须用 shallowRef，重要！
const editorRef = shallowRef()

const toolbarConfig = {
  excludeKeys: ['group-image', 'group-video']
}

const editorConfig = { placeholder: '请输入内容...', autoFocus: false }

// 编辑器回调函数
const handleCreated = (editor: any) => {
  editorRef.value = editor // 记录 editor 实例，重要！
}

const handleChange = (editor: any) => {
  console.log('change:', editor.getHtml())
}

// 组件销毁时，也及时销毁编辑器，重要！
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})

const mode = 'default'

defineExpose({
  editorRef
})
</script>

<template>
  <div class="rich-text">
    <div style="border: 1px solid #ccc; margin-top: 10px">
      <Toolbar
        :editor="editorRef"
        :defaultConfig="toolbarConfig"
        :mode="mode"
        style="border-bottom: 1px solid #ccc"
      />
      <Editor
        :defaultConfig="editorConfig"
        :mode="mode"
        v-model="value"
        style="height: 310px; overflow-y: hidden"
        @onCreated="handleCreated"
        @onChange="handleChange"
      />
    </div>
  </div>
</template>

<style scoped lang="less"></style>
