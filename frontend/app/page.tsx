'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { FiArrowRight, FiCode, FiLayers, FiZap, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useQuery } from '@tanstack/react-query';
import api, { getImageUrl } from '@/lib/api';
import { ApiResponse, Project, Service, Testimonial, Stat } from '@/types';
import Image from 'next/image';
import { getIcon } from '@/lib/icons';
import { getTechIconUrl } from '@/lib/techIcons';
import { getServiceIconUrl } from '@/lib/serviceIcons';
import { useState, useEffect } from 'react';

export default function HomePage() {
  const [isMounted, setIsMounted] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [expandedTestimonial, setExpandedTestimonial] = useState<string | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  const { data: projectsData } = useQuery<ApiResponse<Project[]>>({
    queryKey: ['projects', 'featured'],
    queryFn: async () => {
      const response = await api.get('/projects/featured');
      return response.data;
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const { data: servicesData } = useQuery<ApiResponse<Service[]>>({
    queryKey: ['services'],
    queryFn: async () => {
      const response = await api.get('/services');
      return response.data;
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const { data: testimonialsData } = useQuery<ApiResponse<Testimonial[]>>({
    queryKey: ['testimonials', 'featured'],
    queryFn: async () => {
      const response = await api.get('/testimonials/featured');
      return response.data;
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const { data: statsData } = useQuery<ApiResponse<Stat[]>>({
    queryKey: ['stats', 'home'],
    queryFn: async () => {
      const response = await api.get('/stats/page/home');
      return response.data;
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const { data: technologiesData } = useQuery({
    queryKey: ['technologies'],
    queryFn: async () => {
      const response = await api.get('/technologies');
      return response.data;
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const projects = projectsData?.data || [];
  const services = servicesData?.data || [];
  const testimonials = testimonialsData?.data || [];
  const stats = statsData?.data || [];
  
  // Convert grouped technologies to flat array
  const groupedTech = technologiesData?.data || {};
  const technologies = Object.values(groupedTech).flat() as any[];

  return (
    <div className="bg-[#0a0a0a] text-white">
      {/* Hero Section - With Background Image */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-0 -mt-16">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero-background.png"
            alt="Web Development Background"
            fill
            className="object-cover opacity-80"
            priority
          />
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent" />
        </div>

        {/* Animated golden particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {isMounted && [...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-amber-400/60 rounded-full"
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
              }}
              animate={{
                y: [null, Math.random() * window.innerHeight],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 w-full pt-32">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content - Text Area */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              {/* Decorative golden accent */}
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "80px" }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="h-1 bg-gradient-to-r from-amber-400 to-yellow-600 mb-8"
              />
              
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-400/10 border border-amber-400/30 rounded-full mb-6 backdrop-blur-sm">
                <FiZap className="text-amber-400" />
                <span className="text-sm font-medium text-amber-300">
                  Premium Web Development
                </span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                <span className="text-white">Build Your</span>
                <br />
                <span className="relative inline-block">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500">
                    Digital Empire
                  </span>
                  <motion.div
                    className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-amber-400 to-yellow-600"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                  />
                </span>
              </h1>

              <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed max-w-xl">
                Transform your vision into reality with cutting-edge web solutions. 
                We craft high-performance websites that captivate, convert, and dominate the digital landscape.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link 
                  href="/contact" 
                  className="group relative px-8 py-4 bg-gradient-to-r from-amber-500 to-yellow-600 text-black font-bold overflow-hidden transition-all hover:shadow-2xl hover:shadow-amber-500/50 hover:-translate-y-1"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Start Your Project
                    <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-yellow-600 to-amber-700"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
                
                <Link 
                  href="/portfolio"
                  className="px-8 py-4 border-2 border-amber-500/50 text-amber-300 font-bold hover:border-amber-400 hover:bg-amber-500/10 hover:text-amber-200 transition-all backdrop-blur-sm"
                >
                  View Our Work
                </Link>
              </div>

              {/* Mini Stats - Golden Theme */}
              <div className="grid grid-cols-3 gap-6 mt-12 pt-12 border-t border-amber-500/20">
                {stats.slice(0, 3).map((stat, i) => (
                  <motion.div 
                    key={stat._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 + i * 0.1, duration: 0.5 }}
                  >
                    <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-500 mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* Tech Icons Showcase */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="mt-12 flex items-center gap-4"
              >
                <span className="text-sm text-gray-500 uppercase tracking-wider">Powered by:</span>
                <div className="flex gap-3">
                  <FiCode className="text-amber-400 text-2xl" />
                  <FiLayers className="text-amber-400 text-2xl" />
                  <FiZap className="text-amber-400 text-2xl" />
                </div>
              </motion.div>
            </motion.div>

            {/* Right side - Let background image show through */}
            <div className="hidden lg:block" />
          </div>
        </div>
      </section>

      {/* Featured Work - Clean Black & White */}
      <section className="py-24 relative bg-black">
        
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-block mb-4"
            >
              <span className="text-amber-400 text-sm font-bold uppercase tracking-wider px-4 py-2 bg-amber-500/10 border border-amber-500/30">Portfolio</span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Featured <span className="text-amber-400">Projects</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Discover how we've helped businesses transform their digital presence
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {projects.slice(0, 4).map((project, index) => (
              <motion.div
                key={project._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`group relative overflow-hidden rounded-none border border-white/10 hover:border-amber-400/50 transition-all ${
                  index === 0 ? 'md:row-span-2' : ''
                }`}
              >
                <Link href={`/portfolio/${project._id}`}>
                  <div className={`relative ${index === 0 ? 'h-full' : 'h-80'} bg-white`}>
                    {project.images && project.images[0] && (
                      <Image
                        src={getImageUrl(project.images[0])}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    )}
                    
                    {/* Simple dark overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                    
                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                      <div className="mb-2 inline-block px-3 py-1 bg-amber-400 text-black text-xs font-bold uppercase">
                        {project.category}
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {project.title}
                      </h3>
                      <p className="text-gray-300 group-hover:text-white transition-colors duration-300">
                        {project.description.substring(0, 100)}...
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link 
              href="/portfolio" 
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-yellow-600 text-black  font-bold hover:shadow-2xl hover:shadow-amber-500/30 transition-all hover:-translate-y-1"
            >
              View All Projects
              <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* Services - Clean Black & White */}
      <section className="py-24 bg-white relative">

        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-block mb-4"
            >
              <span className="text-amber-400 text-sm font-bold uppercase tracking-wider px-4 py-2 bg-amber-50 border border-amber-400">Services</span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-black">
              What We <span className="text-amber-400">Offer</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive solutions tailored to your business needs
            </p>
          </motion.div>

          <div className="space-y-0">
            {services.map((service, index) => (
              <motion.div
                key={service._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`group border-t border-gray-200 ${index === services.length - 1 ? 'border-b border-gray-200' : ''} relative overflow-hidden`}
              >
                <Link href={`/services/${service._id}`} className="block">
                  <div className={`grid lg:grid-cols-2 gap-8 py-12 px-8 relative z-10`}>
                    <div>
                      <h3 className="text-3xl md:text-4xl font-bold mb-4 text-black group-hover:text-white transition-colors duration-500">
                        {service.title}
                      </h3>
                    </div>
                    
                    <div className="flex flex-col justify-center">
                      <p className="text-lg leading-relaxed mb-6 text-gray-600 group-hover:text-gray-300 transition-colors duration-500">
                        {service.description}
                      </p>
                      
                      {service.features && service.features.length > 0 && (
                        <ul className="space-y-2 mb-6">
                          {service.features.slice(0, 3).map((feature, i) => (
                            <li key={i} className="flex items-center gap-2 text-sm text-gray-600 group-hover:text-gray-400 transition-colors duration-500">
                              <span className="w-1.5 h-1.5 bg-black group-hover:bg-white rounded-full transition-colors duration-500" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      )}
                      
                      <div className="inline-flex items-center gap-2 text-sm font-medium text-amber-400 group-hover:gap-3 transition-all duration-500">
                        Learn more
                        <FiArrowRight className="text-base" />
                      </div>
                    </div>
                  </div>

                  {/* Black overlay that slides up on hover */}
                  <div className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-out">
                    {/* Service icon covering right side with gray background */}
                    <div className="absolute inset-0 flex items-center justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-200">
                      <div className="w-1/2 h-full bg-gradient-to-l from-gray-800/80 to-transparent flex items-center justify-center">
                        {service.icon ? (
                          <img
                            src={getServiceIconUrl(service.icon)}
                            alt={service.title}
                            className="w-48 h-48 object-contain opacity-40"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                        ) : (
                          (() => {
                            const Icon = getIcon(service.icon || 'FiCode');
                            return <Icon className="w-48 h-48 text-white/40" />;
                          })()
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section - Tech Stack */}
      <section className="py-24 bg-black relative">
        
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-block mb-4"
            >
              <span className="text-amber-400 text-sm font-bold uppercase tracking-wider px-4 py-2 bg-amber-500/10 border border-amber-500/30">Technologies</span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Our <span className="text-amber-400">Tech Stack</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Cutting-edge technologies powering exceptional digital experiences
            </p>
          </motion.div>

          {technologies.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 md:gap-12">
              {technologies.map((tech: any, index: number) => (
                <motion.div
                  key={tech._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center justify-center group"
                >
                  {/* Icon Container */}
                  <div className="mb-4 relative">
                    {tech.icon ? (
                      <div className="relative">
                        <img
                          src={getTechIconUrl(tech.icon)}
                          alt={tech.name}
                          className="w-16 h-16 md:w-20 md:h-20 object-contain transition-all duration-300 group-hover:scale-110 filter brightness-0 invert group-hover:drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                            if (fallback) fallback.style.display = 'flex';
                          }}
                        />
                        <div className="hidden w-16 h-16 md:w-20 md:h-20 bg-gray-800 items-center justify-center">
                          <FiCode className="text-gray-400 text-3xl" />
                        </div>
                      </div>
                    ) : (
                      <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-800 flex items-center justify-center group-hover:bg-gray-700 transition-colors">
                        <FiCode className="text-gray-400 text-3xl group-hover:text-amber-400" />
                      </div>
                    )}
                  </div>
                  
                  {/* Technology Name */}
                  <p className="text-white text-sm md:text-base font-medium text-center group-hover:text-amber-400 transition-colors">
                    {tech.name}
                  </p>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">Loading technologies...</p>
            </div>
          )}
        </div>
      </section>

      {/* Testimonials - Clean White */}
      <section className="py-24 bg-white relative">
        
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="flex items-center justify-between mb-8">
              <div>
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="inline-block mb-4"
                >
                  <span className="text-amber-400 text-sm font-bold uppercase tracking-wider px-4 py-2 bg-amber-50 border border-amber-400">Testimonials</span>
                </motion.div>
                <h2 className="text-4xl md:text-5xl font-bold mb-4 text-black">
                  Client <span className="text-amber-400">Testimonials</span>
                </h2>
              </div>
              
              {/* Carousel Navigation */}
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentTestimonial((prev) => 
                    prev === 0 ? Math.max(0, testimonials.length - 2) : prev - 1
                  )}
                  className="w-12 h-12 flex items-center justify-center bg-black hover:bg-gray-900 transition-colors border border-black"
                  aria-label="Previous testimonial"
                >
                  <FiChevronLeft className="text-white text-xl" />
                </button>
                <button
                  onClick={() => setCurrentTestimonial((prev) => 
                    prev >= testimonials.length - 2 ? 0 : prev + 1
                  )}
                  className="w-12 h-12 flex items-center justify-center bg-black hover:bg-gray-900 transition-colors border border-black"
                  aria-label="Next testimonial"
                >
                  <FiChevronRight className="text-white text-xl" />
                </button>
              </div>
            </div>
          </motion.div>

          <div className="relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
                className="grid md:grid-cols-2 gap-6"
              >
                {testimonials.slice(currentTestimonial, currentTestimonial + 2).map((testimonial, index) => {
                  const isExpanded = expandedTestimonial === testimonial._id;
                  const content = testimonial.content || '';
                  const truncatedContent = content.length > 150 
                    ? content.substring(0, 150) + '...' 
                    : content;

                  return (
                    <motion.div
                      key={testimonial._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white p-8 group cursor-pointer border border-gray-200 hover:border-gray-300 transition-colors"
                      onClick={() => setExpandedTestimonial(isExpanded ? null : testimonial._id)}
                    >
                      {/* Company Logo Placeholder */}
                      <div className="mb-6">
                        <div className="h-12 flex items-center">
                          <span className="text-2xl font-bold text-black">
                            {testimonial.company}
                          </span>
                        </div>
                      </div>

                      {/* Testimonial Content */}
                      <p className="text-gray-700 leading-relaxed mb-6">
                        "{isExpanded ? content : truncatedContent}"
                      </p>

                      {/* Author Info */}
                      <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
                        {testimonial.avatar && (
                          <div className="relative w-12 h-12 rounded-full overflow-hidden">
                            <Image
                              src={getImageUrl(testimonial.avatar)}
                              alt={testimonial.clientName}
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                        <div>
                          <div className="font-semibold text-gray-900">
                            {testimonial.clientName}
                          </div>
                          <div className="text-sm text-gray-600">
                            {testimonial.position}
                          </div>
                        </div>
                      </div>

                      {/* Learn More Link */}
                      <div className="mt-6 flex items-center gap-2 text-sm font-medium text-amber-400 group-hover:text-amber-500 group-hover:gap-3 transition-all">
                        Learn more
                        <FiArrowRight className="text-base" />
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>
    </div>
  );
}

