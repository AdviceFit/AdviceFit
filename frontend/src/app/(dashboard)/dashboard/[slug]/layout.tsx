import DashboardNavbar from "@/features/dashboard/components/DashboardNavbar";

const DashboardLayout = ({
  elements,
  sidebar,
}: {
  elements: React.ReactNode;
  sidebar: React.ReactNode;
}) => {
  return (
    <main className="h-screen flex flex-col max-w-[1920px] mx-auto">
      {/* Navbar */}
      <DashboardNavbar />
      {/* Main Layout */}
      <div className="grid grid-cols-12">
        {/* Sidebar with independent scrolling */}
        <section className="col-span-2 h-full overflow-y-auto border-r">{sidebar}</section>
        {/* Content area with independent scrolling */}
        <section className="col-span-10 h-full overflow-y-auto p-6 flex flex-col">
          {elements}
        </section>
      </div>
    </main>
  );
};

export default DashboardLayout;
