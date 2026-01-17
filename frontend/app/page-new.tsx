'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';
import { useQuery } from '@tanstack/react-query';
import api, { getImageUrl } from '@/lib/api';
import { ApiResponse, Project, Service, Testimonial } from '@/types';
import Image from 'next/image';
import { getIcon } from '@/lib/icons';

export default function HomePage() {
  // Fetch featured projects
  const { data: projectsData } = useQuery<ApiResponse<Project[]>>({
    queryKey: ['projects', 'featured'],
    queryFn: async () => {
      const response = await api.get('/projects/featured');
      return response.data;
    },
  });

  // Fetch services
  const { data: servicesData } = useQuery<ApiResponse<Service[]>>({
    queryKey: ['services'],
    queryFn: async () => {
      const response = await api.get('/services');
      return response.data;
    },
  });

  // Fetch testimonials
  const { data: testimonialsData } = useQuery<ApiResponse<Testimonial[]>>({
    queryKey: ['testimonials', 'featured'],
    queryFn: async () => {
      const response = await api.get('/testimonials/featured');
      return response.data;
    },
  });

  const projects = projectsData?.data || [];
  const services = servicesData?.data || [];
  const testimonials = testimonialsData?.data || [];

  return (
    <div className="bg-white dark:bg-gray-950">
      {/* Hero Section - Goji Labs Style */}
      <section className="relative min-h-[90vh] flex items-center justify-center bg-gray-950 text-white overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-950 to-black" />
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
              A Digital Product<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                Agency That Builds it Right.
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-4xl mx-auto leading-relaxed">
              We help our clients turn complex challenges into intuitive products through strategy, design, and development.
            </p>
            <Link 
              href="/contact" 
              className="inline-flex items-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all duration-200 hover:scale-105"
            >
              Book Discovery Call
              <FiArrowRight />
            </Link>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-24 grid grid-cols-3 gap-12 max-w-4xl mx-auto"
          >
            {[
              { value: '150+', label: 'Products Launched' },
              { value: '500K+', label: 'Users Supported' },
              { value: '$50M+', label: 'Raised By Our Clients' },
            ].map((stat, index) => (
              <div key={index} className="border-l border-gray-700 pl-6 text-left">
                <div className="text-5xl font-bold mb-2">{stat.value}</div>
                <div className="text-gray-400 text-sm uppercase tracking-wide">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Our Work Section */}
      <section className="py-24 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
              Our Work
            </h2>
            <Link 
              href="/portfolio" 
              className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-2"
            >
              See all Work <FiArrowRight />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.slice(0, 6).map((project, index) => (
              <motion.div
                key={project._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
              >
                <Link href={`/portfolio/${project._id}`}>
                  <div className="relative aspect-[4/3] mb-4 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
                    {project.images && project.images[0] && (
                      <Image
                        src={getImageUrl(project.images[0])}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    )}
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 line-clamp-2">
                    {project.description}
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
              Our Services
            </h2>
            <Link 
              href="/services" 
              className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-2"
            >
              See all Services <FiArrowRight />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 p-8 rounded-lg hover:shadow-xl transition-shadow duration-300"
              >
                {(() => {
                  const Icon = getIcon(service.icon);
                  return <Icon className="w-12 h-12 text-blue-600 dark:text-blue-400 mb-4" />;
                })()}
                <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
                  {service.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center text-gray-900 dark:text-white">
            What Our Partners Are Saying:
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 dark:bg-gray-900 p-8 rounded-lg border border-gray-200 dark:border-gray-800"
              >
                <blockquote className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                  "{testimonial.content}"
                </blockquote>
                <div className="flex items-center gap-4">
                  {testimonial.avatar && (
                    <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
                      <Image
                        src={getImageUrl(testimonial.avatar)}
                        alt={testimonial.clientName}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {testimonial.clientName}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {testimonial.position}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gray-950 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Let's Talk
          </h2>
          <p className="text-xl text-gray-300 mb-10">
            Ready to transform your digital presence? Let's discuss how we can help.
          </p>
          <Link 
            href="/contact" 
            className="inline-flex items-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all duration-200 hover:scale-105"
          >
            Book a Call
            <FiArrowRight />
          </Link>
        </div>
      </section>
    </div>
  );
}
