'use client';

import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import { ApiResponse, Project, Service, Testimonial } from '@/types';
import { FiBriefcase, FiSettings, FiMessageSquare, FiTrendingUp } from 'react-icons/fi';
import Link from 'next/link';

export default function AdminDashboard() {
  const { data: projectsData } = useQuery<ApiResponse<Project[]>>({
    queryKey: ['projects'],
    queryFn: async () => {
      const response = await api.get('/projects');
      return response.data;
    },
  });

  const { data: servicesData } = useQuery<ApiResponse<Service[]>>({
    queryKey: ['services'],
    queryFn: async () => {
      const response = await api.get('/services');
      return response.data;
    },
  });

  const { data: testimonialsData } = useQuery<ApiResponse<Testimonial[]>>({
    queryKey: ['testimonials'],
    queryFn: async () => {
      const response = await api.get('/testimonials');
      return response.data;
    },
  });

  const stats = [
    {
      name: 'Total Projects',
      value: projectsData?.count || 0,
      icon: FiBriefcase,
      color: 'text-blue-600 bg-blue-100 dark:bg-blue-900/30',
      link: '/admin/projects',
    },
    {
      name: 'Services',
      value: servicesData?.count || 0,
      icon: FiSettings,
      color: 'text-purple-600 bg-purple-100 dark:bg-purple-900/30',
      link: '/admin/services',
    },
    {
      name: 'Testimonials',
      value: testimonialsData?.count || 0,
      icon: FiMessageSquare,
      color: 'text-green-600 bg-green-100 dark:bg-green-900/30',
      link: '/admin/testimonials',
    },
    {
      name: 'Featured Projects',
      value: projectsData?.data?.filter((p) => p.featured).length || 0,
      icon: FiTrendingUp,
      color: 'text-orange-600 bg-orange-100 dark:bg-orange-900/30',
      link: '/admin/projects',
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Welcome to your admin panel. Manage your content from here.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <Link
            key={stat.name}
            href={stat.link}
            className="card p-6 hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                  {stat.name}
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent Projects */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Recent Projects</h2>
          <Link
            href="/admin/projects"
            className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium"
          >
            View All
          </Link>
        </div>

        {projectsData?.data && projectsData.data.length > 0 ? (
          <div className="space-y-4">
            {projectsData.data.slice(0, 5).map((project) => (
              <div
                key={project._id}
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
              >
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">{project.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{project.category}</p>
                </div>
                <div className="flex items-center space-x-2">
                  {project.featured && (
                    <span className="px-2 py-1 text-xs font-medium text-yellow-700 bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-400 rounded">
                      Featured
                    </span>
                  )}
                  <span className="px-2 py-1 text-xs font-medium text-gray-700 bg-gray-200 dark:bg-gray-700 dark:text-gray-300 rounded capitalize">
                    {project.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400 py-8">
            No projects yet. Create your first project!
          </p>
        )}
      </div>
    </div>
  );
}
