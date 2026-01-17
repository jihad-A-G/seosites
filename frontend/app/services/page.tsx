'use client';

import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import { ApiResponse, Service, ProcessStep } from '@/types';
import { FiArrowRight } from 'react-icons/fi';
import Link from 'next/link';
import { getIcon } from '@/lib/icons';
import { getServiceIconUrl } from '@/lib/serviceIcons';

export default function ServicesPage() {
  const { data, isLoading } = useQuery<ApiResponse<Service[]>>({
    queryKey: ['services'],
    queryFn: async () => {
      const response = await api.get('/services');
      return response.data;
    },
  });

  const { data: processData } = useQuery<ApiResponse<ProcessStep[]>>({
    queryKey: ['process-steps'],
    queryFn: async () => {
      const response = await api.get('/process-steps');
      return response.data;
    },
  });

  const services = data?.data || [];
  const processSteps = processData?.data || [];

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
                What We Do
              </span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
              Our <span className="text-amber-400">Services</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Comprehensive digital solutions designed to transform your business
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="h-80 bg-gray-200 animate-pulse"
                />
              ))}
            </div>
          ) : services.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, index) => (
                <motion.div
                  key={service._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className="group relative bg-white p-8 border border-gray-200 hover:border-gray-300 transition-all"
                >
                  <div className="relative">
                    <div className="w-16 h-16 bg-amber-400 flex items-center justify-center mb-6 text-white text-3xl">
                      {service.icon ? (
                        <img
                          src={getServiceIconUrl(service.icon)}
                          alt={service.title}
                          className="w-10 h-10 object-contain brightness-0 invert"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      ) : (
                        (() => {
                          const Icon = getIcon(service.icon || 'FiCode');
                          return <Icon className="w-8 h-8" />;
                        })()
                      )}
                    </div>
                    
                    <h3 className="text-2xl font-bold mb-4 text-black">
                      {service.title}
                    </h3>
                    
                    <p className="text-gray-600 leading-relaxed mb-6">
                      {service.description}
                    </p>

                    {service.features && service.features.length > 0 && (
                      <ul className="space-y-2 mb-6">
                        {service.features.slice(0, 3).map((feature, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                            <span className="w-1.5 h-1.5 bg-black rounded-full flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    <Link
                      href={`/services/${service._id}`}
                      className="inline-flex items-center gap-2 text-amber-400 font-semibold group-hover:text-amber-500 group-hover:gap-3 transition-all"
                    >
                      Learn More 
                      <FiArrowRight />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-xl text-gray-600">
                Services will be added soon.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-black relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(90deg, rgba(251,191,36,0.1) 1px, transparent 1px), linear-gradient(rgba(251,191,36,0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }} />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.div 
              initial={{ scale: 0.8 }}
              whileInView={{ scale: 1 }}
              className="inline-block mb-4"
            >
              <span className="text-amber-400 text-sm font-bold uppercase tracking-wider px-4 py-2 bg-amber-500/10 border border-amber-500/30">
                How We Work
              </span>
            </motion.div>

            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Our <span className="text-amber-400">Process</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              A proven methodology that delivers exceptional results
            </p>
          </motion.div>

          {/* Desktop Timeline View */}
          <div className="hidden lg:block relative">
            {/* Connecting line */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-amber-400/30 to-transparent -translate-y-1/2" />
            
            <div className="grid grid-cols-4 gap-8">
              {processSteps.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  {/* Step number circle */}
                  <div className="flex justify-center mb-8">
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className="w-16 h-16 bg-amber-400 border-4 border-black flex items-center justify-center relative z-10"
                    >
                      <span className="text-2xl font-bold text-black">{item.step}</span>
                    </motion.div>
                  </div>

                  {/* Content card */}
                  <motion.div
                    whileHover={{ y: -8 }}
                    className="bg-white p-6 border-2 border-transparent hover:border-amber-400 transition-all duration-300 group relative"
                  >
                    {/* Corner accent */}
                    <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-amber-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    
                    <h3 className="text-xl font-bold mb-3 text-black group-hover:text-amber-400 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {item.description}
                    </p>

                    {/* Arrow indicator */}
                    {index < processSteps.length - 1 && (
                      <div className="absolute -right-4 top-1/2 -translate-y-1/2 text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity">
                        <FiArrowRight className="w-6 h-6" />
                      </div>
                    )}
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mobile/Tablet Vertical Timeline */}
          <div className="lg:hidden relative">
            {/* Vertical connecting line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-amber-400/30 to-transparent" />
            
            <div className="space-y-8">
              {processSteps.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative flex gap-6"
                >
                  {/* Step number circle */}
                  <motion.div 
                    whileHover={{ scale: 1.1 }}
                    className="w-16 h-16 bg-amber-400 border-4 border-black flex items-center justify-center flex-shrink-0 relative z-10"
                  >
                    <span className="text-2xl font-bold text-black">{item.step}</span>
                  </motion.div>

                  {/* Content card */}
                  <motion.div
                    whileHover={{ x: 8 }}
                    className="flex-1 bg-white p-6 border-2 border-transparent hover:border-amber-400 transition-all group"
                  >
                    <h3 className="text-xl font-bold mb-3 text-black group-hover:text-amber-400 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
