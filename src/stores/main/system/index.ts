import { defineStore } from 'pinia'

import {
  getPageList,
  deletePageItem,
  createPageItem,
  updatePageItem
} from '@/service'

export const useSystemStore = defineStore('system', {
  state() {
    return {
      pageList: [],
      pageCount: 0
    }
  },
  actions: {
    // 1.分页数据
    async getPageListAction(pageName: string, queryInfo: any) {
      const pageUrl = `${pageName}/list`

      const result = await getPageList(pageUrl, queryInfo)

      const { list: pageList, totalCount: pageCount = 0 } = result.data

      this.$patch({
        pageList,
        pageCount
      })
    },
    // 2.删除数据
    async deletePageItem(pageName: string, id: number) {
      const pageUrl = `/${pageName}/${id}`

      // 1.删除数据的请求
      await deletePageItem(pageUrl)

      // 2.重新请求最新的数据
      this.getPageListAction(pageName, {
        offset: 0,
        size: 10
      })
    },
    // 3.新增数据
    async createPageItem(pageName: string, createData: any) {
      const pageUrl = `/${pageName}`

      // 1.新增数据
      await createPageItem(pageUrl, createData)

      // 2.重新请求数据
      this.getPageListAction(pageName, {
        offset: 0,
        size: 10
      })
    },
    // 4.编辑数据
    async updatePageItem(pageName: string, updateData: any, id: number) {
      const pageUrl = `/${pageName}/${id}`

      // 1.新增数据
      await updatePageItem(pageUrl, updateData)

      // 2.重新请求数据
      this.getPageListAction(pageName, {
        offset: 0,
        size: 10
      })
    }
  }
})
