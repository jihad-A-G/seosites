'use client';

import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api, { getImageUrl } from '@/lib/api';
import { useRouter, useParams } from 'next/navigation';
import { toast } from 'sonner';
import { FiUpload, FiX } from 'react-icons/fi';
import { Testimonial } from '@/types';

export default function EditTestimonialPage() {
  const router = useRouter();
  const params = useParams();
  const queryClient = useQueryClient();
  const testimonialId = params.id as string;

  const [formData, setFormData] = useState({
    clientName: '',
    company: '',
    position: '',
    content: '',
    rating: 5,
    featured: false,
  });

  const [existingAvatar, setExistingAvatar] = useState<string>('');
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>('');
  const [removeExistingAvatar, setRemoveExistingAvatar] = useState(false);

  const { data: testimonialData, isLoading } = useQuery({
    queryKey: ['testimonial', testimonialId],
    queryFn: async () => {
      const response = await api.get(`/testimonials/${testimonialId}`);
      return response.data;
    },
  });

  useEffect(() => {
    if (testimonialData?.data) {
      const testimonial: Testimonial = testimonialData.data;
      setFormData({
        clientName: testimonial.clientName,
        company: testimonial.company || '',
        position: testimonial.position || '',
        content: testimonial.content,
        rating: testimonial.rating,
        featured: testimonial.featured,
      });
      setExistingAvatar(testimonial.avatar || '');
    }
  }, [testimonialData]);

  const updateTestimonialMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await api.put(`/testimonials/${testimonialId}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['testimonials'] });
      queryClient.invalidateQueries({ queryKey: ['testimonial', testimonialId] });
      toast.success('Testimonial updated successfully');
      router.push('/admin/testimonials');
    },
    onError: () => {
      toast.error('Failed to update testimonial');
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveExistingAvatar = () => {
    setExistingAvatar('');
    setRemoveExistingAvatar(true);
  };

  const handleRemoveNewAvatar = () => {
    setAvatarFile(null);
    setAvatarPreview('');
  };

  const uploadAvatar = async (): Promise<string> => {
    if (!avatarFile) return '';
    
    const uploadFormData = new FormData();
    uploadFormData.append('image', avatarFile);
    
    const response = await api.post('/upload', uploadFormData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data.data.url;
  };

  const deleteAvatar = async () => {
    if (removeExistingAvatar && testimonialData?.data?.avatar) {
      try {
        await api.delete('/upload', {
          data: { images: [testimonialData.data.avatar] },
        });
      } catch (error) {
        console.error('Failed to delete avatar:', error);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let avatarUrl = existingAvatar;
      
      // Delete old avatar if marked for removal
      await deleteAvatar();
      
      // Upload new avatar if provided
      if (avatarFile) {
        avatarUrl = await uploadAvatar();
      }

      const testimonialData = {
        ...formData,
        rating: Number(formData.rating),
        avatar: avatarUrl,
      };

      updateTestimonialMutation.mutate(testimonialData);
    } catch (error) {
      toast.error('Failed to process avatar');
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Edit Testimonial</h1>
        <button
          onClick={() => router.push('/admin/testimonials')}
          className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
        >
          Cancel
        </button>
      </div>

      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 space-y-6">
        {/* Client Name */}
        <div>
          <label htmlFor="clientName" className="block text-sm font-medium mb-2">
            Client Name *
          </label>
          <input
            type="text"
            id="clientName"
            name="clientName"
            value={formData.clientName}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700"
          />
        </div>

        {/* Position */}
        <div>
          <label htmlFor="position" className="block text-sm font-medium mb-2">
            Position
          </label>
          <input
            type="text"
            id="position"
            name="position"
            value={formData.position}
            onChange={handleInputChange}
            placeholder="e.g., CEO, Marketing Manager"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700"
          />
        </div>

        {/* Company */}
        <div>
          <label htmlFor="company" className="block text-sm font-medium mb-2">
            Company
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleInputChange}
            placeholder="e.g., Tech Corp"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700"
          />
        </div>

        {/* Content */}
        <div>
          <label htmlFor="content" className="block text-sm font-medium mb-2">
            Testimonial Content *
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            required
            rows={5}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700"
          />
        </div>

        {/* Rating */}
        <div>
          <label htmlFor="rating" className="block text-sm font-medium mb-2">
            Rating *
          </label>
          <select
            id="rating"
            name="rating"
            value={formData.rating}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700"
          >
            <option value={5}>5 Stars</option>
            <option value={4}>4 Stars</option>
            <option value={3}>3 Stars</option>
            <option value={2}>2 Stars</option>
            <option value={1}>1 Star</option>
          </select>
        </div>

        {/* Avatar */}
        <div>
          <label className="block text-sm font-medium mb-2">Avatar Image</label>
          
          <div className="space-y-4">
            {/* Existing Avatar */}
            {existingAvatar && !removeExistingAvatar && (
              <div>
                <p className="text-sm text-gray-500 mb-2">Current Avatar:</p>
                <div className="relative inline-block">
                  <img
                    src={getImageUrl(existingAvatar)}
                    alt="Current avatar"
                    className="w-32 h-32 rounded-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveExistingAvatar}
                    className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                  >
                    <FiX size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* New Avatar Preview */}
            {avatarPreview && (
              <div>
                <p className="text-sm text-gray-500 mb-2">New Avatar:</p>
                <div className="relative inline-block">
                  <img
                    src={avatarPreview}
                    alt="New avatar preview"
                    className="w-32 h-32 rounded-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveNewAvatar}
                    className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                  >
                    <FiX size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* Upload Button */}
            {!avatarPreview && (
              <label className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 w-fit">
                <FiUpload />
                <span>{existingAvatar ? 'Replace Avatar' : 'Upload Avatar'}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
              </label>
            )}
          </div>
        </div>

        {/* Featured */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="featured"
            name="featured"
            checked={formData.featured}
            onChange={handleInputChange}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="featured" className="text-sm font-medium">
            Mark as Featured
          </label>
        </div>

        {/* Submit Button */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={updateTestimonialMutation.isPending}
            className="flex-1 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {updateTestimonialMutation.isPending ? 'Updating...' : 'Update Testimonial'}
          </button>
          <button
            type="button"
            onClick={() => router.push('/admin/testimonials')}
            className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
