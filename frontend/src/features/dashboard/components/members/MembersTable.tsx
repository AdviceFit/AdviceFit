"use client"

import React, { useEffect } from 'react'
import { DataTable } from './data-table'
import { getColumns } from './coulmns'
 

const MembersTable = ({ centers , adviceFitMembers }: { centers : CenterParams[] ,  adviceFitMembers: MembersParams[] }) => {
  return (
    <div className="container py-6 mx-auto">
    <DataTable columns={getColumns(adviceFitMembers , centers)} data={adviceFitMembers} />
  </div>
  )
}

export default MembersTable
