import { defineStore } from 'pinia'

import { getPageList } from '@/service'

export const useSystemStore = defineStore('system', {
  state() {
    return {
      usersList: [],
      usersCount: 0
    }
  },
  actions: {
    async getPageListAction(pageName: string, queryInfo: any) {
      const pageUrl = `${pageName}/list`
      const result = await getPageList(pageUrl, queryInfo)

      const { list, totalCount } = result.data

      this.$patch({
        [pageName + 'List']: list,
        [pageName + 'Count']: totalCount
      })
    }
  }
})
