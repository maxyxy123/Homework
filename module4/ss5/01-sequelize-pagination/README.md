### Test 1: Default Pagination

- **Request:** `GET /api/v1/products`
- **Result:** `page=1`, `limit=10`, `total=46`, `totalPages=5`
- **Returned:** 10 products, sorted by `id_desc`
- **Status:** PASS — Default pagination works correctly.

### Test 2: Search by Keyword

- **Request:** `GET /api/v1/products?keyword=sach`
- **Result:** `page=1`, `limit=10`, `total=16`, `totalPages=2`
- **Returned:** 10 products containing `"sach"`
- **Status:** PASS — Keyword search works correctly.

### Test 3: Sorting by Price

- **Request:** `GET /api/v1/products?sort=price_asc`
- **Result:** `page=1`, `limit=10`, `total=46`, `totalPages=5`
- **Returned:** 10 products, price ascending (10,000 → 19,000)
- **Status:** PASS — Price sorting works correctly.

### Test 4: Full Query

- **Request:** `GET /api/v1/products?page=2&limit=10&keyword=sach&sort=price_asc`
- **Result:** `page=2`, `limit=10`, `total=16`, `totalPages=2`
- **Returned:** 6 products containing `"sach"`, sorted by price ascending (40,000 → 55,000)
- **Status:** PASS — Pagination, search, and sorting work correctly.