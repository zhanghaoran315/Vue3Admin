import hrRequest from '../..'

// 1.分页数据
export function getPageList(url: string, queryInfo: any) {
  return hrRequest.post({
    url: url,
    data: queryInfo
  })
}

// 2.删除数据
export function deletePageItem(url: string) {
  return hrRequest.delete({
    url: url
  })
}

// 3.新增数据
export function createPageItem(url: string, createData: any) {
  return hrRequest.post({
    url,
    data: createData
  })
}

// 4.编辑数据
export function updatePageItem(url: string, updateData: any) {
  return hrRequest.patch({
    url,
    data: updateData
  })
}
