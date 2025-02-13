import { getExpenses } from '../actions/expenses.action';
import ExpenseHeader from '../components/expenses/ExpenseHeader';
import ExpenseTable from '../components/expenses/ExpenseTable';

const ExpensesMain = async () => {
  const adviceFitExpense = await getExpenses();        
  return (
    <>
      <ExpenseHeader />
      <ExpenseTable adviceFitExpense={adviceFitExpense?.expense ?? []} />
    </>	
  )
}

export default ExpensesMain;