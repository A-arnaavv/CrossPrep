"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "@clerk/nextjs";

const links = [
  {
    href: "/dashboard",
    label: "Dashboard",
  },
  {
    href: "/upload",
    label: "Resume Intelligence",
  },
  {
    href: "/interview/new",
    label: "Interviews",
  },
  {
    href: "/job-match",
    label: "Job Match",
  },
  {
    href: "/history",
    label: "History",
  },
  {
    href: "/profile",
    label: "Profile",
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  const { user } = useUser();

  return (
    <aside
      className="
      w-72
      min-h-screen
      bg-white/70
      backdrop-blur-xl
      border-r
      border-white/30
      shadow-xl
      flex
      flex-col
      sticky
      top-0
    "
    >
      <div className="p-8">

        <div className="flex items-center gap-3">

          <div>
            <h1 className="text-xl font-bold text-slate-900">
              InterviewGPT
            </h1>

            <p className="text-sm text-slate-500">
              AI Career Platform
            </p>
          </div>

        </div>

      </div>

      <nav className="flex-1 px-4">

        <div className="space-y-2">

          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`
                flex
                items-center
                gap-3
                px-4
                py-3
                rounded-2xl
                transition-all
                duration-200
                ${pathname === link.href
                  ? `
                    bg-white
                    shadow-md
                    text-slate-900
                    font-semibold
                  `
                  : `
                    text-slate-600
                    hover:bg-white/80
                    hover:shadow-sm
                  `
                }
              `}
            >
              <span className="text-lg">
              </span>

              {link.label}
            </Link>
          ))}

        </div>

      </nav>

      <div className="p-4">

        <div
          className="
          bg-white/80
          backdrop-blur-md
          rounded-2xl
          p-4
          border
          border-slate-200
        "
        >
          <div className="text-xs text-slate-500">
            Signed in as
          </div>

          <div className="mt-2 font-semibold text-slate-900">
            {user?.fullName}
          </div>

          <div className="text-sm text-slate-500 truncate">
            {
              user?.primaryEmailAddress
                ?.emailAddress
            }
          </div>
        </div>

      </div>

    </aside>
  );
}