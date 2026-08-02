import {
    ArrowRight,
    Check,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function FinalCTA() {
    return (
        <section className="bg-[#f8f9ff] px-5 pb-24 sm:px-6 lg:px-8 lg:pb-32">
            <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] bg-violet-600 px-6 py-16 text-center shadow-2xl shadow-violet-200 sm:px-12 lg:py-20">
                <div className="absolute left-[-5rem] top-[-5rem] h-64 w-64 rounded-full bg-white/10 blur-2xl" />

                <div className="absolute bottom-[-7rem] right-[-5rem] h-72 w-72 rounded-full bg-violet-400/40 blur-3xl" />

                <div className="relative">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 p-2 ring-1 ring-white/20">
                        <Image
                            src="/icon.png"
                            alt="CrossPrep"
                            width={48}
                            height={48}
                        />
                    </div>

                    <h2 className="mx-auto mt-7 max-w-3xl text-3xl font-bold tracking-tight text-white sm:text-5xl">
                        Your next opportunity deserves better preparation.
                    </h2>

                    <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-violet-100">
                        Build the skills, confidence, and preparation system you need for
                        your next interview.
                    </p>

                    <Link
                        href="/sign-up"
                        className="group mt-9 inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-7 py-4 font-bold text-violet-700 shadow-xl transition hover:-translate-y-0.5 hover:bg-violet-50"
                    >
                        Create your CrossPrep account

                        <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
                    </Link>

                    <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm text-violet-100">
                        <span className="flex items-center gap-2">
                            <Check className="h-4 w-4" />
                            Personalized workspace
                        </span>

                        <span className="flex items-center gap-2">
                            <Check className="h-4 w-4" />
                            AI-powered feedback
                        </span>

                        <span className="flex items-center gap-2">
                            <Check className="h-4 w-4" />
                            Progress analytics
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
}