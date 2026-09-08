import React, { useReducer } from 'react';

export interface Course {
  id: string;
  name: string;
  price: number;
}

interface CartState {
  items: Course[];
  discountCode: string;
  discountPercent: number;
}

type CartAction =
  | { type: 'ADD_COURSE'; payload: Course }
  | { type: 'REMOVE_COURSE'; payload: string }
  | { type: 'APPLY_DISCOUNT'; payload: { code: string; percent: number } };

const initialState: CartState = {
  items: [],
  discountCode: '',
  discountPercent: 0,
};

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_COURSE': {
   
      const exists = state.items.some((item) => item.id === action.payload.id);
      if (exists) return state;
      return { ...state, items: [...state.items, action.payload] };
    }
    case 'REMOVE_COURSE':
      return { ...state, items: state.items.filter((item) => item.id !== action.payload) };

    case 'APPLY_DISCOUNT':
      return { ...state, discountCode: action.payload.code, discountPercent: action.payload.percent };

    default:
      return state;
  }
}

export default function CartComponent() {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const totalPrice = state.items.reduce((sum, item) => sum + item.price, 0);
  const finalPrice = totalPrice * (1 - state.discountPercent / 100);

  return (
    <div>
      <h3>Giỏ hàng</h3>
      <button onClick={() => dispatch({ type: 'ADD_COURSE', payload: { id: 'c1', name: 'React TS', price: 500000 } })}>
        Thêm khóa React TS
      </button>
      <ul>
        {state.items.map((item) => (
          <li key={item.id}>
            {item.name} - {item.price.toLocaleString()} VND 
            <button onClick={() => dispatch({ type: 'REMOVE_COURSE', payload: item.id })}>Xóa</button>
          </li>
        ))}
      </ul>
      <p>Tổng tiền: {finalPrice.toLocaleString()} VND (Giảm {state.discountPercent}%)</p>
    </div>
  );
}