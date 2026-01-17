import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/database';
import Stat from './models/Stat';
import HeroContent from './models/HeroContent';
import CompanyInfo from './models/CompanyInfo';
import ProcessStep from './models/ProcessStep';

dotenv.config();

const seedDynamicContent = async () => {
  try {
    await connectDB();

    // Clear existing data
    await Stat.deleteMany({});
    await HeroContent.deleteMany({});
    await CompanyInfo.deleteMany({});
    await ProcessStep.deleteMany({});

    // Seed Stats
    const stats = [
      { label: 'Projects Completed', value: '150+', page: 'home', order: 1 },
      { label: 'Happy Clients', value: '80+', page: 'home', order: 2 },
      { label: 'Years of Excellence', value: '10+', page: 'home', order: 3 },
      { label: 'Countries Served', value: '15+', page: 'home', order: 4 },
      { label: 'Projects Completed', value: '150+', page: 'about', order: 1 },
      { label: 'Happy Clients', value: '80+', page: 'about', order: 2 },
      { label: 'Team Members', value: '25+', page: 'about', order: 3 },
      { label: 'Countries Served', value: '15+', page: 'about', order: 4 },
      { label: 'Projects Delivered', value: '150+', page: 'portfolio', order: 1 },
      { label: 'Happy Clients', value: '80+', page: 'portfolio', order: 2 },
      { label: 'Success Rate', value: '98%', page: 'portfolio', order: 3 },
      { label: 'Countries', value: '15+', page: 'portfolio', order: 4 },
    ];
    await Stat.insertMany(stats);
    console.log('✅ Stats seeded');

    // Seed Hero Content
    const heroContents = [
      {
        page: 'home',
        badge: {
          icon: 'FiZap',
          text: 'Innovative Digital Solutions',
        },
        title: 'Crafting Digital',
        highlightedText: 'Excellence',
        subtitle: 'We transform ideas into powerful digital experiences that drive business growth and engage users.',
        ctaButtons: [
          { text: 'Get Started', link: '/contact', variant: 'primary' },
          { text: 'View Our Work', link: '/portfolio', variant: 'outline' },
        ],
      },
      {
        page: 'about',
        badge: {
          icon: 'FiUsers',
          text: 'About Us',
        },
        title: 'Crafting Digital',
        highlightedText: 'Excellence',
        subtitle: 'We are a team of passionate developers, designers, and strategists dedicated to creating exceptional digital experiences.',
      },
      {
        page: 'services',
        badge: {
          icon: 'FiZap',
          text: 'What We Do',
        },
        title: 'Our',
        highlightedText: 'Services',
        subtitle: 'Comprehensive digital solutions designed to transform your business and drive measurable growth.',
      },
      {
        page: 'portfolio',
        badge: {
          icon: 'FiLayers',
          text: 'Our Work',
        },
        title: 'Selected',
        highlightedText: 'Projects',
        subtitle: 'Explore our portfolio of successful projects that transformed businesses and exceeded expectations.',
      },
      {
        page: 'contact',
        badge: {
          icon: 'FiMail',
          text: 'Get In Touch',
        },
        title: 'Let\'s',
        highlightedText: 'Connect',
        subtitle: 'Have a project in mind? We\'d love to hear from you. Send us a message and we\'ll respond as soon as possible.',
      },
    ];
    await HeroContent.insertMany(heroContents);
    console.log('✅ Hero Content seeded');

    // Seed Company Info
    const companyInfo = {
      name: 'seosites',
      tagline: 'Transforming Ideas Into Digital Excellence',
      foundedYear: 2014,
      story: `Founded in 2014, seosites began with a simple mission: to help businesses leverage the power of digital technology to achieve their goals and drive growth.

Through our dedicated team of five professionals, we have cultivated a collaborative environment that accelerates skill development and enhances productivity. Our synergistic approach enables us to deliver exceptional results efficiently while maintaining the highest standards of quality.

Today, we're proud to have completed over 150 successful projects, built lasting relationships with our clients, and earned a reputation for delivering quality solutions that make a real difference.`,
      mission: 'To empower businesses through innovative digital solutions that drive growth and create lasting value.',
      vision: 'To be the most trusted digital partner for businesses seeking to thrive in the digital age.',
      values: [
        {
          icon: 'FiTarget',
          title: 'Client-Focused',
          description: 'Your success is our success. We prioritize understanding and meeting your unique needs.',
          order: 1,
        },
        {
          icon: 'FiHeart',
          title: 'Passionate',
          description: 'We love what we do and it shows in the quality of our work and dedication to excellence.',
          order: 2,
        },
        {
          icon: 'FiZap',
          title: 'Innovative',
          description: 'We stay ahead of the curve, constantly exploring new technologies and approaches.',
          order: 3,
        },
        {
          icon: 'FiAward',
          title: 'Quality-Driven',
          description: 'We maintain the highest standards in every project, never compromising on quality.',
          order: 4,
        },
      ],
      contact: {
        email: 'hello@seosites.com',
        phone: '+1 (555) 123-4567',
        address: '123 Business Street, Suite 100, San Francisco, CA 94102',
      },
      social: {
        twitter: 'https://twitter.com/seosites',
        linkedin: 'https://linkedin.com/company/seosites',
        github: 'https://github.com/seosites',
        facebook: 'https://facebook.com/seosites',
        instagram: 'https://instagram.com/seosites',
      },
    };
    await CompanyInfo.create(companyInfo);
    console.log('✅ Company Info seeded');

    // Seed Process Steps
    const processSteps = [
      {
        step: '01',
        title: 'Discovery',
        description: 'We dive deep into understanding your business goals, challenges, and target audience.',
        order: 1,
      },
      {
        step: '02',
        title: 'Strategy',
        description: 'We create a comprehensive roadmap tailored to your specific needs and objectives.',
        order: 2,
      },
      {
        step: '03',
        title: 'Development',
        description: 'Our team brings your vision to life with cutting-edge technologies and best practices.',
        order: 3,
      },
      {
        step: '04',
        title: 'Launch & Support',
        description: 'We ensure a smooth launch and provide ongoing support to keep your solution running optimally.',
        order: 4,
      },
    ];
    await ProcessStep.insertMany(processSteps);
    console.log('✅ Process Steps seeded');

    console.log('\n🎉 All dynamic content seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding dynamic content:', error);
    process.exit(1);
  }
};

seedDynamicContent();
