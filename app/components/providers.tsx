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
            <Toaster toastOptions={{
                unstyled: true,
                classNames: {
                    toast: "p-4 rounded-xl flex items-center w-full",
                    title: "ml-2",
                    info: "bg-[hsl(var(--resolutely-primary-100))] border-2 border-[hsl(var(--resolutely-primary-500))] text-[hsl(var(--resolutely-primary-700))]",
                    error: "bg-[hsl(var(--resolutely-danger-100))] border-2 border-[hsl(var(--resolutely-danger-500))] text-[hsl(var(--resolutely-danger-700))]",
                    success: "bg-[hsl(var(--resolutely-success-100))] border-2 border-[hsl(var(--resolutely-success-500))] text-[hsl(var(--resolutely-success-700))]",
                    warning: "bg-[hsl(var(--resolutely-warning-100))] border-2 border-[hsl(var(--resolutely-warning-500))] text-[hsl(var(--resolutely-warning-700))]",
                }
            }} />
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