
import { getPackages } from '../actions/packages.action';
import PackageHeader from '../components/packages/PackageHeader';
import PackagesTable from '../components/packages/PackageTable';


const PackagesMain = async () => {
  const adviceFitPackages = await getPackages();    
  return (
    <>
      <PackageHeader />
      <PackagesTable adviceFitPackages={adviceFitPackages?.package ?? []} />
    </>
  )
}

export default PackagesMain
