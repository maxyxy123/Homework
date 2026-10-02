import { useState } from 'react'
import {
  useAddProductMutation,
  useDeleteProductMutation,
  useGetProductsQuery,
  useUpdateProductMutation,
} from '../services/api'

export function AdminProducts() {
  const { data = [], isFetching } = useGetProductsQuery('')
  const [name, setName] = useState('')

  const [addProduct, { isLoading: isAdding }] = useAddProductMutation()
  const [updateProduct] = useUpdateProductMutation()
  const [deleteProduct] = useDeleteProductMutation()

  const handleAdd = async () => {
    const trimmedName = name.trim()

    if (!trimmedName) {
      return
    }

    try {
      await addProduct({
        name: trimmedName,
        price: 10000000,
        liked: false,
      }).unwrap()

      setName('')
    } catch {
      // Global middleware xử lý toast lỗi.
    }
  }

  return (
    <section>
      <h2>Bài 4: CRUD + Auto Refetch</h2>

      <div className="row">
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Tên sản phẩm mới"
        />

        <button onClick={handleAdd} disabled={isAdding}>
          Thêm
        </button>
      </div>

      {isFetching && <p>Đang đồng bộ dữ liệu...</p>}

      <ul>
        {data.map((product) => (
          <li key={product.id} className="row spread">
            <span>{product.name}</span>

            <div className="row">
              <button
                onClick={() =>
                  updateProduct({
                    id: product.id,
                    name: `${product.name} (đã sửa)`,
                  })
                }
              >
                Sửa
              </button>

              <button
                onClick={() => deleteProduct(product.id)}
              >
                Xóa
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
