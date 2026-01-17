# seosites - Portfolio Website

A modern, production-ready full-stack portfolio website built with Next.js 14, Express.js, MongoDB, and Docker.

## ✨ Features

- **Modern Tech Stack**: Next.js 14, TypeScript, Express.js, MongoDB
- **Docker Ready**: Complete containerization with Docker Compose + Nginx
- **Admin Panel**: Full CRUD operations for projects, services, testimonials, and technologies
- **Authentication**: Secure JWT-based admin authentication
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Dark Theme**: Sleek black, white, and amber color scheme
- **Animations**: Smooth animations with Framer Motion
- **Image Management**: Cloudinary integration
- **SEO Optimized**: Meta tags and OpenGraph support
- **Type Safe**: Full TypeScript implementation
- **Production Ready**: SSL/HTTPS, health checks, auto-restart, monitoring

## 🚀 Quick Start

### Option 1: Docker (Recommended for Production)

```bash
# Clone and configure
git clone <your-repo> seosites && cd seosites
cp .env.example .env
nano .env  # Update credentials

# Deploy
docker-compose up -d --build

# Create admin user
docker exec -it seosites-backend npm run seed

# Setup SSL (production)
./setup-ssl.sh yourdomain.com
```

**See [QUICKSTART.md](QUICKSTART.md) for 5-minute deployment guide**  
**See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed production setup**

### Option 2: Local Development

## 📁 Project Structure

```
seosites/
├── backend/              # Express.js + TypeScript API
│   ├── src/
│   │   ├── config/      # Database and service configs
│   │   ├── controllers/ # Route controllers
│   │   ├── models/      # Mongoose models
│   │   ├── routes/      # API routes
│   │   ├── middleware/  # Auth and error handling
│   │   └── app.ts       # Express app setup
│   └── package.json
├── frontend/            # Next.js 14 Application
│   ├── app/            # App router pages
│   ├── components/     # React components
│   ├── lib/            # Utilities and API client
│   └── types/          # TypeScript types
├── nginx/              # Nginx reverse proxy config
├── docker-compose.yml  # Docker orchestration
├── DEPLOYMENT.md       # Detailed deployment guide
├── QUICKSTART.md       # Quick deployment guide
└── README.md
```

## 🛠️ Local Development Setup

### Prerequisites

- Node.js 18+ and npm/yarn
- MongoDB (local or Atlas)
- Git

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```bash
cp .env.example .env
```

4. Update the `.env` file with your credentials:
```env
JWT_SECRET=your-super-secret-jwt-key
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
FRONTEND_URL=http://localhost:3000
```

5. Start the development server:
```bash
npm run dev
```

The API will be running at `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file:
```bash
cp .env.example .env.local
```

4. Update the `.env.local` file:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

5. Start the development server:
```bash
npm run dev
```

The frontend will be running at `http://localhost:3000`

## 🔑 Creating an Admin User

To create your first admin user, make a POST request to the register endpoint:

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@seosites.com",
    "password": "your-secure-password",
    "role": "admin"
  }'
```

Or use a tool like Postman/Insomnia.

**Important**: Remove or protect the `/api/auth/register` endpoint in production!

## 📚 API Endpoints

### Public Routes

- `GET /api/projects` - Get all projects
- `GET /api/projects/featured` - Get featured projects
- `GET /api/projects/:id` - Get single project
- `GET /api/services` - Get all services
- `GET /api/testimonials` - Get all testimonials
- `GET /api/testimonials/featured` - Get featured testimonials
- `GET /api/technologies` - Get technologies grouped by category

### Protected Routes (Require Authentication)

- `POST /api/projects` - Create project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project
- `POST /api/services` - Create service
- `PUT /api/services/:id` - Update service
- `DELETE /api/services/:id` - Delete service
- `POST /api/testimonials` - Create testimonial
- `PUT /api/testimonials/:id` - Update testimonial
- `DELETE /api/testimonials/:id` - Delete testimonial
- `POST /api/upload` - Upload image
- `DELETE /api/upload/:publicId` - Delete image

### Auth Routes

- `POST /api/auth/login` - Admin login
- `POST /api/auth/logout` - Admin logout
- `GET /api/auth/verify` - Verify token
- `POST /api/auth/register` - Register admin (should be protected in production)

## 🎨 Features Overview

### Frontend Pages

- **Home** (`/`) - Hero section, services, featured projects, testimonials
- **Portfolio** (`/portfolio`) - Filterable project grid
- **Services** (`/services`) - Service offerings and process
- **About** (`/about`) - Company story and values
- **Contact** (`/contact`) - Contact form with validation
- **Admin Panel** (`/admin`) - Protected admin area

### Admin Panel Features

- Dashboard with statistics
- Project management (CRUD)
- Service management (CRUD)
- Testimonial management (CRUD)
- Technology stack management
- Image upload with Cloudinary
- JWT authentication

## 🚀 Deployment

### Backend Deployment

1. Build the TypeScript code:
```bash
npm run build
```

2. Start the production server:
```bash
npm start
```

### Frontend Deployment

1. Build the Next.js app:
```bash
npm run build
```

2. Start the production server:
```bash
npm start
```

### Environment Variables for Production

Make sure to set all environment variables in your production environment.

## 🧪 Development Scripts

### Backend
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

### Frontend
- `npm run dev` - Start Next.js development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run Next.js linter
- `npm run format` - Format code with Prettier

## 📦 Tech Stack

### Backend
- Express.js - Web framework
- TypeScript - Type safety
- MongoDB - Database
- Mongoose - ODM
- JWT - Authentication
- Bcrypt - Password hashing
- Multer - File upload handling
- Helmet - Security headers
- CORS - Cross-origin resource sharing

### Frontend
- Next.js 14 - React framework
- TypeScript - Type safety
- Tailwind CSS - Styling
- Framer Motion - Animations
- React Query - Data fetching
- React Hook Form - Form handling
- Zod - Validation
- Sonner - Toast notifications

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Environment variable protection
- CORS configuration
- Rate limiting
- Input validation
- Helmet security headers

## 📝 License

MIT

## 👥 Contact

For questions or support, contact us at info@seosites.com

---

**Built with ❤️ by seosites**
