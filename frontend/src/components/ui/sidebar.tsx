import Link from 'next/link';

const Sidebar: React.FC = () => {
  return (
    <aside className="bg-gray-800 text-white w-64 p-6 shadow-lg">
      <ul>
        <li className="mb-2">
          <Link href="/dashboard">Dashboard</Link>
        </li>
        <li className="mb-2">
          <Link href="/members">Members</Link>
        </li>
        <li className="mb-2">
          <Link href="/visitors">Visitors</Link>
        </li>
        <li className="mb-2">
          <Link href="/attendances">Attendance</Link>
        </li>
        <li className="mb-2">
          <Link href="/profile">Session</Link>
        </li>
        <li className="mb-2">
          <Link href="/profile">Reports</Link>
        </li>
        <li className="mb-2">
          <Link href="/profile">Expenses</Link>
        </li>
        <li className="mb-2">
          <Link href="/profile">Message Center</Link>
        </li>
        <li className="mb-2">
          <Link href="/profile">Setup</Link>
        </li>     
           <li className="mb-2">
          <Link href="/centers">Center</Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
