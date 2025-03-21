import { getPackages } from "../actions/packages.action";
import AlertModal from "../components/packages/alertModal";
import PackageHeader from "../components/packages/PackageHeader";
import PackagesTable from "../components/packages/PackageTable";

const PackagesMain = async () => {
  const centerId = "";
  const adviceFitPackages = await getPackages(centerId);
  return (
    <>
      <AlertModal />
      <PackageHeader />
      <PackagesTable adviceFitPackages={adviceFitPackages?.packages ?? []} />
    </>
  );
};

export default PackagesMain;
