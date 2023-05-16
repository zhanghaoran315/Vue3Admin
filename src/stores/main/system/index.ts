import { defineStore } from 'pinia'
import { ElMessage } from 'element-plus'

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

      const res = await getPageList(pageUrl, queryInfo)

      if (res.code !== 200) return ElMessage.error(res.message)

      const { list: pageList, totalCount: pageCount = 0 } = res.data

      this.$patch({
        pageList,
        pageCount
      })
    },
    // 2.删除数据
    async deletePageItem(pageName: string, id: number) {
      const pageUrl = `/${pageName}/${id}`

      // 1.删除数据的请求
      const res = await deletePageItem(pageUrl)

      if (res.code === 200) ElMessage.success('删除成功！')
      else return ElMessage.error(res.message)

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
      const res = await createPageItem(pageUrl, createData)

      if (res.code === 200) ElMessage.success('新增成功！')
      else return ElMessage.error(res.message)

      // 2.重新请求数据
      this.getPageListAction(pageName, {
        offset: 0,
        size: 10
      })
    },
    // 4.编辑数据
    async updatePageItem(pageName: string, updateData: any, id: number) {
      const pageUrl = `/${pageName}/${id}`

      // 1.编辑数据
      const res = await updatePageItem(pageUrl, updateData)

      if (res.code === 200) ElMessage.success('编辑成功！')
      else return ElMessage.error(res.message)

      // 2.重新请求数据
      this.getPageListAction(pageName, {
        offset: 0,
        size: 10
      })
    }
  }
})
