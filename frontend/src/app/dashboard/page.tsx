import Header from '@/components/ui/header';
import Sidebar from '@/components/ui/sidebar';
import Link from 'next/link';

const DashboardRoute: React.FC = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-grow">
        <Sidebar />
        <section className='py-8 w-full lg:w-2/3 mx-auto flex-grow flex flex-col items-center justify-center'>
          <h2 className='mb-4'>Dashboard !!</h2>
          <Link href="/">
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold bg-blue-100 transition">
              Go to Home
            </button>
          </Link>
        </section>
      </div>
    </div>
  );
};

export default DashboardRoute;
