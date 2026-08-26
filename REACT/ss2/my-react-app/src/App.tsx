import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { ThemeProvider, Header, MainContent, Footer } from './components/Exercise1_ThemeContext';
import CourseSearch from './components/Exercise2_CourseSearch';
import { useCountdown } from './components/Exercise3_Countdown';
import CartComponent from './components/Exercise4_CartReducer';
import { ProtectedRoute, LoginPage } from './components/Exercise5_AuthGuard';
import StudentDashboard from './components/Exercise6_StudentDashboard';

// Component test riêng cho Bài 3 (Custom Hook Countdown)
function CountdownDemo() {
  const [timeLeft, { start, pause, reset, isRunning }] = useCountdown(60);
  return (
    <div>
      <h3>Đếm ngược Flash Sale / Bài kiểm tra</h3>
      <h1>{timeLeft}s</h1>
      <p>Trạng thái: {isRunning ? 'Đang chạy' : 'Đã dừng'}</p>
      <button onClick={start}>Start</button>
      <button onClick={pause} style={{ margin: '0 8px' }}>Pause</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState<number>(1);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  return (
    <BrowserRouter>
      <ThemeProvider>
        <div style={{ padding: '16px', fontFamily: 'sans-serif' }}>
          <h2>Tổng hợp Bài tập React Nâng cao</h2>

          {/* Thanh chuyển bài tập */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <button
                key={num}
                onClick={() => setActiveTab(num)}
                style={{
                  padding: '8px 14px',
                  backgroundColor: activeTab === num ? '#007bff' : '#e0e0e0',
                  color: activeTab === num ? '#fff' : '#000',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Bài {num}
              </button>
            ))}
          </div>

          <hr />

          {/* Nội dung chi tiết từng Bài */}
          <div style={{ marginTop: '20px', minHeight: '300px' }}>
            {activeTab === 1 && (
              <div>
                <Header />
                <MainContent />
                <Footer />
              </div>
            )}

            {activeTab === 2 && <CourseSearch />}

            {activeTab === 3 && <CountdownDemo />}

            {activeTab === 4 && <CartComponent />}

            {activeTab === 5 && (
              <div>
                <div style={{ marginBottom: '12px', background: '#f0f0f0', padding: '8px' }}>
                  <span>Trạng thái: {isAuthenticated ? 'Đã đăng nhập' : 'Chưa đăng nhập'} | </span>
                  {isAuthenticated && <button onClick={() => setIsAuthenticated(false)}>Đăng xuất</button>}
                  <div style={{ marginTop: '8px', display: 'flex', gap: '12px' }}>
                    <Link to="/login">Đến trang Login</Link>
                    <Link to="/virtual-classroom">Đến Phòng học ảo (Bảo vệ)</Link>
                  </div>
                </div>

                <Routes>
                  <Route path="/login" element={<LoginPage onLogin={() => setIsAuthenticated(true)} />} />
                  <Route
                    path="/virtual-classroom"
                    element={
                      <ProtectedRoute isAuthenticated={isAuthenticated}>
                        <div style={{ padding: '12px', background: '#e6ffe6', borderRadius: '4px' }}>
                          <h3>Welcome! Bạn đang ở trong Phòng học ảo độc quyền.</h3>
                        </div>
                      </ProtectedRoute>
                    }
                  />
                  <Route path="*" element={<p>Chọn điều hướng phía trên để kiểm tra Auth Guard.</p>} />
                </Routes>
              </div>
            )}

            {activeTab === 6 && <StudentDashboard />}
          </div>
        </div>
      </ThemeProvider>
    </BrowserRouter>
  );
}