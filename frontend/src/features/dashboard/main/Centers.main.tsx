
import CentersHeader from '../components/centers/CentersHeader';
import CentersTable from '../components/centers/centersTable';
import { getCenters } from '../actions/centers.action';


const CentersMain = async () => {
  const adviceFitCenters = await getCenters();  
  return (
    <>
      <CentersHeader />
      <CentersTable adviceFitCenters={adviceFitCenters?.centers ?? []} />
    </>
  )
}

export default CentersMain
