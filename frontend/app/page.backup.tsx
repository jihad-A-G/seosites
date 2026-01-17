'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiArrowRight, FiCheck } from 'react-icons/fi';
import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import { ApiResponse, Project, Service, Testimonial } from '@/types';
import ProjectCard from '@/components/cards/ProjectCard';
import ServiceCard from '@/components/cards/ServiceCard';
import TestimonialCard from '@/components/cards/TestimonialCard';

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

  // Fetch featured testimonials
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
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-primary-500/20 to-transparent rounded-full blur-3xl animate-float" />
          <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-secondary-500/20 to-transparent rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
        </div>

        <div className="relative z-10 section-container text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 font-display">
              <span className="gradient-text">Digital Solutions</span>
              <br />
              for Modern Businesses
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Transform your vision into reality with cutting-edge web development, mobile apps,
              and innovative SaaS solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/portfolio" className="btn-primary group">
                View Our Work
                <FiArrowRight className="ml-2 inline-block group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/contact" className="btn-outline">
                Get Started
              </Link>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {[
              { label: 'Projects Completed', value: '150+' },
              { label: 'Happy Clients', value: '80+' },
              { label: 'Years Experience', value: '10+' },
              { label: 'Team Members', value: '25+' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-container bg-white dark:bg-gray-950">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 font-display">
              Our <span className="gradient-text">Services</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Comprehensive digital solutions tailored to your business needs
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.slice(0, 6).map((service, index) => (
            <ServiceCard key={service._id} service={service} index={index} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/services" className="btn-outline group">
            View All Services
            <FiArrowRight className="ml-2 inline-block group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="section-container bg-gray-50 dark:bg-gray-900">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 font-display">
              Featured <span className="gradient-text">Projects</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Showcasing our best work and success stories
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.slice(0, 6).map((project, index) => (
            <ProjectCard key={project._id} project={project} index={index} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/portfolio" className="btn-primary group">
            View All Projects
            <FiArrowRight className="ml-2 inline-block group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Testimonials Section */}
      {testimonials.length > 0 && (
        <section className="section-container bg-white dark:bg-gray-950">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4 font-display">
                Client <span className="gradient-text">Testimonials</span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                What our clients say about working with us
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.slice(0, 3).map((testimonial, index) => (
              <TestimonialCard key={testimonial._id} testimonial={testimonial} index={index} />
            ))}
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 gradient-bg opacity-90" />
        <div className="relative z-10 section-container text-center text-white">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-display">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Let&apos;s work together to bring your ideas to life and transform your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="px-8 py-4 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-100 transition-all duration-200 shadow-xl hover:shadow-2xl hover:scale-105"
              >
                Get in Touch
              </Link>
              <Link
                href="/portfolio"
                className="px-8 py-4 bg-white/10 backdrop-blur-lg border-2 border-white text-white font-semibold rounded-lg hover:bg-white/20 transition-all duration-200"
              >
                View Portfolio
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
