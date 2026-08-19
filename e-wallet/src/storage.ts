import type { AppState, Category, Transaction } from './types';

const STORAGE_KEY = 'E_WALLET_DATA_STORE_V2';

//seed data neu vao lan dau...
const now = new Date();
const currentMonth = now.toISOString().slice(0, 7); // YYYY-MM
console.log(now.toISOString());

const todayStr = now.toISOString().slice(0, 10); // YYYY-MM-DD

// Tính tháng trước đó
const prevMonthDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
const prevMonth = prevMonthDate.toISOString().slice(0, 7);

const seedCategories: Category[] = [
  { id: 'cat-1', name: 'Ăn uống', limit: 2000000 },
  { id: 'cat-2', name: 'Xăng xe', limit: 500000 },
  { id: 'cat-3', name: 'Mua sắm', limit: 1500000 },
  { id: 'cat-4', name: 'Lương', limit: 0 },
];

const seedTransactions: Transaction[] = [
  // Tháng hiện tại
  { id: 'tx-1', amount: 12000000, categoryId: 'cat-4', type: 'income', note: 'Lương tháng này', date: `${currentMonth}-01` },
  { id: 'tx-2', amount: 150000, categoryId: 'cat-1', type: 'expense', note: 'Ăn nhà hàng', date: todayStr },
  { id: 'tx-3', amount: 300000, categoryId: 'cat-2', type: 'expense', note: 'Đổ xăng ô tô', date: todayStr },
  
  // Tháng trước (để hiện trên Bảng tổng hợp các tháng F05-2)
  { id: 'tx-4', amount: 12000000, categoryId: 'cat-4', type: 'income', note: 'Lương tháng trước', date: `${prevMonth}-01` },
  { id: 'tx-5', amount: 2200000, categoryId: 'cat-1', type: 'expense', note: 'Tiệc tùng tháng trước', date: `${prevMonth}-15` },
];

export function loadState(): AppState {
  const data = localStorage.getItem(STORAGE_KEY);
  console.log(data);
  if (!data) {
    const initialState: AppState = {
      categories: seedCategories,
      transactions: seedTransactions,
      selectedMonth: currentMonth,
    };
    saveState(initialState);
    return initialState;
  }
  
  const parsed = JSON.parse(data); 
  return {
    ...parsed,
    selectedMonth: parsed.selectedMonth || currentMonth,
  };
}

export function saveState(state: AppState): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}