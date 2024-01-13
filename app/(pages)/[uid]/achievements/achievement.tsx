"use client";

import { useAchievement } from "@/context/achievements";
import { Achievement } from "@/types/Achievements";
import Image from "next/image";

export default function AchievementBadge({ achievement }: { achievement: Achievement }) {
    const { setAchievement, openModal } = useAchievement();

    return (
        <div className="p-4 bg-white border-2 border-gray-300 rounded-xl shadow-xl flex cursor-pointer" onClick={() => {
            setAchievement(achievement);
            openModal();
        }}>
            <Image src={"/images/achievements/" + achievement.id + ".svg"} alt={achievement.name} width={75} height={75} />
            <div className="flex flex-col ml-4">
                <h1 className="text-2xl font-medium">{achievement.name}</h1>
                <p className="text-gray-500">{achievement.description}</p>
            </div>
        </div>
    );
}