import { getSubscriptions } from "../actions/subscriptions.action";
import SubscriptionsHeader from "../components/subscriptions/SubscriptionsHeader";
import SubscriptionsTable from "../components/subscriptions/SubscriptionsTable";

const SubscriptionsMain = async () => {
  const adviceFitSubscriptions = await getSubscriptions();
  return (
    <>
      <SubscriptionsHeader />
      <SubscriptionsTable
        adviceFitSubscriptions={adviceFitSubscriptions?.subscriptions ?? []}
      />
    </>
  );
};

export default SubscriptionsMain;
