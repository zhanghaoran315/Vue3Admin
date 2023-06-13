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

function getOption(pieDatas: any[]) {
  const data = pieDatas.map((item) => {
    return {
      name: item.name,
      value: item.value
    }
  })

  const colors = pieDatas.map((item) => item.color)

  const total = pieDatas.reduce((p, i) => {
    return p + i.value
  }, 0)

  const option = {
    title: {
      text: '充电桩总数',
      textStyle: {
        fontSize: 19,
        color: 'white',
        padding: [10, 0]
      },
      top: '50%',
      left: '30%',
      subtext: `{totalSty|${total}}`,
      subtextStyle: {
        rich: {
          totalSty: {
            fontSize: 24,
            color: 'white',
            padding: [4, 0, 0, 20]
          }
        }
      }
    },
    color: colors,
    legend: {
      orient: 'vertical',
      top: '18%',
      right: '10%',
      icon: 'rect',
      itemGap: 20,
      itemWidth: 16,
      itemHeight: 16,
      // 自定义图例的名称
      formatter: (name: any) => {
        const currentItem = pieDatas.find((item) => item.name === name)!
        return `{nameSty|${currentItem.name}}\n{numSty|${currentItem.value}}个 {preSty|${currentItem.percentage}}`
      },
      textStyle: {
        rich: {
          nameSty: {
            fontSize: 12,
            color: 'white',
            padding: [10, 14]
          },
          numSty: {
            fontSize: 12,
            color: '#40E6ff',
            padding: [0, 0, 0, 14]
          },
          preSty: {
            fontSize: 12,
            color: '#40E6ff'
          }
        }
      }
    },
    series: [
      {
        name: 'Nightingale Chart',
        type: 'pie',
        radius: ['30%', '75%'],
        center: ['40%', '57%'],
        roseType: 'area',
        label: {
          show: false
        },
        data
      }
    ]
  }

  return option
}
</script>

<template>
  <div class="pie-chart" ref="divRef" :style="{ width, height }"></div>
</template>

<style scoped lang="less"></style>
