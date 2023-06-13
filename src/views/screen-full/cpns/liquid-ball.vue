<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'
import useEchart2 from '../hooks/index.js'
import 'echarts-liquidfill'

const colors = ['#209393', '#1a54a5', '#85caf0', '#f5b64a', '#ee792e']

interface IProps {
  percentage: number
  data: any[]
}

const props = withDefaults(defineProps<IProps>(), {
  percentage: 0,
  data: () => [
    {
      id: 1,
      name: '深圳',
      percentage: '30%'
    },
    {
      id: 2,
      name: '广州',
      percentage: '20%'
    },
    {
      id: 3,
      name: '东莞',
      percentage: '10%'
    },
    {
      id: 4,
      name: '佛山',
      percentage: '10%'
    },
    {
      id: 5,
      name: '其它',
      percentage: '30%'
    }
  ]
})

const divRef = ref<HTMLElement>()
let myChart: any = null

onMounted(() => {
  setupEchart()
})

function setupEchart() {
  if (!myChart) {
    myChart = useEchart2(divRef.value)
  }

  const option = getOption()

  myChart.setOption(option)
}

function getOption() {
  const option = {
    series: [
      {
        type: 'liquidFill',
        data: [
          {
            value: 0.6,
            direction: 'left',
            itemStyle: {
              color: '#c7eeff'
            }
          },
          {
            value: 0.6,
            direction: 'right',
            itemStyle: {
              color: '#00c6ff'
            }
          }
        ],
        animationEasing: 'ease-in',
        waveLength: '200%',
        outline: {
          show: false
        },
        radius: '90%',
        label: {
          color: '#fff',
          fontSize: 38,
          fontWeight: 400
        },
        animationDuration: 1000,
        period: 1800,
        backgroundStyle: {
          color: 'transparent'
        },
        tooltip: {
          show: true
        },
        emphasis: {}
      }
    ]
  }

  return option
}
</script>

<template>
  <div class="liquid-fill">
    <!-- 1.水球 -->
    <div class="water-ball" ref="divRef"></div>
    <!-- 2.图例 -->
    <div class="legend">
      <template v-for="(item, index) in data" :key="item.id">
        <div class="item">
          <div class="dot" :style="{ backgroundColor: colors[index] }"></div>
          <div class="name">{{ item.name }}</div>
          <div class="per">{{ item.percentage }}</div>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped lang="less">
.liquid-fill {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;

  .water-ball {
    width: 269px;
    height: 199px;
    margin-top: 50px;
    margin-left: 40px;
  }

  .legend {
    flex: 1;

    .item {
      margin-top: 23px;
      margin-left: 40px;

      display: flex;
      font-size: 20px;

      > div {
        margin-right: 11px;
      }

      .dot {
        width: 17px;
        height: 17px;
        border-radius: 50%;
      }

      .name {
        color: white;
      }

      .per {
        color: #0cd2ea;
      }
    }
  }
}
</style>
