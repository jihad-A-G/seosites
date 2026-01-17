'use client';

import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import { ApiResponse, Service, ProcessStep } from '@/types';
import { FiCheck, FiArrowRight, FiZap } from 'react-icons/fi';
import Link from 'next/link';
import { getIcon } from '@/lib/icons';

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
      <section className="py-24 max-w-7xl mx-auto px-6">
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-80 bg-gray-200 dark:bg-gray-800 rounded-2xl animate-pulse"
              />
            ))}
          </div>
        ) : services.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service._id}
                initial={{ opacity: 0, rotateX: -15 }}
                whileInView={{ opacity: 1, rotateX: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1, type: "spring", stiffness: 100 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02, transition: { duration: 0.3 } }}
                className="group relative bg-gradient-to-br from-amber-500/10 to-yellow-600/10 p-8 rounded-2xl shadow-xl hover:shadow-2xl hover:shadow-amber-500/30 border border-amber-500/30 hover:border-amber-400/60 backdrop-blur-sm"
              >
                {/* Shimmer effect */}
                <motion.div 
                  className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-amber-400/10 to-transparent"
                  animate={{
                    x: ['-100%', '100%']
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.2 + 3,
                    repeatDelay: 3
                  }}
                />

                {/* Corner accents */}
                <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-amber-400/40 rounded-tr-2xl" />
                <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-amber-400/40 rounded-bl-2xl" />
                
                <div className="relative">
                  <motion.div 
                    whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                    transition={{ duration: 0.5 }}
                    className="w-16 h-16 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-xl flex items-center justify-center mb-6 text-white text-3xl shadow-lg shadow-amber-500/50"
                  >
                    {(() => {
                      const Icon = getIcon(service.icon);
                      return <Icon className="w-8 h-8" />;
                    })()}
                  </motion.div>
                  
                  <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-amber-300 transition-colors">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-300 leading-relaxed mb-6 group-hover:text-white transition-colors">
                    {service.description}
                  </p>

                  {service.features && service.features.length > 0 && (
                    <ul className="space-y-2 mb-6">
                      {service.features.slice(0, 3).map((feature, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-gray-400 group-hover:text-gray-200 transition-colors">
                          <FiCheck className="text-amber-400 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  <Link
                    href={`/services/${service._id}`}
                    className="inline-flex items-center gap-2 text-amber-400 font-semibold group-hover:gap-4 transition-all"
                  >
                    Learn More 
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <FiArrowRight />
                    </motion.div>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Services will be added soon.
            </p>
          </div>
        )}
      </section>

      {/* Process Section */}
      <section className="py-24 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.div 
              initial={{ scale: 0.8 }}
              whileInView={{ scale: 1 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/30 backdrop-blur-sm rounded-full mb-6"
            >
              <FiZap className="text-amber-400" />
              <span className="text-sm font-medium text-amber-300">
                How We Work
              </span>
            </motion.div>

            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500">Process</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              A proven methodology that delivers exceptional results
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="relative"
              >
                <div className="relative bg-gradient-to-br from-amber-500/10 to-yellow-600/10 p-8 rounded-2xl border border-amber-500/30 hover:border-amber-400/60 transition-all backdrop-blur-sm group">
                  <div className="text-6xl font-bold text-amber-400/20 mb-4 group-hover:text-amber-400/30 transition-colors">
                    {item.step}
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-amber-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                    {item.description}
                  </p>
                </div>
                
                {index < processSteps.length - 1 && (
                  <motion.div 
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ delay: index * 0.2 + 0.5 }}
                    className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-amber-400 to-yellow-500 origin-left" 
                  />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 overflow-hidden">
        <motion.div
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute inset-0 bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-700"
          style={{ backgroundSize: '200% 200%' }}
        />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl mb-10 text-amber-100">
              Let's discuss how we can help transform your digital presence.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link 
                href="/contact" 
                className="inline-flex items-center gap-2 bg-white text-amber-600 px-10 py-5 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all shadow-2xl hover:shadow-amber-500/50 hover:-translate-y-1"
              >
                Contact Us
                <FiArrowRight className="text-xl" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
