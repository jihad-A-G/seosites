'use client';

import { motion } from 'framer-motion';
import { Testimonial } from '@/types';
import { FiStar } from 'react-icons/fi';
import { getInitials } from '@/lib/utils';
import { getImageUrl } from '@/lib/api';

interface TestimonialCardProps {
  testimonial: Testimonial;
  index: number;
}

export default function TestimonialCard({ testimonial, index }: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="card p-8"
    >
      {/* Rating */}
      <div className="mb-4 flex space-x-1">
        {[...Array(5)].map((_, i) => (
          <FiStar
            key={i}
            className={`h-5 w-5 ${
              i < testimonial.rating
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-gray-300 dark:text-gray-600'
            }`}
          />
        ))}
      </div>

      {/* Content */}
      <p className="mb-6 text-gray-700 dark:text-gray-300 italic">
        &ldquo;{testimonial.content}&rdquo;
      </p>

      {/* Author */}
      <div className="flex items-center space-x-4">
        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 text-white font-semibold">
          {testimonial.avatar ? (
            <img
              src={getImageUrl(testimonial.avatar)}
              alt={testimonial.clientName}
              className="h-full w-full rounded-full object-cover"
            />
          ) : (
            getInitials(testimonial.clientName)
          )}
        </div>
        <div>
          <p className="font-semibold text-gray-900 dark:text-white">
            {testimonial.clientName}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {testimonial.position}
            {testimonial.company && ` at ${testimonial.company}`}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
