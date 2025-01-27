import DashboardNavbar from "@/features/dashboard/components/DashboardNavbar"

const DashboardLayout = ({ elements, sidebar }: { elements: React.ReactNode, sidebar: React.ReactNode }) => {
  return (
    <main className="h-screen">
      <DashboardNavbar />
      <div className="h-[calc(100vh-4rem)] grid grid-cols-12">
        <section className="col-span-2 bg-gray-800 text-white">{sidebar}</section>
        <section className="col-span-10 p-4">{elements}</section>
      </div>
    </main>
  )
}

export default DashboardLayout
