"use client";

import { Goal, GoalCategory } from "@/types/Goal";
import { User } from "@/types/User";
import { createContext, useState } from "react";

export const FilterContext = createContext<{
    filters: GoalCategory[],
    setFilters: React.Dispatch<React.SetStateAction<GoalCategory[]>>,
    goals: Goal[],
    setGoals: React.Dispatch<React.SetStateAction<Goal[]>>
}>({
    filters: [],
    setFilters: () => { },
    goals: [],
    setGoals: () => { }
});
export function FilterProvider({ user, children }: { user: User, children: React.ReactNode }) {
    const [filters, setFilters] = useState<GoalCategory[]>(["health", "reading", "financial", "academic", "social", "other"]);
    const [goals, setGoals] = useState<Goal[]>(user.goals);

    return (
        <FilterContext.Provider value={{
            filters,
            setFilters,
            goals,
            setGoals
        }}>
            {children}
        </FilterContext.Provider>
    );
}
