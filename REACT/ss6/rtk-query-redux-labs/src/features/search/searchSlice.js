import { createSlice } from '@reduxjs/toolkit'

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    keyword: '',
  },
  reducers: {
    setKeyword: (state, action) => {
      state.keyword = action.payload
    },
    clearKeyword: (state) => {
      state.keyword = ''
    },
  },
})

export const { setKeyword, clearKeyword } = searchSlice.actions
export default searchSlice.reducer
