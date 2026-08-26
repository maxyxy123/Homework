import React from 'react';
import { useSearchParams } from 'react-router-dom';

export default function CourseSearch() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchKeyword = searchParams.get('search') || '';

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.trim() !== '') {
      setSearchParams({ search: value });
    } else {
      // Bẫy dữ liệu: Xóa sạch query string khi input rỗng
      searchParams.delete('search');
      setSearchParams(searchParams);
    }
  };

  return (
    <div>
      <h3>Tìm kiếm khóa học</h3>
      <input
        type="text"
        value={searchKeyword}
        onChange={handleSearchChange}
        placeholder="Nhập từ khóa..."
      />
      <p>Từ khóa hiện tại trên URL: <strong>{searchKeyword || '(Trống)'}</strong></p>
    </div>
  );
}