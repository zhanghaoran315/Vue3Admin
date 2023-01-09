<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useCounter } from '@/stores'
import { ref } from 'vue'

const value = ref(4)

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
    <el-rate v-model="value" size="large" />
    <el-icon :size="30">
      <Edit />
    </el-icon>
  </div>
</template>

<style scoped lang="less">
.main {
  text-align: center;
}
</style>
