import type { Transaction, TransactionType } from './types';

export function addTransaction(
  transactions: Transaction[],
  amount: number,
  categoryId: string,
  type: TransactionType,
  note: string,
  date: string
): Transaction[] {
  const newTx: Transaction = {
    id: `tx-${Date.now()}`, //uuid 
    amount: Math.abs(amount),
    categoryId,
    type,
    note: note.trim(),
    date,
  };
  return [newTx, ...transactions];
}

export function deleteTransaction(transactions: Transaction[], id: string): Transaction[] {
  return transactions.filter(tx => tx.id !== id);
}

export function getFilteredTransactions(transactions: Transaction[], month: string): Transaction[] {
    console.log(month);
    
  return transactions
    .filter(tx => tx.date.startsWith(month))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getMonthlyStats(transactions: Transaction[], month: string) {
  const monthlyTx = transactions.filter(tx => tx.date.startsWith(month));
  const income = monthlyTx.filter(tx => tx.type === 'income').reduce((sum, tx) => sum + tx.amount, 0);
  const expense = monthlyTx.filter(tx => tx.type === 'expense').reduce((sum, tx) => sum + tx.amount, 0);
  return { income, expense };
}

export function getTotalBalance(transactions: Transaction[]): number {
  return transactions.reduce((balance, tx) => {
    return tx.type === 'income' ? balance + tx.amount : balance - tx.amount;
  }, 0);
}