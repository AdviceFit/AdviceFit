import APP_ROUTES from "@/constants/routes";
import AttendanceMain from "@/features/dashboard/main/Attendance.main";
import CentersMain from "@/features/dashboard/main/Centers.main";
import EmployeeMain from "@/features/dashboard/main/Employee.main";
import ExpensesMain from "@/features/dashboard/main/Expenses.main";
import MembersMain from "@/features/dashboard/main/Members.main";
import MessagesMain from "@/features/dashboard/main/Messages.main";
import PackagesMain from "@/features/dashboard/main/Packages.main";
import PaymentsMain from "@/features/dashboard/main/Payments.main";
import ReportsMain from "@/features/dashboard/main/Reports.main";
import SendEmailMain from "@/features/dashboard/main/Email.main";
import SessionsMain from "@/features/dashboard/main/Sessions.main";
import SetupMain from "@/features/dashboard/main/Setup.main";
import SubscriptionsMain from "@/features/dashboard/main/Subscriptions.main";
import VisitorsMain from "@/features/dashboard/main/Visitors.main";
import { redirect } from "next/navigation";
import MessageHistoryMain from "@/features/dashboard/main/MessegesHistory.main";

const DashboardElementsRoute = async function ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;

  if (!APP_ROUTES.allowRoutes.includes(slug)) {
    redirect(APP_ROUTES.dasboard.attendance);
  }

  switch (slug) {
    case "attendance":
      return <AttendanceMain />;
    case "centers":
      return <CentersMain />;
    case "members":
      return <MembersMain />;
    case "visitors":
      return <VisitorsMain />;
    case "reports":
      return <ReportsMain />;
    case "subscriptions":
      return <SubscriptionsMain />;
    case "payments":
      return <PaymentsMain />;
    case "sessions":
      return <SessionsMain />;
    case "expenses":
      return <ExpensesMain />;
    case "send-bulk-message":
      return <MessagesMain />;
    case "send-bulk-emails":
      return <SendEmailMain />;
    case "message-history":
      return <MessageHistoryMain />;
    case "setup":
      return <SetupMain />;
    case "employees":
      return <EmployeeMain />;
    case "packages":
      return <PackagesMain />;
    default:
      break;
  }
};

export default DashboardElementsRoute;
