
import Link from 'next/link'

const DashboardRoute = () => {
  return (
    <section className='py-8 w-full lg:w-2/3 mx-auto h-screen flex flex-col items-center justify-center'>
        <h2 className='mb-4'>Dashboard !!</h2>
      <Link href="/">
      <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold bg-blue-100 transition">
          Go to Home
        </button>
      </Link>
    </section>
  )
}

export default DashboardRoute
