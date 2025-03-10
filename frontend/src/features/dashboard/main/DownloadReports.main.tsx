import { getCenters } from "../actions/centers.action";
import DownloadReports from "../components/downloadReports/DownloadReports";

const DownloadReportsMain = async () => {
  const { centers } = await getCenters();
  return (
    <>
      <DownloadReports centers={centers} />
    </>
  );
};

export default DownloadReportsMain;
