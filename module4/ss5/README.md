## N+1 Query Performance Comparison

### Test Results

| Metric | Slow | Fast |
|---|---:|---:|
| Query Count | 51 | 1 |
| Duration | 49.12 ms | 21.78 ms |
| Categories | 50 | 50 |
| Products | 500 | 500 |
| Status | PASS | PASS |

### Analysis

- **Slow:** Uses N+1 queries (51 SQL queries).
- **Fast:** Uses eager loading with `include` (1 SQL query).
- **Performance:** Fast is approximately 2.26 times faster, reducing execution time by 55.66%.

### Memory Usage

Eager loading may consume more memory because JOIN operations can produce duplicate rows before Sequelize converts them into JavaScript objects.

Using `separate: true` is useful for `hasMany` relationships when we need to avoid large JOIN results or limit the number of associated records. However, it may require additional SQL queries.

### Conclusion

Eager loading reduces the N+1 query problem and improves performance while returning the same data.