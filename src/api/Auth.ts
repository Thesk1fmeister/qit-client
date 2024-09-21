'use client'
import { TProfileResponse } from './../types/types'
import { mainApi } from './index'
import { saveAuthToken } from './utils/SaveToken'
import { store } from '@/redux/store'
import { setUserProfile, setUserRole } from '@/redux/slices/user/userSlice'

export const authApi = mainApi.injectEndpoints({
  endpoints: builder => ({
    signup: builder.mutation({
      query: data => {
        return {
          url: `/user/create/`,
          method: 'POST',
          body: data,
        }
      },
      transformResponse: saveAuthToken,
    }),
    login: builder.mutation({
      query: data => {
        return {
          url: `/user/client/token/`,
          method: 'POST',
          body: data,
        }
      },
      transformResponse: saveAuthToken,
    }),
    reset: builder.mutation({
      query: data => {
        return {
          url: `/user/password/reset/`,
          method: 'POST',
          body: data,
        }
      },
      transformResponse: saveAuthToken,
    }),
    confirmPassword: builder.mutation({
      query: data => {
        return {
          url: `/user/password/reset/confirm/`,
          method: 'POST',
          body: data,
        }
      },
      transformResponse: saveAuthToken,
    }),
    googleAuth: builder.mutation({
      query: data => {
        return {
          url: `user/social/google/`,
          method: 'POST',
          body: data,
        }
      },
    }),
    getProfile: builder.query({
      query: () => ({
        url: `/user/me/`,
        method: 'GET',
      }),
      transformResponse: (response: TProfileResponse) => {
        store.dispatch(setUserProfile(response))
        store.dispatch(setUserRole(response.role))
        return response
      },
      providesTags: ['Profile'],
    }),
    patchProfile: builder.mutation({
      query: data => ({
        url: `/user/me/`,
        method: 'PATCH',
        body: data,
      }),
      transformResponse: (response: TProfileResponse) => {
        store.dispatch(setUserProfile(response))
        store.dispatch(setUserRole(response.role))
        return response
      },
      invalidatesTags: ['Profile'],
    }),
    patchAvatar: builder.mutation({
      query: data => ({
        url: `/user/me/avatar/`,
        method: 'PATCH',
        body: data,
      }),
      transformResponse: (response: TProfileResponse) => {
        store.dispatch(setUserProfile(response))
        store.dispatch(setUserRole(response.role))
        return response
      },
      invalidatesTags: ['Profile'],
    }),
  }),
})

export const {
  useLoginMutation,
  useConfirmPasswordMutation,
  useResetMutation,
  useGetProfileQuery,
  usePatchProfileMutation,
  usePatchAvatarMutation,
  useSignupMutation,
  useGoogleAuthMutation,
} = authApi
