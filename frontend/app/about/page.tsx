'use client';

import { motion } from 'framer-motion';
import { FiTarget, FiHeart, FiZap, FiAward } from 'react-icons/fi';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import { ApiResponse, Stat, CompanyInfo } from '@/types';

export default function AboutPage() {
  const { data: statsData } = useQuery<ApiResponse<Stat[]>>({
    queryKey: ['stats', 'about'],
    queryFn: async () => {
      const response = await api.get('/stats/page/about');
      return response.data;
    },
  });

  const { data: companyData } = useQuery<ApiResponse<CompanyInfo>>({
    queryKey: ['company-info'],
    queryFn: async () => {
      const response = await api.get('/company-info');
      return response.data;
    },
  });

  const stats = statsData?.data || [];
  const companyInfo = companyData?.data;

  const values = [
    {
      icon: FiTarget,
      title: 'Innovation',
      description: 'We stay ahead of technology trends to deliver cutting-edge solutions',
    },
    {
      icon: FiHeart,
      title: 'Quality',
      description: 'We are committed to excellence in every project we undertake',
    },
    {
      icon: FiZap,
      title: 'Speed',
      description: 'We deliver results quickly without compromising on quality',
    },
    {
      icon: FiAward,
      title: 'Excellence',
      description: 'We strive for perfection in every aspect of our work',
    },
  ];

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
                About Us
              </span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
              Crafting Digital <span className="text-amber-400">Excellence</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              We are a team of passionate developers and designers dedicated to creating exceptional experiences
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black">
                Our <span className="text-amber-400">Journey</span>
              </h2>
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                {companyInfo?.story?.split('\n\n').map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                )) || (
                  <p>
                    Founded in 2014, seosites began with a simple mission: to help businesses leverage the power of digital technology to achieve their goals and drive growth.
                  </p>
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative bg-amber-400 p-1">
                <div className="bg-white p-12 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="text-8xl font-bold text-black mb-4"
                  >
                    {companyInfo?.foundedYear ? new Date().getFullYear() - companyInfo.foundedYear : 10}+
                  </motion.div>
                  <div className="text-2xl font-semibold text-black">
                    Years of Excellence
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      {stats.length > 0 && (
        <section className="py-24 bg-black">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center border border-white/10 p-8"
                >
                  <div className="text-5xl font-bold text-amber-400 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-400 uppercase tracking-wider">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Values Section */}
      <section className="py-24 bg-white">
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
              className="inline-block mb-4"
            >
              <span className="text-amber-400 text-sm font-bold uppercase tracking-wider px-4 py-2 bg-amber-50 border border-amber-400">
                Our Values
              </span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-black">
              What Drives <span className="text-amber-400">Us</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The principles that guide our work and relationships
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className="bg-white p-8 border border-gray-200 hover:border-gray-300 transition-all group"
                >
                  <div className="w-16 h-16 bg-amber-400 flex items-center justify-center mb-6 text-white">
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-black">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      {companyInfo?.mission && (
        <section className="py-24 bg-black">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <motion.div 
                initial={{ scale: 0.8 }}
                whileInView={{ scale: 1 }}
                className="inline-block mb-4"
              >
                <span className="text-amber-400 text-sm font-bold uppercase tracking-wider px-4 py-2 bg-amber-500/10 border border-amber-500/30">
                  Our Mission
                </span>
              </motion.div>
              <p className="text-2xl md:text-3xl font-medium text-white leading-relaxed">
                "{companyInfo.mission}"
              </p>
            </motion.div>
          </div>
        </section>
      )}
    </div>
  );
}
