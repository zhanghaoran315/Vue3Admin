<script lang="ts" setup>
import HrTable from '@/base-ui/table'
import { useSystemStore } from '@/stores'
import { storeToRefs } from 'pinia'
import { ref, watch, onActivated, onDeactivated } from 'vue'
import { usePermission } from '@/hooks'

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

// 1.获取操作的权限
const isCreate = usePermission(props.pageName, 'create')
const isDelete = usePermission(props.pageName, 'delete')
const isUpdate = usePermission(props.pageName, 'update')
const isQuery = usePermission(props.pageName, 'query')

const getPageData = (params: any = {}) => {
  if (!isQuery) return
  const offset = (queryInfo.value.currentPage - 1) * queryInfo.value.pageSize
  const size = queryInfo.value.pageSize

  systemStore.getPageListAction(props.pageName, {
    offset,
    size,
    ...params
  })
}

// 监听新增、编辑、删除操作后还原分页器
systemStore.$onAction(({ name, after }) => {
  after(() => {
    if (
      name === 'deletePageItem' ||
      name === 'createPageItem' ||
      name === 'updatePageItem'
    ) {
      queryInfo.value.currentPage = 1
      queryInfo.value.pageSize = 10
    }
  })
})

watch(queryInfo, () => getPageData())
getPageData()

// 4.实现跨组件插槽
// 4.1 获取其他动态插槽的名称
const otherPropSlots: Record<string, string | number>[] =
  props.contentConfig.tableItems.filter((item: any) => {
    if (item.slotName === undefined) return false
    if (item.slotName === 'status') return false
    if (item.slotName === 'createAt') return false
    if (item.slotName === 'updateAt') return false
    if (item.slotName === 'handler') return false
    return true
  })

const emit = defineEmits(['create', 'update'])

// 5.新增、编辑、删除的实现
const onCreate = () => {
  emit('create')
}

const onUpdate = (row: any) => {
  emit('update', row)
}

const onDelete = (row: any) => {
  systemStore.deletePageItem(props.pageName, row.id)
}

onActivated(() => getPageData())
onDeactivated(() => systemStore.$reset())

defineExpose({ getPageData })
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
        <el-button @click="onCreate" v-if="isCreate">新建数据</el-button>
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
          @click="onUpdate(row)"
          v-if="isUpdate"
          >编辑</el-button
        >
        <el-button
          link
          icon="Delete"
          size="small"
          type="primary"
          @click="onDelete(row)"
          v-if="isDelete"
          >删除</el-button
        >
      </template>

      <!-- 在page-content中设置跨组件插槽 -->
      <!-- 本质：在作用域插槽里面继续嵌套slot元素实现作用域插槽 -->
      <template
        v-for="item in otherPropSlots"
        :key="item.prop"
        #[item.slotName]="scope"
      >
        <template v-if="item.slotName">
          <slot
            :name="item.slotName"
            :row="scope.row"
            :prop="scope.prop"
          ></slot>
        </template>
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
