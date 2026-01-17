'use client';

import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import api, { getImageUrl } from '@/lib/api';
import { ApiResponse, Service, Project } from '@/types';
import { FiCheck, FiArrowLeft, FiExternalLink } from 'react-icons/fi';
import Link from 'next/link';
import { getIcon } from '@/lib/icons';
import { getServiceIconUrl } from '@/lib/serviceIcons';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';

export default function ServiceDetailPage() {
  const params = useParams();
  const router = useRouter();
  const serviceId = params.id as string;

  const { data: serviceData, isLoading: serviceLoading } = useQuery<ApiResponse<Service>>({
    queryKey: ['service', serviceId],
    queryFn: async () => {
      const response = await api.get(`/services/${serviceId}`);
      return response.data;
    },
  });

  const { data: projectsData, isLoading: projectsLoading } = useQuery<ApiResponse<Project[]>>({
    queryKey: ['projects'],
    queryFn: async () => {
      const response = await api.get('/projects');
      return response.data;
    },
    enabled: !!serviceData?.data,
  });

  const service = serviceData?.data;
  const allProjects = projectsData?.data || [];
  
  // Filter projects that use this service (match by service title in category or tags)
  const relatedProjects = allProjects
    .filter(project => 
      project.category?.toLowerCase().includes(service?.title.toLowerCase() || '') ||
      project.technologies?.some(tech => 
        tech.toLowerCase().includes(service?.title.toLowerCase() || '')
      )
    )
    .slice(0, 3);

  if (serviceLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Service not found</h2>
          <Link href="/services" className="text-primary-600 hover:underline">
            Back to Services
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-6 pt-24 pb-8">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          <FiArrowLeft />
          <span>Back</span>
        </button>
      </div>

      {/* Service Header */}
      <section className="max-w-7xl mx-auto px-6 pb-16 bg-black">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Service Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-20 h-20 bg-amber-400 flex items-center justify-center mb-6 text-white text-4xl">
              {service.icon ? (
                <img
                  src={getServiceIconUrl(service.icon)}
                  alt={service.title}
                  className="w-12 h-12 object-contain brightness-0 invert"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              ) : (
                (() => {
                  const Icon = getIcon(service.icon || 'FiCode');
                  return <Icon />;
                })()
              )}
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              {service.title}
            </h1>
            
            <p className="text-xl text-gray-400 leading-relaxed">
              {service.description}
            </p>
          </motion.div>

          {/* Right: Features */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white p-8 border border-gray-200"
          >
            <h3 className="text-2xl font-bold mb-6 text-black">Key Features</h3>
            <ul className="space-y-4">
              {service.features.map((feature, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <div className="w-6 h-6 bg-amber-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <FiCheck className="text-black text-sm" />
                  </div>
                  <span className="text-gray-700">
                    {feature}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <section className="py-16 bg-gray-50 dark:bg-gray-900/50">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Projects Using This Service
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                See how we've applied {service.title} to real-world projects
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProjects.map((project, index) => (
                <motion.div
                  key={project._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border border-gray-100 dark:border-gray-700"
                >
                  <Link href={`/portfolio/${project._id}`}>
                    {/* Project Image */}
                    <div className="relative h-48 bg-gray-200 dark:bg-gray-700">
                      {project.images && project.images[0] && (
                        <Image
                          src={getImageUrl(project.images[0])}
                          alt={project.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>

                    {/* Project Info */}
                    <div className="p-6">
                      <div className="mb-2 inline-block px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-xs font-semibold rounded-full">
                        {project.category}
                      </div>
                      <h3 className="text-xl font-bold mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
                        {project.description}
                      </p>

                      <div className="mt-4 flex items-center gap-2 text-primary-600 dark:text-primary-400 opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-sm font-semibold">View Project</span>
                        <FiExternalLink className="text-sm" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg font-semibold hover:shadow-xl hover:shadow-primary-500/30 transition-all hover:-translate-y-1"
              >
                View All Projects
                <FiExternalLink />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/10" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Get Started with {service.title}?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Let's discuss how we can help transform your business with our expertise.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-white text-primary-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all hover:shadow-2xl hover:-translate-y-1"
          >
            Get in Touch
            <FiExternalLink />
          </Link>
        </div>
      </section>
    </div>
  );
}
