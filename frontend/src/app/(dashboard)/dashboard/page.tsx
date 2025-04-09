import React from "react";
import DashboardNavbar from "@/features/dashboard/components/DashboardNavbar";
import SidebarLinks from "@/features/dashboard/components/SidebarLinks";
import DashboardMain from "@/features/dashboard/main/Dashboard.main";

const DashboardRoute = () => {
  return (
    <main className="h-screen flex flex-col max-w-[1920px] mx-auto">
      {/* Navbar */}
      <DashboardNavbar />

      {/* Main Layout */}
      <div className="h-[calc(100vh-4rem)] grid grid-cols-12 overflow-hidden">
        {/* Sidebar with independent scrolling */}
        <section className="col-span-2 h-full overflow-y-auto border-r">
          <SidebarLinks />
        </section>

        {/* Content area with independent scrolling */}
        <section className="col-span-10 h-full overflow-y-auto flex flex-col">
          <DashboardMain />
        </section>
      </div>
    </main>
  );
};

export default DashboardRoute;
