import { storageKeys } from '@/constants/storage'
import { setToStorage } from '@/utils/storage'

export const saveAuthToken = (result: any) => {
  setToStorage(storageKeys.AUTH, result.access)
  setToStorage(storageKeys.REFRESH, result.refresh)
  return result
}
