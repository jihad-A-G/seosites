'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Project } from '@/types';
import { FiExternalLink, FiEye } from 'react-icons/fi';
import { getImageUrl } from '@/lib/api';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group card overflow-hidden"
    >
      {/* Image */}
      <div className="relative h-64 overflow-hidden bg-gray-200 dark:bg-gray-800">
        {project.images && project.images.length > 0 ? (
          <Image
            src={getImageUrl(project.images[0])}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="text-4xl font-bold text-gray-400">
              {project.title.charAt(0)}
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        
        {/* Overlay Actions */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="flex space-x-4">
            <Link
              href={`/portfolio/${project._id}`}
              className="flex items-center space-x-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-gray-900 transition-transform hover:scale-105"
            >
              <FiEye />
              <span>View Details</span>
            </Link>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white transition-transform hover:scale-105"
              >
                <FiExternalLink />
                <span>Live Demo</span>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="mb-2 flex items-center justify-between">
          <span className="rounded-full bg-primary-100 px-3 py-1 text-xs font-medium text-primary-700 dark:bg-primary-900/30 dark:text-primary-400">
            {project.category}
          </span>
          {project.featured && (
            <span className="text-xs font-medium text-yellow-600 dark:text-yellow-500">
              ⭐ Featured
            </span>
          )}
        </div>

        <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
          {project.title}
        </h3>

        <p className="mb-4 line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2">
          {project.technologies.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="rounded-md bg-gray-100 px-2 py-1 text-xs text-gray-700 dark:bg-gray-800 dark:text-gray-300"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="rounded-md bg-gray-100 px-2 py-1 text-xs text-gray-700 dark:bg-gray-800 dark:text-gray-300">
              +{project.technologies.length - 3}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
