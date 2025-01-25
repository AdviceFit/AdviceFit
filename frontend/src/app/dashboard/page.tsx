import Header from '@/components/ui/header';
import Sidebar from '@/components/ui/sidebar';

const DashboardRoute: React.FC = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-grow">
        <Sidebar />
        <section className='py-8 w-full lg:w-2/3 mx-auto flex-grow flex flex-col items-center justify-center'>
          <h2 className='mb-4'>Dashboard !!</h2>
        </section>
      </div>
    </div>
  );
};

export default DashboardRoute;
