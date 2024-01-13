"use client";

import { useSearchParams } from "next/navigation";
import { useContext } from "react";
import { FilterContext } from "./context";
import { User } from "@/types/User";

export default function GoalsContent({ user }: { user: User }) {
    const { filters, setFilters } = useContext(FilterContext);

    function formatDate() {
        const date = new Date();
        const day = date.toLocaleString("en-US", { weekday: "short" });
        const dayNum = date.getDate();
        const month = date.toLocaleString("en-US", { month: "short" });
        const year = date.getFullYear();
        return `${day} ${dayNum} ${month} ${year}`;
    }

    return (
        <main className="absolute left-[350px] h-fit min-h-screen px-16" style={{
            width: "calc(100vw - 350px)",
        }}>
            <h1 className="mt-[42px] text-3xl font-semibold mb-2">Good Morning, {user.name}! 👋</h1>
            <p className="text-gray-500 text-lg">Today, {formatDate()}</p>
        </main>
    );
}