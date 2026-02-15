'use client';

import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';

export default function UserHeader() {
  const { data: session } = useSession();

  if (!session?.user) return null;

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/login' });
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Left side - Logo and Navigation */}
          <div className="flex items-center space-x-6">
            <Link href="/admin/programs" className="text-xl font-bold text-purple-600">
              TRC Academy Admin
            </Link>
            <nav className="hidden md:flex space-x-4">
              <Link
                href="/admin/programs"
                className="text-gray-600 hover:text-purple-600 transition-colors"
              >
                Programs
              </Link>
              <Link
                href="/admin/users"
                className="text-gray-600 hover:text-purple-600 transition-colors"
              >
                Users
              </Link>
            </nav>
          </div>

          {/* Right side - User info and Logout */}
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">
              <span className="font-medium text-gray-900">{session.user.name}</span>
              <span className="text-gray-500 ml-1 hidden sm:inline">({session.user.email})</span>
            </span>
            <button
              type="button"
              onClick={handleLogout}
              className="text-sm text-red-600 hover:text-red-800 underline cursor-pointer font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
