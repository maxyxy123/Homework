import { createSlice } from '@reduxjs/toolkit'

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState: {
    fullName: '',
    phone: '',
    address: '',
  },
  reducers: {
    setShippingField: (state, action) => {
      const { field, value } = action.payload
      state[field] = value
    },
    clearShipping: () => ({
      fullName: '',
      phone: '',
      address: '',
    }),
  },
})

export const { setShippingField, clearShipping } = checkoutSlice.actions
export default checkoutSlice.reducer
