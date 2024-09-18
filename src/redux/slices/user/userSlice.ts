import { TProfileDetails, TUserState } from '@/types/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: TUserState = {
  profile: null,
  role: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserProfile(state, action: PayloadAction<TProfileDetails>) {
      state.profile = action.payload
    },
    setUserRole(state, action: PayloadAction<string>) {
      state.role = action.payload
    },
    clearUserProfile(state) {
      state.profile = null
      state.role = null
    },
  },
})

export const { setUserProfile, setUserRole, clearUserProfile } = userSlice.actions
export default userSlice.reducer
