<script lang="ts" setup>
import HrTable from '@/base-ui/table'

import { useSystemStore } from '@/stores'
import { storeToRefs } from 'pinia'
import { reactive } from 'vue'
import type { ITableItem } from '@/base-ui/table'

import { formatUTCString, formatTimestamp } from '@/utils'

const props = defineProps({
  pageName: {
    type: String,
    default: ''
  }
})

const queryInfo = reactive({
  offset: 0,
  size: 10
})

const systemStore = useSystemStore()

const { usersList, usersCount } = storeToRefs(systemStore)

systemStore.getPageListAction(props.pageName, { ...queryInfo })

const tableItems: ITableItem[] = [
  { prop: 'name', label: '用户名', minWidth: '100' },
  { prop: 'realname', label: '真实姓名', minWidth: '100' },
  { prop: 'cellphone', label: '手机号码', minWidth: '120' },
  { prop: 'enable', label: '状态', minWidth: '100', slotName: 'status' },
  {
    prop: 'createAt',
    label: '创建时间',
    minWidth: '220',
    slotName: 'createAt'
  },
  {
    prop: 'updateAt',
    label: '更新时间',
    minWidth: '220',
    slotName: 'updateAt'
  },
  { label: '操作', minWidth: '130', slotName: 'handler' }
]

const title = '用户列表'

const onEditClick = (row: any) => {}
const onDeleteClick = (row: any) => {}
</script>

<template>
  <div class="page-content">
    <hr-table :table-data="usersList" :table-items="tableItems" :title="title">
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
