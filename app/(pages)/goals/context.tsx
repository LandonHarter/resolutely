"use client";

import { createContext, useState } from "react";

export type Filter = "health" | "reading" | "financial" | "academic" | "social" | "misc";
export const FilterContext = createContext<{
    filters: Filter[],
    setFilters: React.Dispatch<React.SetStateAction<Filter[]>>
}>({
    filters: [],
    setFilters: () => { },
});
export function FilterProvider({ children }: { children: React.ReactNode }) {
    const [filters, setFilters] = useState<Filter[]>(["health", "reading", "financial", "academic", "social", "misc"]);

    return (
        <FilterContext.Provider value={{
            filters,
            setFilters,
        }}>
            {children}
        </FilterContext.Provider>
    );
}
