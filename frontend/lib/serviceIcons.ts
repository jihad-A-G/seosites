// Service Icon Utilities
// Uses Simple Icons CDN for service/tool logos

/**
 * Get icon URL from Simple Icons CDN
 * @param iconSlug - The service slug (e.g., 'wordpress', 'shopify', 'googleads')
 * @returns CDN URL for the icon
 */
export const getServiceIconUrl = (iconSlug: string): string => {
  if (!iconSlug) return '';
  // Simple Icons CDN - provides SVG icons for popular services/tools
  return `https://cdn.simpleicons.org/${iconSlug.toLowerCase()}`;
};

/**
 * Common service icon slugs organized by category
 * These match the Simple Icons slug format
 */
export const commonServiceIcons = [
  // Web & App Development
  { name: 'Web Development', slug: 'html5', category: 'development' },
  { name: 'Mobile App', slug: 'android', category: 'development' },
  { name: 'iOS Development', slug: 'apple', category: 'development' },
  { name: 'Progressive Web App', slug: 'pwa', category: 'development' },
  { name: 'React Development', slug: 'react', category: 'development' },
  { name: 'Next.js Development', slug: 'nextdotjs', category: 'development' },
  { name: 'Full Stack', slug: 'stackblitz', category: 'development' },
  { name: 'API Development', slug: 'postman', category: 'development' },
  { name: 'Code', slug: 'visualstudiocode', category: 'development' },
  
  // SEO & Marketing
  { name: 'SEO Optimization', slug: 'googleanalytics', category: 'marketing' },
  { name: 'Google Search Console', slug: 'googlesearchconsole', category: 'marketing' },
  { name: 'Analytics', slug: 'googleanalytics', category: 'marketing' },
  { name: 'Marketing Automation', slug: 'hubspot', category: 'marketing' },
  { name: 'Email Marketing', slug: 'mailchimp', category: 'marketing' },
  { name: 'Content Marketing', slug: 'medium', category: 'marketing' },
  { name: 'Social Media', slug: 'meta', category: 'marketing' },
  { name: 'Facebook Ads', slug: 'facebook', category: 'marketing' },
  { name: 'Instagram Marketing', slug: 'instagram', category: 'marketing' },
  { name: 'LinkedIn Marketing', slug: 'linkedin', category: 'marketing' },
  { name: 'Twitter Marketing', slug: 'x', category: 'marketing' },
  { name: 'Google Ads', slug: 'googleads', category: 'marketing' },
  { name: 'Conversion Optimization', slug: 'googleoptimize', category: 'marketing' },
  { name: 'Ahrefs', slug: 'ahrefs', category: 'marketing' },
  { name: 'SEMrush', slug: 'semrush', category: 'marketing' },
  
  // Cloud Solutions
  { name: 'AWS', slug: 'amazonaws', category: 'cloud' },
  { name: 'Google Cloud', slug: 'googlecloud', category: 'cloud' },
  { name: 'Microsoft Azure', slug: 'microsoftazure', category: 'cloud' },
  { name: 'DigitalOcean', slug: 'digitalocean', category: 'cloud' },
  { name: 'Heroku', slug: 'heroku', category: 'cloud' },
  { name: 'Vercel', slug: 'vercel', category: 'cloud' },
  { name: 'Netlify', slug: 'netlify', category: 'cloud' },
  { name: 'Cloudflare', slug: 'cloudflare', category: 'cloud' },
  { name: 'Docker', slug: 'docker', category: 'cloud' },
  { name: 'Kubernetes', slug: 'kubernetes', category: 'cloud' },
  { name: 'Railway', slug: 'railway', category: 'cloud' },
  { name: 'Supabase', slug: 'supabase', category: 'cloud' },
  { name: 'Firebase', slug: 'firebase', category: 'cloud' },
  
  // UI/UX Design
  { name: 'Figma', slug: 'figma', category: 'design' },
  { name: 'Adobe XD', slug: 'adobexd', category: 'design' },
  { name: 'Sketch', slug: 'sketch', category: 'design' },
  { name: 'Adobe Illustrator', slug: 'adobeillustrator', category: 'design' },
  { name: 'Adobe Photoshop', slug: 'adobephotoshop', category: 'design' },
  { name: 'Framer', slug: 'framer', category: 'design' },
  { name: 'InVision', slug: 'invision', category: 'design' },
  { name: 'Canva', slug: 'canva', category: 'design' },
  { name: 'Dribbble', slug: 'dribbble', category: 'design' },
  { name: 'Behance', slug: 'behance', category: 'design' },
  
  // WordPress & CMS
  { name: 'WordPress', slug: 'wordpress', category: 'cms' },
  { name: 'WooCommerce', slug: 'woo', category: 'cms' },
  { name: 'Shopify', slug: 'shopify', category: 'cms' },
  { name: 'Webflow', slug: 'webflow', category: 'cms' },
  { name: 'Strapi', slug: 'strapi', category: 'cms' },
  { name: 'Contentful', slug: 'contentful', category: 'cms' },
  { name: 'Sanity', slug: 'sanity', category: 'cms' },
  { name: 'Ghost', slug: 'ghost', category: 'cms' },
  { name: 'Drupal', slug: 'drupal', category: 'cms' },
  { name: 'Joomla', slug: 'joomla', category: 'cms' },
  { name: 'Elementor', slug: 'elementor', category: 'cms' },
  
  // E-Commerce
  { name: 'E-Commerce', slug: 'shopify', category: 'ecommerce' },
  { name: 'Shopify', slug: 'shopify', category: 'ecommerce' },
  { name: 'WooCommerce', slug: 'woo', category: 'ecommerce' },
  { name: 'Magento', slug: 'magento', category: 'ecommerce' },
  { name: 'BigCommerce', slug: 'bigcommerce', category: 'ecommerce' },
  { name: 'Stripe', slug: 'stripe', category: 'ecommerce' },
  { name: 'PayPal', slug: 'paypal', category: 'ecommerce' },
  { name: 'Square', slug: 'square', category: 'ecommerce' },
  { name: 'Amazon', slug: 'amazon', category: 'ecommerce' },
  { name: 'eBay', slug: 'ebay', category: 'ecommerce' },
  { name: 'Etsy', slug: 'etsy', category: 'ecommerce' },
  
  // General Business
  { name: 'Consulting', slug: 'googleworkspace', category: 'business' },
  { name: 'Strategy', slug: 'trello', category: 'business' },
  { name: 'Project Management', slug: 'asana', category: 'business' },
  { name: 'Slack', slug: 'slack', category: 'business' },
  { name: 'Microsoft Teams', slug: 'microsoftteams', category: 'business' },
  { name: 'Zoom', slug: 'zoom', category: 'business' },
  { name: 'Notion', slug: 'notion', category: 'business' },
  { name: 'Jira', slug: 'jira', category: 'business' },
  { name: 'Monday', slug: 'monday', category: 'business' },
];

/**
 * Get icons filtered by category
 */
export const getServiceIconsByCategory = (category: string) => {
  if (!category) return commonServiceIcons;
  return commonServiceIcons.filter(icon => icon.category === category);
};

/**
 * Get all unique categories
 */
export const getServiceIconCategories = () => {
  const categories = new Set(commonServiceIcons.map(icon => icon.category));
  return Array.from(categories);
};
