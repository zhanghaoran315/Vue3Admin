<script setup lang="ts">
import { ref } from 'vue'
import RichText from '@/components/rich-text/rich-text.vue'
import type { ElForm } from 'element-plus'

const richTextRef = ref<InstanceType<typeof RichText>>()
const momentFormRef = ref<InstanceType<typeof ElForm>>()

const moment = ref({
  title: '',
  content: ''
})

const isEmpty = () => {
  return !richTextRef.value?.editorRef.getText().trim().length
}

const onConfirm = (formRef: any) => {
  console.log('编辑器的值：', moment.value)
  formRef.validate((isValid: any) => {
    console.log('isValid: ', isValid)
    console.log('1111111111111')
  })
}

const onReset = () => {
  richTextRef.value?.editorRef.clear()
}

const validateRichText = (rule: any, value: any, callback: any) => {
  if (isEmpty()) callback('动态内容不能为空！')
}

const rules = {
  title: [
    {
      required: true,
      message: '动态标题不能为空',
      trigger: 'change'
    },
    {
      min: 3,
      max: 20,
      message: '动态标题长度为3到20位之间！',
      trigger: 'change'
    }
  ]
}
</script>

<template>
  <div class="chat">
    <div class="content">
      <h2 class="title">发表故事</h2>
      <el-form
        :model="moment"
        :rules="rules"
        ref="momentFormRef"
        label-width="60"
      >
        <el-form-item label="标题" prop="title">
          <el-input
            class="inp"
            v-model="moment.title"
            placeholder="请输入标题"
          />
        </el-form-item>
        <el-form-item
          label="内容"
          prop="content"
          :rules="{
            required: true,
            validator: validateRichText
          }"
        >
          <RichText v-model="moment.content" ref="richTextRef" />
        </el-form-item>
      </el-form>
      <div class="operate">
        <el-button type="primary" @click="onConfirm(momentFormRef)"
          >确定</el-button
        >
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
