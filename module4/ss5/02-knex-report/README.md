## Report Results

### Generated SQL

```sql
SELECT users.name,
       COUNT(orders.id) AS orderCount,
       COALESCE(SUM(orders.total), 0) AS totalSpent
FROM users
LEFT JOIN orders ON users.id = orders.user_id
GROUP BY users.id, users.name
HAVING COUNT(orders.id) >= 2
ORDER BY totalSpent DESC
LIMIT 3;
```

### Top 3 Users by Total Spending

| User | Order Count | Total Spent |
|---|---:|---:|
| Dung | 2 | 1100 |
| An | 4 | 1000 |
| Binh | 3 | 1000 |

### Migration & Rollback

- **Migration:** PASS
- **Seed:** PASS — 5 users, 15 orders
- **Rollback:** PASS
- **Report:** PASS — Top 3 users with at least 2 orders.    