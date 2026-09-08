import React, { useState, useMemo, useCallback } from 'react';

interface Student {
  id: number;
  name: string;
}


const initialStudents: Student[] = Array.from({ length: 5000 }, (_, i) => ({
  id: i + 1,
  name: `Học viên ${i + 1}`,
}));

export default function StudentDashboard() {
  const [query, setQuery] = useState('');
  const [isChecked, setIsChecked] = useState(false); 


  const filteredStudents = useMemo(() => {
    console.log('--- Đang tính toán lọc 5.000 học viên ---');
    return initialStudents.filter((s) => s.name.toLowerCase().includes(query.toLowerCase()));
  }, [query]);

  
  const handleRemove = useCallback((id: number) => {
    console.log('Xóa học viên ID:', id);
  }, []);

  return (
    <div>
      <button onClick={() => setIsChecked(!isChecked)}>
        Đánh dấu kiểm tra: {isChecked ? 'ĐÃ CHECK' : 'CHƯA CHECK'}
      </button>

      <br /><br />

      <input
        type="text"
        placeholder="Tìm học viên..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <p>Số lượng tìm thấy: {filteredStudents.length}</p>
    </div>
  );
}