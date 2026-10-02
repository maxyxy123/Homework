import { useDispatch, useSelector } from 'react-redux'
import { addToCart, clearCart, removeFromCart } from '../features/cart/cartSlice'
import { clearShipping, setShippingField } from '../features/checkout/checkoutSlice'
import { useCreateOrderMutation, useGetProductsQuery } from '../services/api'

export function CheckoutFlow() {
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart.items)
  const shipping = useSelector((state) => state.checkout)
  const { data: products = [] } = useGetProductsQuery('')
  const [createOrder, { isLoading }] = useCreateOrderMutation()

  const checkout = async () => {
    if (!cart.length) return

    const order = {
      items: cart.map(({ id, quantity, price }) => ({
        productId: id,
        quantity,
        price,
      })),
      shipping,
      createdAt: new Date().toISOString(),
    }

    try {
      await createOrder(order).unwrap()
      dispatch(clearCart())
      dispatch(clearShipping())
      alert('Tạo đơn hàng thành công')
    } catch {
      // Toast middleware xử lý thông báo lỗi tập trung.
    }
  }

  return (
    <section>
      <h2>Bài 6: Luồng mua hàng hoàn chỉnh</h2>

      <h3>Sản phẩm</h3>
      <div className="grid">
        {products.map((product) => (
          <article className="card" key={product.id}>
            <strong>{product.name}</strong>
            <span>{product.price.toLocaleString('vi-VN')}đ</span>
            <button onClick={() => dispatch(addToCart(product))}>
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
            <li className="row spread" key={item.id}>
              <span>{item.name} × {item.quantity}</span>
              <button onClick={() => dispatch(removeFromCart(item.id))}>
                Xóa
              </button>
            </li>
          ))}
        </ul>
      )}

      <h3>Địa chỉ giao hàng</h3>
      {['fullName', 'phone', 'address'].map((field) => (
        <input
          key={field}
          value={shipping[field]}
          placeholder={field}
          onChange={(event) =>
            dispatch(
              setShippingField({
                field,
                value: event.target.value,
              }),
            )
          }
        />
      ))}

      <button onClick={checkout} disabled={isLoading || cart.length === 0}>
        {isLoading ? 'Đang thanh toán...' : 'Thanh toán'}
      </button>
    </section>
  )
}
