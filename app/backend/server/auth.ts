import { User } from "@/types/User";
import * as admin from "firebase-admin";

export async function assignDefault(uid: string, firestore: admin.firestore.Firestore) {
    const defaultValues: Partial<User> = {
        initialized: true,
        goals: [],
        streak: 0,
        lastDayActive: new Date().toString()
    };
    await firestore.collection("users").doc(uid).update(defaultValues);
}