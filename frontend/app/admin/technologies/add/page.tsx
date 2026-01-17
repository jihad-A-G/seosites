'use client';

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { commonTechIcons, getTechIconUrl, getTechIconsByCategory } from '@/lib/techIcons';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { FiCode, FiSearch } from 'react-icons/fi';

export default function AddTechnologyPage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    name: '',
    category: 'frontend' as 'frontend' | 'backend' | 'database' | 'devops',
    icon: '',
    proficiency: 50,
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [showIconPicker, setShowIconPicker] = useState(false);

  const createTechnologyMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await api.post('/technologies', data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['technologies'] });
      toast.success('Technology created successfully');
      router.push('/admin/technologies');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to create technology');
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'proficiency' ? Number(value) : value,
    }));
  };

  const handleIconSelect = (slug: string, name: string) => {
    setFormData((prev) => ({
      ...prev,
      icon: slug,
      name: prev.name || name, // Auto-fill name if empty
    }));
    setShowIconPicker(false);
    setSearchQuery('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.category) {
      toast.error('Please fill in all required fields');
      return;
    }

    createTechnologyMutation.mutate(formData);
  };

  // Filter icons by search and category
  const filteredIcons = commonTechIcons.filter(tech => {
    const matchesSearch = searchQuery 
      ? tech.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tech.slug.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    const matchesCategory = tech.category === formData.category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Add Technology</h1>
        <button
          onClick={() => router.push('/admin/technologies')}
          className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
        >
          Cancel
        </button>
      </div>

      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 space-y-6">
        {/* Category */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium mb-2">
            Category *
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700"
          >
            <option value="frontend">Frontend</option>
            <option value="backend">Backend</option>
            <option value="database">Database</option>
            <option value="devops">DevOps</option>
          </select>
        </div>

        {/* Icon Picker */}
        <div>
          <label className="block text-sm font-medium mb-2">Technology Icon</label>
          
          {/* Current Icon Preview */}
          {formData.icon && (
            <div className="mb-4 flex items-center gap-4">
              <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <img
                  src={getTechIconUrl(formData.icon)}
                  alt={formData.name}
                  className="w-10 h-10 object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <div>
                  <p className="font-medium">{formData.icon}</p>
                  <p className="text-xs text-gray-500">Selected Icon</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, icon: '' }))}
                className="text-sm text-red-500 hover:text-red-600"
              >
                Clear
              </button>
            </div>
          )}

          {/* Icon Picker Button */}
          <button
            type="button"
            onClick={() => setShowIconPicker(!showIconPicker)}
            className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            {formData.icon ? 'Change Icon' : 'Select Icon from Library'}
          </button>

          {/* Icon Picker Modal */}
          {showIconPicker && (
            <div className="mt-4 border border-gray-300 dark:border-gray-600 rounded-lg p-4 bg-gray-50 dark:bg-gray-700">
              {/* Search */}
              <div className="mb-4">
                <div className="relative">
                  <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search technologies..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800"
                  />
                </div>
              </div>

              {/* Icon Grid */}
              <div className="max-h-96 overflow-y-auto">
                {filteredIcons.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">No icons found</p>
                ) : (
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                    {filteredIcons.map((tech) => (
                      <button
                        key={tech.slug}
                        type="button"
                        onClick={() => handleIconSelect(tech.slug, tech.name)}
                        className={`p-3 rounded-lg border-2 transition-all hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 ${
                          formData.icon === tech.slug
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                            : 'border-gray-200 dark:border-gray-600'
                        }`}
                      >
                        <img
                          src={getTechIconUrl(tech.slug)}
                          alt={tech.name}
                          className="w-full h-12 object-contain mb-2"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                        <p className="text-xs text-center truncate">{tech.name}</p>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Manual Icon Input */}
          <div className="mt-4">
            <label htmlFor="icon" className="block text-xs text-gray-600 dark:text-gray-400 mb-1">
              Or enter icon slug manually (from simpleicons.org)
            </label>
            <input
              type="text"
              id="icon"
              name="icon"
              value={formData.icon}
              onChange={handleInputChange}
              placeholder="e.g., react, nodejs, mongodb"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700"
            />
          </div>
        </div>

        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-2">
            Technology Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            placeholder="e.g., React, Node.js, MongoDB"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700"
          />
        </div>

        {/* Proficiency */}
        <div>
          <label htmlFor="proficiency" className="block text-sm font-medium mb-2">
            Proficiency Level: {formData.proficiency}%
          </label>
          <input
            type="range"
            id="proficiency"
            name="proficiency"
            min="1"
            max="100"
            value={formData.proficiency}
            onChange={handleInputChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Beginner</span>
            <span>Intermediate</span>
            <span>Expert</span>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={createTechnologyMutation.isPending}
            className="flex-1 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {createTechnologyMutation.isPending ? 'Creating...' : 'Create Technology'}
          </button>
          <button
            type="button"
            onClick={() => router.push('/admin/technologies')}
            className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
