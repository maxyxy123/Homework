import { useState } from "react";

export default function WelcomeBanner() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleClick = () => {
    setIsLoggedIn(!isLoggedIn);
  };
  return (
    <div>
      {isLoggedIn ? (
        <>
          <h1>Chào mừng trở lại</h1>
          <button onClick={handleClick}>click</button>
        </>
      ) : (
        <button onClick={handleClick}>Đăng nhập ngay</button>
      )}
    </div>
  );
}
