import { defineStore } from 'pinia'

import { getPageList, deletePageItem } from '@/service'

export const useSystemStore = defineStore('system', {
  state() {
    return {
      pageList: [],
      pageCount: 0
    }
  },
  actions: {
    async getPageListAction(pageName: string, queryInfo: any) {
      const pageUrl = `${pageName}/list`

      const result = await getPageList(pageUrl, queryInfo)

      const { list: pageList, totalCount: pageCount = 0 } = result.data

      this.$patch({
        pageList,
        pageCount
      })
    },
    async deletePageItemAction(pageName: string, id: number) {
      const pageUrl = `/${pageName}/${id}`

      // 1.删除数据的请求
      await deletePageItem(pageUrl)

      // 2.重新请求最新的数据
      this.getPageListAction(pageName, {
        offset: 0,
        size: 10
      })
    }
  }
})
