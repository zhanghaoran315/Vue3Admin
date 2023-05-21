<script lang="ts" setup>
import BaseEchart from '@/base-ui/echart'
import { computed } from 'vue'

interface IData {
  name: string
  value: number
}

interface IProps {
  data: IData[]
}

const props = withDefaults(defineProps<IProps>(), {
  data: () => []
})

const options = computed(() => {
  const xLabels = props.data.map((item) => item.name)
  const yValues = props.data.map((item) => item.value)
  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      }
    },
    legend: {},
    grid: {
      left: '3%',
      right: '5%',
      bottom: '5%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: xLabels
    },
    yAxis: {
      name: '销量',
      type: 'value'
    },
    series: [
      {
        name: '分类商品销量',
        data: yValues,
        type: 'line',
        areaStyle: {}
      }
    ]
  }
})
</script>

<template>
  <div class="pie-chart">
    <base-echart :options="options"></base-echart>
  </div>
</template>

<style scoped lang="less"></style>
