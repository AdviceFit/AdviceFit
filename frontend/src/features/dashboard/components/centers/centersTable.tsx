"use client"
import React from 'react';
import { DataTable } from './data-table';
import { columns } from './columns';

const CentersTable = ({ adviceFitCenters }: { adviceFitCenters: CenterParams[] }) => {
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={adviceFitCenters} />
    </div>
  );
};

export default CentersTable;

