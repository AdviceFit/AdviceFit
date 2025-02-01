import React from 'react'
import { DataTable } from './data-table'
import { columns } from './coulmns'
 

const EmployeeTable = ({adviceFitEmployee}: {adviceFitEmployee: EmployeeParams[]}) => {  
  return (
    <div className="container mx-auto py-10">
    <DataTable columns={columns} data={adviceFitEmployee} />
  </div>
  )
}

export default EmployeeTable
