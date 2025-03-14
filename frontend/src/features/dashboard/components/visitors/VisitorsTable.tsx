"use client"

import React from 'react'
import { DataTable } from './data-table'
import { columns } from './coulmns'
 

const VisitorsTable = ({adviceFitVisitors}: {adviceFitVisitors: VisitorParams[]}) => {
  return (
    <div className="container mx-auto py-10">
    <DataTable columns={columns} data={adviceFitVisitors} />
  </div>
  )
}

export default VisitorsTable
