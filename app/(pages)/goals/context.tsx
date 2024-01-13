"use client";

import { createContext, useState } from "react";

export type Filter = "fitness" | "diet" | "reading" | "meditation" | "music" | "art" | "other";
export const FilterContext = createContext<{
    filters: Filter[],
    setFilters: React.Dispatch<React.SetStateAction<Filter[]>>
}>({
    filters: [],
    setFilters: () => { },
});
export function FilterProvider({ children }: { children: React.ReactNode }) {
    const [filters, setFilters] = useState<Filter[]>(["fitness", "diet", "reading", "meditation", "music", "art", "other"]);

    return (
        <FilterContext.Provider value={{
            filters,
            setFilters,
        }}>
            {children}
        </FilterContext.Provider>
    );
}
