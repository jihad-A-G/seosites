'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { getTechIconUrl } from '@/lib/techIcons';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { FiEdit, FiTrash2, FiPlus, FiCode } from 'react-icons/fi';

interface Technology {
  _id: string;
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'devops';
  icon: string;
  proficiency: number;
}

export default function TechnologiesPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const { data: technologiesData, isLoading } = useQuery({
    queryKey: ['technologies'],
    queryFn: async () => {
      const response = await api.get('/technologies');
      return response.data;
    },
  });

  const deleteTechnologyMutation = useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/technologies/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['technologies'] });
      toast.success('Technology deleted successfully');
    },
    onError: () => {
      toast.error('Failed to delete technology');
    },
  });

  const handleDelete = async (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      deleteTechnologyMutation.mutate(id);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Convert grouped data to flat array
  const groupedData: Record<string, Technology[]> = technologiesData?.data || {};
  const allTechnologies: Technology[] = Object.values(groupedData).flat();
  
  // Filter by category
  const filteredTechnologies = selectedCategory === 'all' 
    ? allTechnologies 
    : allTechnologies.filter(tech => tech.category === selectedCategory);

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'frontend', label: 'Frontend' },
    { value: 'backend', label: 'Backend' },
    { value: 'database', label: 'Database' },
    { value: 'devops', label: 'DevOps' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Manage Technologies</h1>
        <button
          onClick={() => router.push('/admin/technologies/add')}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          <FiPlus />
          Add Technology
        </button>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setSelectedCategory(cat.value)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedCategory === cat.value
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {filteredTechnologies.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <p className="text-gray-500 dark:text-gray-400">
            No technologies found. Add your first technology!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTechnologies.map((tech) => (
            <div
              key={tech._id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center gap-4 mb-4">
                {tech.icon ? (
                  <img
                    src={getTechIconUrl(tech.icon)}
                    alt={tech.name}
                    className="w-12 h-12 object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.nextElementSibling?.classList.remove('hidden');
                    }}
                  />
                ) : null}
                <div className={`${tech.icon ? 'hidden' : ''} w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center`}>
                  <FiCode className="text-gray-500" size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{tech.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                    {tech.category}
                  </p>
                </div>
              </div>

              {/* Proficiency Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600 dark:text-gray-400">Proficiency</span>
                  <span className="font-semibold">{tech.proficiency}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all"
                    style={{ width: `${tech.proficiency}%` }}
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => router.push(`/admin/technologies/edit/${tech._id}`)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <FiEdit size={16} />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(tech._id, tech.name)}
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
