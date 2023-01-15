import { defineStore } from 'pinia'

import { getPageList } from '@/service'

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

      const { list: pageList, totalCount: pageCount } = result.data

      this.$patch({
        pageList,
        pageCount
      })
    }
  }
})
