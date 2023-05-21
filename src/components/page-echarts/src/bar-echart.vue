<script lang="ts" setup>
import BaseEchart from '@/base-ui/echart'
import { computed } from 'vue'
import * as echarts from 'echarts'

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
      trigger: 'item',
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
      data: xLabels,
      axisLabel: {
        inside: true,
        color: '#fff'
      },
      axisTick: {
        show: false
      },
      axisLine: {
        show: false
      },
      z: 10
    },
    yAxis: {
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        color: '#999'
      }
    },
    // 缩放
    dataZoom: [
      {
        type: 'inside'
      }
    ],
    series: [
      {
        name: '分类商品收藏',
        type: 'bar',
        showBackground: true,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#83bff6' },
            { offset: 0.5, color: '#188df0' },
            { offset: 1, color: '#188df0' }
          ])
        },
        emphasis: {
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#2378f7' },
              { offset: 0.7, color: '#2378f7' },
              { offset: 1, color: '#83bff6' }
            ])
          }
        },
        data: yValues
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
