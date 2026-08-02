# 🚀 CrossPrep

> AI-powered interview preparation platform that helps candidates improve resumes, practice interviews, solve coding challenges, receive personalized AI feedback, and track their progress—all in one place.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![FastAPI](https://img.shields.io/badge/FastAPI-0.141-009688?logo=fastapi)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Python](https://img.shields.io/badge/Python-3.13-yellow?logo=python)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?logo=supabase)
![Clerk](https://img.shields.io/badge/Auth-Clerk-6A5ACD)
![License](https://img.shields.io/badge/License-MIT-green)

---

## 🌐 Live Demo

**Frontend**

https://crossprep.vercel.app/

**Backend API**

https://interviewgpt-backend-glzi.onrender.com

---

# 📖 Overview

CrossPrep is an AI-powered career preparation platform designed to make interview preparation smarter, more personalized, and measurable.

Instead of using multiple websites for resume analysis, coding practice, interview preparation, and career guidance, CrossPrep brings everything together into one unified platform.

The application provides:

- Resume Intelligence
- AI Mock Interviews
- Coding Interview Practice
- AI Career Coach
- Job Matching
- Performance Analytics
- Interview History
- Personalized Dashboard

---

# ✨ Features

## 📄 Resume Intelligence

- Upload resumes
- AI-powered resume analysis
- Skill gap detection
- Resume scoring
- Personalized improvement suggestions

---

## 🤖 AI Mock Interviews

- Behavioral interviews
- Technical interviews
- Resume-based interview questions
- AI-generated feedback
- Performance reports

---

## 💻 Coding Interview

- Coding interview workspace
- Technical problem solving
- AI evaluation
- Performance analysis

---

## 🎯 AI Career Coach

- Career guidance
- Learning recommendations
- Interview preparation roadmap
- Personalized suggestions

---

## 💼 Job Match

- Compare resumes against job descriptions
- Match scoring
- Missing skills identification
- Improvement recommendations

---

## 📊 Analytics Dashboard

- Performance tracking
- Interview history
- Resume statistics
- Preparation progress
- Activity visualization

---

## 👤 User Management

- Clerk Authentication
- Secure login
- Profile management
- Protected routes

---

# 🛠 Tech Stack

## Frontend

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- React Query
- Axios
- Clerk Authentication
- Lucide Icons

---

## Backend

- FastAPI
- Python
- SQLAlchemy
- Alembic
- Supabase
- Google Gemini AI

---

## Database

- PostgreSQL (Supabase)

---

## Deployment

Frontend

- Vercel

Backend

- Render

Authentication

- Clerk

---

# 📂 Project Structure

```
CrossPrep
│
├── frontend
│   ├── app
│   ├── components
│   ├── hooks
│   ├── lib
│   └── public
│
├── backend
│   ├── app
│   │   ├── api
│   │   ├── models
│   │   ├── services
│   │   ├── utils
│   │   └── database
│   │
│   └── migrations
│
└── README.md
```

---

# 🚀 Getting Started

## Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/CrossPrep.git
cd CrossPrep
```

---

## Backend Setup

```bash
cd backend

python -m venv .venv

source .venv/bin/activate

pip install -r requirements.txt

uvicorn app.main:app --reload
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

---

# 🔑 Environment Variables

## Backend

```env
DATABASE_URL=

SUPABASE_URL=

SUPABASE_SERVICE_KEY=

GEMINI_API_KEY=

CLERK_SECRET_KEY=

CLERK_ISSUER_URL=

CLERK_AUTHORIZED_PARTIES=
```

---

## Frontend

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=

CLERK_SECRET_KEY=

NEXT_PUBLIC_API_URL=

NEXT_PUBLIC_CLERK_SIGN_IN_URL=

NEXT_PUBLIC_CLERK_SIGN_UP_URL=

NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL=

NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL=
```

---

# 📸 Screenshots

## Landing Page

(Add screenshot)

---

## Dashboard

(Add screenshot)

---

## Resume Intelligence

(Add screenshot)

---

## Mock Interview

(Add screenshot)

---

## Coding Interview

(Add screenshot)

---

## Analytics

(Add screenshot)

---

# 🏗 Architecture

```
                User
                  │
                  ▼
        Next.js Frontend
                  │
        Clerk Authentication
                  │
                  ▼
          FastAPI Backend
                  │
        ┌─────────┴─────────┐
        │                   │
        ▼                   ▼
 Supabase PostgreSQL     Gemini AI
```

---

# 🔒 Security

- Clerk Authentication
- JWT Protected APIs
- Secure Environment Variables
- CORS Protection
- Input Validation
- SQLAlchemy ORM

---

# 🎯 Future Improvements

- Dark Mode
- AI Study Plans
- Company-specific Interview Preparation
- Email Notifications
- Resume Version History
- PDF Report Export
- Calendar Integration
- Mobile App

---

# 🤝 Contributing

Contributions are welcome.

1. Fork the repository

2. Create a feature branch

```bash
git checkout -b feature/my-feature
```

3. Commit changes

```bash
git commit -m "Add new feature"
```

4. Push branch

```bash
git push origin feature/my-feature
```

5. Open a Pull Request

---

# 📄 License

This project is licensed under the MIT License.

---

# 👨‍💻 Author

**Arnav Aggarwal**

GitHub

https://github.com/A-arnaavv

LinkedIn

https://linkedin.com/in/YOUR_LINKEDIN](https://www.linkedin.com/in/arnav-aggarwal-156a51276/)

---

## ⭐ If you like this project

Give it a ⭐ on GitHub!
