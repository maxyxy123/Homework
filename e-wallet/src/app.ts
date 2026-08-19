
import './style.css'; 
import type { AppState, Category } from './types';
import { loadState, saveState } from './storage';
import { addCategory, updateCategory, deleteCategory } from './category';
import { addTransaction, deleteTransaction } from './transaction';
import { renderAppUI } from './ui';

let state: AppState = loadState();
//lay trang thai state tu local storage

function initApp(): void {
  initDefaultInputs();
  bindEvents();
  render();
}

function initDefaultInputs(): void {
  const monthPicker = document.getElementById('month-picker') as HTMLInputElement;
  if (monthPicker) {
    monthPicker.value = state.selectedMonth;
  }

  const dateInput = document.getElementById('trans-date') as HTMLInputElement;
  if (dateInput) {
    dateInput.value = new Date().toISOString().slice(0, 10);
  }
}

function bindEvents(): void {
  // Thay đổi tháng chọn (F04)
  const monthPicker = document.getElementById('month-picker') as HTMLInputElement;
  monthPicker.addEventListener('change', (e) => {
    state.selectedMonth = (e.target as HTMLInputElement).value;
    persistAndRender();
  });

  // Submit Form Giao dịch (F03)
  const transForm = document.getElementById('transaction-form') as HTMLFormElement;
  transForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const amountInput = document.getElementById('trans-amount') as HTMLInputElement;
    const catSelect = document.getElementById('trans-category') as HTMLSelectElement;
    const dateInput = document.getElementById('trans-date') as HTMLInputElement;
    const noteInput = document.getElementById('trans-note') as HTMLInputElement;
    const typeRadio = document.querySelector('input[name="type"]:checked') as HTMLInputElement;

    const amount = parseFloat(amountInput.value);
    if (isNaN(amount) || amount <= 0) {
      alert('Vui lòng nhập số tiền lớn hơn 0!');
      return;
    }

    state.transactions = addTransaction(
      state.transactions,
      amount,
      catSelect.value,
      typeRadio.value as 'income' | 'expense',
      noteInput.value,
      dateInput.value
    );

    amountInput.value = '';
    noteInput.value = '';
    persistAndRender();
  });

  // Submit Form Danh mục (F02)
  const catForm = document.getElementById('category-form') as HTMLFormElement;
  catForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const idInput = document.getElementById('cat-id') as HTMLInputElement;
    const nameInput = document.getElementById('cat-name') as HTMLInputElement;
    const limitInput = document.getElementById('cat-limit') as HTMLInputElement;

    const limit = parseFloat(limitInput.value) || 0;

    if (idInput.value) {
        console.log(idInput.value);
        
      state.categories = updateCategory(state.categories, idInput.value, nameInput.value, limit);
    } else {
      state.categories = addCategory(state.categories, nameInput.value, limit);
    }

    resetCategoryForm();
    persistAndRender();
  });

  document.getElementById('cat-cancel-btn')?.addEventListener('click', resetCategoryForm);
}

function resetCategoryForm(): void {
  (document.getElementById('cat-id') as HTMLInputElement).value = '';
  (document.getElementById('cat-name') as HTMLInputElement).value = '';
  (document.getElementById('cat-limit') as HTMLInputElement).value = '';
  (document.getElementById('cat-submit-btn') as HTMLButtonElement).textContent = 'Thêm Danh Mục';
  (document.getElementById('cat-cancel-btn') as HTMLElement).style.display = 'none';
}   

function handleEditCategory(cat: Category): void {
  (document.getElementById('cat-id') as HTMLInputElement).value = cat.id;
  (document.getElementById('cat-name') as HTMLInputElement).value = cat.name;
  (document.getElementById('cat-limit') as HTMLInputElement).value = cat.limit.toString();
  (document.getElementById('cat-submit-btn') as HTMLButtonElement).textContent = 'Cập nhật';
  (document.getElementById('cat-cancel-btn') as HTMLElement).style.display = 'inline-block';
}

function handleDeleteCategory(id: string): void {
  if (confirm('Bạn chắc chắn muốn xóa danh mục này?')) {
    const result = deleteCategory(state.categories, state.transactions, id);
    if (!result.success) {
      alert(result.message);
    } else {
      state.categories = result.updatedCategories;
      persistAndRender();
    }
  }
}

function handleDeleteTransaction(id: string): void {
  if (confirm('Bạn chắc chắn muốn xóa giao dịch này?')) {
    state.transactions = deleteTransaction(state.transactions, id);
    persistAndRender();
  }
}

function  persistAndRender(): void {
  saveState(state);
  render();
}

function render(): void {
  renderAppUI(
    state,
    handleDeleteTransaction,
    handleEditCategory,
    handleDeleteCategory
  );
}

//App run zzz
initApp();