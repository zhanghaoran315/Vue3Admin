<script setup lang="ts" name="user">
import PageSearch from '@/components/page-search/page-search.vue'
import PageContent from '@/components/page-content/page-content.vue'
import PagePopup from '@/components/page-popup/page-popup.vue'
import { searchConfig, contentConfig, popupConfig } from './config'

import { usePageSearch, usePagePopup } from '@/hooks'

import { useMainStore } from '@/stores'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

const { pageContentRef, onQuery, onReset } = usePageSearch()

// 动态添加部门和角色列表
const { entireDepartment, entireRole } = storeToRefs(useMainStore())
// 数据请求到的处理 - 搜索框
const searchConfigRef = computed(() => {
  const departmentItem = searchConfig.formItems.find(
    (item: any) => item.field === 'departmentId'
  )

  departmentItem.options = entireDepartment.value.map((item) => {
    return { label: item.name, value: item.id }
  })

  const roleItem = searchConfig.formItems.find(
    (item: any) => item.field === 'roleId'
  )

  roleItem.options = entireRole.value.map((item) => {
    return { label: item.name, value: item.id }
  })

  return searchConfig
})

// 数据请求到的处理 - 弹出框
const popupConfigRef = computed(() => {
  const departmentItem = popupConfig.formItems.find(
    (item: any) => item.field === 'departmentId'
  )

  departmentItem.options = entireDepartment.value.map((item) => {
    return { label: item.name, value: item.id }
  })

  const roleItem = popupConfig.formItems.find(
    (item: any) => item.field === 'roleId'
  )

  roleItem.options = entireRole.value.map((item) => {
    return { label: item.name, value: item.id }
  })

  return popupConfig
})

// 1.pagePopup相关的hooks
const createCb = () => {
  const passwordItem = popupConfig.formItems.find(
    (item: any) => item.field === 'password'
  )
  passwordItem.isHidden = false
}

const updateCb = () => {
  const passwordItem = popupConfig.formItems.find(
    (item: any) => item.field === 'password'
  )
  passwordItem.isHidden = true
}

const { pagePopupRef, defaultInfo, onCreate, onUpdate } = usePagePopup(
  createCb,
  updateCb
)

const optionsToLabel = (options: any[], value: number) => {
  return options.find((item) => item.id === value)?.name ?? value
}
</script>

<template>
  <div class="user">
    <PageSearch
      :searchConfig="searchConfigRef"
      @query="onQuery"
      @reset="onReset"
    />
    <PageContent
      pageName="users"
      ref="pageContentRef"
      :contentConfig="contentConfig"
      @create="onCreate"
      @update="onUpdate"
    >
      <template #department="{ row, prop }">
        {{ optionsToLabel(entireDepartment, row[prop]) }}
      </template>
      <template #role="{ row, prop }">
        {{ optionsToLabel(entireRole, row[prop]) }}
      </template>
    </PageContent>
    <PagePopup
      pageName="users"
      ref="pagePopupRef"
      :popupConfig="popupConfigRef"
      :default-info="defaultInfo"
    />
  </div>
</template>

<style scoped>
.user {
  height: 100%;
}
</style>
