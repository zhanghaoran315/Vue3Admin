<script lang="ts" setup>
import { ref } from 'vue'
import { momentDetail } from '@/service/main/story'
import { Editor } from '@wangeditor/editor-for-vue'

interface IProps {
  rowData: Record<string, any>
}

const props = withDefaults(defineProps<IProps>(), {
  rowData: () => ({})
})

const moment = ref<any>({})

if (props.rowData.id) {
  momentDetail(props.rowData.id).then((res) => {
    if (res.code === 200) {
      console.log('动态详情：', res)
      moment.value = res.data
    }
  })
}

const loading = ref(false)

loading.value = true
setTimeout(() => {
  loading.value = false
}, 1000)

const emits = defineEmits(['changeComp'])

const onBack = (row: any) => {
  emits('changeComp', 'ListTable')
}
</script>

<template>
  <div class="list-detail">
    <h2>list-detail</h2>
    <el-skeleton animated :loading="loading">
      <Editor
        :defaultConfig="{
          readOnly: true
        }"
        mode="default"
        v-model="moment.content"
      />
    </el-skeleton>
    <el-button type="primary" @click="onBack">返回</el-button>
  </div>
</template>

<style scoped lang="less">
.list-detail {
  padding: 20px;
}
</style>
