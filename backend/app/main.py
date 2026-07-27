from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.users import router as users_router
from app.api.resumes import router as resumes_router
from app.api.interviews import (
    router as interviews_router
)
from app.api.answers import (
    router as answers_router
)
from app.api.auth import router as auth_router

from app.api.dashboard import (
    router as dashboard_router
)

from app.api.job_match import (
    router as job_match_router
)

from app.api.routes.coding_interview_router import (
    router as coding_interview_router
)

from app.api import career_coach

from app.api.routes.profile import (
    router as profile_router,
)

from app.api.routes.settings import (
    router as settings_router,
)

app = FastAPI(title="InterviewGPT API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "InterviewGPT API Running"}


@app.get("/api/health")
def health():
    return {"status": "ok"}

app.include_router(
    users_router,
    prefix="/api/users",
    tags=["users"],
)

app.include_router(
    resumes_router,
    prefix="/api/resumes",
    tags=["resumes"],
)

app.include_router(
    interviews_router,
    prefix="/api/interviews",
    tags=["interviews"],
)

app.include_router(
    answers_router,
    prefix="/api/answers",
    tags=["answers"],
)

app.include_router(
    auth_router,
    prefix="/api/auth",
    tags=["auth"],
)

app.include_router(
    dashboard_router,
    prefix="/api/dashboard",
    tags=["dashboard"],
)

app.include_router(
    job_match_router,
    prefix="/api/job-match",
    tags=["Job Match"],
)

app.include_router(
    coding_interview_router,
    prefix="/api/coding-interviews",
    tags=["Coding Interviews"],
)

app.include_router(
    career_coach.router,
    prefix="/api/career-coach",
    tags=["Career Coach"],
)

app.include_router(
    profile_router,
    prefix="/api",
)

app.include_router(
    settings_router,
    prefix="/api",
)