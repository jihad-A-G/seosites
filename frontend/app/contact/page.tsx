'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { FiMail, FiPhone, FiMapPin, FiSend } from 'react-icons/fi';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(20, 'Message must be at least 20 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      // Compose email content
      const emailSubject = encodeURIComponent(`Contact Form: ${data.subject}`);
      const emailBody = encodeURIComponent(
        `Name: ${data.name}\n` +
        `Email: ${data.email}\n` +
        `Phone: ${data.phone || 'Not provided'}\n\n` +
        `Subject: ${data.subject}\n\n` +
        `Message:\n${data.message}`
      );
      
      // Open default email client with pre-filled information
      window.location.href = `mailto:info@seosites.dev?subject=${emailSubject}&body=${emailBody}`;
      
      // Show success message after a short delay
      setTimeout(() => {
        toast.success('Email client opened! Please send the email to complete your message.');
        reset();
      }, 500);
    } catch (error) {
      toast.error('Failed to open email client. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-black">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div 
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="inline-block mb-6"
            >
              <span className="text-amber-400 text-sm font-bold uppercase tracking-wider px-4 py-2 bg-amber-500/10 border border-amber-500/30">
                Let's Connect
              </span>
            </motion.div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
              Get in <span className="text-amber-400">Touch</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Have a project in mind? We'd love to hear from you
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl font-bold mb-6 text-black">
                  Contact <span className="text-amber-400">Information</span>
                </h2>
                <p className="text-gray-600 mb-8">
                  Reach out to us through any of these channels
                </p>

                <div className="space-y-6">
                  <motion.div 
                    whileHover={{ x: 5 }}
                    className="flex items-start space-x-4"
                  >
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center bg-amber-400 text-white">
                      <FiMail className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-black mb-1">Email</h3>
                      <a
                        href="mailto:info@seosites.dev"
                        className="text-gray-600 hover:text-amber-400 transition-colors"
                      >
                        info@seosites.dev
                      </a>
                    </div>
                  </motion.div>

                  <motion.div 
                    whileHover={{ x: 5 }}
                    className="flex items-start space-x-4"
                  >
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center bg-amber-400 text-white">
                      <FiPhone className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-black mb-1">Phone</h3>
                      <a
                        href="tel:+1234567890"
                        className="text-gray-600 hover:text-amber-400 transition-colors"
                      >
                        +1 (234) 567-890
                      </a>
                    </div>
                  </motion.div>

                  <motion.div 
                    whileHover={{ x: 5 }}
                    className="flex items-start space-x-4"
                  >
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center bg-amber-400 text-white">
                      <FiMapPin className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-black mb-1">Office</h3>
                      <p className="text-gray-600">
                        123 Business Ave<br />
                        New York, NY 10001
                      </p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <motion.form
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      {...register('name')}
                      className="w-full px-4 py-3 bg-white border border-gray-300 text-gray-900 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 outline-none transition-all"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      {...register('email')}
                      className="w-full px-4 py-3 bg-white border border-gray-300 text-gray-900 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 outline-none transition-all"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      {...register('phone')}
                      className="w-full px-4 py-3 bg-white border border-gray-300 text-gray-900 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      {...register('subject')}
                      className="w-full px-4 py-3 bg-white border border-gray-300 text-gray-900 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 outline-none transition-all"
                    />
                    {errors.subject && (
                      <p className="mt-1 text-sm text-red-500">{errors.subject.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    {...register('message')}
                    className="w-full px-4 py-3 bg-white border border-gray-300 text-gray-900 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 outline-none transition-all resize-none"
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-8 py-4 bg-amber-400 text-black font-bold hover:bg-amber-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>Sending...</>
                  ) : (
                    <>
                      Send Message
                      <FiSend />
                    </>
                  )}
                </motion.button>
              </motion.form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
