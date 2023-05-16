export const contentConfig = {
  title: '商品列表',
  tableItems: [
    { prop: 'name', label: '商品名称', minWidth: '120' },
    { prop: 'oldPrice', label: '原价格', minWidth: '60', slotName: 'oldPrice' },
    { prop: 'newPrice', label: '现价格', minWidth: '60', slotName: 'newPrice' },
    { prop: 'imgUrl', label: '商品图片', minWidth: '100', slotName: 'image' },
    // { prop: 'status', label: '状态', minWidth: '70', slotName: 'status' },
    { prop: 'inventoryCount', label: '库存', minWidth: '60' },
    { prop: 'saleCount', label: '销量', minWidth: '60' },
    // { prop: 'favorCount', label: '收藏', minWidth: '50' },
    { prop: 'address', label: '地址', minWidth: '60' },
    {
      prop: 'createAt',
      label: '创建时间',
      minWidth: '160',
      slotName: 'createAt'
    },
    {
      prop: 'updateAt',
      label: '更新时间',
      minWidth: '160',
      slotName: 'updateAt'
    },
    { label: '操作', minWidth: '130', slotName: 'handler' }
  ],
  showSelectColumn: false
}
