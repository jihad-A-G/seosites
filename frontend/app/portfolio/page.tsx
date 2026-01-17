'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import api, { getImageUrl } from '@/lib/api';
import { ApiResponse, Project } from '@/types';
import { FiExternalLink, FiGithub } from 'react-icons/fi';
import Image from 'next/image';
import Link from 'next/link';

const categories = ['all', 'web', 'mobile', 'saas', 'ecommerce'];

export default function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const { data, isLoading } = useQuery<ApiResponse<Project[]>>({
    queryKey: ['projects', selectedCategory],
    queryFn: async () => {
      const url =
        selectedCategory === 'all'
          ? '/projects'
          : `/projects?category=${selectedCategory}`;
      const response = await api.get(url);
      return response.data;
    },
  });

  const projects = data?.data || [];

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-black">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="inline-block mb-6"
            >
              <span className="text-amber-400 text-sm font-bold uppercase tracking-wider px-4 py-2 bg-amber-500/10 border border-amber-500/30">
                Our Work
              </span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
              Selected <span className="text-amber-400">Projects</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Explore our portfolio of successful projects that transformed businesses
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {categories.map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category)}
                className={`px-8 py-3 font-semibold transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-amber-400 text-black'
                    : 'bg-white border border-gray-300 text-gray-700 hover:border-gray-400'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="h-96 bg-gray-200 animate-pulse"
                />
              ))}
            </div>
          ) : projects.length > 0 ? (
            <AnimatePresence mode="wait">
              <motion.div 
                key={selectedCategory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {projects.map((project, index) => (
                  <Link href={`/portfolio/${project._id}`} key={project._id}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      whileHover={{ y: -5 }}
                      className={`group relative overflow-hidden bg-white border border-gray-200 hover:border-gray-300 transition-all cursor-pointer ${
                        index % 7 === 0 ? 'md:row-span-2' : ''
                      }`}
                    >
                    <div className="relative h-full min-h-[300px]">
                      {project.images && project.images[0] ? (
                        <Image
                          src={getImageUrl(project.images[0])}
                          alt={project.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-400">No Image</span>
                        </div>
                      )}

                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                      {/* Content */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <div className="mb-2">
                          <span className="inline-block px-3 py-1 bg-amber-400 text-black text-xs font-bold uppercase">
                            {project.category}
                          </span>
                        </div>
                        
                        <h3 className="text-xl font-bold mb-2">
                          {project.title}
                        </h3>
                        
                        <p className="text-sm text-gray-300 mb-4 line-clamp-2">
                          {project.description}
                        </p>

                        {/* Tech Stack */}
                        {project.technologies && project.technologies.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {project.technologies.slice(0, 3).map((tech, i) => (
                              <span
                                key={i}
                                className="text-xs px-2 py-1 bg-white/20 text-white"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Links */}
                        <div className="flex gap-3">
                          {project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center gap-1 text-amber-400 hover:text-amber-300 transition-colors text-sm font-medium"
                            >
                              <FiExternalLink /> Live Site
                            </a>
                          )}
                          {project.githubUrl && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center gap-1 text-amber-400 hover:text-amber-300 transition-colors text-sm font-medium"
                            >
                              <FiGithub /> GitHub
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                  </Link>
                ))}
              </motion.div>
            </AnimatePresence>
          ) : (
            <div className="text-center py-20">
              <p className="text-xl text-gray-600">
                No projects found in this category.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
