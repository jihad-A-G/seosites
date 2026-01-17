'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { ApiResponse, ProcessStep } from '@/types';
import { FiPlus, FiEdit2, FiTrash2, FiSave, FiX } from 'react-icons/fi';
import { toast } from 'sonner';

export default function ProcessStepsManagement() {
  const queryClient = useQueryClient();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState<Partial<ProcessStep>>({
    step: '',
    title: '',
    description: '',
    order: 0,
  });

  const { data, isLoading } = useQuery<ApiResponse<ProcessStep[]>>({
    queryKey: ['process-steps'],
    queryFn: async () => {
      const response = await api.get('/process-steps');
      return response.data;
    },
  });

  const createMutation = useMutation({
    mutationFn: async (newStep: Partial<ProcessStep>) => {
      const response = await api.post('/process-steps', newStep);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['process-steps'] });
      toast.success('Process step created successfully');
      setIsAdding(false);
      resetForm();
    },
    onError: () => {
      toast.error('Failed to create process step');
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<ProcessStep> }) => {
      const response = await api.put(`/process-steps/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['process-steps'] });
      toast.success('Process step updated successfully');
      setEditingId(null);
      resetForm();
    },
    onError: () => {
      toast.error('Failed to update process step');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await api.delete(`/process-steps/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['process-steps'] });
      toast.success('Process step deleted successfully');
    },
    onError: () => {
      toast.error('Failed to delete process step');
    },
  });

  const resetForm = () => {
    setFormData({ step: '', title: '', description: '', order: 0 });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateMutation.mutate({ id: editingId, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const handleEdit = (step: ProcessStep) => {
    setEditingId(step._id);
    setFormData(step);
    setIsAdding(false);
  };

  const handleCancel = () => {
    setEditingId(null);
    setIsAdding(false);
    resetForm();
  };

  const processSteps = data?.data || [];

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Process Steps Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage the process steps displayed on the services page
          </p>
        </div>
        <button
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          <FiPlus /> Add Process Step
        </button>
      </div>

      {/* Add/Edit Form */}
      {(isAdding || editingId) && (
        <div className="card p-6 mb-6">
          <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
            {editingId ? 'Edit Process Step' : 'Add New Process Step'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Step Number (e.g., 01, 02)
                </label>
                <input
                  type="text"
                  value={formData.step}
                  onChange={(e) => setFormData({ ...formData, step: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Order
              </label>
              <input
                type="number"
                value={formData.order}
                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
            <div className="flex gap-3">
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
              >
                <FiSave /> Save
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="flex items-center gap-2 px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600"
              >
                <FiX /> Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Process Steps Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {isLoading ? (
          <div className="col-span-full p-8 text-center">Loading...</div>
        ) : processSteps.length === 0 ? (
          <div className="col-span-full p-8 text-center text-gray-500">No process steps found. Add one to get started!</div>
        ) : (
          processSteps.map((step) => (
            <div key={step._id} className="card p-6">
              <div className="text-5xl font-bold text-primary-100 dark:text-primary-900/30 mb-4">
                {step.step}
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                {step.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                {step.description}
              </p>
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => handleEdit(step)}
                  className="flex items-center gap-1 px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded"
                >
                  <FiEdit2 size={14} /> Edit
                </button>
                <button
                  onClick={() => {
                    if (confirm('Are you sure you want to delete this process step?')) {
                      deleteMutation.mutate(step._id);
                    }
                  }}
                  className="flex items-center gap-1 px-3 py-1 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded"
                >
                  <FiTrash2 size={14} /> Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
