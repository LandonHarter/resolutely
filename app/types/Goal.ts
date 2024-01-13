export type GoalTimeFrame = "daily" | "weekly" | "monthly+";
export type GoalCategory = "health" | "reading" | "financial" | "academic" | "social" | "other";

export type Goal = {
    name: string;
    category: GoalCategory;
    timeframe: GoalTimeFrame;
    completed: boolean;
    id: string;
    createdAt: string;
};