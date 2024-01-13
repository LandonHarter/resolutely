"use client";

import { useContext } from "react";
import { Filter, FilterContext } from "./context";
import { User } from "@/types/User";
import StreakSVG from "@/svg/streak";
import { Button, Checkbox, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import ThreeDotsSVG from "@/svg/threedots";
import PlusSVG from "@/svg/plus";

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

    function Goal({ name, category, id }: { name: string, category: Filter, id: string }) {
        if (!filters.includes(category)) return null;
        return (
            <div className="flex justify-between items-center p-4 bg-white rounded-xl mb-2">
                <div className="flex items-center">
                    <Checkbox size="lg" />
                    <span className="ml-2 text-lg">{name}</span>
                </div>
                <div className="flex items-center">
                    <Dropdown placement="top-end">
                        <DropdownTrigger>
                            <Button className="bg-transparent hover:bg-gray-200 rounded-xl transition-background" isIconOnly><ThreeDotsSVG className="w-6 h-6" /></Button>
                        </DropdownTrigger>
                        <DropdownMenu>
                            <DropdownItem color="danger">Delete</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </div>
        );
    }

    return (
        <main className="absolute left-[350px] h-fit min-h-screen px-16" style={{
            width: "calc(100vw - 350px)",
        }}>
            <div className="mt-[42px] mb-12 flex justify-between w-full">
                <div className="flex flex-col">
                    <h1 className="text-3xl font-semibold mb-2">Good Morning, {user.name}! 👋</h1>
                    <p className="text-gray-500 text-lg">Today, {formatDate()}</p>
                </div>
                <div className="flex items-center">
                    <StreakSVG className="w-10 h-10 mr-2" />
                    <p className="font-medium text-3xl">{user.streak}</p>
                </div>
            </div>
            <div className="w-full flex flex-col">
                <div className="w-full flex justify-end mb-2">
                    <Button color="primary" className="font-medium text-lg px-5" startContent={<PlusSVG className="w-5 h-5" pathClassName="stroke-white" />}>New</Button>
                </div>
                {user.goals.map((goal, i) => {
                    return <Goal key={i} name={goal.name} category={goal.category} id={goal.id} />;
                })}
                {user.goals.length === 0 && (
                    <div className="w-full flex justify-center items-center bg-white rounded-xl p-4">
                        <p className="text-lg text-gray-500">No goals yet!</p>
                    </div>
                )}
            </div>
        </main>
    );
}