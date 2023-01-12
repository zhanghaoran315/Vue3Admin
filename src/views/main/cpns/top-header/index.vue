<script lang="ts" setup>
import UserInfo from '../user-info/index.vue'
import BreadCrumb from '@/base-ui/breadcrumb'
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { mapPathToBreadCrumbs } from '@/utils'
import { useLoginStore } from '@/stores'
import { storeToRefs } from 'pinia'

const emit = defineEmits(['foldChange'])

const isFold = ref(false)

const onIconClick = () => {
  isFold.value = !isFold.value

  emit('foldChange', isFold.value)
}

const route = useRoute()
const { userMenus } = storeToRefs(useLoginStore())
const breadcrumbs = computed(() =>
  mapPathToBreadCrumbs(route.path, userMenus.value)
)
</script>

<template>
  <div class="top-header">
    <el-icon class="icon" size="28" @click="onIconClick">
      <component :is="isFold ? 'Expand' : 'Fold'"></component>
    </el-icon>
    <div class="content">
      <bread-crumb :breadcrumbs="breadcrumbs" />
      <user-info />
    </div>
  </div>
</template>

<style scoped lang="less">
.top-header {
  height: 100%;
  display: flex;
  align-items: center;

  .icon {
    cursor: pointer;
  }

  .content {
    flex: 1;
    padding-left: 20px;

    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
