# CrossPrep - Master Project Context

## Project Vision

CrossPrep is a production-grade AI-powered coding interview platform.

The platform will:

* Analyze user resumes
* Extract skills and experience
* Generate personalized interview questions
* Conduct coding interviews
* Execute code submissions
* Evaluate solutions using AI
* Maintain interview history
* Use RAG memory for personalization
* Use LangGraph agents for orchestration

The goal is to build a flagship portfolio project suitable for software engineering roles at Microsoft, Google, Amazon, and top startups.

---

# Current Sprint Status

Current Sprint: **Sprint 1.6 Complete**

Next Sprint: **Sprint 2.1 – Resume Upload + Storage**

Project Progress: ~20%

---

# Technology Stack

## Frontend

* Next.js 16
* TypeScript
* Tailwind CSS
* Clerk Authentication

## Backend

* FastAPI
* PostgreSQL
* SQLAlchemy 2.0
* Alembic

## Storage

* Supabase Storage

## AI

* Google Gemini
* LangGraph

## RAG

* FAISS / Chroma (TBD)

## Code Execution

* Judge0

---

# Completed Sprints

## Sprint 1 - Foundation

Completed:

* Next.js setup
* FastAPI setup
* Clerk authentication
* Protected routes
* PostgreSQL connection
* SQLAlchemy setup
* User model
* User sync API

---

## Sprint 1.5 - Database Hardening

Completed:

* Alembic setup
* Migration tracking
* Interview model
* User → Interview relationship

Migrations:

* initial_schema
* add_interviews_table

---

## Sprint 1.6 - Resume Foundation

Completed:

* Resume model
* User → Resume relationship
* Resume migration

Migrations:

* add_resumes_table

---

# Database Schema

## users

Fields:

* id
* clerk_id
* email
* name

Relationships:

* resumes[]
* interviews[]

---

## interviews

Fields:

* id
* user_id
* role
* level
* status
* created_at

Relationships:

* user

---

## resumes

Fields:

* id
* user_id
* file_url
* parsed_text
* skills
* uploaded_at

Relationships:

* user

---

# Architecture Decisions

## Authentication

Decision:

* Clerk

Rejected:

* NextAuth

---

## Database

Decision:

* PostgreSQL

Rejected:

* MongoDB

---

## Storage

Decision:

* Supabase Storage

Rejected:

* Firebase Storage

---

## Backend

Decision:

* FastAPI

Rejected:

* Express.js

---

## ORM

Decision:

* SQLAlchemy 2.0

Rejected:

* Prisma

---

# Folder Structure

## Frontend

frontend/

* app/
* components/
* lib/
* middleware.ts

---

## Backend

backend/

* app/

  * api/
  * core/
  * database/
  * models/
  * schemas/
  * services/
  * repositories/ (planned)

* migrations/

* alembic.ini

---

# Upcoming Sprints

## Sprint 2

Resume Upload Pipeline

Features:

* PDF upload
* Supabase Storage
* Resume record creation
* Resume dashboard

---

## Sprint 3

Resume Intelligence

Features:

* PDF text extraction
* Gemini analysis
* Skill extraction
* Experience extraction
* Project extraction

---

## Sprint 4

Interview Generation Engine

Features:

* Personalized questions
* Role-based interviews
* Difficulty levels

---

## Sprint 5

Coding Workspace

Features:

* Monaco Editor
* Problem statements
* Test cases

---

## Sprint 6

Judge0 Integration

Features:

* Multi-language execution
* Submission tracking

---

## Sprint 7

AI Evaluation

Features:

* Code review
* Complexity analysis
* Feedback generation

---

## Sprint 8

LangGraph Interview Agents

Features:

* Question agent
* Evaluation agent
* Feedback agent

---

## Sprint 9

RAG System

Features:

* Resume-aware retrieval
* Interview memory
* Personalized context

---

## Sprint 10

Production Deployment

Features:

* Analytics dashboard
* Monitoring
* CI/CD
* Deployment

---

# Important Rules

Always use:

* Alembic migrations
* SQLAlchemy models
* Environment variables
* Supabase Storage
* Clerk authentication

Never use:

* create_all() for schema management
* Hardcoded API URLs
* Firebase Storage
* MongoDB

---

# Current State Summary

Infrastructure Status:

* Authentication: Complete
* Database: Complete
* Migrations: Complete
* Resume Foundation: Complete

Next Milestone:

Sprint 2.1 – Resume Upload + Supabase Storage

Sprint 2.1 Complete

Features:
✓ Resume Upload
✓ Supabase Storage Integration
✓ Resume Repository
✓ Upload API
✓ Database Persistence

Sprint 2.3 Complete

Features:
✓ Resume Upload
✓ Cloud Storage
✓ PDF Parsing
✓ Gemini Analysis
✓ Structured Resume Intelligence

Database:
users
resumes
interviews

Resume Fields:
skills
projects
experience
education

Technical Debt:

Migration:
adc6ba2d24b0_add_resume_analysis_fields

Originally generated with pass.

Columns were manually added to PostgreSQL:

- projects
- experience
- education

Migration history should be cleaned before production deployment.

Sprint 4 Complete

Features:
✓ Resume Intelligence
✓ Interview Generation
✓ Answer Evaluation
✓ Score Generation
✓ Feedback Generation
✓ Ideal Answer Generation

Database:
users
resumes
interviews
questions
answers

# CrossPrep Status

## Completed

- Authentication (Clerk)
- User Management
- Resume Upload
- Resume Storage (Supabase)
- Resume Parsing
- ATS Analysis
- Resume Recommendations
- Interview Creation
- AI Interview Questions
- AI Answer Evaluation
- Interview Session
- Interview Results
- Detailed Reports
- Interview History
- Analytics Dashboard
- Job Match Analyzer

## Current Database Tables

- users
- resumes
- interviews
- questions
- answers
- job_matches

## Current Frontend Pages

/dashboard
/upload
/resume
/interview/create
/interview/session
/results
/report
/history
/job-match
/analytics

## Next Sprint

Coding Interview System

Features:

- Coding Question Generation
- Monaco Editor
- Code Submission
- AI Code Review
- Test Cases
- Runtime Analysis
- Coding Analytics


Completed:
- Coding interview backend model
- Alembic migration
- Gemini question generation
- Gemini code evaluation
- Monaco editor integration
- Split-screen LeetCode-style UI
- Language-specific starter templates
- Description/Hints tabs

Next:
- Better question formatting
- Run Code button
- Interview history page
- AI interviewer feedback panel
- Analytics integration