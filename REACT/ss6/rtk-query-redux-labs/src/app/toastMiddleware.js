import { isRejectedWithValue } from '@reduxjs/toolkit'
import { showToast } from '../features/toast/toastSlice'

export const rtkQueryErrorToastMiddleware = (store) => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    const status = action.payload?.status
    const message =
      status === 401
        ? 'Bạn chưa đăng nhập hoặc phiên đăng nhập đã hết hạn.'
        : status >= 500
          ? 'Server đang gặp lỗi. Vui lòng thử lại sau.'
          : action.payload?.data?.message || 'Có lỗi xảy ra khi gọi API.'

    store.dispatch(showToast({ type: 'error', message }))
  }

  return next(action)
}
