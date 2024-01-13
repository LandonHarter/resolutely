"use client";

import { useContext, useEffect, useState } from "react";
import { FilterContext } from "./context";
import { User } from "@/types/User";
import StreakSVG from "@/svg/streak";
import { Button, Checkbox, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@nextui-org/react";
import ThreeDotsSVG from "@/svg/threedots";
import PlusSVG from "@/svg/plus";
import NewGoal from "./new";
import { Goal } from "@/types/Goal";
import { arrayRemove, collection, doc, updateDoc } from "firebase/firestore";
import { firestore } from "@/backend/client/firebase";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { awardAchievement } from "@/utils/achievements";
import { Achievements } from "@/types/Achievements";
import { useAchievement } from "@/context/achievements";

export default function GoalsContent({ user, streak }: { user: User, streak: any }) {
    const { update } = useSession();
    const { filters, setFilters, goals, setGoals } = useContext(FilterContext);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const achievementControls = useAchievement();

    function formatDate() {
        const date = new Date();
        const day = date.toLocaleString("en-US", { weekday: "short" });
        const dayNum = date.getDate();
        const month = date.toLocaleString("en-US", { month: "short" });
        const year = date.getFullYear();
        return `${day} ${dayNum} ${month} ${year}`;
    }

    function getTimeOfDay() {
        const date = new Date();
        const hours = date.getHours();
        if (hours < 12) return "Morning";
        if (hours < 18) return "Afternoon";
        return "Evening";
    }

    function Goal({ goal }: { goal: Goal }) {
        if (!filters.includes(goal.category)) return null;
        return (
            <div className="flex justify-between items-center p-4 bg-white rounded-xl mb-2">
                <div className="flex items-center">
                    <Checkbox size="lg" />
                    <span className="ml-2 text-lg">{goal.name}</span>
                </div>
                <div className="flex items-center">
                    <Dropdown placement="top-end">
                        <DropdownTrigger>
                            <Button className="bg-transparent hover:bg-gray-200 rounded-xl transition-background" isIconOnly><ThreeDotsSVG className="w-6 h-6" /></Button>
                        </DropdownTrigger>
                        <DropdownMenu>
                            <DropdownItem color="danger" onPress={async () => {
                                setGoals(goals.filter(g => g.id !== goal.id));
                                toast.success("Goal deleted!");

                                const userRef = doc(collection(firestore, "users"), user.id);
                                await updateDoc(userRef, {
                                    goals: arrayRemove(goal)
                                });
                                await update();
                            }}>Delete</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </div>
        );
    }

    let sentStreak = false;
    useEffect(() => {
        if (streak.streak >= 365) awardAchievement(user, Achievements.YearStreak, achievementControls);
        else if (streak.streak >= 30) awardAchievement(user, Achievements.MonthStreak, achievementControls);
        else if (streak.streak >= 7) awardAchievement(user, Achievements.WeekStreak, achievementControls);
        else if (streak.streak >= 3) awardAchievement(user, Achievements.ThreeDayStreak, achievementControls);

        if (sentStreak) return;
        if (streak.failed) { toast.error("You broke your streak! 😢"); sentStreak = true; }
        else if (streak.newDay) { toast.success("One more day added to the streak! 🎉"); sentStreak = true; }
    }, [streak]);

    return (
        <>
            <main className="absolute left-[350px] h-fit min-h-screen px-16" style={{
                width: "calc(100vw - 350px)",
            }}>
                <div className="mt-[42px] mb-12 flex justify-between w-full">
                    <div className="flex flex-col">
                        <h1 className="text-3xl font-semibold mb-2">Good {getTimeOfDay()}, {user.name}! 👋</h1>
                        <p className="text-gray-500 text-lg">Today, {formatDate()}</p>
                    </div>
                    <div className="flex items-center">
                        <StreakSVG className="w-10 h-10 mr-2" />
                        <p className="font-medium text-3xl">{streak.streak}</p>
                    </div>
                </div>
                <div className="w-full flex flex-col">
                    <div className="w-full flex justify-end mb-2">
                        <Button color="primary" className="font-medium text-lg px-5" startContent={<PlusSVG className="w-5 h-5" pathClassName="stroke-white" />} onPress={onOpen}>New</Button>
                    </div>
                    {goals.map((goal, i) => {
                        return <Goal key={i} goal={goal} />;
                    })}
                    {goals.length === 0 && (
                        <div className="w-full flex justify-center items-center bg-white rounded-xl p-4">
                            <p className="text-lg text-gray-500">No goals yet!</p>
                        </div>
                    )}
                </div>
            </main>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl">
                <ModalContent className="flex flex-col items-center p-6">
                    {(onClose) => (
                        <>
                            <ModalHeader className="text-4xl font-medium">New Goal</ModalHeader>
                            <ModalBody className="w-full flex flex-col items-center">
                                <NewGoal user={user} onClose={onClose} />
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}