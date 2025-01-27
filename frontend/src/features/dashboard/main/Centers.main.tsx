
import { cookies } from 'next/headers'
import CentersHeader from '../components/centers/CentersHeader';
import CentersTable from '../components/centers/centersTable';


const getCenters = async (): Promise<CentersDataParams> => {
  const cookieStore = await cookies();
  const token = cookieStore.get("authToken");  
  const res = await fetch("http://localhost:5000/center", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token?.value}`,
    },
    cache: "no-cache",
  });  
  const centers: CentersDataParams = await res.json();
  return centers;
};

const CentersMain = async () => {

  const adviceFitCenters = await getCenters();  

  return (
    <>
      <CentersHeader />
      <CentersTable adviceFitCenters={adviceFitCenters?.centers} />
    </>
  )
}

export default CentersMain
