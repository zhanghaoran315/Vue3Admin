import hrRequest from '../..'

enum DashboardAPI {
  amountList = '/goods/amount/list',
  categoryGoodsCount = '/goods/category/count',
  categoryGoodsSale = '/goods/category/sale',
  categoryGoodsFavor = '/goods/category/favor',
  addressGoodsSale = '/goods/address/sale'
}

// 1.分类商品个数
export function getAmountList() {
  return hrRequest.get({
    url: DashboardAPI.amountList
  })
}

// 1.分类商品个数
export function getCategoryGoodsCount() {
  return hrRequest.get({
    url: DashboardAPI.categoryGoodsCount
  })
}
// 2.分类商品销量
export function getCategoryGoodsSale() {
  return hrRequest.get({
    url: DashboardAPI.categoryGoodsSale
  })
}
// 3.分类商品收藏
export function getCategoryGoodsFavor() {
  return hrRequest.get({
    url: DashboardAPI.categoryGoodsFavor
  })
}
// 4.地区商品销量
export function getAddressGoodsSale() {
  return hrRequest.get({
    url: DashboardAPI.addressGoodsSale
  })
}
