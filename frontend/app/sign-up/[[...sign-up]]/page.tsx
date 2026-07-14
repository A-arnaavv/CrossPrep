import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
    return (
        <main className="min-h-screen flex items-center justify-center bg-[#f8f9ff]">
            <SignUp />
        </main>
    );
}