import { signInWithCustomToken } from "firebase/auth";
import { auth } from "./firebase";

export async function syncFirebaseAuth(session: any) {
    if (session && session.data && session.data.firebaseToken) {
        try {
            await signInWithCustomToken(auth, session.data.firebaseToken);
        } catch (e) {
            console.error(e);
        }
    } else {
        auth.signOut();
    }
}