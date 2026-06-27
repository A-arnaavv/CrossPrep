import Link from "next/link";

export default function ContinueJourney() {
    const actions = [
        {
            title: "Coding Interview",
            description:
                "Practice algorithm and coding questions.",
            href: "/coding-interview",
        },
        {
            title: "Behavioral Interview",
            description:
                "Improve communication and STAR responses.",
            href: "/interview/new",
        },
        {
            title: "Resume Intelligence",
            description:
                "Analyze and improve your resume.",
            href: "/upload",
        },
        {
            title: "Interview History",
            description:
                "Review previous interview reports.",
            href: "/history",
        },
    ];

    return (
        <div className="mt-8">

            <h2 className="text-2xl font-bold">
                Continue Your Journey
            </h2>

            <p className="text-zinc-500 mt-2">
                Pick up where you left off.
            </p>

            <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mt-6">

                {actions.map((action) => (

                    <Link
                        key={action.title}
                        href={action.href}
                        className="
                            bg-white
                            border
                            rounded-3xl
                            p-6
                            hover:shadow-lg
                            hover:-translate-y-1
                            transition-all
                            duration-300
                        "
                    >

                        <h3 className="font-bold text-lg mt-4">
                            {action.title}
                        </h3>

                        <p className="text-sm text-zinc-500 mt-2 leading-6">
                            {action.description}
                        </p>

                        <div className="mt-6 text-violet-600 font-semibold">
                            Continue →
                        </div>

                    </Link>

                ))}

            </div>

        </div>
    );
}