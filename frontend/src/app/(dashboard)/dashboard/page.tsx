import { redirect } from "next/navigation";

const HomepageRoute = () => {
  // Redirecting to the attendance page
  redirect("/dashboard/attendance");
};

export default HomepageRoute;
