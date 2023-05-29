<script setup lang="ts" name="list-table">
import PageContent from '@/components/page-content/page-content.vue'
import { contentConfig } from './config'
import { ElMessageBox, ElMessage } from 'element-plus'
import { deleteMoment } from '@/service/main/story'
import { useSystemStore } from '@/stores'

const systemStore = useSystemStore()

const emits = defineEmits(['changeComp'])

const onUpdate = (row: any) => {
  emits('changeComp', 'ListPanel', row)
}

const onDetail = (row: any) => {
  emits('changeComp', 'ListDetail', row)
}

const onDelete = (row: any) => {
  const statment = '确定删除吗？'

  ElMessageBox.confirm(statment, '系统提示', {
    center: true,
    customClass: 'msg-box'
  }).then(
    () => systemStore.deletePageItem('moment', row.id),
    () => {}
  )
}

const onCreate = () => {
  emits('changeComp', 'ListPanel')
}
</script>

<template>
  <div class="list">
    <PageContent
      pageName="moment"
      ref="pageContentRef"
      :contentConfig="contentConfig"
      @create="onCreate"
    >
      <template #author="{ row }">
        <span>{{ row.author?.name }}</span>
      </template>
      <!-- 添加下级 -->
      <template #subhandler="{ row }">
        <el-button
          link
          icon="Edit"
          size="small"
          type="primary"
          @click="onUpdate(row)"
          >编辑</el-button
        >
        <el-button
          link
          icon="Edit"
          size="small"
          type="primary"
          v-if="row.type !== 3"
          @click="onDetail(row)"
          >详情</el-button
        >
        <el-button
          link
          icon="Delete"
          size="small"
          type="primary"
          @click="onDelete(row)"
          >删除</el-button
        >
      </template>
    </PageContent>
  </div>
</template>

<style scoped lang="less">
:global(.el-overlay.is-message-box .el-overlay-message-box) {
  top: 15vh;
  bottom: auto;
  z-index: 99999;
}
.list {
  padding: 20px;

  .page-content {
    border-top: none;
    padding-top: 0px;
  }
}
</style>
