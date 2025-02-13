import React from 'react'
import { DataTable } from './data-table'
import { columns } from './coulmns'
 

const ExpenseTable = ({adviceFitExpense}: {adviceFitExpense: ExpenseParams[]}) => {  
  return (
    <div className="container mx-auto py-10">
    <DataTable columns={columns} data={adviceFitExpense} />
  </div>
  )
}

export default ExpenseTable
