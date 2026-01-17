# API Documentation

Base URL: `http://localhost:5000/api`

## Authentication

Most endpoints require JWT authentication. Include the token in the Authorization header:

```
Authorization: Bearer YOUR_JWT_TOKEN
```

---

## Auth Endpoints

### POST /auth/register
Create a new admin user (should be protected in production).

**Request:**
```json
{
  "email": "admin@example.com",
  "password": "securepassword",
  "role": "admin" // or "editor"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Admin created successfully",
  "admin": {
    "id": "...",
    "email": "admin@example.com",
    "role": "admin"
  }
}
```

### POST /auth/login
Login to get JWT token.

**Request:**
```json
{
  "email": "admin@example.com",
  "password": "securepassword"
}
```

**Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "admin": {
    "id": "...",
    "email": "admin@example.com",
    "role": "admin"
  }
}
```

### GET /auth/verify
Verify if the current token is valid (requires authentication).

**Response:**
```json
{
  "success": true,
  "admin": {
    "id": "...",
    "email": "admin@example.com",
    "role": "admin"
  }
}
```

### POST /auth/logout
Logout (requires authentication).

**Response:**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

## Projects

### GET /projects
Get all projects with optional filters.

**Query Parameters:**
- `category` - Filter by category (web, mobile, saas, ecommerce)
- `technology` - Filter by technology
- `featured` - Filter featured projects (true/false)

**Response:**
```json
{
  "success": true,
  "count": 10,
  "data": [
    {
      "_id": "...",
      "title": "E-commerce Platform",
      "description": "A modern e-commerce platform...",
      "category": "ecommerce",
      "technologies": ["Next.js", "Node.js", "MongoDB"],
      "client": "TechStore Inc.",
      "duration": "3 months",
      "liveUrl": "https://example.com",
      "images": ["https://..."],
      "featured": true,
      "order": 1,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

### GET /projects/featured
Get only featured projects (limited to 6).

**Response:** Same as GET /projects

### GET /projects/:id
Get a single project by ID.

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "title": "E-commerce Platform",
    // ... other fields
  }
}
```

### POST /projects
Create a new project (requires authentication).

**Request:**
```json
{
  "title": "Project Title",
  "description": "Detailed project description",
  "category": "web", // web, mobile, saas, ecommerce
  "technologies": ["React", "Node.js"],
  "client": "Client Name",
  "duration": "2 months",
  "liveUrl": "https://example.com",
  "images": ["https://cloudinary.com/..."],
  "featured": false,
  "order": 1
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "title": "Project Title",
    // ... other fields
  }
}
```

### PUT /projects/:id
Update a project (requires authentication).

**Request:** Same as POST /projects

**Response:**
```json
{
  "success": true,
  "data": {
    // Updated project
  }
}
```

### DELETE /projects/:id
Delete a project (requires admin role).

**Response:**
```json
{
  "success": true,
  "message": "Project deleted successfully"
}
```

---

## Services

### GET /services
Get all services ordered by order field.

**Response:**
```json
{
  "success": true,
  "count": 4,
  "data": [
    {
      "_id": "...",
      "title": "Web Development",
      "description": "Custom web applications...",
      "icon": "FiCode",
      "features": ["Responsive Design", "SEO Optimized"],
      "order": 1,
      "createdAt": "...",
      "updatedAt": "..."
    }
  ]
}
```

### GET /services/:id
Get a single service by ID.

### POST /services
Create a new service (requires authentication).

**Request:**
```json
{
  "title": "Service Name",
  "description": "Service description",
  "icon": "FiCode",
  "features": ["Feature 1", "Feature 2"],
  "order": 1
}
```

### PUT /services/:id
Update a service (requires authentication).

### DELETE /services/:id
Delete a service (requires admin role).

---

## Testimonials

### GET /testimonials
Get all testimonials.

**Response:**
```json
{
  "success": true,
  "count": 5,
  "data": [
    {
      "_id": "...",
      "clientName": "John Doe",
      "company": "Tech Corp",
      "position": "CEO",
      "content": "Excellent service!",
      "rating": 5,
      "avatar": "https://...",
      "featured": true,
      "createdAt": "...",
      "updatedAt": "..."
    }
  ]
}
```

### GET /testimonials/featured
Get featured testimonials (limited to 6).

### GET /testimonials/:id
Get a single testimonial by ID.

### POST /testimonials
Create a new testimonial (requires authentication).

**Request:**
```json
{
  "clientName": "John Doe",
  "company": "Tech Corp",
  "position": "CEO",
  "content": "The testimonial content...",
  "rating": 5,
  "avatar": "https://...",
  "featured": true
}
```

### PUT /testimonials/:id
Update a testimonial (requires authentication).

### DELETE /testimonials/:id
Delete a testimonial (requires admin role).

---

## Technologies

### GET /technologies
Get all technologies grouped by category.

**Response:**
```json
{
  "success": true,
  "count": 16,
  "data": {
    "frontend": [
      {
        "_id": "...",
        "name": "React",
        "category": "frontend",
        "icon": "SiReact",
        "proficiency": 95,
        "createdAt": "...",
        "updatedAt": "..."
      }
    ],
    "backend": [...],
    "database": [...],
    "devops": [...]
  }
}
```

### GET /technologies/:id
Get a single technology by ID.

### POST /technologies
Create a new technology (requires authentication).

**Request:**
```json
{
  "name": "React",
  "category": "frontend", // frontend, backend, database, devops
  "icon": "SiReact",
  "proficiency": 95 // 1-100
}
```

### PUT /technologies/:id
Update a technology (requires authentication).

### DELETE /technologies/:id
Delete a technology (requires admin role).

---

## Upload

### POST /upload
Upload an image to local server storage (requires authentication).

**Request:**
- Content-Type: multipart/form-data
- Field name: `image`
- Max file size: 5MB (configurable via MAX_FILE_SIZE env variable)
- Allowed types: Images only

**Response:**
```json
{
  "success": true,
  "data": {
    "url": "http://localhost:5000/uploads/image-1234567890-123456789.jpg",
    "filename": "image-1234567890-123456789.jpg",
    "path": "/path/to/backend/uploads/image-1234567890-123456789.jpg"
  }
}
```

### DELETE /upload/:filename
Delete an image from local server storage (requires authentication).

**Response:**
```json
{
  "success": true,
  "message": "Image deleted successfully"
}
```

---

## Health Check

### GET /health
Check if the server is running.

**Response:**
```json
{
  "success": true,
  "message": "Server is running"
}
```

---

## Error Responses

All endpoints may return error responses in the following format:

```json
{
  "success": false,
  "message": "Error message here"
}
```

### Common Status Codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

---

## Rate Limiting

API requests are rate limited to:
- 100 requests per 15 minutes per IP

If you exceed the limit, you'll receive a `429` status code.

---

## Examples with cURL

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"password123"}'
```

### Get All Projects
```bash
curl http://localhost:5000/api/projects
```

### Create a Project (with auth)
```bash
curl -X POST http://localhost:5000/api/projects \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "title": "New Project",
    "description": "Project description",
    "category": "web",
    "technologies": ["React", "Node.js"],
    "featured": true
  }'
```

### Upload Image
```bash
curl -X POST http://localhost:5000/api/upload \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "image=@/path/to/image.jpg"
```

---

## Notes

- All timestamps are in ISO 8601 format
- IDs are MongoDB ObjectIds
- All responses include a `success` boolean
- Protected routes require valid JWT token
- Some routes require specific roles (admin vs editor)
- File uploads are sent to Cloudinary
- Database uses MongoDB with Mongoose ODM
