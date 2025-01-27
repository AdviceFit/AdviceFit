import APP_ROUTES from "@/constants/routes";
import AttendenceMain from "@/features/dashboard/main/Attendence.main";
import CentersMain from "@/features/dashboard/main/Centers.main";
import ExpensesMain from "@/features/dashboard/main/Expenses.main";
import MembersMain from "@/features/dashboard/main/Members.main";
import MessagesMain from "@/features/dashboard/main/Messages.main";
import ReportsMain from "@/features/dashboard/main/Reports.main";
import SessionsMain from "@/features/dashboard/main/Sessions.main";
import SetupMain from "@/features/dashboard/main/Setup.main";
import VisitorsMain from "@/features/dashboard/main/Visitors.main";
import { redirect } from "next/navigation";

const DashboardElementsRoute = async function ({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const slug = (await params).slug

  if (!APP_ROUTES.allowRoutes.includes(slug)) {
    redirect(APP_ROUTES.dasboard.attendence)
  }

  switch (slug) {
    case "attendence":
      return <AttendenceMain/>
    case "centers":
      return <CentersMain/>
    case "members":
      return <MembersMain/>
    case "visitors":
      return <VisitorsMain/>
    case "reports":
      return <ReportsMain/>
    case "sessions":
      return <SessionsMain/>
    case "expenses":
      return <ExpensesMain/>
    case "message-center":
      return <MessagesMain/>
    case "setup":
      return <SetupMain/>
    default:
      break;
  }
}

export default DashboardElementsRoute