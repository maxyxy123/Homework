import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setKeyword } from '../features/search/searchSlice'
import { useGetProductsQuery } from '../services/api'

export function ProductSearch() {
  const dispatch = useDispatch()
  const keyword = useSelector((state) => state.search.keyword)
  const [input, setInput] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(setKeyword(input.trim()))
    }, 400)

    return () => clearTimeout(timer)
  }, [input, dispatch])

  const shouldSkip = keyword.trim().length === 0

  const {
    data = [],
    isFetching,
  } = useGetProductsQuery(keyword, {
    skip: shouldSkip,
  })

  return (
    <section>
      <h2>Bài 1 + 2: Search + Debounce</h2>

      <input
        value={input}
        onChange={(event) => setInput(event.target.value)}
        placeholder="Nhập Laptop hoặc Macbook..."
      />

      <p>
        Keyword trong Redux: <strong>{keyword || '(rỗng)'}</strong>
      </p>

      {shouldSkip ? (
        <p>Không gọi API khi input rỗng hoặc toàn khoảng trắng.</p>
      ) : isFetching ? (
        <p>Đang tìm...</p>
      ) : (
        <p>{data.length} kết quả</p>
      )}

      <ul>
        {data.map((product) => (
          <li key={product.id}>
            {product.name} - {product.price.toLocaleString('vi-VN')}đ
          </li>
        ))}
      </ul>
    </section>
  )
}
