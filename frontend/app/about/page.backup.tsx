'use client';

import { motion } from 'framer-motion';
import { FiTarget, FiHeart, FiZap, FiAward, FiUsers } from 'react-icons/fi';
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-black">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              rotate: -360,
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-tl from-amber-400/20 to-yellow-600/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              rotate: 360,
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-20 left-10 w-[500px] h-[500px] bg-gradient-to-br from-amber-500/10 to-yellow-400/10 rounded-full blur-3xl"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/30 backdrop-blur-sm rounded-full mb-6"
            >
              <FiUsers className="text-amber-400" />
              <span className="text-sm font-medium text-amber-300">
                About Us
              </span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
              Crafting Digital <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500">Excellence</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              We are a team of passionate developers, designers, and strategists dedicated to creating exceptional digital experiences.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-500">Journey</span>
            </h2>
            <div className="space-y-6 text-lg text-gray-400 leading-relaxed">
              {companyInfo?.story?.split('\n\n').map((paragraph, i) => (
                <p key={i} className="hover:text-gray-300 transition-colors">{paragraph}</p>
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
            <div className="relative bg-gradient-to-br from-amber-500 to-yellow-600 p-1 rounded-3xl shadow-2xl shadow-amber-500/50">
              <div className="bg-gray-900 rounded-3xl p-12 text-center backdrop-blur-sm">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2, type: "spring" }}
                  viewport={{ once: true }}
                  className="text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-500 mb-4"
                >
                  {companyInfo?.foundedYear ? new Date().getFullYear() - companyInfo.foundedYear : 10}+
                </motion.div>
                <div className="text-2xl font-semibold text-white">
                  Years of Excellence
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
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
              <FiHeart className="text-amber-400" />
              <span className="text-sm font-medium text-amber-300">
                What Drives Us
              </span>
            </motion.div>

            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-500">Values</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {(companyInfo?.values || []).map((value, index) => {
              const iconMap: Record<string, any> = { FiTarget, FiHeart, FiZap, FiAward };
              const IconComponent = iconMap[value.icon || 'FiZap'] || FiZap;
              return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20, rotateY: -15 }}
                whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1, type: "spring" }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.03, transition: { duration: 0.2 } }}
                className="group relative bg-gradient-to-br from-amber-500/10 to-yellow-600/10 p-8 rounded-2xl shadow-xl hover:shadow-2xl hover:shadow-amber-500/30 border border-amber-500/30 hover:border-amber-400/60 backdrop-blur-sm transition-all"
              >
                <motion.div 
                  className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-amber-400/10 to-transparent"
                  animate={{
                    x: ['-100%', '100%']
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.3 + 2,
                    repeatDelay: 4
                  }}
                />
                
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="w-16 h-16 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-xl flex items-center justify-center text-white mb-6 shadow-lg shadow-amber-500/50 group-hover:shadow-amber-400/70 transition-shadow"
                >
                  <IconComponent className="text-3xl" />
                </motion.div>
                <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-amber-300 transition-colors">
                  {value.title}
                </h3>
                <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                  {value.description}
                </p>
              </motion.div>
            );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1, type: "spring", stiffness: 100 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, scale: 1.05 }}
              className="text-center"
            >
              <div className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-500 mb-3">
                {stat.value}
              </div>
              <div className="text-gray-400 font-medium text-lg">
                {stat.label}
              </div>
            </motion.div>
          ))}
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
              Ready to Work Together?
            </h2>
            <p className="text-xl mb-10 text-amber-100">
              Let's create something amazing and transform your digital presence.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link 
                href="/contact" 
                className="inline-flex items-center gap-2 bg-white text-amber-600 px-10 py-5 rounded-xl font-bold text-lg hover:bg-amber-50 transition-all shadow-2xl hover:shadow-amber-500/50 hover:-translate-y-1"
              >
                Get In Touch
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
