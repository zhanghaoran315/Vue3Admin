import type { RouteRecordRaw } from 'vue-router'

export let initMenu: any = null

interface IBreadCrumb {
  name: string
  path?: string
}

// 0.加载本地路由
export function loadLocalRoutes() {
  const allRoutes: RouteRecordRaw[] = []

  const modules: Record<string, any> = import.meta.glob(
    '../router/main/**/*.ts',
    {
      eager: true
    }
  )

  Object.values(modules).forEach((module: any) =>
    allRoutes.push(module.default)
  )

  return allRoutes
}

// 1.根据菜单获取需要添加的route
export function mapMenusToRoutes(userMenus: any[]) {
  const allRoutes = loadLocalRoutes()

  console.log('allRoutes: ', allRoutes)
  console.log('userMenus: ', userMenus)

  const routes: RouteRecordRaw[] = []

  const _recurseGetRoute = (menus: any[], firstMenu?: any) => {
    for (const menu of menus) {
      if (menu.type === 2) {
        // 二级菜单（也是二级路由）
        const route = allRoutes.find((route) => route.path === menu.url)
        if (route) {
          // 1.给一级菜单添加重定向功能(但是只需要添加一次即可)
          if (
            firstMenu &&
            !routes.find((item) => item.path === firstMenu.url) // 为了保证只添加一次
          ) {
            routes.push({ path: firstMenu.url, redirect: route.path }) // 重定向到找到的第一个菜单
          }

          // 2.二级菜单对应的路径
          routes.push(route)

          // 3.第一个匹配到的菜单
          initMenu ||= menu // 其实也是个重定向进入 /main 时跳到用户的第一个菜单
        }
      } else if (menu.type === 1) {
        // 一级菜单（其实是二级路由）
        _recurseGetRoute(menu.children ?? [], menu)
      }
    }
  }

  _recurseGetRoute(userMenus)

  return routes
}

// 2.根据path(url)获取对应的菜单
export function mapPathToMenu(
  path: string,
  userMenus: any[],
  breadcrumbs?: IBreadCrumb[]
): any {
  for (const menu of userMenus) {
    if (menu.type === 1) {
      // 一级菜单
      if (menu.url === path) {
        return menu
      } else {
        const currentMenu = mapPathToMenu(path, menu.children ?? [])
        if (currentMenu) {
          breadcrumbs?.push({ name: menu.name })
          breadcrumbs?.push({ name: currentMenu.name, path: currentMenu.url })
          return currentMenu
        }
      }
    } else if (menu.type === 2 && menu.url === path) {
      // 二级菜单
      return menu
    }
  }

  if (breadcrumbs) {
    if (path === '/main/profile') breadcrumbs?.push({ name: '个人中心' })
  }
}

// 3.根据path(url)获取对应的breadcrumb数据
export function mapPathToBreadCrumbs(
  path: string,
  userMenus: any[]
): IBreadCrumb[] {
  const breadcrumbs: IBreadCrumb[] = []
  mapPathToMenu(path, userMenus, breadcrumbs)
  return breadcrumbs
}

// 4.根据userMenus里type为3的节点得到一个按钮权限数组
export function mapMenusToPermissions(userMenus: any[]) {
  const permissions: string[] = []

  const recurseGetPermission = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 1 || menu.type === 2) {
        recurseGetPermission(menu.children ?? [])
      } else if (menu.type === 3) {
        permissions.push(menu.permission)
      }
    }
  }

  recurseGetPermission(userMenus)

  return permissions
}

// 5.根据menuList过滤出里面叶子菜单的id
export function mapMenusToLeavesKeys(menuList: any[]) {
  const leavesKeys: number[] = []

  const _recurseGetLeaf = (menuList: any[]) => {
    for (const menu of menuList) {
      if (menu.children) {
        _recurseGetLeaf(menu.children)
      } else {
        leavesKeys.push(menu.id)
      }
    }
  }

  _recurseGetLeaf(menuList)

  return leavesKeys
}
