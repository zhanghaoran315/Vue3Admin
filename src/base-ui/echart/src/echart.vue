<script lang="ts" setup>
import { ref, onMounted, watchEffect } from 'vue'
import { useEchart } from '@/hooks'

interface IProps {
  options: Record<string, any>
  width?: string
  height?: string
}

const props = withDefaults(defineProps<IProps>(), {
  width: '100%',
  height: '360px'
})

const echartDivRef = ref<HTMLElement>()

onMounted(() => {
  const { setOption } = useEchart(echartDivRef.value!)

  watchEffect(() => {
    setOption(props.options)
  })
})
</script>

<template>
  <div class="echart">
    <div ref="echartDivRef" :style="{ width, height }"></div>
  </div>
</template>

<style scoped lang="less"></style>
