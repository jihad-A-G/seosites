'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api, { getImageUrl } from '@/lib/api';
import { Testimonial } from '@/types';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { FiEdit, FiTrash2, FiPlus, FiStar } from 'react-icons/fi';

export default function TestimonialsPage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: testimonialsData, isLoading } = useQuery({
    queryKey: ['testimonials'],
    queryFn: async () => {
      const response = await api.get('/testimonials');
      return response.data;
    },
  });

  const deleteTestimonialMutation = useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/testimonials/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['testimonials'] });
      toast.success('Testimonial deleted successfully');
    },
    onError: () => {
      toast.error('Failed to delete testimonial');
    },
  });

  const handleDelete = async (id: string, clientName: string) => {
    if (window.confirm(`Are you sure you want to delete testimonial from ${clientName}?`)) {
      deleteTestimonialMutation.mutate(id);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const testimonials: Testimonial[] = testimonialsData?.data || [];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Manage Testimonials</h1>
        <button
          onClick={() => router.push('/admin/testimonials/add')}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          <FiPlus />
          Add Testimonial
        </button>
      </div>

      {testimonials.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <p className="text-gray-500 dark:text-gray-400">No testimonials found. Add your first testimonial!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial._id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-start gap-4 mb-4">
                {testimonial.avatar ? (
                  <img
                    src={getImageUrl(testimonial.avatar)}
                    alt={testimonial.clientName}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
                    <span className="text-2xl font-bold text-gray-600 dark:text-gray-300">
                      {testimonial.clientName.charAt(0)}
                    </span>
                  </div>
                )}
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{testimonial.clientName}</h3>
                  {testimonial.position && (
                    <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.position}</p>
                  )}
                  {testimonial.company && (
                    <p className="text-sm text-gray-500 dark:text-gray-500">{testimonial.company}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <FiStar
                    key={i}
                    className={`${
                      i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>

              <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">
                {testimonial.content}
              </p>

              {testimonial.featured && (
                <div className="mb-4">
                  <span className="inline-block px-2 py-1 text-xs font-semibold text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-300 rounded-full">
                    Featured
                  </span>
                </div>
              )}

              <div className="flex gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => router.push(`/admin/testimonials/edit/${testimonial._id}`)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <FiEdit size={16} />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(testimonial._id, testimonial.clientName)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  <FiTrash2 size={16} />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
