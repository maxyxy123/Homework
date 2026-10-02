import { createSlice } from '@reduxjs/toolkit'

const toastSlice = createSlice({
  name: 'toast',
  initialState: {
    type: null,
    message: '',
  },
  reducers: {
    showToast: (state, action) => {
      state.type = action.payload.type
      state.message = action.payload.message
    },
    hideToast: (state) => {
      state.type = null
      state.message = ''
    },
  },
})

export const { showToast, hideToast } = toastSlice.actions
export default toastSlice.reducer
