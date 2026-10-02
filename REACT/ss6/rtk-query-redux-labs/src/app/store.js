import { configureStore } from '@reduxjs/toolkit'
import searchReducer from '../features/search/searchSlice'
import cartReducer from '../features/cart/cartSlice'
import checkoutReducer from '../features/checkout/checkoutSlice'
import toastReducer from '../features/toast/toastSlice'
import { api } from '../services/api'
import { rtkQueryErrorToastMiddleware } from './toastMiddleware'

export const store = configureStore({
  reducer: {
    search: searchReducer,
    cart: cartReducer,
    checkout: checkoutReducer,
    toast: toastReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware, rtkQueryErrorToastMiddleware),
})
