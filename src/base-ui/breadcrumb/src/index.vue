<script lang="ts" setup>
interface IBreadCrumb {
  name: string
  path?: string
}

type BreadCrumbType = {
  breadcrumbs: IBreadCrumb[]
}
defineProps<BreadCrumbType>()
</script>

<template>
  <div class="breadcrumb">
    <el-breadcrumb separator="/">
      <template v-for="item in breadcrumbs" :key="item.name">
        <el-breadcrumb-item :to="{ path: item.path ? item.path : '' }">{{
          item.name
        }}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<style scoped lang="less"></style>
