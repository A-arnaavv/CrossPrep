export default function SettingsHeader() {
    return (
        <header>
            <p className="text-sm font-semibold text-violet-600">
                Application settings
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                Settings
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
                Control how InterviewGPT behaves, communicates, and
                personalizes your experience.
            </p>
        </header>
    );
}