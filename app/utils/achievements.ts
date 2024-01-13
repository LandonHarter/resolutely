import { firestore } from "@/backend/client/firebase";
import { Achievement } from "@/types/Achievements";
import { User } from "@/types/User";
import { arrayUnion, collection, doc, updateDoc } from "firebase/firestore";

export function hasAcievement(user: User, name: string) {
    if (user.achievements.find(achievement => achievement.name === name)) {
        return true;
    }

    return false;
}

export async function awardAchievement(user: User, achievement: Achievement, achievementControls: any) {
    if (hasAcievement(user, achievement.name)) return;

    const userDoc = doc(collection(firestore, "users"), user.id);
    await updateDoc(userDoc, {
        achievements: arrayUnion(achievement)
    });

    achievementControls.setAchievement(achievement);
    achievementControls.openModal();
}