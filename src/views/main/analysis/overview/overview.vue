<template>
  <div class="overview">
    <h2>overview</h2>
    <img class="avatar" :src="avatar" alt="" />
  </div>
</template>

<script setup lang="ts" name="overview">
import avatar from '@/assets/img/avater.jpg'
</script>

<style lang="less" scoped>
.overview {
  .avatar {
    width: 100px;
    height: 100px;
  }
}
</style>
