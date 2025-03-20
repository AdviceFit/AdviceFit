import { getPackages } from "../actions/packages.action";
import PackageHeader from "../components/packages/PackageHeader";
import PackagesTable from "../components/packages/PackageTable";

const PackagesMain = async () => {
  const centerId = "";
  const adviceFitPackages = await getPackages(centerId);
  return (
    <>
      <PackageHeader />
      <PackagesTable adviceFitPackages={adviceFitPackages?.packages ?? []} />
    </>
  );
};

export default PackagesMain;
