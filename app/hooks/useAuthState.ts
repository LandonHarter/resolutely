import { AuthState } from "@/types/AuthState";
import { authOptions } from "@/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

export async function useAuthState() {
    const session = await getServerSession(authOptions);
    const user = session?.user ?? null;
    const signedIn = !!session?.user;

    return {
        user,
        signedIn
    } as AuthState;
}