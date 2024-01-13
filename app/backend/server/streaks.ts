import { User } from "@/types/User";
import { getAdmin } from "./admin";
import { FieldValue } from "firebase-admin/firestore";

const admin = getAdmin();
export async function checkStreaks(user: User) {
    const date = new Date();
    const lastDayActive = new Date(user.lastDayActive);

    let newStreak = {
        newDay: false,
        failed: false
    }
    if (date.getDate() - lastDayActive.getDate() === 1) {
        newStreak.newDay = true;
    } else if (date.getDate() - lastDayActive.getDate() > 1) {
        newStreak.failed = true;
    }

    if (newStreak.newDay || newStreak.failed) {
        await admin.firestore().collection("users").doc(user.id).update({
            streak: newStreak.failed ? 0 : FieldValue.increment(1),
            lastDayActive: date.toString()
        });
    }

    return newStreak;
}