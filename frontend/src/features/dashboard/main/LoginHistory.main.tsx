import { getLoginHistory } from "../actions/user.action";
import History from "../components/loginHistory/History";

const LoginHistoryMain = async () => {
  const histories = await getLoginHistory();
  return <History histories={histories.history} />;
};

export default LoginHistoryMain;
