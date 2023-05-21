export const contentConfig = {
  tableItems: [
    {
      prop: 'title',
      label: '动态标题'
    },
    {
      prop: 'author',
      label: '动态作者',
      slotName: 'author'
    },
    {
      prop: 'createAt',
      label: '创建时间',
      minWidth: '200',
      slotName: 'createAt'
    },
    {
      prop: 'updateAt',
      label: '更新时间',
      minWidth: '200',
      slotName: 'updateAt'
    },
    { label: '操作', minWidth: '130', slotName: 'handler' }
  ],
  title: '故事列表'
}
