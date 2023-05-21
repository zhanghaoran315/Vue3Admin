import hrRequest from '../..'

enum momentAPI {
  publishMoment = '/moment'
}

// 1.分页数据
export function publishMoment(data: any) {
  return hrRequest.post({
    url: momentAPI.publishMoment,
    data
  })
}
