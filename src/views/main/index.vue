<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useCounter } from '@/stores'

const countStore = useCounter()

const increment = () => countStore.increment()

const { count, doubleCount } = storeToRefs(countStore)
</script>

<template>
  <div class="main">
    <h2>main</h2>
    <h2>{{ count }}</h2>
    <h2>{{ doubleCount }}</h2>
    <el-button type="primary" @click="increment">改变count</el-button>
  </div>
</template>

<style scoped lang="less">
.main {
  text-align: center;
}
</style>
