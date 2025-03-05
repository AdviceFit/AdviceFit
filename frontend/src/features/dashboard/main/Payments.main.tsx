import { getSubscriptions } from "../actions/subscriptions.action";
import PaymentsHeader from "../components/payments/PaymentsHeader";
import PaymentsTable from "../components/payments/PaymentsTable";

const PaymentsMain = async () => {
  const adviceFitPayments = await getSubscriptions();
  return (
    <>
      <PaymentsHeader />
      <PaymentsTable
        adviceFitPayments={adviceFitPayments?.subscriptions ?? []}
      />
    </>
  );
};

export default PaymentsMain;
