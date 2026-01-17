# seosites - Quick Start Guide

## 🚀 Quick Setup (5 minutes)

### Step 1: Install Dependencies

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### Step 2: Setup Environment Variables

**Backend** (`backend/.env`):
```bash
cd backend
cp .env.example .env
```

Edit `backend/.env`:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/seosites
JWT_SECRET=my-super-secret-key-123456
UPLOAD_PATH=uploads
MAX_FILE_SIZE=5242880
FRONTEND_URL=http://localhost:3000
```

**Frontend** (`frontend/.env.local`):
```bash
cd ../frontend
cp .env.example .env.local
```

Edit `frontend/.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Step 3: Start MongoDB

**Option A: Using Docker**
```bash
docker run -d -p 27017:27017 --name seosites-mongo mongo:7
```

**Option B: Using Local MongoDB**
Make sure MongoDB is running on `localhost:27017`

### Step 4: Start Development Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
Backend will run on http://localhost:5000

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
Frontend will run on http://localhost:3000

### Step 5: Create Admin User

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@seosites.com",
    "password": "admin123",
    "role": "admin"
  }'
```

### Step 6: Login to Admin Panel

1. Visit http://localhost:3000/admin/login
2. Login with:
   - Email: admin@seosites.com
   - Password: admin123

## 🐳 Docker Setup (Alternative)

```bash
# Create .env file in root directory
cp .env.example .env

# Edit .env with your values

# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## 📦 Adding Sample Data

### Create a Project

```bash
curl -X POST http://localhost:5000/api/projects \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "title": "E-commerce Platform",
    "description": "A modern e-commerce platform with advanced features",
    "category": "ecommerce",
    "technologies": ["Next.js", "Node.js", "MongoDB", "Stripe"],
    "client": "TechStore Inc.",
    "duration": "3 months",
    "liveUrl": "https://example.com",
    "featured": true,
    "order": 1
  }'
```

### Create a Service

```bash
curl -X POST http://localhost:5000/api/services \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "title": "Web Development",
    "description": "Custom web applications built with modern technologies",
    "icon": "FiCode",
    "features": [
      "Responsive Design",
      "SEO Optimized",
      "High Performance",
      "Secure & Scalable"
    ],
    "order": 1
  }'
```

### Create a Testimonial

```bash
curl -X POST http://localhost:5000/api/testimonials \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "clientName": "John Doe",
    "company": "Tech Solutions",
    "position": "CEO",
    "content": "Excellent work! The team delivered beyond our expectations.",
    "rating": 5,
    "featured": true
  }'
```

## 🎯 Next Steps

1. **Customize Branding**: Update logo and colors in Tailwind config
2. **Add Content**: Use the admin panel to add your projects, services, and testimonials
3. **Configure Cloudinary**: Set up Cloudinary for image uploads
4. **Update Contact Info**: Edit footer and contact page with your details
5. **SEO**: Update metadata in `frontend/app/layout.tsx`

## 🔧 Common Issues

### MongoDB Connection Error
- Make sure MongoDB is running
- Check the connection string in `.env`

### Port Already in Use
```bash
# Change PORT in backend/.env to a different port
PORT=5001
```

### CORS Errors
- Verify FRONTEND_URL in backend `.env` matches your frontend URL
- Make sure CORS is configured correctly in `backend/src/app.ts`

### Authentication Issues
- Clear localStorage: `localStorage.clear()` in browser console
- Generate a new JWT_SECRET
- Recreate admin user

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 💡 Tips

1. Use the admin panel for all content management
2. Mark important projects as "featured" to show them on the homepage
3. Keep your JWT_SECRET secure and never commit it to git
4. Regularly backup your MongoDB database
5. Test on different devices for responsiveness

---

Need help? Check the main [README.md](./README.md) for detailed documentation.
