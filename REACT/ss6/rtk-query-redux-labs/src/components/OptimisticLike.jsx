import { useGetProductsQuery, useLikeProductMutation } from '../services/api'

export function OptimisticLike() {
  const { data = [], isLoading } = useGetProductsQuery('')
  const [likeProduct] = useLikeProductMutation()

  if (isLoading) return <p>Đang tải...</p>

  return (
    <section>
      <h2>Bài 3: Optimistic UI cho Like</h2>

      <p>
        UI đổi ngay; nếu server trả lỗi thì RTK Query rollback cache.
      </p>

      <div className="grid">
        {data.map((product) => (
          <article className="card" key={product.id}>
            <strong>{product.name}</strong>
            <button
              className={product.liked ? 'liked' : ''}
              onClick={() =>
                likeProduct({
                  id: product.id,
                  liked: !product.liked,
                })
              }
            >
              {product.liked ? '♥ Đã thích' : '♡ Thích'}
            </button>
          </article>
        ))}
      </div>
    </section>
  )
}
