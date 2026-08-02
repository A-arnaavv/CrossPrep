const faqs = [
    {
        question: "What is CrossPrep?",
        answer:
            "CrossPrep is an AI-powered career preparation platform that brings resume analysis, mock interviews, coding practice, job matching, coaching, and analytics into one workspace.",
    },
    {
        question: "Can CrossPrep help with technical interviews?",
        answer:
            "Yes. CrossPrep supports coding practice, technical interview preparation, resume-based questions, behavioural interviews, and structured feedback.",
    },
    {
        question: "Is the preparation personalized?",
        answer:
            "Yes. CrossPrep uses your resume, target role, experience, preferences, and previous performance to guide recommendations and practice sessions.",
    },
    {
        question: "Can I track my progress?",
        answer:
            "Yes. Your dashboard shows interview readiness, resume insights, preparation activity, performance trends, and recommended next steps.",
    },
];

export default function FAQSection() {
    return (
        <section
            id="faq"
            className="scroll-mt-24 bg-[#f8f9ff]"
        >
            <div className="mx-auto grid max-w-7xl gap-14 px-5 py-24 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8 lg:py-32">
                <div>
                    <div className="inline-flex rounded-full border border-violet-200 bg-white px-4 py-2 text-sm font-semibold text-violet-700 shadow-sm">
                        Frequently asked questions
                    </div>

                    <h2 className="mt-6 text-3xl font-bold tracking-tight text-slate-950 sm:text-5xl">
                        Everything you need to know before getting started
                    </h2>

                    <p className="mt-6 max-w-lg text-lg leading-8 text-slate-600">
                        CrossPrep is designed to make interview preparation more focused,
                        personalized, and measurable.
                    </p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq) => (
                        <details
                            key={faq.question}
                            className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm open:border-violet-200 open:shadow-lg open:shadow-violet-100/50"
                        >
                            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-slate-950">
                                {faq.question}

                                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-50 text-lg text-violet-700 transition group-open:rotate-45">
                                    +
                                </span>
                            </summary>

                            <p className="mt-4 max-w-2xl leading-7 text-slate-600">
                                {faq.answer}
                            </p>
                        </details>
                    ))}
                </div>
            </div>
        </section>
    );
}