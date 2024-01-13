"use server";

import { Goal, GoalCategory, GoalTimeFrame } from "@/types/Goal";
import { User } from "@/types/User";
import { generateId } from "@/utils/id";
import { arrayUnion, collection, doc, increment, updateDoc } from "firebase/firestore";
import { firestore } from "@/backend/client/firebase";

export async function createGoal(user: User, category: GoalCategory, timespan: GoalTimeFrame, name: string) {
    const goal = {
        name,
        category,
        timeframe: timespan,
        completed: false,
        id: generateId(),
        createdAt: new Date().toISOString()
    } as Goal;

    const userRef = doc(collection(firestore, "users"), user.id);
    await updateDoc(userRef, {
        goals: arrayUnion(goal),
        goalsCreated: increment(1)
    });

    return {
        goal,
        goalsCreated: user.goalsCreated + 1
    };
}