"use client";

import { Checkbox, Chip } from "@nextui-org/react";
import { useContext } from "react";
import { Filter, FilterContext } from "./context";

export default function GoalsSidebar() {
    const { filters, setFilters } = useContext(FilterContext);

    function ListItem({ name, id }: { name: string, id: Filter }) {
        const selected = filters.includes(id);

        return (
            <div className="w-full flex items-center justify-between py-4">
                <div className="flex items-center">
                    <Checkbox classNames={{
                        icon: "bg-red-500",
                        wrapper: "after:bg-red-500"
                    }} isSelected={selected} size="lg" onChange={() => {
                        if (selected) {
                            setFilters(filters.filter(filter => filter !== id));
                        } else {
                            setFilters([...filters, id]);
                        }
                    }} />
                    <span className="ml-2 text-lg">{name}</span>
                </div>
                <Chip className="px-4">0</Chip>
            </div>
        );
    }

    return (
        <nav className="w-[330px] fixed left-[10px] top-[10px] p-4 rounded-xl bg-white" style={{
            height: "calc(100vh - 20px)"
        }}>
            <h1 className="text-3xl font-medium mt-4 mb-4">Filters</h1>
            <ListItem name="Diet" id="diet" />
            <ListItem name="Fitness" id="fitness" />
        </nav>
    );
}