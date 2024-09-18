import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { mainApi } from '@/api'
import userReducer from './slices/user/userSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    [mainApi.reducerPath]: mainApi.reducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: getDefaultMiddleware => getDefaultMiddleware({}).concat(mainApi.middleware),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
