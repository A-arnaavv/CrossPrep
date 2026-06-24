import Sidebar from "./sidebar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-violet-50">

            <Sidebar />

            <main className="flex-1 p-8 bg-slate-50 min-h-screen text-black">
                {children}
            </main>

        </div>
    );
}