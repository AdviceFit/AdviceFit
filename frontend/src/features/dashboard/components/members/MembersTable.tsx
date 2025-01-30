import React from 'react'
import { DataTable } from './data-table'
import { columns } from './coulmns'
 

const MembersTable = ({adviceFitMembers}: {adviceFitMembers: MembersParams[]}) => {
  return (
    <div className="container py-6 mx-auto">
    <DataTable columns={columns} data={adviceFitMembers} />
  </div>
  )
}

export default MembersTable
