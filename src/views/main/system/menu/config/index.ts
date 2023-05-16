export const menuType = [
  {
    label: '菜单',
    value: 1
  },
  {
    label: '按钮',
    value: 2
  }
]

export const contentConfig = {
  title: '菜单列表',
  tableItems: [
    { prop: 'name', label: '菜单名称', minWidth: '130' },
    { prop: 'type', label: '类型', minWidth: '50' },
    { prop: 'url', label: '菜单url', minWidth: '120' },
    { prop: 'icon', label: '菜单icon', minWidth: '120' },
    { prop: 'permission', label: '按钮权限', minWidth: '150' },
    {
      prop: 'createAt',
      label: '创建时间',
      minWidth: '150',
      slotName: 'createAt'
    },
    {
      prop: 'updateAt',
      label: '更新时间',
      minWidth: '150',
      slotName: 'updateAt'
    },
    { label: '操作', minWidth: '180', slotName: 'subhandler' }
  ],
  showIndexColumn: false,
  showSelectColumn: false,
  childrenProps: {
    rowKey: 'id'
  },
  showFooter: false
}

export const popupConfig = {
  formItems: [
    {
      field: 'name',
      type: 'input',
      label: '菜单名称'
    },
    // {
    //   field: 'type',
    //   type: 'select',
    //   label: '菜单类型',
    //   options: menuType
    // },
    {
      field: 'url',
      type: 'input',
      label: '菜单url'
    },
    {
      field: 'icon',
      type: 'input',
      label: '菜单icon'
    },
    {
      field: 'permission',
      type: 'input',
      label: '按钮权限',
      isHidden: true
    }
  ],
  colLayout: {
    span: 24
  },
  labelWidth: '80px',
  itemStyle: {
    padding: '0px 10px'
  }
}
