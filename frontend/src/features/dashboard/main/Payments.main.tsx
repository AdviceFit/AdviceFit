import { getPayments } from "../actions/payments.action";
import PaymentsHeader from "../components/payments/PaymentsHeader";
import PaymentsTable from "../components/payments/PaymentsTable";

const PaymentsMain = async () => {
  const adviceFitPayments = await getPayments();
  return (
    <>
      <PaymentsHeader />
      <PaymentsTable adviceFitPayments={adviceFitPayments?.payments ?? []} />
    </>
  );
};

export default PaymentsMain;
