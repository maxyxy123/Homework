import type { Category, Transaction } from './types';

export function addCategory(categories: Category[], name: string, limit: number): Category[] {
  const newCategory: Category = {
    id: `cat-${Date.now()}`,
    name: name.trim(),
    limit: limit >= 0 ? limit : 0,
  };
  return [...categories, newCategory];
}

export function updateCategory(categories: Category[], id: string, name: string, limit: number): Category[] {
  return categories.map(cat =>
    cat.id === id ? { ...cat, name: name.trim(), limit: limit >= 0 ? limit : 0 } : cat
  );
}

export function deleteCategory(
  categories: Category[],
  transactions: Transaction[],
  id: string
): { updatedCategories: Category[]; success: boolean; message?: string } {
  const isLinked = transactions.some(tx => tx.categoryId === id);
  if (isLinked) {
    return {
      updatedCategories: categories,
      success: false,
      message: 'Không thể xóa danh mục đã có giao dịch liên kết!',
    };
  }

  return {
    updatedCategories: categories.filter(cat => cat.id !== id),
    success: true,
  };
}

export function getCategorySpent(
  categoryId: string,
  transactions: Transaction[],
  selectedMonth: string
): number {
  return transactions
    .filter(tx => tx.categoryId === categoryId && tx.type === 'expense' && tx.date.startsWith(selectedMonth))
    .reduce((sum, tx) => sum + tx.amount, 0);
}