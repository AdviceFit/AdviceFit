import { redirect } from "next/navigation";

const HomepageRoute = () => {
  redirect("/dashboard/attendance");
};

export default HomepageRoute;
