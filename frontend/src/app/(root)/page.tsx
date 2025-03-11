import Link from "next/link";
import { Button } from "@/components/ui/button";

const HomepageRoute = () => {
    return (
        <main className="wrapper bg-gradient-to-r from-blue-500 to-green-500 flex-col center text-white">
            <section className="text-center">
                <h1>Welcome to AdviceFit</h1>
                <p>Your personal guide to fitness and self-improvement.</p>
                <div className="space-x-4 mt-2 text-blue-600">
                    <Link href="/dashboard/attendance">
                        <Button variant="outline">Get Started</Button>
                    </Link>
                    <Button variant="outline">Learn More</Button>
                </div>
            </section>
        </main>
    );
};

export default HomepageRoute;
