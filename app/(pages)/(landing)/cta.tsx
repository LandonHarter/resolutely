"use client";

import { Button } from "@nextui-org/react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LandingCTA({ signedIn }: { signedIn: boolean }) {
    const router = useRouter();

    return (
        <>
            <Button color="primary" className="p-6 text-lg font-medium" onPress={() => {
                if (signedIn) router.push("/goals");
                else signIn("google", {
                    callbackUrl: "/goals"
                });
            }}>Get Started</Button>
            <Button className="p-6 text-lg font-medium">Learn More</Button>
        </>
    );
}