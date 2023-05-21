import * as echarts from 'echarts'
import { onBeforeUnmount } from 'vue'

import chinaGeoJson from '@/components/page-echarts/data/china.json'

echarts.registerMap('china', chinaGeoJson as any)

export function useEchart(el: HTMLElement) {
  const echartInstance = echarts.init(el)

  const setOption = (options: echarts.EChartsOption) => {
    echartInstance.setOption(options)
  }

  const updateSize = () => {
    echartInstance.resize()
  }

  window.addEventListener('resize', () => {
    echartInstance.resize()
  })

  onBeforeUnmount(() => {
    echartInstance.dispose()
  })

  return {
    echartInstance,
    setOption,
    updateSize
  }
}
