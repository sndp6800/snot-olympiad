# SNOT — StudyNLearn National Olympiad

Production-ready full-stack web platform for managing India-wide Olympiad operations.

## Tech Stack
- **Frontend**: Next.js 14 (App Router) + React + Tailwind CSS
- **Backend**: Node.js + Express
- **Database**: MongoDB + Mongoose
- **Auth**: JWT (access + refresh tokens)
- **Email**: Nodemailer
- **Deployment**: Vercel (frontend) + Railway/Render (backend)

---

## Folder Structure

```
snot-olympiad/
├── frontend/                  # Next.js app
│   ├── app/
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Home page
│   │   ├── about/page.tsx
│   │   ├── services/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── blog/page.tsx
│   │   ├── privacy/page.tsx
│   │   ├── terms/page.tsx
│   │   ├── auth/
│   │   │   ├── login/page.tsx
│   │   │   └── register/page.tsx
│   │   └── admin/
│   │       ├── page.tsx       # Admin dashboard
│   │       ├── schools/page.tsx
│   │       ├── students/page.tsx
│   │       ├── payments/page.tsx
│   │       └── logistics/page.tsx
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   └── Footer.tsx
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Toast.tsx
│   │   │   ├── Modal.tsx
│   │   │   └── LoadingSpinner.tsx
│   │   ├── sections/
│   │   │   ├── Hero.tsx
│   │   │   ├── Stats.tsx
│   │   │   ├── Features.tsx
│   │   │   ├── Testimonials.tsx
│   │   │   └── CTA.tsx
│   │   └── admin/
│   │       ├── Sidebar.tsx
│   │       ├── StatCard.tsx
│   │       └── DataTable.tsx
│   ├── context/
│   │   ├── AuthContext.tsx
│   │   └── ThemeContext.tsx
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   └── useFetch.ts
│   ├── lib/
│   │   ├── api.ts
│   │   └── utils.ts
│   ├── styles/globals.css
│   ├── public/
│   ├── next.config.js
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   └── package.json
│
└── backend/                   # Express API
    ├── config/
    │   └── db.js
    ├── controllers/
    │   ├── authController.js
    │   ├── schoolController.js
    │   ├── studentController.js
    │   ├── paymentController.js
    │   ├── contactController.js
    │   └── blogController.js
    ├── middleware/
    │   ├── auth.js
    │   ├── errorHandler.js
    │   └── rateLimiter.js
    ├── models/
    │   ├── User.js
    │   ├── School.js
    │   ├── Student.js
    │   ├── Payment.js
    │   ├── Contact.js
    │   └── Blog.js
    ├── routes/
    │   ├── auth.js
    │   ├── schools.js
    │   ├── students.js
    │   ├── payments.js
    │   ├── contact.js
    │   └── blog.js
    ├── utils/
    │   └── sendEmail.js
    ├── server.js
    ├── .env.example
    └── package.json
```

---

## Quick Start (Local)

### 1. Clone & install

```bash
git clone https://github.com/YOUR_USERNAME/snot-olympiad.git
cd snot-olympiad

# Install backend deps
cd backend && npm install

# Install frontend deps
cd ../frontend && npm install
```

### 2. Set up environment variables

```bash
# Backend
cd backend
cp .env.example .env
# Edit .env with your values

# Frontend
cd ../frontend
cp .env.example .env.local
# Edit .env.local with your values
```

### 3. Start MongoDB
Make sure MongoDB is running locally or use MongoDB Atlas (cloud).

### 4. Run dev servers

```bash
# Terminal 1 — Backend (port 5000)
cd backend && npm run dev

# Terminal 2 — Frontend (port 3000)
cd frontend && npm run dev
```

Visit: http://localhost:3000

---

## Production Build

```bash
# Frontend
cd frontend && npm run build && npm start

# Backend
cd backend && npm start
```

---

## Deploy to Vercel (Frontend)

1. Push code to GitHub
2. Go to https://vercel.com → New Project
3. Import your GitHub repo
4. Set Root Directory to `frontend`
5. Add environment variables from `.env.local`
6. Click Deploy

## Deploy Backend to Railway

1. Go to https://railway.app → New Project
2. Deploy from GitHub → select `backend` folder
3. Add environment variables
4. Railway auto-detects Node.js and deploys

## Connect Custom Domain

### Vercel:
1. Vercel Dashboard → Project → Settings → Domains
2. Add your domain (e.g. snotolympiad.in)
3. Add DNS records at your registrar:
   - Type: A, Name: @, Value: 76.76.21.21
   - Type: CNAME, Name: www, Value: cname.vercel-dns.com

### Backend domain (Railway):
1. Railway Dashboard → Settings → Domains
2. Add custom domain → follow DNS instructions

---

## Update Content

- **Blog posts**: POST /api/blog (admin JWT required)
- **School data**: POST /api/schools (admin JWT required)
- **Static content**: Edit files in `frontend/app/` and redeploy

---

## Default Admin Login
After seeding the DB:
- Email: admin@snotolympiad.in
- Password: Admin@1234 (change immediately in production)
