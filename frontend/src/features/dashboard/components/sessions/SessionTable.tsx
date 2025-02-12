import React from 'react'
import { DataTable } from './data-table'
import { columns } from './coulmns'
 

const SessionTable = ({adviceFitSession}: {adviceFitSession: SessionParams[]}) => {  
  return (
    <div className="container mx-auto py-10">
    <DataTable columns={columns} data={adviceFitSession} />
  </div>
  )
}

export default SessionTable
