import { useDispatch, useSelector } from 'react-redux'
import {
  addToCart,
  clearCart,
  removeFromCart,
} from '../features/cart/cartSlice'
import {
  clearShipping,
  setShippingField,
} from '../features/checkout/checkoutSlice'
import {
  useCreateOrderMutation,
  useGetProductsQuery,
} from '../services/api'

export function CheckoutFlow() {
  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart.items)
  const shipping = useSelector((state) => state.checkout)

  const { data: products = [] } = useGetProductsQuery('')
  const [createOrder, { isLoading }] = useCreateOrderMutation()

  const handleCheckout = async () => {
    if (cart.length === 0) {
      return
    }

    const payload = {
      items: cart.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
        price: item.price,
      })),
      shipping,
      createdAt: new Date().toISOString(),
    }

    try {
      await createOrder(payload).unwrap()

      dispatch(clearCart())
      dispatch(clearShipping())

      alert('Tạo đơn hàng thành công')
    } catch {
      // Global middleware xử lý lỗi.
    }
  }

  return (
    <section>
      <h2>Bài 6: Shopping Flow</h2>

      <h3>Sản phẩm</h3>

      <div className="grid">
        {products.map((product) => (
          <article className="card" key={product.id}>
            <strong>{product.name}</strong>
            <span>{product.price.toLocaleString('vi-VN')}đ</span>

            <button
              onClick={() => dispatch(addToCart(product))}
            >
              Thêm vào giỏ
            </button>
          </article>
        ))}
      </div>

      <h3>Giỏ hàng</h3>

      {cart.length === 0 ? (
        <p>Giỏ hàng rỗng.</p>
      ) : (
        <ul>
          {cart.map((item) => (
            <li key={item.id} className="row spread">
              <span>
                {item.name} × {item.quantity}
              </span>

              <button
                onClick={() => dispatch(removeFromCart(item.id))}
              >
                Xóa
              </button>
            </li>
          ))}
        </ul>
      )}

      <h3>Thông tin giao hàng</h3>

      <input
        value={shipping.fullName}
        placeholder="Họ tên"
        onChange={(event) =>
          dispatch(
            setShippingField({
              field: 'fullName',
              value: event.target.value,
            }),
          )
        }
      />

      <input
        value={shipping.phone}
        placeholder="Số điện thoại"
        onChange={(event) =>
          dispatch(
            setShippingField({
              field: 'phone',
              value: event.target.value,
            }),
          )
        }
      />

      <input
        value={shipping.address}
        placeholder="Địa chỉ"
        onChange={(event) =>
          dispatch(
            setShippingField({
              field: 'address',
              value: event.target.value,
            }),
          )
        }
      />

      <button
        onClick={handleCheckout}
        disabled={isLoading || cart.length === 0}
      >
        {isLoading ? 'Đang thanh toán...' : 'Thanh toán'}
      </button>
    </section>
  )
}
