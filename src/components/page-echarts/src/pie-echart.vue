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
  const data = props.data.map((item) => {
    if (item.name.length > 2) {
      return {
        name: item.name,
        value: item.value,
        labelLine: {
          length: 10,
          length2: 7
        }
      }
    } else {
      return {
        name: item.name,
        value: item.value
      }
    }
  })
  return {
    tooltip: {
      trigger: 'item'
    },
    legend: {},
    series: [
      {
        name: '商品个数',
        type: 'pie',
        radius: '50%',
        data,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
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
