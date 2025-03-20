import { cookies } from "next/headers";
import gymImage from "../../../public/gym-image.jpg";
import { redirect } from "next/navigation";

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  const cookie = await cookies();
  if (cookie.get("authToken")) {
    redirect("/dashboard/attendance");
  }
  return (
    <main className="wrapper grid grid-cols-2">
      <div
        className="w-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${gymImage.src})` }}
      />
      <div>{children}</div>
    </main>
  );
};

export default AuthLayout;
