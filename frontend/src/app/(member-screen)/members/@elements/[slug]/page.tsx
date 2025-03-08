import APP_ROUTES from "@/constants/routes";
import PersonalDetails from "@/features/personal-details/main/PersonalDetails.main";

import { redirect } from "next/navigation";

const MemberScreenElementsRoute = async function ({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const slug = (await params).slug
  
  if (!APP_ROUTES.allowRoutes.includes(slug)) {
    redirect(APP_ROUTES.memberScreen.personalDetails)
  }

  switch (slug) {
    case "personal-details":
      return <PersonalDetails />
    default:
      break;
  }
}

export default MemberScreenElementsRoute;