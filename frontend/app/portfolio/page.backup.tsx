'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import api, { getImageUrl } from '@/lib/api';
import { ApiResponse, Project, Stat } from '@/types';
import { FiExternalLink, FiGithub, FiLayers } from 'react-icons/fi';
import Image from 'next/image';

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

  const { data: statsData } = useQuery<ApiResponse<Stat[]>>({
    queryKey: ['stats', 'portfolio'],
    queryFn: async () => {
      const response = await api.get('/stats/page/portfolio');
      return response.data;
    },
  });

  const projects = data?.data || [];
  const stats = statsData?.data || [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-black">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              rotate: 360,
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-10 left-20 w-96 h-96 bg-gradient-to-br from-amber-400/20 to-yellow-600/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              rotate: -360,
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-gradient-to-tl from-amber-500/10 to-yellow-400/10 rounded-full blur-3xl"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/30 backdrop-blur-sm rounded-full mb-6"
            >
              <FiLayers className="text-amber-400" />
              <span className="text-sm font-medium text-amber-300">
                Our Work
              </span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
              Selected <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500">Projects</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Explore our portfolio of successful projects that transformed businesses and exceeded expectations.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="max-w-7xl mx-auto px-6 pb-12">
        <div className="flex flex-wrap items-center justify-center gap-3">
          {categories.map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category)}
              className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-amber-600 to-yellow-500 text-white shadow-lg shadow-amber-500/50'
                  : 'bg-gray-800/50 border border-amber-500/30 text-gray-300 hover:shadow-lg hover:border-amber-400/50 backdrop-blur-sm'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </motion.button>
          ))}
        </div>
      </section>

      {/* Projects Masonry Grid */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-96 bg-gray-200 dark:bg-gray-800 rounded-2xl animate-pulse"
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
                <motion.div
                  key={project._id}
                  initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1, type: "spring" }}
                  whileHover={{ y: -10, scale: 1.03 }}
                  className={`group relative overflow-hidden rounded-2xl bg-gray-800/50 backdrop-blur-sm shadow-xl hover:shadow-2xl hover:shadow-amber-500/30 transition-all border border-amber-500/30 hover:border-amber-400/60 ${
                    index % 7 === 0 ? 'md:row-span-2' : ''
                  }`}
                >
                  <div className="relative h-full min-h-[300px]">
                    {project.image ? (
                      <Image
                        src={getImageUrl(project.image)}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-yellow-700" />
                    )}
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />
                    
                    <div className="absolute inset-0 p-6 flex flex-col justify-end translate-y-6 group-hover:translate-y-0 transition-transform duration-300">
                      <div className="flex flex-wrap gap-2 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                        {project.technologies?.slice(0, 3).map((tech, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-amber-500/90 text-white text-xs font-medium rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {project.title}
                      </h3>
                      
                      <p className="text-gray-200 text-sm mb-4 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-150">
                        {project.description}
                      </p>
                      
                      <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200">
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-white text-amber-600 rounded-lg font-semibold hover:bg-amber-50 transition-colors"
                          >
                            <FiExternalLink /> View Live
                          </a>
                        )}
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800/90 text-white rounded-lg font-semibold hover:bg-gray-700 transition-colors border border-amber-500/30"
                          >
                            <FiGithub /> Code
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        ) : (
          <div className="text-center py-32">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center">
              <FiLayers className="text-4xl text-gray-400" />
            </div>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              No projects found in this category.
            </p>
          </div>
        )}
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20, scale: 0.5 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1, type: "spring" }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.05 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-500 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-400 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
