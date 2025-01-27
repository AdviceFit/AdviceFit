import React from 'react'
import { DataTable } from './data-table'
import { columns } from './coulmns'
 

const MembersTable = ({adviceFitMembers}: {adviceFitMembers: MembersParams[]}) => {
  return (
    <div className="container mx-auto py-10">
    <DataTable columns={columns} data={adviceFitMembers} />
  </div>
  )
}

export default MembersTable
