import hrRequest from '../..'

enum momentAPI {
  publishMoment = '/moment',
  momentDetail = '/moment/',
  deleteMoment = '/moment/',
  updateMoment = '/moment/'
}

// 1.发布动态
export function publishMoment(data: any) {
  return hrRequest.post({
    url: momentAPI.publishMoment,
    data
  })
}

// 2.修改动态
export function updateMoment(data: any) {
  const patchUrl = momentAPI.updateMoment + data.id
  delete data.id
  return hrRequest.patch({
    url: patchUrl,
    data
  })
}

// 3.删除动态
export function deleteMoment(id: string) {
  return hrRequest.delete({
    url: momentAPI.deleteMoment + id
  })
}

// 4.动态详情
export function momentDetail(id: string) {
  return hrRequest.get({
    url: momentAPI.momentDetail + id
  })
}
