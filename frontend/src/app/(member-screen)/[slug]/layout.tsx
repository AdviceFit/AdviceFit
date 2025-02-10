import DashboardNavbar from "@/features/dashboard/components/DashboardNavbar"

const MemberScreenLayout = ({ elements, sidebar }: { elements: React.ReactNode, sidebar: React.ReactNode }) => {
  return (
    <main className="h-screen">
      <DashboardNavbar />
      <div className="h-[calc(100vh-4rem)] grid grid-cols-12">
        <section className="col-span-2">{sidebar}</section>
        <section className="col-span-10 p-4 flex flex-col justify-center items-start">{elements}</section>
        {/* <div>member screen</div> */}
      </div>
    </main>
  )
}

export default MemberScreenLayout
