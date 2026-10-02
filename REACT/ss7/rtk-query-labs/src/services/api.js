import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3001/',
  }),
  tagTypes: ['Product'],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (keyword = '') => {
        const trimmedKeyword = keyword.trim()

        return trimmedKeyword
          ? `products?name:contains=${encodeURIComponent(trimmedKeyword)}`
          : 'products'
      },
      providesTags: (result = []) => [
        { type: 'Product', id: 'LIST' },
        ...result.map((product) => ({
          type: 'Product',
          id: product.id,
        })),
      ],
    }),

    addProduct: builder.mutation({
      query: (product) => ({
        url: 'products',
        method: 'POST',
        body: product,
      }),
      invalidatesTags: (result) =>
        result ? [{ type: 'Product', id: 'LIST' }] : [],
    }),

    updateProduct: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `products/${id}`,
        method: 'PATCH',
        body: patch,
      }),
      invalidatesTags: (result, error, { id }) =>
        result
          ? [
              { type: 'Product', id },
              { type: 'Product', id: 'LIST' },
            ]
          : [],
    }),

    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `products/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) =>
        error
          ? []
          : [
              { type: 'Product', id },
              { type: 'Product', id: 'LIST' },
            ],
    }),

    likeProduct: builder.mutation({
      query: ({ id, liked }) => ({
        url: `products/${id}`,
        method: 'PATCH',
        body: { liked },
      }),
      async onQueryStarted({ id, liked }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          api.util.updateQueryData('getProducts', '', (draft) => {
            const product = draft.find((item) => item.id === id)
            if (product) {
              product.liked = liked
            }
          }),
        )

        try {
          await queryFulfilled
        } catch {
          patchResult.undo()
        }
      },
      invalidatesTags: (result, error, { id }) =>
        error ? [] : [{ type: 'Product', id }],
    }),

    createOrder: builder.mutation({
      query: (order) => ({
        url: 'orders',
        method: 'POST',
        body: order,
      }),
    }),
  }),
})

export const {
  useGetProductsQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useLikeProductMutation,
  useCreateOrderMutation,
} = api
