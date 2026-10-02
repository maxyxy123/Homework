import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  fullName: '',
  phone: '',
  address: '',
}

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    setShippingField: (state, action) => {
      const { field, value } = action.payload
      state[field] = value
    },
    clearShipping: () => initialState,
  },
})

export const { setShippingField, clearShipping } = checkoutSlice.actions
export default checkoutSlice.reducer
