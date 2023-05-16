<script setup lang="ts" name="menu-c">
import PageContent from '@/components/page-content/page-content.vue'
import PagePopup from '@/components/page-popup/page-popup.vue'
import { contentConfig, popupConfig } from './config'
import { useSystemStore } from '@/stores'
import { ElMessageBox, ElMessage } from 'element-plus'
import { ref } from 'vue'

const systemStore = useSystemStore()

import { usePagePopup } from '@/hooks'

const { pagePopupRef, onCreate, onUpdate, defaultInfo } = usePagePopup()

const onDelete = (row: any) => {
  const statment = '确定删除吗？'

  ElMessageBox.confirm(statment, '系统提示', {
    center: true
  }).then(
    () => systemStore.deletePageItem('menu', row.id),
    () => {}
  )
}

const otherInfo = ref<any>({})

const onAddChild = (row: any, column: any) => {
  console.log('row: ', row, 'column: ', column)
  otherInfo.value.parentId = row.id
  onCreate()
}
</script>

<template>
  <div class="menu">
    <PageContent
      :contentConfig="contentConfig"
      pageName="menu"
      @create="onCreate"
    >
      <!-- 添加下级 -->
      <template #subhandler="{ row, column }">
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
          @click="onAddChild(row, column)"
          >新增下级</el-button
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
    <PagePopup
      pageName="menu"
      ref="pagePopupRef"
      :defaultInfo="defaultInfo"
      :popupConfig="popupConfig"
      :otherInfo="otherInfo"
    />
  </div>
</template>

<style scoped>
.menu {
  height: 100%;
}
</style>
