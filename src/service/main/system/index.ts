import hrRequest from '../..'

export function getPageList(url: string, queryInfo: string) {
  return hrRequest.post({
    url: url,
    data: queryInfo
  })
}
