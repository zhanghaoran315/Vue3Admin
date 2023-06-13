<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'
import useEchart2 from '../hooks/index.js'

interface IProps {
  width?: string
  height?: string
  data?: any[]
}

const props = withDefaults(defineProps<IProps>(), {
  width: '100%',
  height: '100%',
  data: () => []
})

const divRef = ref<HTMLElement>()
let myChart: any = null

watch(
  () => props.data,
  (newValue) => setupEchart(newValue)
)

onMounted(() => {
  setupEchart(props.data)
})

function setupEchart(data: any[]) {
  if (!myChart) {
    myChart = useEchart2(divRef.value)
  }

  const option = getOption(data)

  myChart.setOption(option)
}

function getOption(barDatas: any[]) {
  const option = {
    grid: {
      left: '5%',
      right: '5%',
      top: '30%',
      bottom: '5%',
      containLabel: true // grid 区域是否包含坐标轴的刻度标签
    },
    tooltip: {},
    xAxis: {
      type: 'category',
      data: barDatas.map((item) => item.name),
      axisTick: {
        show: false
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: '#42A4FF'
        }
      },
      axisLabel: {
        show: true,
        color: 'white'
      }
    },
    yAxis: {
      name: '个',
      nameTextStyle: {
        color: 'white',
        fontSize: 13
      },
      type: 'value',
      axisLine: {
        show: true,
        lineStyle: {
          color: '#42A4FF'
        }
      },
      axisLabel: {
        color: 'white'
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: '#42A4FF'
        }
      }
    },
    series: [
      {
        name: '销量',
        data: barDatas.map((item) => item.value),
        type: 'bar',
        barWidth: 17,
        itemStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: '#01B1FF' // 0% 处的颜色
              },
              {
                offset: 1,
                color: '#033BFF' // 100% 处的颜色
              }
            ],
            global: false // 缺省为 false
          }
        }
      }
    ]
  }

  return option
}
</script>

<template>
  <div class="bar-chart" ref="divRef" :style="{ width, height }"></div>
</template>

<style scoped lang="less"></style>
