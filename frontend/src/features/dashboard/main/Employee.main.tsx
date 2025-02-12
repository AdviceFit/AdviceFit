
import { getEmployees } from '../actions/employee.action';
import EmployeeHeader from '../components/employee/EmployeeHeader';
import EmployeeTable from '../components/employee/EmployeeTable';


const EmployeeMain = async () => {
  const adviceFitEmployee = await getEmployees();  
  return (
    <>
      <EmployeeHeader />
      <EmployeeTable adviceFitEmployee={adviceFitEmployee?.employees ?? []} />
    </>
  )
}

export default EmployeeMain
