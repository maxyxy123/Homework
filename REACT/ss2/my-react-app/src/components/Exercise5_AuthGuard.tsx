import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

interface ProtectedRouteProps {
  isAuthenticated: boolean;
  children: React.ReactNode;
}

// Wrapper Component bảo vệ route
export const ProtectedRoute = ({ isAuthenticated, children }: ProtectedRouteProps) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

export const LoginPage = ({ onLogin }: { onLogin: () => void }) => {
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    onLogin();
    // Bẫy dữ liệu: dùng replace: true để xóa /login khỏi history stack
    navigate('/virtual-classroom', { replace: true });
  };

  return (
    <div>
      <h2>Trang Đăng Nhập</h2>
      <button onClick={handleLoginSuccess}>Đăng nhập ngay</button>
    </div>
  );
};