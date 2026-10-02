import React, { useState } from 'react';

function SmartCounter() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount((currentCount) => currentCount + 1);
  };

  const decrement = () => {
    setCount((currentCount) =>
      Math.max(0, currentCount - 1),
    );
  };

  const reset = () => {
    setCount(0);
  };

  return (
    <div>
      <h2 data-testid="count">{count}</h2>

      <button
        data-testid="increment"
        onClick={increment}
      >
        Tăng
      </button>

      <button
        data-testid="decrement"
        onClick={decrement}
      >
        Giảm
      </button>

      <button
        data-testid="reset"
        onClick={reset}
      >
        Reset
      </button>
    </div>
  );
}

export default SmartCounter;