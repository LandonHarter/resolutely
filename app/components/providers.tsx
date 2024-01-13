"use client";

import { syncFirebaseAuth } from "@/backend/client/auth";
import { NextUIProvider } from "@nextui-org/react";
import { Session } from "next-auth";
import { SessionProvider, useSession } from "next-auth/react";
import { useEffect } from "react";
import { Toaster } from "sonner";

export default function Providers({ session, children }: { session?: Session | null, children: React.ReactNode }) {
    return (
        <NextUIProvider>
            <Toaster />
            <SessionProvider session={session}>
                <FirebaseAuthProvider>
                    {children}
                </FirebaseAuthProvider>
            </SessionProvider>
        </NextUIProvider>
    );
}

function FirebaseAuthProvider({ children }: { children: React.ReactNode }) {
    const authSession = useSession();

    useEffect(() => {
        syncFirebaseAuth(authSession);
    }, [authSession]);

    return children;
}