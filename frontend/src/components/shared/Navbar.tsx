"use client";

import Link from "next/link";
import APP_ROUTES from "@/constants/routes";
import { buttonVariants } from "../ui/button";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("user");
      if (user) {
        setIsLoggedIn(true); 
      } else {
        setIsLoggedIn(false); 
      }
    }
  }, []);

  return (
    <nav className="h-[4rem] center">
      <div className="box flex justify-end items-center gap-4 text-gray-800">
        {!isLoggedIn ? (
          <>
            <Link
              className={buttonVariants({ variant: "outline" })}
              href={APP_ROUTES.sign_in}
            >
              Sign in
            </Link>
            <Link
              className={buttonVariants({ variant: "outline" })}
              href={APP_ROUTES.sign_up}
            >
              Sign up
            </Link>
          </>
        ) : (
          <Link
            className={buttonVariants({ variant: "outline" })}
            href={APP_ROUTES.dashboard.attendance}
          >
            Dashboard
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
