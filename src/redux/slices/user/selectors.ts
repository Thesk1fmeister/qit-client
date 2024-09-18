import { RootState } from '@/redux/store'

export const getUser = (state: RootState) => state.user.profile
export const getUserRole = (state: RootState) => state.user.role
