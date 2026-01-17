import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Admin from './models/Admin';
import Project from './models/Project';
import Service from './models/Service';
import Testimonial from './models/Testimonial';
import Technology from './models/Technology';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/seosites');
    console.log('✅ MongoDB connected');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

const sampleProjects = [
  {
    title: 'E-Commerce Platform',
    description: 'A full-featured e-commerce platform with payment integration, inventory management, and analytics dashboard.',
    category: 'ecommerce',
    technologies: ['Next.js', 'Node.js', 'MongoDB', 'Stripe', 'Tailwind CSS'],
    client: 'TechStore Inc.',
    duration: '3 months',
    liveUrl: 'https://example-ecommerce.com',
    featured: true,
    order: 1,
  },
  {
    title: 'Mobile Banking App',
    description: 'Secure mobile banking application with real-time transactions, biometric authentication, and financial insights.',
    category: 'mobile',
    technologies: ['React Native', 'Node.js', 'PostgreSQL', 'Redis'],
    client: 'FinTech Solutions',
    duration: '4 months',
    liveUrl: 'https://example-banking.com',
    featured: true,
    order: 2,
  },
  {
    title: 'SaaS Project Management Tool',
    description: 'Collaborative project management platform with real-time updates, time tracking, and team communication features.',
    category: 'saas',
    technologies: ['React', 'Express', 'MongoDB', 'Socket.io', 'AWS'],
    client: 'Productivity Co.',
    duration: '6 months',
    liveUrl: 'https://example-pm.com',
    featured: true,
    order: 3,
  },
  {
    title: 'Corporate Website',
    description: 'Modern corporate website with CMS integration, blog, and multi-language support.',
    category: 'web',
    technologies: ['Next.js', 'Strapi', 'PostgreSQL', 'Vercel'],
    client: 'Global Corp',
    duration: '2 months',
    liveUrl: 'https://example-corp.com',
    featured: false,
    order: 4,
  },
];

const sampleServices = [
  {
    title: 'Web Development',
    description: 'Custom web applications built with modern technologies and best practices. We create responsive, fast, and user-friendly websites.',
    icon: 'FiCode',
    features: [
      'Responsive Design',
      'SEO Optimized',
      'High Performance',
      'Secure & Scalable',
      'Progressive Web Apps',
    ],
    order: 1,
  },
  {
    title: 'Mobile App Development',
    description: 'Native and cross-platform mobile applications for iOS and Android with seamless user experience.',
    icon: 'FiSmartphone',
    features: [
      'iOS & Android Apps',
      'Cross-platform Solutions',
      'App Store Deployment',
      'Push Notifications',
      'Offline Functionality',
    ],
    order: 2,
  },
  {
    title: 'SaaS Solutions',
    description: 'Scalable Software-as-a-Service platforms with subscription management and analytics.',
    icon: 'FiCloud',
    features: [
      'Multi-tenant Architecture',
      'Subscription Management',
      'Analytics Dashboard',
      'API Integration',
      'Cloud Infrastructure',
    ],
    order: 3,
  },
  {
    title: 'E-Commerce Development',
    description: 'Complete e-commerce solutions with payment processing, inventory management, and order fulfillment.',
    icon: 'FiShoppingCart',
    features: [
      'Shopping Cart',
      'Payment Gateway Integration',
      'Inventory Management',
      'Order Tracking',
      'Customer Management',
    ],
    order: 4,
  },
];

const sampleTestimonials = [
  {
    clientName: 'Sarah Johnson',
    company: 'TechStart Inc.',
    position: 'CEO',
    content: 'Working with seosites was an absolute pleasure. They delivered our project on time and exceeded all our expectations. Their attention to detail and technical expertise is outstanding.',
    rating: 5,
    featured: true,
  },
  {
    clientName: 'Michael Chen',
    company: 'Digital Ventures',
    position: 'CTO',
    content: 'The team at seosites transformed our vision into a stunning reality. Their expertise in modern web technologies and commitment to quality is unmatched.',
    rating: 5,
    featured: true,
  },
  {
    clientName: 'Emily Rodriguez',
    company: 'E-Shop Global',
    position: 'Marketing Director',
    content: 'Our e-commerce platform built by seosites has significantly boosted our online sales. The user experience is fantastic and the admin panel is incredibly intuitive.',
    rating: 5,
    featured: true,
  },
];

const sampleTechnologies = [
  // Frontend
  { name: 'React', category: 'frontend', icon: 'SiReact', proficiency: 95 },
  { name: 'Next.js', category: 'frontend', icon: 'SiNextdotjs', proficiency: 90 },
  { name: 'TypeScript', category: 'frontend', icon: 'SiTypescript', proficiency: 90 },
  { name: 'Tailwind CSS', category: 'frontend', icon: 'SiTailwindcss', proficiency: 95 },
  { name: 'Vue.js', category: 'frontend', icon: 'SiVuedotjs', proficiency: 80 },
  
  // Backend
  { name: 'Node.js', category: 'backend', icon: 'SiNodedotjs', proficiency: 95 },
  { name: 'Express', category: 'backend', icon: 'SiExpress', proficiency: 90 },
  { name: 'Python', category: 'backend', icon: 'SiPython', proficiency: 85 },
  { name: 'Django', category: 'backend', icon: 'SiDjango', proficiency: 80 },
  
  // Database
  { name: 'MongoDB', category: 'database', icon: 'SiMongodb', proficiency: 90 },
  { name: 'PostgreSQL', category: 'database', icon: 'SiPostgresql', proficiency: 85 },
  { name: 'Redis', category: 'database', icon: 'SiRedis', proficiency: 80 },
  { name: 'MySQL', category: 'database', icon: 'SiMysql', proficiency: 85 },
  
  // DevOps
  { name: 'Docker', category: 'devops', icon: 'SiDocker', proficiency: 85 },
  { name: 'AWS', category: 'devops', icon: 'SiAmazonaws', proficiency: 80 },
  { name: 'GitHub Actions', category: 'devops', icon: 'SiGithubactions', proficiency: 85 },
  { name: 'Vercel', category: 'devops', icon: 'SiVercel', proficiency: 90 },
];

const seedDatabase = async () => {
  try {
    await connectDB();

    console.log('🗑️  Clearing existing data...');
    await Project.deleteMany({});
    await Service.deleteMany({});
    await Testimonial.deleteMany({});
    await Technology.deleteMany({});

    console.log('📦 Seeding projects...');
    await Project.insertMany(sampleProjects);

    console.log('📦 Seeding services...');
    await Service.insertMany(sampleServices);

    console.log('📦 Seeding testimonials...');
    await Testimonial.insertMany(sampleTestimonials);

    console.log('📦 Seeding technologies...');
    await Technology.insertMany(sampleTechnologies);

    console.log('✅ Database seeded successfully!');
    console.log('\n📊 Summary:');
    console.log(`   - ${sampleProjects.length} projects added`);
    console.log(`   - ${sampleServices.length} services added`);
    console.log(`   - ${sampleTestimonials.length} testimonials added`);
    console.log(`   - ${sampleTechnologies.length} technologies added`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seeder
seedDatabase();
