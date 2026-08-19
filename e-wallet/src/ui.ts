import type { AppState, Category } from './types';
import { getTotalBalance, getMonthlyStats, getFilteredTransactions } from './transaction';
import { getCategorySpent } from './category';

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
}

export function renderAppUI(
  state: AppState,
  onDeleteTx: (id: string) => void,
  onEditCat: (cat: Category) => void,
  onDeleteCat: (id: string) => void
): void {
  renderDashboard(state);
  renderAlerts(state);
  renderCategoryDropdown(state.categories);
  renderCategoryList(state, onEditCat, onDeleteCat);
  renderTransactionHistory(state, onDeleteTx);
  renderMonthlySummary(state);
}

function renderDashboard(state: AppState): void {
  const totalBalance = getTotalBalance(state.transactions);
  const { income, expense } = getMonthlyStats(state.transactions, state.selectedMonth);

  const balanceEl = document.getElementById('total-balance')!;
  balanceEl.textContent = formatCurrency(totalBalance);
  balanceEl.className = `amount ${totalBalance >= 0 ? 'positive' : 'negative'}`;

  document.getElementById('total-income')!.textContent = `+${formatCurrency(income)}`;
  document.getElementById('total-expense')!.textContent = `-${formatCurrency(expense)}`;

  const totalBudget = state.categories.reduce((sum, cat) => sum + cat.limit, 0);
  const progressBar = document.getElementById('budget-progress-bar') as HTMLElement;
  const budgetStatus = document.getElementById('budget-status')!;

  if (totalBudget > 0) {
    const percentage = Math.min(Math.round((expense / totalBudget) * 100), 100);
    progressBar.style.width = `${percentage}%`;

    if (expense > totalBudget) {
      progressBar.classList.add('over');
      budgetStatus.innerHTML = `<span class="negative"> Vượt ngân sách tổng! (${formatCurrency(expense)} / ${formatCurrency(totalBudget)})</span>`;
    } else {
      progressBar.classList.remove('over');
      budgetStatus.innerHTML = `<span class="positive">Đạt (${percentage}%) - ${formatCurrency(expense)} / ${formatCurrency(totalBudget)}</span>`;
    }
  } else {
    progressBar.style.width = '0%';
    budgetStatus.textContent = 'Chưa thiết lập hạn mức tổng.';
  }
}

function renderAlerts(state: AppState): void {
  const container = document.getElementById('alerts-container')!;
  container.innerHTML = '';

  state.categories.forEach(cat => {
    if (cat.limit > 0) {
      const spent = getCategorySpent(cat.id, state.transactions, state.selectedMonth);
      if (spent > cat.limit) {
        const alertDiv = document.createElement('div');
        alertDiv.className = 'alert';
        alertDiv.innerHTML = ` <strong>Cảnh báo:</strong> Danh mục <strong>${cat.name}</strong> trong tháng ${state.selectedMonth} đã chi vượt hạn mức! (${formatCurrency(spent)} / ${formatCurrency(cat.limit)})`;
        container.appendChild(alertDiv);
      }
    }
  });
}

function renderCategoryDropdown(categories: Category[]): void {
  const select = document.getElementById('trans-category') as HTMLSelectElement;
  select.innerHTML = categories.map(c => `<option value="${c.id}">${c.name}</option>`).join('');
}

function renderCategoryList(
  state: AppState,
  onEditCat: (cat: Category) => void,
  onDeleteCat: (id: string) => void
): void {
  const list = document.getElementById('category-list')!;
  list.innerHTML = '';

  state.categories.forEach(cat => {
    const spent = getCategorySpent(cat.id, state.transactions, state.selectedMonth);
    const li = document.createElement('li');
    li.className = 'category-item';

    const limitInfo = cat.limit > 0 ? `Hạn mức: ${formatCurrency(cat.limit)} (Đã chi: ${formatCurrency(spent)})` : 'Không hạn mức';
    const isOver = cat.limit > 0 && spent > cat.limit;

    li.innerHTML = `
      <div class="category-info">
        <strong>${cat.name}</strong>
        <div class="limit-text ${isOver ? 'negative' : ''}">${limitInfo}</div>
      </div>
      <div>
        <button class="btn-edit-sm">Sửa</button>
        <button class="btn-danger-sm">Xóa</button>
      </div>
    `;

    li.querySelector('.btn-edit-sm')?.addEventListener('click', () => onEditCat(cat));
    li.querySelector('.btn-danger-sm')?.addEventListener('click', () => onDeleteCat(cat.id));

    list.appendChild(li);
  });
}

function renderTransactionHistory(state: AppState, onDeleteTx: (id: string) => void): void {
  const tbody = document.getElementById('transaction-history')!;
  tbody.innerHTML = '';

  const monthlyTransactions = getFilteredTransactions(state.transactions, state.selectedMonth);

  if (monthlyTransactions.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" style="text-align:center; color: #888;">Không có giao dịch trong tháng này.</td></tr>`;
    return;
  }

  monthlyTransactions.forEach(tx => {
    const cat = state.categories.find(c => c.id === tx.categoryId);
    const tr = document.createElement('tr');

    tr.innerHTML = `
      <td>${tx.date}</td>
      <td>${cat ? cat.name : 'Khác'}</td>
      <td>${tx.note || '-'}</td>
      <td class="${tx.type === 'income' ? 'positive' : 'negative'} font-weight-bold">
        ${tx.type === 'income' ? '+' : '-'}${formatCurrency(tx.amount)}
      </td>
      <td><button class="btn-danger-sm">Xóa</button></td>
    `;

    tr.querySelector('.btn-danger-sm')?.addEventListener('click', () => onDeleteTx(tx.id));
    tbody.appendChild(tr);
  });
}

function renderMonthlySummary(state: AppState): void {
  const tbody = document.getElementById('monthly-summary')!;
  tbody.innerHTML = '';

  const months = Array.from(new Set(state.transactions.map(tx => tx.date.slice(0, 7)))).sort().reverse();

  if (months.length === 0) {
    tbody.innerHTML = `<tr><td colspan="4" style="text-align:center;">Chưa có dữ liệu</td></tr>`;
    return;
  }

  months.forEach(m => {
    const { income, expense } = getMonthlyStats(state.transactions, m);
    const balance = income - expense;
    const tr = document.createElement('tr');

    tr.innerHTML = `
      <td><strong>${m}</strong></td>
      <td class="positive">+${formatCurrency(income)}</td>
      <td class="negative">-${formatCurrency(expense)}</td>
      <td class="${balance >= 0 ? 'positive' : 'negative'}"><strong>${formatCurrency(balance)}</strong></td>
    `;
    tbody.appendChild(tr);
  });
}