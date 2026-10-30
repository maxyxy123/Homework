## Transaction Testing Results

### Test 1: Successful Order

- **Request:** `POST /api/v1/orders`
- **Body:** `{"items":[{"productId":1,"qty":2},{"productId":5,"qty":1}]}`
- **Result:** Order created and product stock decreased.
- **Status:** PASS

### Test 2: Insufficient Stock

- **Request:** `POST /api/v1/orders`
- **Body:** `{"items":[{"productId":1,"qty":999999}]}`
- **HTTP Status:** `409 Conflict`
- **Error:** `Sản phẩm Sach không đủ tồn kho`
- **Result:** Product stock remained unchanged.
- **Status:** PASS

### Transaction Rollback

| Product | Stock Before | Stock After |
|---|---:|---:|
| Sach | 8 | 8 |
| But | 2 | 2 |
| Vo | 0 | 0 |

The insufficient-stock request returned HTTP 409 without changing product stock.

### Screenshots

![Before Rollback](./screenshots/before-rollback.png)

![409 Conflict](./screenshots/409-conflict.png)

![After Rollback](./screenshots/after-rollback.png)## Transaction Testing Results

### Test 1: Successful Order

- **Request:** `POST /api/v1/orders`
- **Body:** `{"items":[{"productId":1,"qty":2},{"productId":5,"qty":1}]}`
- **Result:** Order created and product stock decreased.
- **Status:** PASS

### Test 2: Insufficient Stock

- **Request:** `POST /api/v1/orders`
- **Body:** `{"items":[{"productId":1,"qty":999999}]}`
- **HTTP Status:** `409 Conflict`
- **Error:** `Sản phẩm Sach không đủ tồn kho`
- **Result:** Product stock remained unchanged.
- **Status:** PASS

### Transaction Rollback

| Product | Stock Before | Stock After |
|---|---:|---:|
| Sach | 8 | 8 |
| But | 2 | 2 |
| Vo | 0 | 0 |

The insufficient-stock request returned HTTP 409 without changing product stock.

### Screenshots

In File