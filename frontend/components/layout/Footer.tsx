'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import { ApiResponse, CompanyInfo, Service } from '@/types';
import { FiLinkedin, FiTwitter, FiGithub, FiMail, FiPhone, FiMapPin, FiArrowRight } from 'react-icons/fi';

const companyLinks = [
  { name: 'About Us', href: '/about' },
  { name: 'Our Work', href: '/portfolio' },
  { name: 'Services', href: '/services' },
  { name: 'Contact', href: '/contact' },
];

const legalLinks = [
  { name: 'Privacy Policy', href: '/privacy' },
  { name: 'Terms of Service', href: '/terms' },
];

export default function Footer() {
  const { data: companyData } = useQuery<ApiResponse<CompanyInfo>>({
    queryKey: ['company-info'],
    queryFn: async () => {
      const response = await api.get('/company-info');
      return response.data;
    },
  });

  const { data: servicesData } = useQuery<ApiResponse<Service[]>>({
    queryKey: ['services'],
    queryFn: async () => {
      const response = await api.get('/services');
      return response.data;
    },
  });

  const companyInfo = companyData?.data;
  const services = servicesData?.data || [];

  const socialLinks = [
    { name: 'LinkedIn', icon: FiLinkedin, href: companyInfo?.social?.linkedin || '#' },
    { name: 'Twitter', icon: FiTwitter, href: companyInfo?.social?.twitter || '#' },
    { name: 'GitHub', icon: FiGithub, href: companyInfo?.social?.github || '#' },
  ];

  return (
    <footer className="relative bg-black text-gray-300 border-t-4 border-white">
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center mb-6 group">
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="relative w-24 h-24"
              >
                <Image
                  src="/images/ChatGPT Image Jan 9, 2026, 02_15_59 PM.png"
                  alt="seosites Logo"
                  fill
                  className="object-contain"
                />
              </motion.div>
              <span className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">
                Seosites
              </span>
            </Link>
            <p className="text-gray-400 mb-6 leading-relaxed">
              {companyInfo?.tagline || 'Crafting digital excellence through innovative solutions and creative design.'}
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500/20 to-yellow-600/20 border border-amber-500/30 hover:border-amber-400/60 flex items-center justify-center transition-all shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40"
                  aria-label={social.name}
                >
                  <social.icon className="text-lg text-amber-400" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-bold mb-4 text-lg flex items-center gap-2">
              <span className="w-1 h-6 bg-gradient-to-b from-amber-400 to-yellow-500 rounded-full" />
              Services
            </h3>
            <ul className="space-y-3">
              {services.slice(0, 6).map((service) => (
                <motion.li 
                  key={service._id}
                  whileHover={{ x: 5 }}
                >
                  <Link
                    href={`/services/${service._id}`}
                    className="text-gray-400 hover:text-amber-400 transition-colors flex items-center gap-2 group"
                  >
                    <motion.span 
                      className="w-0 h-px bg-amber-400 group-hover:w-4 transition-all"
                    />
                    {service.title}
                  </Link>
                </motion.li>
              ))}
              {services.length > 6 && (
                <motion.li whileHover={{ x: 5 }}>
                  <Link
                    href="/services"
                    className="text-amber-400 hover:text-yellow-400 transition-colors flex items-center gap-2 font-semibold group"
                  >
                    View All
                    <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.li>
              )}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-bold mb-4 text-lg flex items-center gap-2">
              <span className="w-1 h-6 bg-gradient-to-b from-amber-400 to-yellow-500 rounded-full" />
              Company
            </h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <motion.li 
                  key={link.name}
                  whileHover={{ x: 5 }}
                >
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-amber-400 transition-colors flex items-center gap-2 group"
                  >
                    <motion.span 
                      className="w-0 h-px bg-amber-400 group-hover:w-4 transition-all"
                    />
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold mb-4 text-lg flex items-center gap-2">
              <span className="w-1 h-6 bg-gradient-to-b from-amber-400 to-yellow-500 rounded-full" />
              Get in Touch
            </h3>
            <ul className="space-y-4">
              {companyInfo?.contact?.email && (
                <motion.li whileHover={{ x: 5 }}>
                  <a
                    href={`mailto:${companyInfo.contact.email}`}
                    className="text-gray-400 hover:text-amber-400 transition-colors flex items-center gap-3 group"
                  >
                    <FiMail className="text-amber-500 group-hover:scale-110 transition-transform" />
                    <span className="text-sm">{companyInfo.contact.email}</span>
                  </a>
                </motion.li>
              )}
              {companyInfo?.contact?.phone && (
                <motion.li whileHover={{ x: 5 }}>
                  <a
                    href={`tel:${companyInfo.contact.phone}`}
                    className="text-gray-400 hover:text-amber-400 transition-colors flex items-center gap-3 group"
                  >
                    <FiPhone className="text-amber-500 group-hover:scale-110 transition-transform" />
                    <span className="text-sm">{companyInfo.contact.phone}</span>
                  </a>
                </motion.li>
              )}
              {companyInfo?.contact?.address && (
                <motion.li whileHover={{ x: 5 }}>
                  <div className="text-gray-400 flex items-start gap-3 group">
                    <FiMapPin className="text-amber-500 mt-1 group-hover:scale-110 transition-transform" />
                    <span className="text-sm">{companyInfo.contact.address}</span>
                  </div>
                </motion.li>
              )}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-amber-500/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} {companyInfo?.name || 'SEO Sites'}. All rights reserved.
            </p>
            <div className="flex gap-6">
              {legalLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-gray-400 hover:text-amber-400 text-sm transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
