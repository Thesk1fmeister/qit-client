import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react'
import { baseURL } from './baseUrl'
import { getFromStorage, removeFromStorage, setToStorage } from '@/utils/storage'
import { saveAuthToken } from './utils/SaveToken'
import { storageKeys } from '@/constants/storage'

interface RefreshTokenResponse {
  access: string
}

const baseQuery = fetchBaseQuery({
  baseUrl: baseURL,
  prepareHeaders: (headers, { getState }) => {
    const token = getFromStorage(storageKeys.AUTH)
    if (token) {
      headers.set('authorization', `Bearer ${token}`)
    }
    headers.set('accept', 'application/json')
    return headers
  },
})

const baseQueryWithReauth: BaseQueryFn<FetchArgs | any, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)

  if (result.error && result.error.status === 401) {
    const refreshResult = await baseQuery('/user/token/refresh', api, extraOptions)

    if (refreshResult.data) {
      const refreshData = refreshResult.data as RefreshTokenResponse
      setToStorage(storageKeys.AUTH, refreshData.access)
      result = await baseQuery(args, api, extraOptions)
    } else {
      removeFromStorage(storageKeys.AUTH)
      if (window.location.pathname !== '/auth') {
        window.location.replace('/auth')
      }
    }
  }
  return result
}

export const mainApi = createApi({
  reducerPath: 'mainApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Location', 'Customers', 'Notes', 'Profile', 'Employee', 'Appointments', 'Orders'],
  endpoints: builder => ({}),
})
