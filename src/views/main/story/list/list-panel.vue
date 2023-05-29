<script setup lang="ts">
import { ref, computed } from 'vue'
import RichText from '@/components/rich-text/rich-text.vue'
import type { ElForm } from 'element-plus'
import { publishMoment, updateMoment, momentDetail } from '@/service/main/story'
import { ElMessage } from 'element-plus'

interface IProps {
  rowData: Record<string, any>
}

const props = withDefaults(defineProps<IProps>(), {
  rowData: () => ({})
})

const title = computed(() => (props.rowData.id ? '修改故事' : '发表故事'))

if (props.rowData.id) {
  momentDetail(props.rowData.id).then((res) => {
    if (res.code === 200) {
      console.log('动态详情：', res)
      moment.value = res.data
    }
  })
}

const emits = defineEmits(['changeComp'])

const onBack = (row: any) => {
  emits('changeComp', 'ListTable')
}

const richTextRef = ref<InstanceType<typeof RichText>>()
const momentFormRef = ref<InstanceType<typeof ElForm>>()

const moment = ref({
  title: '',
  content: ''
})

const onConfirm = () => {
  momentFormRef.value?.validate((isValid: any) => {
    if (isValid) {
      console.log('表单参数：', moment.value)

      const params = {
        ...moment.value
      }

      if (props.rowData.id) {
        updateMoment(params).then((res) => {
          if (res.code === 200) {
            ElMessage.success('修改动态成功~')
            console.log('修改动态成功~')
          }
        })
      } else {
        publishMoment(params).then((res) => {
          if (res.code === 200) {
            ElMessage.success('发表动态成功~')
            console.log('发表动态成功~')
          }
        })
      }
    }
  })
}

// const onReset = () => {
//   richTextRef.value?.editorRef.clear()
// }

const isEmpty = () => {
  return !richTextRef.value?.editorRef.getText().trim().length
}

const validateRichText = (rule: any, value: any, callback: any) => {
  if (isEmpty()) callback('动态内容不能为空！')
  else callback()
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
  ],
  content: [
    {
      required: true,
      validator: validateRichText
    }
  ]
}
</script>

<template>
  <div class="list-create">
    <div class="content">
      <h2 class="title">{{ title }}</h2>
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
        <el-form-item label="内容" prop="content">
          <RichText v-model="moment.content" ref="richTextRef" />
        </el-form-item>
      </el-form>
      <div class="operate">
        <el-button type="primary" @click="onConfirm">确定</el-button>
        <el-button type="primary" @click="onBack">返回</el-button>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.list-create {
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
