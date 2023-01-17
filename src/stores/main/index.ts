import { defineStore } from 'pinia'

import { getPageList } from '@/service'

interface IMainStore {
  entireDepartment: any[]
  entireRole: any[]
  entireMenu: any[]
}

enum initialAPI {
  department = '/department/list',
  role = '/role/list',
  menu = '/menu/list'
}

export const useMainStore = defineStore('main', {
  state(): IMainStore {
    return {
      entireDepartment: [],
      entireRole: [],
      entireMenu: []
    }
  },
  actions: {
    initialDataAction() {
      const queryInfo = { offset: 0, size: 1000 }
      // 1.请求部门数据
      getPageList(initialAPI.department, queryInfo).then((res) => {
        this.entireDepartment = res.data.list
      })

      // 2.请求角色数据
      getPageList(initialAPI.role, queryInfo).then((res) => {
        this.entireRole = res.data.list
      })

      // 3.请求菜单数据
      getPageList(initialAPI.menu, queryInfo).then((res) => {
        this.entireMenu = res.data.list
      })
    }
  }
})

export * from './system'
