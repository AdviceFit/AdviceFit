import React from 'react'
import { DataTable } from './data-table'
import { columns } from './coulmns'
 

const PackagesTable = ({adviceFitPackages}: {adviceFitPackages: PackageParams[]}) => {  
  return (
    <div className="container mx-auto py-10">
    <DataTable columns={columns} data={adviceFitPackages} />
  </div>
  )
}

export default PackagesTable
