import APP_ROUTES from "@/constants/routes";

import { redirect } from "next/navigation";

const DashboardElementsRoute = async function ({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const slug = (await params).slug

  if (!APP_ROUTES.allowRoutes.includes(slug)) {
    redirect(APP_ROUTES.dasboard.attendance)
  }

  switch (slug) {
    case "attendance":
      return <AttendanceMain />
    case "centers":
      return <CentersMain />
    case "members":
      return <MembersMain />
    case "visitors":
      return <VisitorsMain />
    case "reports":
      return <ReportsMain />
    case "sessions":
      return <SessionsMain />
    case "expenses":
      return <ExpensesMain />
    case "message-center":
      return <MessagesMain />
    case "setup":
      return <SetupMain />
    case "employees":
      return <EmployeeMain />
    case "packages":
      return <PackagesMain />
    default:
      break;
  }
}

export default DashboardElementsRoute