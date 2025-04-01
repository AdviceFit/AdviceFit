import { getCenters } from "../actions/centers.action";
import Dashboard from "../components/dashboard/Dashboard";

const DashboardMain = async () => {
  const { centers } = await getCenters();
  return (
    <>
      <Dashboard centers={centers} />
    </>
  );
};

export default DashboardMain;
