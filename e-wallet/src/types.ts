/**
 * Định nghĩa cấu trúc dữ liệu ứng dụng (Strict TypeScript)
 */

export type TransactionType = 'income' | 'expense';

export interface Category {
  id: string;
  name: string;
  limit: number; // 0 = không đặt hạn mức
}

export interface Transaction {
  id: string;
  amount: number;
  categoryId: string;
  type: TransactionType;
  note: string;
  date: string; // YYYY-MM-DD
}

export interface AppState {
  categories: Category[];
  transactions: Transaction[];
  selectedMonth: string; // YYYY-MM
}