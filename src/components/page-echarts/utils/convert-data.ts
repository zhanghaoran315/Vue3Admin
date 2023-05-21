import { coordinateData } from './coordinate-data'

export const convertData = (data: any) => {
  const results = []

  for (const item of data) {
    const geoCoord = coordinateData[item.name]
    if (geoCoord) {
      // 数组前两项是坐标第三项是value
      results.push({
        name: item.name,
        value: geoCoord.concat(item.value) // 数组也有concat方法
      })
    }
  }
  return results
}
