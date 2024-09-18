import { mainApi } from './index'

export const locationApi = mainApi.injectEndpoints({
  endpoints: builder => ({
    getStates: builder.query({
      query: () => ({
        url: `/user/locations/states`,
        method: 'GET',
      }),
    }),
  }),
})

export const { useGetStatesQuery } = locationApi
