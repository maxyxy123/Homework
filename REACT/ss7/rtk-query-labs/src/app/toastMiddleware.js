import { isRejectedWithValue } from '@reduxjs/toolkit'
import { showToast } from '../features/toast/toastSlice'

export const rtkQueryErrorToastMiddleware = (store) => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    const status = action.payload?.status

    let message = 'Có lỗi xảy ra khi gọi API.'

    if (status === 401) {
      message = 'Phiên đăng nhập không hợp lệ hoặc đã hết hạn.'
    } else if (typeof status === 'number' && status >= 500) {
      message = 'Server đang gặp lỗi. Vui lòng thử lại sau.'
    }

    store.dispatch(
      showToast({
        type: 'error',
        message,
      }),
    )
  }

  return next(action)
}
