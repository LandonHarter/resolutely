import { FirestoreAdapter } from "@next-auth/firebase-adapter";
import { AuthOptions } from "next-auth";
import * as admin from "firebase-admin";
import Google from "next-auth/providers/google";
import { User } from "@/types/User";
import { assignDefault } from "@/backend/server/auth";

const firebaseAdminCredential = admin.credential.cert({
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
});
if (!admin.apps.length) {
    admin.initializeApp({
        credential: firebaseAdminCredential,
    });
}

export const authOptions: AuthOptions = {
    adapter: FirestoreAdapter({
        credential: firebaseAdminCredential,
    }),
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        })
    ],
    callbacks: {
        async session({ session, user }) {
            const firebaseUser = await admin.firestore().collection("users").doc(user.id).get();
            const userData = firebaseUser.data() as Partial<User> | undefined;

            if (!firebaseUser.exists || !userData) return session;

            if (!userData.initialized) {
                await assignDefault(user.id, admin.firestore());
            }

            return {
                ...session,
                firebaseToken: await admin.auth().createCustomToken(user.id),
                user: {
                    ...firebaseUser.data() as Partial<User>,
                    id: user.id
                }
            };
        }
    },
    pages: {
        signIn: "/"
    }
};