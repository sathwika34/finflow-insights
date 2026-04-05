export interface Transaction {
  id: string;
  date: string;
  title: string;
  category: string;
  amount: number;
  type: 'income' | 'expense';
  status: 'completed' | 'pending';
}

export const defaultTransactions: Transaction[] = [
  { id: '1', date: '2026-04-01', title: 'Salary Credit', category: 'Income', amount: 50000, type: 'income', status: 'completed' },
  { id: '2', date: '2026-04-02', title: 'Swiggy Order', category: 'Food', amount: 420, type: 'expense', status: 'completed' },
  { id: '3', date: '2026-04-03', title: 'Electricity Bill', category: 'Bills', amount: 2100, type: 'expense', status: 'pending' },
  { id: '4', date: '2026-04-04', title: 'Amazon Shopping', category: 'Shopping', amount: 1999, type: 'expense', status: 'completed' },
  { id: '5', date: '2026-04-05', title: 'Freelance Payment', category: 'Income', amount: 25000, type: 'income', status: 'completed' },
  { id: '6', date: '2026-04-06', title: 'Netflix Subscription', category: 'Entertainment', amount: 649, type: 'expense', status: 'completed' },
  { id: '7', date: '2026-04-07', title: 'Uber Ride', category: 'Travel', amount: 350, type: 'expense', status: 'completed' },
  { id: '8', date: '2026-04-08', title: 'Grocery Store', category: 'Food', amount: 2800, type: 'expense', status: 'completed' },
  { id: '9', date: '2026-04-09', title: 'Mobile Recharge', category: 'Bills', amount: 599, type: 'expense', status: 'completed' },
  { id: '10', date: '2026-04-10', title: 'Zara Purchase', category: 'Shopping', amount: 4500, type: 'expense', status: 'completed' },
  { id: '11', date: '2026-04-11', title: 'Restaurant Dinner', category: 'Food', amount: 1800, type: 'expense', status: 'completed' },
  { id: '12', date: '2026-04-12', title: 'Train Ticket', category: 'Travel', amount: 1200, type: 'expense', status: 'pending' },
  { id: '13', date: '2026-04-13', title: 'Movie Tickets', category: 'Entertainment', amount: 500, type: 'expense', status: 'completed' },
  { id: '14', date: '2026-04-14', title: 'Water Bill', category: 'Bills', amount: 450, type: 'expense', status: 'completed' },
  { id: '15', date: '2026-04-15', title: 'Cafe Coffee', category: 'Food', amount: 280, type: 'expense', status: 'completed' },
];

export const balanceTrendData = [
  { month: 'Jan', balance: 40000 },
  { month: 'Feb', balance: 52000 },
  { month: 'Mar', balance: 48000 },
  { month: 'Apr', balance: 70000 },
  { month: 'May', balance: 85000 },
  { month: 'Jun', balance: 124500 },
];

export const expenseBreakdownData = [
  { name: 'Food', value: 12000, color: '#3B82F6' },
  { name: 'Shopping', value: 9000, color: '#06B6D4' },
  { name: 'Bills', value: 6000, color: '#F59E0B' },
  { name: 'Travel', value: 3500, color: '#EF4444' },
  { name: 'Entertainment', value: 1500, color: '#22C55E' },
];

export const categories = ['Income', 'Food', 'Shopping', 'Bills', 'Travel', 'Entertainment'];
