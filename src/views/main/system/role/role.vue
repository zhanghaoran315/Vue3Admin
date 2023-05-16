<script setup lang="ts" name="role">
import PageContent from '@/components/page-content/page-content.vue'
import PageSearch from '@/components/page-search/page-search.vue'
import PagePopup from '@/components/page-popup/page-popup.vue'
import { searchConfig, contentConfig, popupConfig } from './config'

import { usePagePopup, usePageSearch } from '@/hooks'
import type { ElTree } from 'element-plus'

import { useMainStore } from '@/stores'
import { storeToRefs } from 'pinia'
import { ref, nextTick } from 'vue'
import { mapMenusToLeavesKeys } from '@/utils'

const { entireMenu } = storeToRefs(useMainStore())

// pagePopup相关的逻辑
// el-tree数据的回显
const elTreeRef = ref<InstanceType<typeof ElTree>>()
const updateCb = (item: any) => {
  console.log('item: ', item)

  const leavesKeys = mapMenusToLeavesKeys(item.menuList)
  // default-checked-keys 也可以使用这个属性
  nextTick(() => {
    elTreeRef.value?.setCheckedKeys(leavesKeys)
  })
}

const { pagePopupRef, defaultInfo, onCreate, onUpdate } = usePagePopup(
  undefined,
  updateCb
)

const otherInfo = ref({})
// 新增、编辑都是这个逻辑
const onCheckChange = (data1: any, data2: any) => {
  // data1：该节点所对应的对象
  // data2: 树目前的选中状态对象
  // 包含 checkedNodes、checkedKeys、halfCheckedNodes、halfCheckedKeys 四个属性

  // 选中的key
  const checkedKeys = data2.checkedKeys
  // 半选的Key
  const halfCheckedKeys = data2.halfCheckedKeys

  // 菜单数组，里面放置菜单项的id
  const menuList = [...checkedKeys, ...halfCheckedKeys]

  otherInfo.value = { menuList }
}

const { onQuery, onReset, pageContentRef } = usePageSearch()
</script>

<template>
  <div class="role">
    <PageSearch
      :searchConfig="searchConfig"
      @query="onQuery"
      @reset="onReset"
    />
    <PageContent
      ref="pageContentRef"
      page-name="role"
      :contentConfig="contentConfig"
      @create="onCreate"
      @update="onUpdate"
    />
    <PagePopup
      page-name="role"
      ref="pagePopupRef"
      :popupConfig="popupConfig"
      :default-info="defaultInfo"
      :other-info="otherInfo"
    >
      <div class="menu-tree">
        <el-tree
          ref="elTreeRef"
          :data="entireMenu"
          show-checkbox
          node-key="id"
          :props="{ label: 'name', children: 'children' }"
          @check="onCheckChange"
        />
      </div>
    </PagePopup>
  </div>
</template>

<style scoped>
.role {
  height: 100%;
}
.menu-tree {
  padding-left: 35px;
}
</style>
