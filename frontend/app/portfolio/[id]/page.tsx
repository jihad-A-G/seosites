'use client';

import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import api, { getImageUrl } from '@/lib/api';
import { ApiResponse, Project } from '@/types';
import { FiExternalLink, FiGithub, FiCalendar, FiUser, FiArrowLeft, FiCheck } from 'react-icons/fi';
import Image from 'next/image';
import Link from 'next/link';

export default function ProjectDetailsPage() {
  const params = useParams();
  const projectId = params.id as string;

  const { data, isLoading } = useQuery<ApiResponse<Project>>({
    queryKey: ['project', projectId],
    queryFn: async () => {
      const response = await api.get(`/projects/${projectId}`);
      return response.data;
    },
    enabled: !!projectId,
  });

  const project = data?.data;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading project...</div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Project Not Found</h1>
          <Link href="/portfolio" className="text-amber-400 hover:text-amber-300">
            ← Back to Portfolio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8"
          >
            <Link 
              href="/portfolio"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <FiArrowLeft /> Back to Portfolio
            </Link>
          </motion.div>

          {/* Header Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mb-12"
          >
            <div className="inline-block mb-4">
              <span className="px-4 py-2 bg-amber-400 text-black text-xs font-bold uppercase">
                {project.category}
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
              {project.title}
            </h1>

            {/* Project Meta */}
            <div className="flex flex-wrap gap-8 mb-8">
              <div>
                <div className="flex items-center gap-2 text-gray-500 mb-2">
                  <FiUser className="w-4 h-4" />
                  <span className="text-sm">Client</span>
                </div>
                <p className="text-white font-semibold">{project.client}</p>
              </div>
              <div>
                <div className="flex items-center gap-2 text-gray-500 mb-2">
                  <FiCalendar className="w-4 h-4" />
                  <span className="text-sm">Duration</span>
                </div>
                <p className="text-white font-semibold">{project.duration}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-amber-400 text-black font-bold hover:bg-amber-500 transition-colors"
                >
                  <FiExternalLink /> View Live Site
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 border-2 border-white text-white font-bold hover:bg-white hover:text-black transition-colors"
                >
                  <FiGithub /> View Code
                </a>
              )}
            </div>
          </motion.div>

          {/* Main Image - Full Width */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {project.images && project.images[0] ? (
              <div className="relative w-full aspect-video border-4 border-white">
                <Image
                  src={getImageUrl(project.images[0])}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="w-full aspect-video bg-gray-800 flex items-center justify-center border-4 border-white">
                <span className="text-gray-500">No Image Available</span>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Description Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-black mb-6">
              Project <span className="text-amber-400">Overview</span>
            </h2>
            <div className="text-lg text-gray-600 leading-relaxed max-w-full">
              {project.description.split('\n').map((line, index) => {
                const trimmedLine = line.trim();
                
                // Check if line is a list item (starts with - or •)
                if (trimmedLine.startsWith('-') || trimmedLine.startsWith('•')) {
                  return (
                    <div key={index} className="flex gap-3 mb-2">
                      <span className="text-amber-400 mt-1">•</span>
                      <span>{trimmedLine.replace(/^[-•]\s*/, '')}</span>
                    </div>
                  );
                }
                
                // Empty line creates spacing
                if (trimmedLine === '') {
                  return <div key={index} className="h-4" />;
                }
                
                // Regular paragraph
                return (
                  <p key={index} className="mb-4">
                    {line}
                  </p>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <h2 className="text-3xl font-bold text-black mb-4">
              Technologies <span className="text-amber-400">Used</span>
            </h2>
            <p className="text-gray-600 max-w-2xl">
              The tech stack that powered this project
            </p>
          </motion.div>

          {project.technologies && project.technologies.length > 0 ? (
            <div className="flex flex-wrap gap-3">
              {project.technologies.map((tech, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                  className="px-6 py-3 bg-black text-white font-semibold border-2 border-black hover:bg-white hover:text-black transition-colors"
                >
                  {tech}
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No technologies listed</p>
          )}
        </div>
      </section>

      {/* Project Gallery */}
      {project.images && project.images.length > 1 && (
        <section className="py-16 bg-black">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <h2 className="text-3xl font-bold text-white mb-4">
                Project <span className="text-amber-400">Gallery</span>
              </h2>
              <p className="text-gray-400 max-w-2xl">
                Visual highlights from the project
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {project.images.slice(1).map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                  className="relative aspect-video border-2 border-white/20 hover:border-amber-400 transition-colors overflow-hidden group"
                >
                  <Image
                    src={getImageUrl(image)}
                    alt={`${project.title} - Image ${index + 2}`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Project Details */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Challenge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-black mb-6">
                The <span className="text-amber-400">Challenge</span>
              </h2>
              {project.challenge ? (
                <div className="text-gray-600 leading-relaxed">
                  {project.challenge.split('\n').map((line, index) => {
                    const trimmedLine = line.trim();
                    
                    // Check if line is a list item (starts with - or •)
                    if (trimmedLine.startsWith('-') || trimmedLine.startsWith('•')) {
                      return (
                        <div key={index} className="flex gap-3 mb-2">
                          <div className="w-6 h-6 bg-amber-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <FiCheck className="w-4 h-4 text-black" />
                          </div>
                          <p className="text-gray-700">{trimmedLine.replace(/^[-•]\s*/, '')}</p>
                        </div>
                      );
                    }
                    
                    // Empty line creates spacing
                    if (trimmedLine === '') {
                      return <div key={index} className="h-4" />;
                    }
                    
                    // Regular paragraph
                    return (
                      <p key={index} className="mb-4">
                        {line}
                      </p>
                    );
                  })}
                </div>
              ) : (
                <p className="text-gray-600 leading-relaxed">
                  Every project presents unique challenges that require innovative solutions and careful planning to overcome.
                </p>
              )}
            </motion.div>

            {/* Solution */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-black mb-6">
                Our <span className="text-amber-400">Solution</span>
              </h2>
              {project.solution ? (
                <div className="text-gray-600 leading-relaxed">
                  {project.solution.split('\n').map((line, index) => {
                    const trimmedLine = line.trim();
                    
                    // Check if line is a list item (starts with - or •)
                    if (trimmedLine.startsWith('-') || trimmedLine.startsWith('•')) {
                      return (
                        <div key={index} className="flex gap-3 mb-2">
                          <div className="w-6 h-6 bg-amber-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <FiCheck className="w-4 h-4 text-black" />
                          </div>
                          <p className="text-gray-700">{trimmedLine.replace(/^[-•]\s*/, '')}</p>
                        </div>
                      );
                    }
                    
                    // Empty line creates spacing
                    if (trimmedLine === '') {
                      return <div key={index} className="h-4" />;
                    }
                    
                    // Regular paragraph
                    return (
                      <p key={index} className="mb-4">
                        {line}
                      </p>
                    );
                  })}
                </div>
              ) : (
                <p className="text-gray-600 leading-relaxed">
                  We implemented strategic solutions to address each challenge effectively.
                </p>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-16 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              The <span className="text-amber-400">Results</span>
            </h2>
            <p className="text-gray-400 max-w-2xl">
              Measurable outcomes and impact
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-6 border-2 border-white/20 hover:border-amber-400 transition-colors"
            >
              <div className="text-4xl font-bold text-white mb-2">100%</div>
              <p className="text-gray-400">Client Satisfaction</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
              className="p-6 border-2 border-white/20 hover:border-amber-400 transition-colors"
            >
              <div className="text-4xl font-bold text-white mb-2">50%</div>
              <p className="text-gray-400">Performance Improvement</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="p-6 border-2 border-white/20 hover:border-amber-400 transition-colors"
            >
              <div className="text-4xl font-bold text-white mb-2">2x</div>
              <p className="text-gray-400">User Engagement</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-black">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Ready to Start Your <span className="text-amber-400">Project?</span>
            </h2>
            <p className="text-xl text-gray-400 mb-10">
              Let's create something amazing together
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-amber-400 text-black font-bold hover:bg-amber-500 transition-colors"
              >
                Get in Touch
              </Link>
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white text-white font-bold hover:bg-white hover:text-black transition-colors"
              >
                View More Projects
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
