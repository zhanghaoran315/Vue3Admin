<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'
import useEchart2 from '../hooks/index.js'
import * as echarts from 'echarts'

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

function getOption(lineDatas: any[]) {
  const option = {
    grid: {
      left: '5%',
      right: '1%',
      top: '20%',
      bottom: '15%',
      containLabel: true
    },
    tooltip: {
      show: true,
      trigger: 'axis'
    },
    legend: {
      show: true,
      bottom: '5%',
      icon: 'rect',
      itemWidth: 13,
      itemHeight: 12,
      itemGap: 20,
      textStyle: {
        color: '#64BCFF'
      }
    },
    xAxis: {
      type: 'category',
      data: [
        '1月',
        '2月',
        '3月',
        '4月',
        '5月',
        '6月',
        '7月',
        '8月',
        '9月',
        '10月',
        '11月',
        '12月'
      ],
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      splitLine: {
        show: false
      }
    },
    yAxis: {
      type: 'value',
      splitLine: {
        show: false
      }
    },
    series: [
      {
        name: lineDatas[0].name,
        type: 'line',
        smooth: true,
        showSymbol: false,
        data: lineDatas[0].data,
        itemStyle: {
          color: '#20FF89'
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: '#20FF89'
            },
            {
              offset: 1,
              color: 'rgba(255, 255, 255, 0)'
            }
          ])
        }
      },
      {
        name: lineDatas[1].name,
        type: 'line',
        smooth: true,
        showSymbol: false,
        data: lineDatas[1].data,
        itemStyle: {
          color: '#EA9502'
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: '#EA9502'
              },
              {
                offset: 1,
                color: 'rgba(255, 255, 255, 0)'
              }
            ]
          }
        }
      }
    ]
  }

  return option
}
</script>

<template>
  <div class="line-chart" ref="divRef" :style="{ width, height }"></div>
</template>

<style scoped lang="less"></style>
