import homeData from './data.json'

export const getHomeData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const res = {
        data: homeData
      }
      resolve(res)
    }, 500)
  })
}

export const chargingPileData = [
  {
    value: 0,
    name: '广州占比',
    percentage: '0%',
    color: '#34D160'
  },
  {
    value: 0,
    name: '深圳占比',
    percentage: '0%',
    color: '#027FF2'
  },
  {
    value: 0,
    name: '东莞占比',
    percentage: '0%',
    color: '#8A00E1'
  },
  {
    value: 0,
    name: '佛山占比',
    percentage: '0%',
    color: '#F19610'
  },
  {
    value: 0,
    name: '中山占比',
    percentage: '0%',
    color: '#6054FF'
  },
  {
    value: 0,
    name: '珠海占比',
    percentage: '0%',
    color: '#00C6FF'
  }
]

export const processMonitorData = [
  {
    name: '正常',
    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  },
  {
    name: '异常',
    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  }
]

export const chargingStatisticsData = [
  {
    name: '一月',
    value: 0
  },
  {
    name: '二月',
    value: 0
  },
  {
    name: '三月',
    value: 0
  },
  {
    name: '四月',
    value: 0
  },
  {
    name: '五月',
    value: 0
  },
  {
    name: '六月',
    value: 0
  },
  {
    name: '七月',
    value: 0
  }
]

export const exceptionMonitorData = []

export const dataAnalysisData = [
  {
    id: 1,
    title: '充电桩总数(个)',
    totalNum: 0,
    unit: '万',
    percentage: 0,
    isUp: true
  },
  {
    id: 2,
    title: '年增长总数(个)',
    totalNum: 0,
    unit: '万',
    percentage: 0,
    isUp: true
  },
  {
    id: 3,
    title: '月增长总数(个)',
    totalNum: 0,
    unit: '万',
    percentage: 0,
    isUp: false
  }
]

// 充电桩Top4占比
export const chargingTop4Data = [
  {
    id: 1,
    name: '深圳',
    percentage: '0%'
  },
  {
    id: 2,
    name: '广州',
    percentage: '0%'
  },
  {
    id: 3,
    name: '东莞',
    percentage: '0%'
  },
  {
    id: 4,
    name: '佛山',
    percentage: '0%'
  },
  {
    id: 5,
    name: '其它',
    percentage: '0%'
  }
]
