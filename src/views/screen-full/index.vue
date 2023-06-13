<script setup lang="ts">
import { useRouter } from 'vue-router'
import { onMounted, onUnmounted, ref } from 'vue'
import _ from 'lodash'
import PieChart from './cpns/pie-chart.vue'
import LineChart from './cpns/line-chart.vue'
import BarChart from './cpns/bar-chart.vue'
import ExceptionMonitoring from './cpns/exception-monitoring.vue'
import CenterSvg from './cpns/center-svg.vue'
import CountPanel from './cpns/count-panel.vue'
import LiquidBall from './cpns/liquid-ball.vue'

import {
  chargingPileData,
  processMonitorData,
  chargingStatisticsData,
  exceptionMonitorData,
  dataAnalysisData,
  chargingTop4Data,
  getHomeData
} from './config/mockData.js'
// 充电桩
const chargingPile = ref(chargingPileData)
// 流程监控
const processMonitoring = ref(processMonitorData)
// 充电数据
const chargingStatistics = ref(chargingStatisticsData)
// 异常监控
const exceptionMonitoring = ref(exceptionMonitorData)
// 充电桩数据分析
const dataAnalysis = ref(dataAnalysisData)
// 充电桩top4占比
const chargingTop4 = ref(chargingTop4Data)

const percentage = ref(0)

const router = useRouter()

const goHome = () => router.back()

const resizeFunc = _.throttle(() => {
  triggerScale()
}, 500)

onMounted(() => {
  triggerScale()
  window.addEventListener('resize', resizeFunc)

  getHomeData().then((res: any) => {
    chargingPile.value = res.data.chargingPile.data

    processMonitoring.value = res.data.processMonitoring.data

    chargingStatistics.value = res.data.chargingStatistics.data

    exceptionMonitoring.value = res.data.exceptionMonitoring.data

    dataAnalysis.value = res.data.dataAnalysis.data

    chargingTop4.value = res.data.chargingTop4.data

    percentage.value = res.data.chargingTop4.totalPercentage
  })
})

onUnmounted(() => {
  window.removeEventListener('resize', resizeFunc)
})

function triggerScale() {
  let scaleEl = document.querySelector('.screen-full') as HTMLElement

  // 1.设计稿的尺寸
  let targetX = 1920
  let targetY = 1080 // 1.78
  // let targetRatio = 16 / 9 // 宽高比率 1.78
  let targetRatio = 16 / 9 // 宽高比率 1.78

  // 2.拿到当前设备(浏览器)的宽度
  let currentX =
    document.documentElement.clientWidth || document.body.clientWidth
  let currentY =
    document.documentElement.clientHeight || document.body.clientHeight
  //  1920 * 1080  -> 3840 * 2160

  // 3.计算缩放比例
  let scaleRatio = currentX / targetX // 参照宽度进行缩放 ( 默认情况 )
  let currentRatio = currentX / currentY // 宽高比率

  // 超宽屏
  if (currentRatio > targetRatio) {
    scaleRatio = currentY / targetY // 参照高度进行缩放
    scaleEl.style.cssText = `width:${targetX}px; height:${targetY}px;transform: scale(${scaleRatio}) translateX(-50%); left: 50%`
    console.log('超宽屏')
  } else {
    console.log('普通屏')

    // 4.开始缩放网页
    scaleEl.style.cssText = `width:${targetX}px; height:${targetY}px; transform: scale(${scaleRatio})`
  }
}
</script>

<template>
  <div class="screen-full">
    <div class="header"></div>

    <div class="left-top">
      <PieChart :data="chargingPile" />
    </div>

    <div class="left-bottom">
      <LineChart :data="processMonitoring" />
    </div>

    <div class="center">
      <CenterSvg />
    </div>

    <div class="bottom">
      <CountPanel :data="dataAnalysis" />
    </div>

    <div class="right-top">
      <LiquidBall :percentage="percentage" :data="chargingTop4" />
    </div>

    <div class="right-middle">
      <BarChart :data="chargingStatistics" />
    </div>

    <div class="right-bottom">
      <ExceptionMonitoring :data="exceptionMonitoring" />
    </div>

    <!-- 返回上级页面 -->
    <div class="go-home" @click="goHome"></div>
  </div>
</template>

<style scoped lang="less">
.screen-full {
  width: 1920px;
  height: 1080px;

  position: relative;
  transform-origin: left top;

  background: url('@/assets/img/screenfull/bg.png') 0 0 / 100% 100%;

  .header {
    position: absolute;
    top: 21px;
    left: 0;
    right: 0;
    height: 56px;

    background: url('@/assets/img/screenfull/bg_header.svg') no-repeat;
  }

  .left-top {
    position: absolute;
    top: 116px;
    left: 16px;
    width: 536px;
    height: 443px;
    background: url('@/assets/img/screenfull/bg_left-top.svg') 0 0/100% 100%;
  }

  .left-bottom {
    position: absolute;
    bottom: 49px;
    left: 16px;
    width: 536px;
    height: 443px;
    background: url('@/assets/img/screenfull/bg_left_bottom.svg') 0 0/ 100% 100%;
  }

  .center {
    position: absolute;
    right: 540px;
    bottom: 272px;
    width: 823px;
    height: 710px;
  }

  .bottom {
    position: absolute;
    right: 540px;
    bottom: 49px;
    width: 823px;
    height: 209px;

    background: url('@/assets/img/screenfull/bg_bottom.svg') 0 0/100% 100%;
  }

  .right-top {
    position: absolute;
    right: 17px;
    top: 96px;
    width: 519px;
    height: 327px;

    background: url('@/assets/img/screenfull/bg_right_top.svg') 0 0/100% 100%;
  }

  .right-middle {
    position: absolute;
    right: 17px;
    top: 443px;
    width: 519px;
    height: 327px;

    background: url('@/assets/img/screenfull/bg_right_center.svg') 0 0/100% 100%;
  }

  .right-bottom {
    position: absolute;
    right: 17px;
    bottom: 49px;
    width: 519px;
    height: 242px;

    display: flex;
    align-items: center;
    justify-content: center;

    background: url('@/assets/img/screenfull/bg_right_bottom.svg') 0 0/100% 100%;
  }

  .go-home {
    width: 50px;
    height: 50px;
    position: absolute;
    left: 50px;
    top: 25px;

    cursor: pointer;

    background: url('@/assets/img/screenfull/go-home.svg') 0 0 / 100% 100%;
  }
}
</style>
