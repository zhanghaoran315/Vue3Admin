<script lang="ts" setup>
import HrTable from '@/base-ui/table'

import { useSystemStore } from '@/stores'
import { storeToRefs } from 'pinia'
import { ref, watch, onActivated, onDeactivated } from 'vue'

const props = defineProps({
  contentConfig: {
    type: Object,
    required: true
  },
  pageName: {
    type: String,
    default: ''
  }
})

const queryInfo = ref({
  currentPage: 1,
  pageSize: 10
})

const systemStore = useSystemStore()

const { pageList, pageCount } = storeToRefs(systemStore)

const getPageData = (params: any = {}) => {
  const offset = (queryInfo.value.currentPage - 1) * queryInfo.value.pageSize
  const size = queryInfo.value.pageSize

  systemStore.getPageListAction(props.pageName, {
    offset,
    size,
    ...params
  })
}

watch(queryInfo, () => getPageData())

getPageData()

onActivated(() => getPageData())
onDeactivated(() => systemStore.$reset())

defineExpose({ getPageData })

const onEditClick = (row: any) => {}
const onDeleteClick = (row: any) => {}
</script>

<template>
  <div class="page-content">
    <hr-table
      :table-data="pageList"
      :table-count="pageCount"
      v-bind="contentConfig"
      v-model:query="queryInfo"
    >
      <!-- header里的插槽 -->
      <template #operate>
        <el-button>新建数据</el-button>
      </template>
      <!-- el-table-column 里的组件插槽 -->
      <template #status="{ row, prop }">
        <el-tag :type="row[prop] ? 'success' : 'warning'">{{
          row[prop] ? '启用' : '禁用'
        }}</el-tag>
      </template>
      <template #createAt="{ row, prop }">
        <strong>{{ $format.formatTime(row[prop]) }}</strong>
      </template>
      <template #updateAt="{ row, prop }">
        <strong>{{ $format.formatTime(row[prop]) }}</strong>
      </template>
      <template #handler="{ row }">
        <el-button
          link
          icon="Edit"
          size="small"
          type="primary"
          @click="onEditClick(row)"
          >编辑</el-button
        >
        <el-button
          link
          icon="Delete"
          size="small"
          type="primary"
          @click="onDeleteClick(row)"
          >删除</el-button
        >
      </template>
    </hr-table>
  </div>
</template>

<style scoped lang="less">
.page-content {
  padding: 20px;
  border-top: 20px solid #f0f2f5;
}
</style>
