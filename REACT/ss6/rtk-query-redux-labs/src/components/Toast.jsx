import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { hideToast } from '../features/toast/toastSlice'

export function Toast() {
  const dispatch = useDispatch()
  const toast = useSelector((state) => state.toast)

  useEffect(() => {
    if (!toast.message) return

    const timer = setTimeout(() => {
      dispatch(hideToast())
    }, 3000)

    return () => clearTimeout(timer)
  }, [toast.message, dispatch])

  if (!toast.message) return null

  return (
    <div className={`toast ${toast.type || ''}`}>
      {toast.message}
    </div>
  )
}
