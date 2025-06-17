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
import MessageHistoryMain from "@/features/dashboard/main/MessegesHistory.main";
import LoginHistoryMain from "@/features/dashboard/main/LoginHistory.main";
import DownloadReportsMain from "@/features/dashboard/main/DownloadReports.main";

import AddAndEditMembers from "@/features/dashboard/components/members/AddAndEditMembers";
import AddAndEditVisitors from "@/features/dashboard/components/visitors/AddAndEditVisitors";
import AddAndEditCenters from "@/features/dashboard/components/centers/AddAndEditCenters";
import AddAndEditPackage from "@/features/dashboard/components/packages/AddAndEditPackage";
import AddAndEditEmployee from "@/features/dashboard/components/employee/AddAndEditEmployee";

import PersonalDetails from "@/features/personal-details/components/PersonalDetailsSectionHeader"; // ✅ Corrected import

import { redirect } from "next/navigation";
import PersonalDetailsSection from "@/features/personal-details/components/personal-details/PersonalDetailsSection";
import MemberNavbar from "@/features/personal-details/components/MemberNavbar";

const DashboardElementsRoute = async function ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;

  if (!APP_ROUTES.allowRoutes.includes(slug)) {
    redirect(APP_ROUTES.dashboardPath);
  }

  switch (slug) {
    case "attendance":
      return <AttendanceMain />;
    case "centers":
      return <CentersMain />;
    case "add-center":
      return <AddAndEditCenters />;
    case "update-center":
      return <AddAndEditCenters />;
    case "members":
      return <MembersMain />;
    case "add-member":
      return <AddAndEditMembers />;
    case "update-member":
      return <AddAndEditMembers />;
    case "visitors":
      return <VisitorsMain />;
    case "add-visitors":
      return <AddAndEditVisitors />;
    case "update-visitor":
      return <AddAndEditVisitors />;
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
    case "add-employee":
      return <AddAndEditEmployee />;
    case "update-employee":
      return <AddAndEditEmployee />;
    case "packages":
      return <PackagesMain />;
    case "add-package":
      return <AddAndEditPackage />;
    case "update-package":
      return <AddAndEditPackage />;
    case "login-reports":
      return <LoginHistoryMain />;
    case "download-reports":
      return <DownloadReportsMain />;
   // ✅ Corrected usage
    default:
      break;
  }
};

export default DashboardElementsRoute;
