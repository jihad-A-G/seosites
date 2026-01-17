'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { FiHome, FiBriefcase, FiSettings, FiMessageSquare, FiCpu, FiLogOut, FiBarChart2, FiInfo, FiFileText } from 'react-icons/fi';
import { toast } from 'sonner';

const navigation = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: FiHome },
  { name: 'Projects', href: '/admin/projects', icon: FiBriefcase },
  { name: 'Services', href: '/admin/services', icon: FiSettings },
  { name: 'Testimonials', href: '/admin/testimonials', icon: FiMessageSquare },
  { name: 'Technologies', href: '/admin/technologies', icon: FiCpu },
  { name: 'Statistics', href: '/admin/stats', icon: FiBarChart2 },
  { name: 'Company Info', href: '/admin/company-info', icon: FiInfo },
  { name: 'Process Steps', href: '/admin/process-steps', icon: FiFileText },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoginPage, setIsLoginPage] = useState(false);

  useEffect(() => {
    // Check if it's the login page
    setIsLoginPage(pathname === '/admin/login');

    // Check authentication for non-login pages
    const token = localStorage.getItem('token');
    if (!token && pathname !== '/admin/login') {
      router.push('/admin/login');
    }
  }, [router, pathname]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('admin');
    toast.success('Logged out successfully');
    router.push('/admin/login');
  };

  // Don't show sidebar on login page
  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-800">
            <h1 className="text-2xl font-bold gradient-text font-display">seosites</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Admin Panel</p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                <item.icon className="h-5 w-5" />
                <span className="font-medium">{item.name}</span>
              </Link>
            ))}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-800">
            <button
              onClick={handleLogout}
              className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 transition-colors w-full"
            >
              <FiLogOut className="h-5 w-5" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="pl-64">
        <main className="p-8">{children}</main>
      </div>
    </div>
  );
}
