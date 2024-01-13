"use client";

import { NextUIProvider } from "@nextui-org/react";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

export default function Providers({ session, children }: { session?: Session | null, children: React.ReactNode }) {
    return (
        <NextUIProvider>
            <SessionProvider session={session}>
                {children}
            </SessionProvider>
        </NextUIProvider>
    );
}