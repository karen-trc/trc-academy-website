'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import DashboardLayout from '@/src/components/layouts/DashboardLayout';
import Link from 'next/link';

export default function NewProgramPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    teacherName: '',
    description: '',
    startDate: '',
    endDate: '',
    price: '',
    paymentConditions: '',
    scheduleInfo: '',
    isActive: true,
    showApplyButton: true,
    isClassFull: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    } else if (session && !session.user.isAdmin) {
      router.push('/unauthorized');
    }
  }, [status, session, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validation
    if (!formData.title || !formData.teacherName || !formData.startDate || !formData.endDate) {
      setError('Please fill in all required fields');
      setLoading(false);
      return;
    }

    if (new Date(formData.startDate) >= new Date(formData.endDate)) {
      setError('End date must be after start date');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/admin/programs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push('/admin/programs');
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to create program');
      }
    } catch {
      setError('An error occurred while creating the program');
    } finally {
      setLoading(false);
    }
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!session?.user.isAdmin) {
    return null;
  }

  return (
    <DashboardLayout>
      <div className="p-6">
        {/* Back Link */}
        <Link
          href="/admin/programs"
          className="text-purple-600 hover:text-purple-700 text-sm mb-4 inline-block"
        >
          ← Back to Programs
        </Link>

        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Create New Program</h1>
          <p className="text-gray-600 mt-1">Set up a new training program</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Program Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="e.g., Professional Coaching Certification"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Teacher Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.teacherName}
                    onChange={(e) => setFormData({ ...formData, teacherName: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="e.g., Dr. Jane Smith"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Brief description of the program..."
                  />
                </div>
              </div>
            </div>

            {/* Schedule */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Schedule</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    End Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Schedule Details
                  </label>
                  <textarea
                    value={formData.scheduleInfo}
                    onChange={(e) => setFormData({ ...formData, scheduleInfo: e.target.value })}
                    rows={6}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="e.g., Orientation: Sat, Nov 1st, 2025&#10;Program Start: Nov 8th/9th, 2025&#10;Graduation: Sat, Jun 6th, 2026&#10;Monthly schedule: 2nd weekend + 2 Wed evenings&#10;Wed evenings: 3 hours&#10;Sat: 6 hours | Sun: 4 hours"
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    Enter each schedule item on a new line. This will be displayed on the programs page.
                  </p>
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Pricing</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price (USD)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="e.g., 2500.00"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Payment Conditions
                  </label>
                  <textarea
                    value={formData.paymentConditions}
                    onChange={(e) => setFormData({ ...formData, paymentConditions: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="e.g., Full payment due 2 weeks before start date. Payment plans available."
                  />
                </div>
              </div>
            </div>

            {/* Program Status */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Program Status</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isActive"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  />
                  <label htmlFor="isActive" className="ml-2 text-sm text-gray-700">
                    Program is active (visible on public programs page)
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="showApplyButton"
                    checked={formData.showApplyButton}
                    onChange={(e) => setFormData({ ...formData, showApplyButton: e.target.checked, isClassFull: e.target.checked ? false : formData.isClassFull })}
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                  />
                  <label htmlFor="showApplyButton" className="ml-2 text-sm text-gray-700">
                    Show &quot;Apply Now&quot; button (allows visitors to apply for this program)
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isClassFull"
                    checked={formData.isClassFull}
                    onChange={(e) => setFormData({ ...formData, isClassFull: e.target.checked, showApplyButton: e.target.checked ? false : formData.showApplyButton })}
                    className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                  />
                  <label htmlFor="isClassFull" className="ml-2 text-sm text-gray-700">
                    Class is full (shows &quot;Class Full &ndash; See Next Class&quot; instead of Apply button)
                  </label>
                </div>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            {/* Submit Buttons */}
            <div className="flex justify-end space-x-4">
              <Link
                href="/admin/programs"
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Creating...' : 'Create Program'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}
