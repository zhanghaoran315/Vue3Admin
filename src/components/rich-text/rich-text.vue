<script lang="ts" setup>
import '@wangeditor/editor/dist/css/style.css'
import { onBeforeUnmount, shallowRef, computed, nextTick } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import type { AttachmentElement } from '@wangeditor/plugin-upload-attachment'
import { localCache } from '@/utils'
import { LOGIN_TOKEN } from '@/global'

const token = localCache.getItem(LOGIN_TOKEN)

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
  excludeKeys: ['group-image', 'group-video'],
  // 插入哪些菜单
  insertKeys: {
    index: 0, // 自定义插入的位置
    keys: ['uploadAttachment'] // “上传附件”菜单
  }
}

const editorConfig = {
  placeholder: '请输入内容...',
  autoFocus: false, // 在编辑器中，点击选中“附件”节点时，要弹出的菜单
  hoverbarKeys: {
    attachment: {
      menuKeys: ['downloadAttachment'] // “下载附件”菜单
    }
  },
  MENU_CONF: {
    // “上传附件”菜单的配置
    uploadAttachment: {
      server: 'http://localhost:5000/upload/picture?momentId=26', // 服务端地址
      timeout: 5 * 1000, // 5s
      fieldName: 'picture',
      meta: {}, // 请求时附加的数据
      metaWithUrl: true, // meta 拼接到 url 上
      headers: { authorization: 'Bearer ' + token },

      maxFileSize: 10 * 1024 * 1024, // 10M

      onBeforeUpload(file: File) {
        console.log('onBeforeUpload', file)
        return file // 上传 file 文件
        // return false // 会阻止上传
      },
      onProgress(progress: number) {
        console.log('onProgress', progress)
      },
      onSuccess(file: File, res: any) {
        console.log('onSuccess', file, res)
      },
      onFailed(file: File, res: any) {
        // alert(res.message) // 用alert会阻塞代码
        console.log('onFailed', file, res)
      },
      onError(file: File, err: Error, res: any) {
        // alert(err.message) // 用alert会阻塞代码
        console.error('onError', file, err, res)
      },

      // // 上传成功后，用户自定义插入文件
      customInsert(res: any, file: File, insertFn: Function) {
        console.log('customInsert', res)
        // const { url } = res.data || {}
        // if (!url) throw new Error(`url is empty`)

        const url = 'xxxxxxxxxxxxxxx'

        // 插入附件到编辑器
        insertFn(`customInsert-${file.name}`, url)
      },

      // // 用户自定义上传
      // customUpload(file: File, insertFn: Function) {
      //   console.log('customUpload', file)

      //   return new Promise(resolve => {
      //     // 插入一个文件，模拟异步
      //     setTimeout(() => {
      //       const src = `https://www.w3school.com.cn/i/movie.ogg`
      //       insertFn(`customUpload-${file.name}`, src)
      //       resolve('ok')
      //     }, 500)
      //   })
      // },

      // // 自定义选择
      // customBrowseAndUpload(insertFn: Function) {
      //   alert('自定义选择文件，如弹出图床')
      //   // 自己上传文件
      //   // 上传之后用 insertFn(fileName, link) 插入到编辑器
      // },

      // 插入到编辑器后的回调
      onInsertedAttachment(elem: AttachmentElement) {
        console.log('inserted attachment', elem)
      }
    }
  }
}

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
  setTimeout(() => {
    editor.destroy()
  }, 200)
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
