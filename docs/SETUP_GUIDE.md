# 🚀 CareerOS Quickstart & Setup Guide

## Prerequisites
- Node.js >= 18.x
- npm >= 9.x
- (Optional) Docker & Docker Compose

---

## 1. Quick Setup (Single Command)

From the root directory of the repository:

```bash
# 1. Install all dependencies across root, backend, and frontend
npm run install:all

# 2. Run both Backend API (Port 5001) and Frontend UI (Port 5173) concurrently
npm run dev
```

Then visit:
- **Frontend App**: `http://localhost:5173`
- **Backend API**: `http://localhost:5001`
- **Health Check**: `http://localhost:5001/api/health`

---

## 2. Running Services Individually

### Backend Service
```bash
cd backend
npm install
npm run dev
```

### Frontend Service
```bash
cd frontend
npm install
npm run dev
```

---

## 3. Docker Container Deployment

To run the complete production stack using Docker:

```bash
docker-compose up --build
```
