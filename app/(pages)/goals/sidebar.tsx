"use client";

import { Checkbox, Chip } from "@nextui-org/react";
import { useContext } from "react";
import { FilterContext } from "./context";
import { User } from "@/types/User";
import { GoalCategory } from "@/types/Goal";

export default function GoalsSidebar({ user }: { user: User }) {
    const { filters, setFilters, goals, setGoals } = useContext(FilterContext);

    function ListItem({ name, color, borderColor, id }: { name: string, color: string, borderColor: string, id: GoalCategory }) {
        const selected = filters.includes(id);
        let numGoals = 0;

        goals.forEach(goal => {
            if (goal.category === id) numGoals++;
        });

        return (
            <div className="w-full flex items-center justify-between py-4">
                <div className="flex items-center">
                    <Checkbox classNames={{
                        icon: color,
                        wrapper: borderColor
                    }} isSelected={selected} size="lg" onChange={() => {
                        if (selected) {
                            setFilters(filters.filter(filter => filter !== id));
                        } else {
                            setFilters([...filters, id]);
                        }
                    }} />
                    <span className="ml-2 text-lg">{name}</span>
                </div>
                <Chip className="px-4">{numGoals}</Chip>
            </div>
        );
    }

    return (
        <nav className="w-[330px] fixed left-[10px] top-[10px] p-4 rounded-xl bg-white" style={{
            height: "calc(100vh - 20px)"
        }}>
            <h1 className="text-3xl font-medium mt-4 mb-4">Filters</h1>
            <ListItem name="Health" color="bg-red-500" borderColor="after:bg-red-500" id="health" />
            <ListItem name="Reading" color="bg-sky-500" borderColor="after:bg-sky-500" id="reading" />
            <ListItem name="Financial" color="bg-emerald-500" borderColor="after:bg-emerald-500" id="financial" />
            <ListItem name="Academic" color="bg-amber-500" borderColor="after:bg-amber-500" id="academic" />
            <ListItem name="Social" color="bg-blue-500" borderColor="after:bg-blue-500" id="social" />
            <ListItem name="Other" color="bg-purple-500" borderColor="after:bg-purple-500" id="other" />
        </nav>
    );
}