// Technology Icon Utilities
// Uses Simple Icons CDN for technology logos

/**
 * Get icon URL from Simple Icons CDN
 * @param iconSlug - The technology slug (e.g., 'react', 'nodejs', 'mongodb')
 * @returns CDN URL for the icon
 */
export const getTechIconUrl = (iconSlug: string): string => {
  if (!iconSlug) return '';
  // Simple Icons CDN - provides SVG icons for popular technologies
  return `https://cdn.simpleicons.org/${iconSlug.toLowerCase()}`;
};

/**
 * Common technology icon slugs for reference
 * These match the Simple Icons slug format
 */
export const commonTechIcons = [
  // Frontend
  { name: 'React', slug: 'react', category: 'frontend' },
  { name: 'Next.js', slug: 'nextdotjs', category: 'frontend' },
  { name: 'Vue.js', slug: 'vuedotjs', category: 'frontend' },
  { name: 'Angular', slug: 'angular', category: 'frontend' },
  { name: 'Svelte', slug: 'svelte', category: 'frontend' },
  { name: 'TypeScript', slug: 'typescript', category: 'frontend' },
  { name: 'JavaScript', slug: 'javascript', category: 'frontend' },
  { name: 'HTML5', slug: 'html5', category: 'frontend' },
  { name: 'CSS3', slug: 'css3', category: 'frontend' },
  { name: 'Tailwind CSS', slug: 'tailwindcss', category: 'frontend' },
  { name: 'Bootstrap', slug: 'bootstrap', category: 'frontend' },
  { name: 'Material UI', slug: 'mui', category: 'frontend' },
  { name: 'Sass', slug: 'sass', category: 'frontend' },
  { name: 'Redux', slug: 'redux', category: 'frontend' },
  { name: 'Webpack', slug: 'webpack', category: 'frontend' },
  { name: 'Vite', slug: 'vite', category: 'frontend' },
  { name: 'jQuery', slug: 'jquery', category: 'frontend' },
  
  // Backend
  { name: 'Node.js', slug: 'nodedotjs', category: 'backend' },
  { name: 'Express', slug: 'express', category: 'backend' },
  { name: 'NestJS', slug: 'nestjs', category: 'backend' },
  { name: 'Django', slug: 'django', category: 'backend' },
  { name: 'Flask', slug: 'flask', category: 'backend' },
  { name: 'FastAPI', slug: 'fastapi', category: 'backend' },
  { name: 'Spring', slug: 'spring', category: 'backend' },
  { name: 'Spring Boot', slug: 'springboot', category: 'backend' },
  { name: 'Laravel', slug: 'laravel', category: 'backend' },
  { name: 'Ruby on Rails', slug: 'rubyonrails', category: 'backend' },
  { name: 'PHP', slug: 'php', category: 'backend' },
  { name: 'Python', slug: 'python', category: 'backend' },
  { name: 'Java', slug: 'openjdk', category: 'backend' },
  { name: 'Go', slug: 'go', category: 'backend' },
  { name: 'Rust', slug: 'rust', category: 'backend' },
  { name: 'C#', slug: 'csharp', category: 'backend' },
  { name: '.NET', slug: 'dotnet', category: 'backend' },
  { name: 'GraphQL', slug: 'graphql', category: 'backend' },
  { name: 'Socket.io', slug: 'socketdotio', category: 'backend' },
  
  // Database
  { name: 'MongoDB', slug: 'mongodb', category: 'database' },
  { name: 'PostgreSQL', slug: 'postgresql', category: 'database' },
  { name: 'MySQL', slug: 'mysql', category: 'database' },
  { name: 'Redis', slug: 'redis', category: 'database' },
  { name: 'SQLite', slug: 'sqlite', category: 'database' },
  { name: 'MariaDB', slug: 'mariadb', category: 'database' },
  { name: 'Oracle', slug: 'oracle', category: 'database' },
  { name: 'Microsoft SQL Server', slug: 'microsoftsqlserver', category: 'database' },
  { name: 'Supabase', slug: 'supabase', category: 'database' },
  { name: 'Firebase', slug: 'firebase', category: 'database' },
  { name: 'Elasticsearch', slug: 'elasticsearch', category: 'database' },
  { name: 'Prisma', slug: 'prisma', category: 'database' },
  { name: 'DynamoDB', slug: 'amazondynamodb', category: 'database' },
  
  // DevOps
  { name: 'Docker', slug: 'docker', category: 'devops' },
  { name: 'Kubernetes', slug: 'kubernetes', category: 'devops' },
  { name: 'AWS', slug: 'amazonaws', category: 'devops' },
  { name: 'Google Cloud', slug: 'googlecloud', category: 'devops' },
  { name: 'Azure', slug: 'microsoftazure', category: 'devops' },
  { name: 'GitHub', slug: 'github', category: 'devops' },
  { name: 'GitHub Actions', slug: 'githubactions', category: 'devops' },
  { name: 'GitLab', slug: 'gitlab', category: 'devops' },
  { name: 'GitLab CI', slug: 'gitlabci', category: 'devops' },
  { name: 'Bitbucket', slug: 'bitbucket', category: 'devops' },
  { name: 'Jenkins', slug: 'jenkins', category: 'devops' },
  { name: 'CircleCI', slug: 'circleci', category: 'devops' },
  { name: 'Travis CI', slug: 'travisci', category: 'devops' },
  { name: 'Terraform', slug: 'terraform', category: 'devops' },
  { name: 'Ansible', slug: 'ansible', category: 'devops' },
  { name: 'Nginx', slug: 'nginx', category: 'devops' },
  { name: 'Apache', slug: 'apache', category: 'devops' },
  { name: 'Vercel', slug: 'vercel', category: 'devops' },
  { name: 'Netlify', slug: 'netlify', category: 'devops' },
  { name: 'Heroku', slug: 'heroku', category: 'devops' },
  { name: 'DigitalOcean', slug: 'digitalocean', category: 'devops' },
  { name: 'Railway', slug: 'railway', category: 'devops' },
  { name: 'Git', slug: 'git', category: 'devops' },
  { name: 'Linux', slug: 'linux', category: 'devops' },
  { name: 'Ubuntu', slug: 'ubuntu', category: 'devops' },
  { name: 'WordPress', slug: 'wordpress', category: 'devops' },
  { name: 'Figma', slug: 'figma', category: 'devops' },
  { name: 'Adobe XD', slug: 'adobexd', category: 'devops' },
  { name: 'Sketch', slug: 'sketch', category: 'devops' },
  { name: 'VS Code', slug: 'visualstudiocode', category: 'devops' },
  { name: 'Postman', slug: 'postman', category: 'devops' },
  { name: 'Insomnia', slug: 'insomnia', category: 'devops' },
  { name: 'Jira', slug: 'jira', category: 'devops' },
  { name: 'Trello', slug: 'trello', category: 'devops' },
  { name: 'Slack', slug: 'slack', category: 'devops' },
  { name: 'Discord', slug: 'discord', category: 'devops' },
  { name: 'Notion', slug: 'notion', category: 'devops' },
];

/**
 * Get available tech icons by category
 */
export const getTechIconsByCategory = (category?: string) => {
  if (!category) return commonTechIcons;
  return commonTechIcons.filter(tech => tech.category === category);
};

/**
 * Search for tech icons
 */
export const searchTechIcons = (query: string) => {
  const lowerQuery = query.toLowerCase();
  return commonTechIcons.filter(tech => 
    tech.name.toLowerCase().includes(lowerQuery) || 
    tech.slug.toLowerCase().includes(lowerQuery)
  );
};
