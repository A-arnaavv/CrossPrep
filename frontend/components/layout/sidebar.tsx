"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useClerk, useUser } from "@clerk/nextjs";
import {
  BarChart3,
  Bot,
  FileText,
  History,
  LayoutDashboard,
  LogOut,
  MessagesSquare,
  Settings,
  User,
} from "lucide-react";

const links = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    href: "/upload",
    label: "Resume Intelligence",
    icon: FileText,
  },
  {
    href: "/interviews",
    label: "Interviews",
    icon: MessagesSquare,
  },
  {
    href: "/career-coach",
    label: "AI Coach",
    icon: Bot,
  },
  {
    href: "/history",
    label: "History",
    icon: History,
  },
  {
    href: "/analytics",
    label: "Analytics",
    icon: BarChart3,
  },
  {
    href: "/profile",
    label: "Profile",
    icon: User,
  },
  {
    href: "/settings",
    label: "Settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { user } = useUser();
  const { signOut } = useClerk();

  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === href;
    }

    return (
      pathname === href ||
      pathname.startsWith(`${href}/`)
    );
  };

  return (
    <aside className="sticky top-0 flex h-screen w-60 shrink-0 flex-col justify-between border-r border-slate-100 bg-white">
      <div>
        {/* Brand */}
        <div className="flex items-center gap-3 px-6 py-7">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-violet-600 text-white">
            <Bot
              size={24}
              strokeWidth={2.2}
              aria-hidden="true"
            />
          </div>

          <div>
            <div className="text-xl font-bold text-slate-950">
              CrossPrep
            </div>

            <div className="text-xs text-slate-400">
              AI Career Platform
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-2 px-4">
          {links.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={[
                  "group flex items-center gap-4 rounded-2xl px-4 py-3 font-semibold transition-all duration-200",
                  active
                    ? "bg-violet-100 text-violet-700 shadow-sm"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
                ].join(" ")}
              >
                <Icon
                  size={20}
                  strokeWidth={2}
                  className={
                    active
                      ? "text-violet-700"
                      : "text-slate-400 transition group-hover:text-slate-700"
                  }
                  aria-hidden="true"
                />

                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* User area */}
      <div className="border-t border-slate-100 p-5">
        <div className="rounded-2xl bg-slate-50 p-4">
          <div className="flex items-center gap-3">
            {user?.imageUrl ? (
              <img
                src={user.imageUrl}
                alt={user.fullName ?? "Profile"}
                className="h-11 w-11 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-violet-600 text-lg font-bold text-white">
                {user?.firstName?.[0] || "A"}
              </div>
            )}

            <div className="min-w-0 flex-1">
              <div className="truncate font-bold text-slate-900">
                {user?.fullName || "User"}
              </div>

              <div className="truncate text-xs text-slate-500">
                {
                  user
                    ?.primaryEmailAddress
                    ?.emailAddress
                }
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() =>
              signOut({
                redirectUrl: "/sign-in",
              })
            }
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
          >
            <LogOut
              size={16}
              aria-hidden="true"
            />
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
}