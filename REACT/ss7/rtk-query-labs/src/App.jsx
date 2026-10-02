import { AdminProducts } from './components/AdminProducts'
import { CheckoutFlow } from './components/CheckoutFlow'
import { OptimisticLike } from './components/OptimisticLike'
import { ProductSearch } from './components/ProductSearch'
import { Toast } from './components/Toast'

function App() {
  return (
    <main className="container">
      <h1>Redux Toolkit + RTK Query Labs</h1>

      <ProductSearch />

      <OptimisticLike />

      <AdminProducts />

      <section>
        <h2>Bài 5: Global Error Middleware</h2>
        <p>
          Middleware ở tầng Store tự bắt lỗi RTK Query và hiển thị Toast.
        </p>
      </section>

      <CheckoutFlow />

      <Toast />
    </main>
  )
}

export default App
