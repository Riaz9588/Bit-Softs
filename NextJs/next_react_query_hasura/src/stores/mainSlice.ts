import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserPayloadObject } from '../interfaces'

interface MainState {
  userName: null | string
  userEmail: null | string
  userAvatar: null | string
  userError?: {
    email?: string
    password?: string
  },
  userLoading?: boolean
}

const initialState: MainState = {
  /* User */
  userName: null,
  userEmail: null,
  userAvatar: null,
  userError: null,
  userLoading: false
}

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserPayloadObject>) => {
      state.userName = action.payload.name
      state.userEmail = action.payload.email
      state.userAvatar = action.payload.avatar
      state.userError = action.payload.error
      state.userLoading = action.payload.loading
    },
  },
})

// Action creators are generated for each case reducer function
export const { setUser } = mainSlice.actions

export default mainSlice.reducer
