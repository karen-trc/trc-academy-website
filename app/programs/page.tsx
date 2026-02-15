import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { prisma } from '@/src/lib/prisma';

export const metadata: Metadata = {
  title: 'Our Programs | TRC Training Academy',
  description: 'Explore our professional coaching certification programs designed for mature professionals seeking meaningful second careers.',
  openGraph: {
    title: 'Our Programs | TRC Training Academy',
    description: 'Explore our professional coaching certification programs designed for mature professionals seeking meaningful second careers.',
    url: 'https://trctrainingacademy.com/programs',
    siteName: 'TRC Training Academy',
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: 'https://trctrainingacademy.com/programs',
  },
};

// Force dynamic rendering to avoid build-time database queries
export const dynamic = 'force-dynamic';

async function getPrograms() {
  try {
    const programs = await prisma.program.findMany({
      where: { isActive: true },
      orderBy: { startDate: 'asc' },
    });
    return programs;
  } catch (error) {
    // Handle case where Program table doesn't exist yet
    console.error('Error fetching programs:', error);
    return [];
  }
}

function formatDate(date: Date) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
  });
}

function formatPrice(price: number | null) {
  if (!price) return 'Contact for pricing';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Number(price));
}

function isProgramUpcoming(startDate: Date) {
  return new Date(startDate) > new Date();
}

function isProgramActive(startDate: Date, endDate: Date) {
  const now = new Date();
  return new Date(startDate) <= now && new Date(endDate) >= now;
}

export default async function ProgramsPage() {
  const programs = await getPrograms();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-trc-blue-600 via-trc-blue-700 to-trc-blue-800 py-20 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.3)'}}>
              Our Programs
            </h1>
            <p className="text-xl lg:text-2xl text-trc-blue-100 leading-relaxed">
              Discover our professional coaching certification programs designed for mature professionals seeking meaningful second careers.
            </p>
          </div>
        </div>
      </section>

      {/* Programs List */}
      <section className="py-20 lg:py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {programs.length === 0 ? (
            <div className="text-center py-16">
              <div className="max-w-lg mx-auto">
                <svg
                  className="w-20 h-20 text-trc-gray-300 mx-auto mb-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
                <h2 className="text-3xl font-bold text-trc-gray-900 mb-4">
                  No Programs Currently Available
                </h2>
                <p className="text-xl text-trc-gray-600 mb-8 leading-relaxed">
                  We&apos;re working on exciting new coaching certification programs. Contact us to be the first to know when enrollment begins.
                </p>
                <Link
                  href="/contact"
                  className="inline-block px-8 py-4 bg-gradient-to-r from-trc-gold-600 to-trc-gold-700 text-white font-bold rounded-lg hover:from-trc-gold-700 hover:to-trc-gold-800 hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-xl text-lg"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {programs.map((program) => (
                <div
                  key={program.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100"
                >
                  {/* Program Status Badge */}
                  <div className={`text-white px-6 py-3 text-sm font-semibold ${
                    isProgramActive(program.startDate, program.endDate)
                      ? 'bg-gradient-to-r from-trc-blue-600 to-trc-blue-700'
                      : 'bg-gradient-to-r from-trc-gold-600 to-trc-gold-700'
                  }`}>
                    {isProgramUpcoming(program.startDate) ? (
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Enrollment Open
                      </span>
                    ) : isProgramActive(program.startDate, program.endDate) ? (
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        In Progress
                      </span>
                    ) : (
                      <span>Program</span>
                    )}
                  </div>

                  <div className="p-6 lg:p-8">
                    {/* Title */}
                    <h3 className="text-2xl font-bold text-trc-gray-900 mb-3">
                      {program.title}
                    </h3>

                    {/* Teacher */}
                    <div className="flex items-center text-trc-gray-600 mb-4">
                      <svg
                        className="w-5 h-5 mr-2 text-trc-blue-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      <span className="font-medium">Instructor: {program.teacherName}</span>
                    </div>

                    {/* Description */}
                    {program.description && (
                      <p className="text-trc-gray-600 mb-6 line-clamp-3 leading-relaxed">
                        {program.description}
                      </p>
                    )}

                    {/* Dates */}
                    <div className="flex items-center text-trc-gray-600 mb-3">
                      <svg
                        className="w-5 h-5 mr-2 text-trc-blue-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <span>
                        {formatDate(program.startDate)} – {formatDate(program.endDate)}
                      </span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center mb-4">
                      <svg
                        className="w-5 h-5 mr-2 text-trc-blue-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span className="text-xl font-bold text-trc-gold-600">
                        {formatPrice(program.price ? Number(program.price) : null)}
                      </span>
                    </div>

                    {/* Payment Conditions */}
                    {program.paymentConditions && (
                      <p className="text-sm text-trc-gray-500 mb-4 bg-gray-50 p-3 rounded-lg">
                        {program.paymentConditions}
                      </p>
                    )}

                    {/* Schedule Details */}
                    {program.scheduleInfo && (
                      <div className="mb-6 bg-orange-50 p-4 rounded-lg">
                        <div className="flex items-center mb-3">
                          <svg className="w-5 h-5 text-orange-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <h4 className="font-semibold text-trc-gray-900">Schedule & Dates</h4>
                        </div>
                        <ul className="space-y-1 text-sm text-trc-gray-700">
                          {program.scheduleInfo.split('\n').map((line, index) => (
                            <li key={index} className="flex items-start">
                              <svg className="w-4 h-4 text-trc-gold-600 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <span>{line}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* CTA Button - Priority: 1. Started → 2. Class Full → 3. Apply Now → 4. Nothing */}
                    {isProgramActive(program.startDate, program.endDate) ? (
                      <div className="block w-full text-center bg-gray-400 text-white py-3 px-4 rounded-lg font-semibold cursor-not-allowed">
                        Program in Progress
                      </div>
                    ) : !isProgramUpcoming(program.startDate) ? (
                      null
                    ) : program.isClassFull ? (
                      <div className="block w-full text-center bg-orange-500 text-white py-3 px-4 rounded-lg font-semibold cursor-not-allowed">
                        Class Full &ndash; See Next Class
                      </div>
                    ) : program.showApplyButton ? (
                      <Link
                        href="/contact"
                        className="block w-full text-center bg-gradient-to-r from-trc-blue-600 to-trc-blue-700 text-white py-3 px-4 rounded-lg font-semibold hover:from-trc-blue-700 hover:to-trc-blue-800 transition-all duration-300 shadow-md hover:shadow-lg"
                      >
                        Apply Now
                      </Link>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Final CTA Section with Summit Image */}
      <section className="relative py-32">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/Summit_3.jpg"
            alt="Mountain summit representing transformation"
            fill
            style={{ objectFit: 'cover' }}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.8)'}}>
              Your Transformation Begins Today
            </h2>
            <p className="text-xl lg:text-2xl text-white max-w-4xl mx-auto mb-8" style={{textShadow: '1px 1px 3px rgba(0,0,0,0.8)'}}>
              Take the first step toward your soul&apos;s work.
              Discover how your unique wisdom can create lasting impact in the world.
            </p>
            <Link
              href="/contact"
              className="inline-block px-8 py-4 bg-white text-trc-blue-600 font-bold rounded-md hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-xl text-lg"
            >
              Schedule a Free Consultation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
