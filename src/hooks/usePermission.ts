import { useLoginStore } from '@/stores'

export function usePermission(pageName: string, handleName: string) {
  const loginStore = useLoginStore()
  const { permissions } = loginStore

  const verifyPermission = `system:${pageName}:${handleName}`

  return permissions.includes(verifyPermission)
}
