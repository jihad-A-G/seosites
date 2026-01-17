'use client';

import { motion } from 'framer-motion';
import { Service } from '@/types';
import { getIcon } from '@/lib/icons';

interface ServiceCardProps {
  service: Service;
  index: number;
}

export default function ServiceCard({ service, index }: ServiceCardProps) {
  const Icon = getIcon(service.icon);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group card p-8 hover:border-primary-500 dark:hover:border-primary-500 transition-all duration-300"
    >
      {/* Icon */}
      <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-lg bg-gradient-to-br from-primary-500 to-secondary-500 text-white transition-transform group-hover:scale-110">
        <Icon className="h-8 w-8" />
      </div>

      {/* Title */}
      <h3 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
        {service.title}
      </h3>

      {/* Description */}
      <p className="mb-6 text-gray-600 dark:text-gray-400">{service.description}</p>

      {/* Features */}
      {service.features && service.features.length > 0 && (
        <ul className="space-y-2">
          {service.features.map((feature, idx) => (
            <li key={idx} className="flex items-start text-sm text-gray-600 dark:text-gray-400">
              <span className="mr-2 mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-500" />
              {feature}
            </li>
          ))}
        </ul>
      )}
    </motion.div>
  );
}
