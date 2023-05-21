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
          length: -5,
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
    legend: {},
    series: [
      {
        name: '分类商品数量',
        type: 'pie',
        radius: [20, 90],
        center: ['50%', '50%'],
        roseType: 'area',
        itemStyle: {
          borderRadius: 8
        },
        data
      }
    ]
  }
})
</script>

<template>
  <div class="rose-chart">
    <base-echart :options="options"></base-echart>
  </div>
</template>

<style scoped lang="less"></style>
