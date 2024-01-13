import { Filter } from "@/(pages)/goals/context";

export type Goal = {
    name: string;
    category: Filter;
    completed: boolean;
    id: string;
    createdAt: string;
};