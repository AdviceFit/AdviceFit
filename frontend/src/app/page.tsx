import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-blue-500 to-green-500 text-white">
      {/* Top Navigation */}
      <nav className="flex justify-end p-6 space-x-4">
        <Link href="/sign-in">
          <button className="bg-transparent border border-white px-4 py-2 rounded-lg font-medium hover:bg-white hover:text-blue-600 transition">
            Sign In
          </button>
        </Link>
        <Link href="/sign-up">
          <button className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-100 transition">
            Sign Up
          </button>
        </Link>
      </nav>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center flex-grow text-center">
        <h1 className="text-5xl font-bold mb-4">Welcome to AdviceFit</h1>
        <p className="text-lg mb-8">
          Your personal guide to fitness and self-improvement.
        </p>
        <div className="flex space-x-4">
          <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-100 transition">
            Get Started
          </button>
          <button className="bg-transparent border border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition">
            Learn More
          </button>
        </div>
      </div>
    </div>
    
  );
}
