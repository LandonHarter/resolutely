import { Achievement } from "./Achievements";
import { Goal } from "./Goal";

export type User = {
    name: string;
    email: string;
    emailVerified: boolean | null;
    image: string;
    id: string;
    joinedAt: string;

    initialized: boolean; // because we are not using a SQL or typed database, we must track if we have initialized the users fields with a default value

    goals: Goal[];
    goalsCreated: number;

    lastDayActive: string;
    streak: number;

    achievements: Achievement[];
};