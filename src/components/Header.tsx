'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Coach Training', href: '/coaching-training' },
    { name: 'Coach Certification', href: '/career-coaching-certification' },
    { name: 'Programs', href: '/programs' },
    { name: 'Contact', href: '/contact' },
    { name: 'Login', href: '/login' },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <header className="bg-white shadow-md sticky top-0 z-50 border-b border-trc-gray-200">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center py-1">
              <Image
                src="/images/logo.jpg"
                alt="TRC Training Academy"
                width={220}
                height={90}
                className="h-18 w-auto"
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-base font-medium transition-all duration-200 ${
                  isActive(item.href)
                    ? 'text-trc-blue-600 border-b-2 border-trc-blue-600 pb-1'
                    : 'text-trc-gray-700 hover:text-trc-blue-600 hover:border-b-2 hover:border-trc-blue-300 pb-1'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-md text-trc-gray-600 hover:text-trc-gray-900 hover:bg-trc-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-trc-gray-200">
            <div className="space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block px-4 py-3 text-base font-medium transition-colors rounded-md ${
                    isActive(item.href)
                      ? 'bg-trc-blue-50 text-trc-blue-600'
                      : 'text-trc-gray-700 hover:bg-trc-gray-50 hover:text-trc-blue-600'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;