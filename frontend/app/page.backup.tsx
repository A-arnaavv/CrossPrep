import { auth } from "@clerk/nextjs/server";
import {
  ArrowRight,
  BarChart3,
  BrainCircuit,
  CheckCircle2,
  Code2,
  FileSearch,
  Sparkles,
  Target,
} from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

const features = [
  {
    icon: BrainCircuit,
    title: "AI Mock Interviews",
    description:
      "Practice realistic interview questions and receive focused feedback on every response.",
  },
  {
    icon: Code2,
    title: "Coding Practice",
    description:
      "Solve technical problems in a focused coding environment built for interview preparation.",
  },
  {
    icon: FileSearch,
    title: "Resume Insights",
    description:
      "Analyze your resume, identify gaps, and prepare for questions based on your experience.",
  },
  {
    icon: BarChart3,
    title: "Progress Analytics",
    description:
      "Track your performance, strengths, improvement areas, and interview readiness over time.",
  },
];

const benefits = [
  "Personalized preparation based on your profile",
  "Actionable feedback after every practice session",
  "Technical and behavioural interview support",
  "One workspace for your complete preparation journey",
];

export default async function HomePage() {
  const { userId } = await auth();

  if (userId) {
    redirect("/dashboard");
  }

  return (
    <main className="min-h-screen overflow-hidden bg-slate-950 text-white">
      <div className="animate-fade-up">
        <div className="absolute left-1/2 top-[-12rem] h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-indigo-600/20 blur-[120px]" />
        <div className="absolute right-[-10rem] top-[20rem] h-[28rem] w-[28rem] rounded-full bg-cyan-500/10 blur-[110px]" />
      </div>

      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-400 shadow-lg shadow-indigo-500/20">
              <Sparkles className="h-5 w-5 text-white" />
            </div>

            <span className="text-xl font-bold tracking-tight">CrossPrep</span>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            <Link
              href="#features"
              className="text-sm font-medium text-slate-400 transition hover:text-white"
            >
              Features
            </Link>

            <Link
              href="#how-it-works"
              className="text-sm font-medium text-slate-400 transition hover:text-white"
            >
              How it works
            </Link>

            <Link
              href="#benefits"
              className="text-sm font-medium text-slate-400 transition hover:text-white"
            >
              Why CrossPrep
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/sign-in"
              className="rounded-lg px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white"
            >
              Sign in
            </Link>

            <Link
              href="/sign-up"
              className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-slate-200"
            >
              Get started
            </Link>
          </div>
        </nav>
      </header>

      <section className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 py-24 lg:grid-cols-2 lg:px-8 lg:py-32">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-400/10 px-4 py-2 text-sm text-indigo-200">
            <Sparkles className="h-4 w-4" />
            AI-powered interview preparation
          </div>

          <h1 className="max-w-3xl text-5xl font-bold leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
            Prepare smarter.
            <span className="block bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-300 bg-clip-text text-transparent">
              Interview confidently.
            </span>
          </h1>

          <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300">
            CrossPrep helps you practise interviews, strengthen coding skills,
            improve your resume, and turn feedback into measurable progress.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/sign-up"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 px-6 py-3.5 font-semibold text-white shadow-xl shadow-indigo-500/20 transition hover:-translate-y-0.5 hover:shadow-indigo-500/30"
            >
              Start preparing
              <ArrowRight className="h-5 w-5" />
            </Link>

            <Link
              href="/sign-in"
              className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 font-semibold text-white transition hover:bg-white/10"
            >
              Sign in
            </Link>
          </div>

          <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-400">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              Personalized practice
            </span>

            <span className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              Instant AI feedback
            </span>

            <span className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              Progress tracking
            </span>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-indigo-500/20 to-cyan-400/20 blur-3xl" />

          <div className="relative rounded-3xl border border-white/10 bg-slate-900/80 p-5 shadow-2xl backdrop-blur-xl">
            <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-5">
              <div>
                <p className="text-sm text-slate-400">Preparation workspace</p>
                <h2 className="mt-1 text-xl font-semibold">
                  Your interview readiness
                </h2>
              </div>

              <div className="rounded-xl bg-emerald-400/10 px-3 py-2 text-sm font-medium text-emerald-300">
                Improving
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-sm text-slate-400">Overall readiness</p>
                  <p className="mt-2 text-4xl font-bold">78%</p>
                </div>

                <Target className="h-9 w-9 text-indigo-400" />
              </div>

              <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-[78%] rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400" />
              </div>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <DashboardCard
                icon={<BrainCircuit className="h-5 w-5" />}
                title="Mock interview"
                value="8 sessions"
                detail="+3 this week"
              />

              <DashboardCard
                icon={<Code2 className="h-5 w-5" />}
                title="Coding practice"
                value="24 problems"
                detail="75% accuracy"
              />

              <DashboardCard
                icon={<FileSearch className="h-5 w-5" />}
                title="Resume score"
                value="86 / 100"
                detail="Strong profile"
              />

              <DashboardCard
                icon={<BarChart3 className="h-5 w-5" />}
                title="Current streak"
                value="6 days"
                detail="Keep going"
              />
            </div>
          </div>
        </div>
      </section>

      <section
        id="features"
        className="scroll-mt-24 border-y border-white/10 bg-white/[0.02]"
      >
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-400">
              Everything you need
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              One platform for complete interview preparation
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-400">
              Build confidence through deliberate practice, personalized
              feedback, and clear progress tracking.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <article
                  key={feature.title}
                  className="group rounded-2xl border border-white/10 bg-white/[0.04] p-7 transition hover:-translate-y-1 hover:border-indigo-400/30 hover:bg-white/[0.06]"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-400/10 text-indigo-300 transition group-hover:bg-indigo-400/20">
                    <Icon className="h-6 w-6" />
                  </div>

                  <h3 className="mt-6 text-xl font-semibold">{feature.title}</h3>

                  <p className="mt-3 leading-7 text-slate-400">
                    {feature.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section
        id="how-it-works"
        className="scroll-mt-24 border-b border-white/10"
      >
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">
              Simple preparation workflow
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              From preparation to progress in three steps
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-400">
              CrossPrep turns interview preparation into a focused and repeatable
              process.
            </p>
          </div>

          <div className="relative mt-16 grid gap-8 lg:grid-cols-3">
            <div className="absolute left-[16%] right-[16%] top-8 hidden h-px bg-gradient-to-r from-transparent via-indigo-400/40 to-transparent lg:block" />

            <WorkflowStep
              number="01"
              title="Build your profile"
              description="Upload your resume and define the role, skills, and interview areas you want to improve."
            />

            <WorkflowStep
              number="02"
              title="Practice intelligently"
              description="Complete AI mock interviews, coding challenges, and targeted preparation sessions."
            />

            <WorkflowStep
              number="03"
              title="Improve with feedback"
              description="Review personalized feedback, identify weak areas, and track your readiness over time."
            />
          </div>
        </div>
      </section>

      <section
        id="benefits"
        className="mx-auto grid max-w-7xl scroll-mt-24 gap-14 px-6 py-24 lg:grid-cols-2 lg:items-center lg:px-8"
      >
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">
            Built around your growth
          </p>

          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Turn preparation into measurable progress
          </h2>

          <p className="mt-5 max-w-xl text-lg leading-8 text-slate-400">
            CrossPrep helps you understand where you stand, what to improve,
            and what to practise next.
          </p>
        </div>

        <div className="space-y-4">
          {benefits.map((benefit) => (
            <div
              key={benefit}
              className="flex items-start gap-4 rounded-xl border border-white/10 bg-white/[0.04] p-5"
            >
              <div className="mt-0.5 rounded-full bg-emerald-400/10 p-1">
                <CheckCircle2 className="h-5 w-5 text-emerald-400" />
              </div>

              <p className="font-medium text-slate-200">{benefit}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 pb-24 lg:px-8">
        <div className="mx-auto max-w-5xl rounded-3xl border border-indigo-400/20 bg-gradient-to-br from-indigo-500/15 via-violet-500/10 to-cyan-400/10 px-6 py-16 text-center sm:px-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to prepare for your next opportunity?
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-300">
            Start practising with CrossPrep and turn every session into
            meaningful improvement.
          </p>

          <Link
            href="/sign-up"
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 font-semibold text-slate-950 transition hover:bg-slate-200"
          >
            Create your account
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>

      <footer className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-indigo-400" />
            <span className="font-semibold text-slate-300">CrossPrep</span>
          </div>

          <p>AI-powered interview preparation.</p>
        </div>
      </footer>
    </main>
  );
}

function DashboardCard({
  icon,
  title,
  value,
  detail,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  detail: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
      <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-400/10 text-indigo-300">
        {icon}
      </div>

      <p className="text-sm text-slate-400">{title}</p>
      <p className="mt-1 font-semibold">{value}</p>
      <p className="mt-1 text-xs text-slate-500">{detail}</p>
    </div>
  );
}

function WorkflowStep({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <article className="relative rounded-2xl border border-white/10 bg-white/[0.035] p-7 transition hover:-translate-y-1 hover:border-cyan-400/30 hover:bg-white/[0.055]">
      <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl border border-indigo-400/20 bg-slate-950 text-lg font-bold text-indigo-300 shadow-xl shadow-indigo-500/10">
        {number}
      </div>

      <h3 className="mt-7 text-xl font-semibold">{title}</h3>

      <p className="mt-3 leading-7 text-slate-400">{description}</p>
    </article>
  );
}