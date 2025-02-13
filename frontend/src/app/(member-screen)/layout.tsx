import MemberNavbar from "@/features/personal-details/components/MemberNavbar";

const MemberScreenLayout = ({
  elements,
  sidebar,
}: {
  elements: React.ReactNode;
  sidebar: React.ReactNode;
}) => {
  return (
    <main className="h-screen">
      <MemberNavbar />
      <div className="h-[calc(100vh-4rem)] grid grid-cols-12">
        <section className="col-span-1 md:col-span-2"></section>
        <section className="col-span-2">{sidebar}</section>
        <section className="col-span-8 md:col-span-6 p-4 flex flex-col justify-center items-start">
          {elements}
        </section>
        <section className="col-span-1 md:col-span-2"></section>
      </div>
    </main>
  );
};

export default MemberScreenLayout;
