# 🏗️ Architecture Overview

## System Architecture

```
                                    INTERNET
                                       │
                                       ▼
                            ┌──────────────────────┐
                            │     FIREWALL (UFW)   │
                            │   Ports: 80, 443     │
                            └──────────┬───────────┘
                                       │
                                       ▼
                            ┌──────────────────────┐
                            │   NGINX (Container)  │
                            │  - Reverse Proxy     │
                            │  - SSL Termination   │
                            │  - Rate Limiting     │
                            │  - Gzip Compression  │
                            │  - Static Caching    │
                            └──────────┬───────────┘
                                       │
                    ┌──────────────────┴──────────────────┐
                    │                                     │
                    ▼                                     ▼
        ┌───────────────────────┐         ┌───────────────────────┐
        │  FRONTEND (Container) │         │  BACKEND (Container)  │
        │                       │         │                       │
        │  Next.js 14           │◄────────┤  Express.js           │
        │  - App Router         │         │  - TypeScript         │
        │  - React 18           │         │  - REST API           │
        │  - SSR/SSG            │         │  - JWT Auth           │
        │  - Tailwind CSS       │         │  - File Upload        │
        │  - Framer Motion      │         │  - Validation         │
        │                       │         │                       │
        │  Port: 3000           │         │  Port: 5000           │
        └───────────────────────┘         └───────────┬───────────┘
                                                      │
                                                      ▼
                                          ┌───────────────────────┐
                                          │  MONGODB (Container)  │
                                          │                       │
                                          │  - Database           │
                                          │  - Persistent Volume  │
                                          │  - Health Checks      │
                                          │                       │
                                          │  Port: 27017          │
                                          └───────────────────────┘
```

## Network Flow

### Public Access
```
User → Domain (yourdomain.com)
     → DNS Resolution
     → VPS IP Address
     → Firewall (Port 80/443)
     → Nginx Container
     → Frontend/Backend Containers
```

### Internal Communication
```
Frontend ←→ Backend (API calls)
Backend  ←→ MongoDB (Database queries)
Nginx    ←→ Frontend (Proxy to :3000)
Nginx    ←→ Backend (Proxy /api to :5000)
```

## Docker Network Architecture

```
┌─────────────────────────────────────────────────────────┐
│                  seosites-network (bridge)              │
│                                                         │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌────────┐ │
│  │  nginx   │  │ frontend │  │ backend  │  │ mongodb│ │
│  │          │  │          │  │          │  │        │ │
│  │  :80/443 │  │  :3000   │  │  :5000   │  │ :27017 │ │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └───┬────┘ │
│       │             │              │            │      │
│       └─────────────┴──────────────┴────────────┘      │
│                  Internal DNS Resolution                │
│         (Services accessible by container name)        │
└─────────────────────────────────────────────────────────┘
           │                                   │
           ▼                                   ▼
    Host Port 80/443                    mongodb_data volume
    (Public Access)                   (Persistent Storage)
```

## Request Flow

### Frontend Page Request
```
1. User → https://yourdomain.com
2. Nginx receives request (Port 443)
3. Nginx forwards to frontend:3000
4. Next.js renders page (SSR/SSG)
5. Response → Nginx → User
```

### API Request
```
1. Frontend → fetch('/api/projects')
2. Browser → https://yourdomain.com/api/projects
3. Nginx receives request
4. Nginx forwards to backend:5000/api/projects
5. Express.js processes request
6. MongoDB queries executed
7. Response → Backend → Nginx → Frontend → User
```

### Image Upload Flow
```
1. Admin uploads image
2. Frontend → POST /api/upload
3. Nginx → Backend (Multer middleware)
4. Backend → Cloudinary API
5. Cloudinary returns URL
6. Backend saves URL to MongoDB
7. Response with image URL
```

## Data Flow

### Database Schema
```
MongoDB
├── admins
│   ├── email (unique)
│   ├── password (hashed)
│   └── timestamps
├── projects
│   ├── title, description
│   ├── images (Cloudinary URLs)
│   ├── technologies
│   └── metadata
├── services
│   ├── title, description
│   ├── icon (Simple Icons slug)
│   └── features
├── testimonials
│   ├── name, role
│   ├── content, rating
│   └── image
├── technologies
│   ├── name, icon
│   └── category
├── stats
│   ├── label, value
│   └── icon
├── hero_content
│   └── dynamic content
├── company_info
│   └── company details
└── process_steps
    └── workflow steps
```

### Authentication Flow
```
1. Admin submits login (email/password)
2. Backend validates credentials
3. bcrypt compares password hash
4. JWT token generated (7 days)
5. Token stored in localStorage
6. Subsequent requests include JWT header
7. Middleware validates token
8. Request processed or rejected (401)
```

## Security Layers

```
┌─────────────────────────────────────────────────┐
│ Layer 1: Network (Firewall)                    │
│  - UFW: Ports 22, 80, 443 only                 │
│  - DDoS protection (rate limiting)             │
└─────────────────┬───────────────────────────────┘
                  ▼
┌─────────────────────────────────────────────────┐
│ Layer 2: HTTPS/SSL (Nginx)                     │
│  - TLS 1.2/1.3 encryption                      │
│  - Let's Encrypt certificates                  │
│  - HSTS headers                                │
└─────────────────┬───────────────────────────────┘
                  ▼
┌─────────────────────────────────────────────────┐
│ Layer 3: Application (Express)                 │
│  - Helmet.js security headers                  │
│  - CORS configuration                          │
│  - Rate limiting (10 req/s API)                │
│  - Input validation (Zod)                      │
│  - XSS protection                              │
└─────────────────┬───────────────────────────────┘
                  ▼
┌─────────────────────────────────────────────────┐
│ Layer 4: Authentication (JWT)                  │
│  - Token-based auth                            │
│  - bcrypt password hashing                     │
│  - Protected admin routes                      │
└─────────────────┬───────────────────────────────┘
                  ▼
┌─────────────────────────────────────────────────┐
│ Layer 5: Database (MongoDB)                    │
│  - Network isolation                           │
│  - No external exposure                        │
│  - Validation schemas                          │
└─────────────────────────────────────────────────┘
```

