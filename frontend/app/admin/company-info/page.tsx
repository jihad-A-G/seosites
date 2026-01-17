'use client';

import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { ApiResponse, CompanyInfo } from '@/types';
import { FiSave } from 'react-icons/fi';
import { toast } from 'sonner';

export default function CompanyInfoManagement() {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState<Partial<CompanyInfo>>({
    name: '',
    tagline: '',
    foundedYear: 2014,
    story: '',
    mission: '',
    vision: '',
    values: [],
    contact: { email: '', phone: '', address: '' },
    social: { twitter: '', linkedin: '', github: '', facebook: '', instagram: '' },
  });

  const { data, isLoading } = useQuery<ApiResponse<CompanyInfo>>({
    queryKey: ['company-info'],
    queryFn: async () => {
      const response = await api.get('/company-info');
      return response.data;
    },
  });

  // Set form data when company info is loaded
  useEffect(() => {
    if (data?.data) {
      setFormData(data.data);
    }
  }, [data]);

  const updateMutation = useMutation({
    mutationFn: async (data: Partial<CompanyInfo>) => {
      const response = await api.put('/company-info', data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['company-info'] });
      toast.success('Company info updated successfully');
    },
    onError: () => {
      toast.error('Failed to update company info');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateMutation.mutate(formData);
  };

  const handleAddValue = () => {
    setFormData({
      ...formData,
      values: [...(formData.values || []), { title: '', description: '', icon: '', order: formData.values?.length || 0 }],
    });
  };

  const handleRemoveValue = (index: number) => {
    const newValues = formData.values?.filter((_, i) => i !== index) || [];
    setFormData({ ...formData, values: newValues });
  };

  const handleValueChange = (index: number, field: string, value: string | number) => {
    const newValues = [...(formData.values || [])];
    newValues[index] = { ...newValues[index], [field]: value };
    setFormData({ ...formData, values: newValues });
  };

  if (isLoading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Company Information
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage your company details, story, and values
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="card p-6">
          <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Basic Information</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Company Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Tagline
              </label>
              <input
                type="text"
                value={formData.tagline}
                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Founded Year
              </label>
              <input
                type="number"
                value={formData.foundedYear}
                onChange={(e) => setFormData({ ...formData, foundedYear: parseInt(e.target.value) })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* Story & Mission */}
        <div className="card p-6">
          <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Story & Mission</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Company Story
              </label>
              <textarea
                value={formData.story}
                onChange={(e) => setFormData({ ...formData, story: e.target.value })}
                rows={6}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Mission
              </label>
              <textarea
                value={formData.mission}
                onChange={(e) => setFormData({ ...formData, mission: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Vision
              </label>
              <textarea
                value={formData.vision}
                onChange={(e) => setFormData({ ...formData, vision: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Company Values</h2>
            <button
              type="button"
              onClick={handleAddValue}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
            >
              Add Value
            </button>
          </div>
          <div className="space-y-4">
            {formData.values?.map((value, index) => (
              <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="grid md:grid-cols-2 gap-4 mb-3">
                  <input
                    type="text"
                    placeholder="Title"
                    value={value.title}
                    onChange={(e) => handleValueChange(index, 'title', e.target.value)}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                  <input
                    type="text"
                    placeholder="Icon (e.g., FiTarget)"
                    value={value.icon}
                    onChange={(e) => handleValueChange(index, 'icon', e.target.value)}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                </div>
                <textarea
                  placeholder="Description"
                  value={value.description}
                  onChange={(e) => handleValueChange(index, 'description', e.target.value)}
                  rows={2}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white mb-3"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveValue(index)}
                  className="text-red-600 hover:text-red-700 text-sm"
                >
                  Remove Value
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div className="card p-6">
          <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Contact Information</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                value={formData.contact?.email}
                onChange={(e) => setFormData({ ...formData, contact: { ...formData.contact, email: e.target.value } })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Phone
              </label>
              <input
                type="tel"
                value={formData.contact?.phone}
                onChange={(e) => setFormData({ ...formData, contact: { ...formData.contact, phone: e.target.value } })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Address
              </label>
              <input
                type="text"
                value={formData.contact?.address}
                onChange={(e) => setFormData({ ...formData, contact: { ...formData.contact, address: e.target.value } })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div className="card p-6">
          <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Social Media</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Twitter
              </label>
              <input
                type="url"
                value={formData.social?.twitter}
                onChange={(e) => setFormData({ ...formData, social: { ...formData.social, twitter: e.target.value } })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                LinkedIn
              </label>
              <input
                type="url"
                value={formData.social?.linkedin}
                onChange={(e) => setFormData({ ...formData, social: { ...formData.social, linkedin: e.target.value } })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                GitHub
              </label>
              <input
                type="url"
                value={formData.social?.github}
                onChange={(e) => setFormData({ ...formData, social: { ...formData.social, github: e.target.value } })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Facebook
              </label>
              <input
                type="url"
                value={formData.social?.facebook}
                onChange={(e) => setFormData({ ...formData, social: { ...formData.social, facebook: e.target.value } })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Instagram
              </label>
              <input
                type="url"
                value={formData.social?.instagram}
                onChange={(e) => setFormData({ ...formData, social: { ...formData.social, instagram: e.target.value } })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={updateMutation.isPending}
            className="flex items-center gap-2 px-8 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50"
          >
            <FiSave /> {updateMutation.isPending ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}
