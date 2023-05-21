<script setup lang="ts">
import '@wangeditor/editor/dist/css/style.css'
import { onBeforeUnmount, ref, shallowRef, onMounted } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { DomEditor } from '@wangeditor/editor'
import { publishMoment } from '@/service/main/story'

const isEmpty = () => {
  return !editorRef.value?.getText().trim().length
}

// =========
const onConfirm = () => {
  console.log('编辑器的值：', valueHtml.value)
  console.log('editorRef.value.getHtml: ', editorRef.value.getHtml())
  console.log('editorRef.value.getText: ', editorRef.value.getText().length)
  console.log('editorRef.value.isEmpty: ', editorRef.value.isEmpty())
  console.log('isEmpty: ', isEmpty())
}

const onReset = () => {
  editorRef.value.clear()
}

// =========
const moment = ref({
  title: '',
  content: ''
})

const mode = 'default'

// 编辑器实例，必须用 shallowRef，重要！
const editorRef = shallowRef()

// 内容 HTML
const valueHtml = ref('')

// 模拟 ajax 异步获取内容
onMounted(() => {
  setTimeout(() => {
    const toolbar = DomEditor.getToolbar(editorRef.value)

    const curToolbarConfig = toolbar?.getConfig()
    console.log(curToolbarConfig?.toolbarKeys) // 当前菜单排序和分组
  }, 5000)
})

const toolbarConfig = {
  excludeKeys: ['group-image', 'group-video']
}
const editorConfig = { placeholder: '请输入内容...', autoFocus: true }

// 编辑器回调函数
const handleCreated = (editor: any) => {
  console.log('created', editor)
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
</script>

<template>
  <div class="chat">
    <div class="content">
      <h2 class="title">发表故事</h2>
      <el-form :model="moment">
        <el-form-item label="标题">
          <el-input
            class="inp"
            v-model="moment.title"
            placeholder="请输入标题"
          />
        </el-form-item>
        <el-form-item label="内容">
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
              v-model="moment.content"
              style="height: 310px; overflow-y: hidden"
              @onCreated="handleCreated"
              @onChange="handleChange"
            />
          </div>
        </el-form-item>
      </el-form>
      <div class="operate">
        <el-button type="primary" @click="onConfirm">确定</el-button>
        <el-button type="danger" @click="onReset">重置</el-button>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.chat {
  padding: 20px;

  .content {
    width: 800px;

    .title {
      text-align: center;
      font-size: 18px;
      margin-bottom: 15px;
    }

    .inp {
      width: 400px;
    }

    .operate {
      padding-left: 50px;
    }
  }
}
</style>
