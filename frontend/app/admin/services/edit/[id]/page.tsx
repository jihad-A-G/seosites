'use client';

import { useState, useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter, useParams } from 'next/navigation';
import api from '@/lib/api';
import { toast } from 'sonner';
import { FiArrowLeft, FiX, FiSearch } from 'react-icons/fi';
import Link from 'next/link';
import { ApiResponse, Service } from '@/types';
import { commonServiceIcons, getServiceIconUrl, getServiceIconCategories } from '@/lib/serviceIcons';

interface ServiceFormData {
  title: string;
  description: string;
  icon: string;
  features: string[];
  order: number;
}

export default function EditServicePage() {
  const router = useRouter();
  const params = useParams();
  const queryClient = useQueryClient();
  const serviceId = params.id as string;

  const [featureInput, setFeatureInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showIconPicker, setShowIconPicker] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const [formData, setFormData] = useState<ServiceFormData>({
    title: '',
    description: '',
    icon: '',
    features: [],
    order: 0,
  });

  // Fetch existing service data
  const { data: serviceData, isLoading: isLoadingService } = useQuery<ApiResponse<Service>>({
    queryKey: ['service', serviceId],
    queryFn: async () => {
      const response = await api.get(`/services/${serviceId}`);
      return response.data;
    },
    enabled: !!serviceId,
  });

  // Load initial values when service data is fetched
  useEffect(() => {
    if (serviceData?.data) {
      const service = serviceData.data;
      setFormData({
        title: service.title,
        description: service.description,
        icon: service.icon,
        features: service.features || [],
        order: service.order,
      });
    }
  }, [serviceData]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'number' ? parseInt(value) || 0 : value,
    }));
  };

  const handleAddFeature = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && featureInput.trim()) {
      e.preventDefault();
      if (!formData.features.includes(featureInput.trim())) {
        setFormData((prev) => ({
          ...prev,
          features: [...prev.features, featureInput.trim()],
        }));
      }
      setFeatureInput('');
    }
  };

  const handleRemoveFeature = (feature: string) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((f) => f !== feature),
    }));
  };

  const handleIconSelect = (slug: string, name: string) => {
    setFormData((prev) => ({
      ...prev,
      icon: slug,
    }));
    setShowIconPicker(false);
    setSearchQuery('');
  };

  // Filter icons by search and category
  const filteredIcons = commonServiceIcons.filter(service => {
    const matchesSearch = searchQuery 
      ? service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.slug.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const updateMutation = useMutation({
    mutationFn: async (data: ServiceFormData) => {
      const response = await api.put(`/services/${serviceId}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-services'] });
      queryClient.invalidateQueries({ queryKey: ['services'] });
      queryClient.invalidateQueries({ queryKey: ['service', serviceId] });
      toast.success('Service updated successfully');
      router.push('/admin/services');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to update service');
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.title || !formData.description) {
      toast.error('Please fill in all required fields');
      return;
    }

    await updateMutation.mutateAsync(formData);
  };

  if (isLoadingService) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-600 border-t-transparent" />
      </div>
    );
  }

  if (!serviceData?.data) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 dark:text-gray-400">Service not found</p>
        <Link href="/admin/services" className="text-primary-600 hover:underline mt-4 inline-block">
          Back to Services
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <Link
          href="/admin/services"
          className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-4"
        >
          <FiArrowLeft className="mr-2" />
          Back to Services
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Edit Service
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Update service details
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="card p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Basic Information
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Service Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                placeholder="Enter service title"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                placeholder="Enter service description"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Service Icon
                </label>
                
                {/* Current Icon Preview */}
                {formData.icon && (
                  <div className="mb-4 flex items-center gap-4">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <img
                        src={getServiceIconUrl(formData.icon)}
                        alt={formData.title || 'Service icon'}
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
                  <div className="mt-4 p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 max-h-96 overflow-y-auto">
                    {/* Search */}
                    <div className="mb-4">
                      <div className="relative">
                        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Search icons..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700"
                        />
                      </div>
                    </div>

                    {/* Category Filter */}
                    <div className="mb-4 flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => setSelectedCategory('all')}
                        className={`px-3 py-1 text-xs rounded ${selectedCategory === 'all' ? 'bg-primary-600 text-white' : 'bg-gray-100 dark:bg-gray-700'}`}
                      >
                        All
                      </button>
                      {getServiceIconCategories().map((category) => (
                        <button
                          key={category}
                          type="button"
                          onClick={() => setSelectedCategory(category)}
                          className={`px-3 py-1 text-xs rounded capitalize ${selectedCategory === category ? 'bg-primary-600 text-white' : 'bg-gray-100 dark:bg-gray-700'}`}
                        >
                          {category}
                        </button>
                      ))}
                    </div>

                    {/* Icon Grid */}
                    <div className="grid grid-cols-3 gap-2">
                      {filteredIcons.map((service) => (
                        <button
                          key={service.slug}
                          type="button"
                          onClick={() => handleIconSelect(service.slug, service.name)}
                          className="flex flex-col items-center gap-2 p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                          title={service.name}
                        >
                          <img
                            src={getServiceIconUrl(service.slug)}
                            alt={service.name}
                            className="w-8 h-8 object-contain"
                            onError={(e) => {
                              e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"%3E%3Ctext y="20" font-size="20"%3E📦%3C/text%3E%3C/svg%3E';
                            }}
                          />
                          <span className="text-xs text-center line-clamp-2">{service.name}</span>
                        </button>
                      ))}
                    </div>

                    {filteredIcons.length === 0 && (
                      <p className="text-center text-gray-500 py-4">No icons found</p>
                    )}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Order
                </label>
                <input
                  type="number"
                  name="order"
                  value={formData.order}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  placeholder="0"
                  min="0"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="card p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Features
          </h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Add Features (press Enter to add)
            </label>
            <input
              type="text"
              value={featureInput}
              onChange={(e) => setFeatureInput(e.target.value)}
              onKeyDown={handleAddFeature}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              placeholder="e.g., Responsive Design, SEO Optimization"
            />
          </div>
          {formData.features.length > 0 && (
            <div className="mt-4 space-y-2">
              {formData.features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between px-4 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg"
                >
                  <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveFeature(feature)}
                    className="text-red-600 hover:text-red-700 dark:text-red-400"
                  >
                    <FiX className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end space-x-4">
          <Link
            href="/admin/services"
            className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={updateMutation.isPending}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {updateMutation.isPending ? 'Updating...' : 'Update Service'}
          </button>
        </div>
      </form>
    </div>
  );
}
