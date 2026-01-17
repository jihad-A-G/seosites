'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import api from '@/lib/api';
import { ApiResponse, Service } from '@/types';
import { toast } from 'sonner';
import { FiPlus, FiEdit2, FiTrash2, FiCode } from 'react-icons/fi';
import { getIcon } from '@/lib/icons';

export default function AdminServicesPage() {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery<ApiResponse<Service[]>>({
    queryKey: ['admin-services'],
    queryFn: async () => {
      const response = await api.get('/services');
      return response.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.delete(`/services/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-services'] });
      queryClient.invalidateQueries({ queryKey: ['services'] });
      toast.success('Service deleted successfully');
    },
    onError: () => {
      toast.error('Failed to delete service');
    },
  });

  const services = data?.data || [];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Services</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your service offerings
          </p>
        </div>
        <Link href="/admin/services/add" className="btn-primary flex items-center">
          <FiPlus className="mr-2" />
          Add Service
        </Link>
      </div>

      {/* Services Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          <>
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-64 bg-gray-200 dark:bg-gray-800 rounded-2xl animate-pulse"
              />
            ))}
          </>
        ) : services.length > 0 ? (
          services.map((service) => (
            <div
              key={service._id}
              className="card p-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                    {(() => {
                      const Icon = getIcon(service.icon);
                      return <Icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />;
                    })()}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {service.title}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Order: {service.order}
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                {service.description}
              </p>

              {service.features && service.features.length > 0 && (
                <div className="mb-4">
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">
                    Features ({service.features.length})
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {service.features.slice(0, 3).map((feature, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded"
                      >
                        {feature.length > 20 ? feature.substring(0, 20) + '...' : feature}
                      </span>
                    ))}
                    {service.features.length > 3 && (
                      <span className="text-xs px-2 py-1 text-gray-500 dark:text-gray-400">
                        +{service.features.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              )}

              <div className="flex items-center justify-end space-x-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                <Link
                  href={`/admin/services/edit/${service._id}`}
                  className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded"
                >
                  <FiEdit2 className="h-4 w-4" />
                </Link>
                <button
                  onClick={() => {
                    if (confirm('Are you sure you want to delete this service?')) {
                      deleteMutation.mutate(service._id);
                    }
                  }}
                  className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded"
                >
                  <FiTrash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12 card">
            <FiCode className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p className="text-gray-500 dark:text-gray-400">
              No services found. Create your first service!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
