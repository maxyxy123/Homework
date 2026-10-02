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
        <h2>Bài 5: Global RTK Query Error Middleware</h2>
        <p>
          Middleware trong <code>src/app/toastMiddleware.js</code> nghe action
          rejected từ RTK Query và tự dispatch toast. Component không cần lặp
          logic xử lý lỗi 401/500.
        </p>
      </section>

      <CheckoutFlow />

      <Toast />
    </main>
  )
}

export default App