## Deployment Architecture

### Development
```
Host Machine
├── backend (localhost:5000)
├── frontend (localhost:3000)
└── mongodb (localhost:27017)
```

### Production (Docker)
```
VPS Server
├── Docker Engine
│   ├── nginx container (ports 80, 443)
│   ├── frontend container (internal :3000)
│   ├── backend container (internal :5000)
│   └── mongodb container (internal :27017)
├── Volumes
│   ├── mongodb_data (database persistence)
│   └── backend/uploads (file storage)
└── Certbot
    └── SSL certificates
```

## Scaling Considerations

### Horizontal Scaling (Future)
```
                Load Balancer
                      │
        ┌─────────────┼─────────────┐
        ▼             ▼             ▼
    Frontend-1   Frontend-2   Frontend-3
        │             │             │
        └─────────────┼─────────────┘
                      │
                 Backend Pool
                      │
        ┌─────────────┼─────────────┐
        ▼             ▼             ▼
    Backend-1    Backend-2    Backend-3
        │             │             │
        └─────────────┼─────────────┘
                      │
                  MongoDB
              (Replica Set)
```

### Vertical Scaling (Current)
```
Increase VPS resources:
- RAM: 2GB → 4GB → 8GB
- CPU: 1 core → 2 cores → 4 cores
- Storage: 50GB → 100GB → 200GB
```

## Monitoring & Observability

```
┌─────────────────────────────────────────────┐
│          Health Check System                │
│                                             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  │
│  │  Nginx   │  │ Frontend │  │ Backend  │  │
│  │  every   │  │  every   │  │  every   │  │
│  │  30s     │  │  30s     │  │  30s     │  │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  │
│       │             │              │        │
│       └─────────────┴──────────────┘        │
│                     │                       │
│                     ▼                       │
│           Docker Health Checks              │
│            (Restart if unhealthy)           │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│          Logging System                     │
│                                             │
│  Container Logs → Docker Logs → Host Files │
│  Accessible via: docker-compose logs        │
│                                             │
│  Nginx:   Access + Error logs               │
│  Backend: Application logs                  │
│  MongoDB: Database logs                     │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│          Backup System                      │
│                                             │
│  Cron Job (Daily 2 AM)                      │
│       │                                     │
│       ▼                                     │
│  backup.sh script                           │
│       │                                     │
│       ▼                                     │
│  MongoDB dump                               │
│       │                                     │
│       ▼                                     │
│  Compress (tar.gz)                          │
│       │                                     │
│       ▼                                     │
│  Save to backups/                           │
│       │                                     │
│       ▼                                     │
│  Clean old backups (7 days)                 │
└─────────────────────────────────────────────┘
```

## Performance Optimization

### Nginx Optimizations
```
✅ Gzip compression (reduces transfer size)
✅ Static file caching (30 days)
✅ Browser caching headers
✅ Connection keep-alive
✅ Worker processes: auto
```

### Next.js Optimizations
```
✅ Standalone output (smaller Docker image)
✅ Static generation (SSG) where possible
✅ Image optimization (next/image)
✅ Code splitting (automatic)
✅ Font optimization
```

### Backend Optimizations
```
✅ Compression middleware
✅ MongoDB connection pooling
✅ Response caching (potential)
✅ Rate limiting
✅ Efficient queries
```

### Database Optimizations
```
✅ Indexes on frequently queried fields
✅ Connection pooling
✅ Query optimization
✅ Aggregation pipeline
```

## Cost Estimation

### VPS (DigitalOcean/Linode/Vultr)
```
Basic:  $6/month  (1GB RAM, 1 CPU)    - For testing
Medium: $12/month (2GB RAM, 1 CPU)    - Recommended
Scale:  $24/month (4GB RAM, 2 CPU)    - Growing traffic
```

### Additional Services
```
Domain:        $10-15/year
Cloudinary:    Free tier (10GB)
SSL:           Free (Let's Encrypt)
Backups:       Included (local storage)
```

### Total Monthly Cost
```
Minimum: ~$12/month (VPS + domain/12)
Typical: ~$15/month (includes overhead)
```

## Technology Stack Summary

**Frontend:**
- Next.js 14.0.4
- React 18
- TypeScript 5
- Tailwind CSS 3
- Framer Motion 10
- TanStack Query 5

**Backend:**
- Node.js 18
- Express.js 4
- TypeScript 5
- MongoDB 7
- Mongoose 8
- JWT + bcrypt

**DevOps:**
- Docker 24+
- Docker Compose 2+
- Nginx (Alpine)
- Let's Encrypt/Certbot
- Ubuntu 20.04+

**Services:**
- Cloudinary (Images)
- Simple Icons (Icons)

---

This architecture provides:
- ✅ Scalability
- ✅ Security
- ✅ Reliability
- ✅ Performance
- ✅ Maintainability
- ✅ Cost-effectiveness
