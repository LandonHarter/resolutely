import { User } from "@/types/User";

export function hasAcievement(user: User, achievementId: string) {
    if (user.achievements.find(achievement => achievement.id === achievementId)) {
        return true;
    }

    return false;
}