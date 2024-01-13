"use client";

import { createGoal } from "@/backend/server/actions/goals";
import StreakSVG from "@/svg/streak";
import { Goal, GoalCategory, GoalTimeFrame } from "@/types/Goal";
import { User } from "@/types/User";
import { Button, Input } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { useContext, useState } from "react";
import { toast } from "sonner";
import { FilterContext } from "./context";
import { awardAchievement } from "@/utils/achievements";
import { Achievements } from "@/types/Achievements";
import { useAchievement } from "@/context/achievements";
import HealthSVG from "@/svg/health";
import BookSVG from "@/svg/book";
import MoneySVG from "@/svg/money";
import StudentSVG from "@/svg/student";
import PeopleSVG from "@/svg/people";
import BlocksSVG from "@/svg/blocks";
import DailySVG from "@/svg/daily";
import MonthlySVG from "@/svg/monthly";
import WeeklySVG from "@/svg/weekly";

export default function NewGoal({ user, onClose }: { user: User, onClose: () => void }) {
    const { update } = useSession();

    const [step, setStep] = useState(0);
    const [name, setName] = useState("");
    const [category, setCategory] = useState<GoalCategory | "">("");
    const [timeframe, setTimeframe] = useState<GoalTimeFrame | "">("");
    const [loading, setLoading] = useState(false);

    const { setGoals } = useContext(FilterContext);
    const achievementControls = useAchievement();

    function GoalType({ title, id, type, children }: { title: string, id: GoalCategory | GoalTimeFrame, type: "category" | "timeframe", children: React.ReactNode }) {
        let selected = false;
        if (type === "category" && category === id) selected = true;
        if (type === "timeframe" && timeframe === id) selected = true;

        return (
            <div className={"flex flex-col items-center justify-center p-6 rounded-xl cursor-pointer transition-all " + (selected ? "border-[hsl(var(--resolutely-primary))] border-4 bg-[hsl(var(--resolutely-primary-100))] hover:" : "border-gray-300 border-2 hover:bg-gray-100")} onClick={() => {
                if (type === "category") setCategory(id as GoalCategory);
                if (type === "timeframe") setTimeframe(id as GoalTimeFrame);
            }}>
                {children}
                <span className="text-lg mt-4">{title}</span>
            </div>
        );
    }

    function step1() {
        return (
            <>
                <div className="grid grid-cols-3 grid-rows-2 gap-4">
                    <GoalType title="Health" type="category" id="health">
                        <HealthSVG className="w-12 h-12" />
                    </GoalType>
                    <GoalType title="Reading" type="category" id="reading">
                        <BookSVG className="w-12 h-12" />
                    </GoalType>
                    <GoalType title="Financial" type="category" id="financial">
                        <MoneySVG className="w-12 h-12" />
                    </GoalType>
                    <GoalType title="Academic" type="category" id="academic">
                        <StudentSVG className="w-12 h-12" pathClassName="fill-none stroke-2 stroke-black" />
                    </GoalType>
                    <GoalType title="Social" type="category" id="social">
                        <PeopleSVG className="w-12 h-12" />
                    </GoalType>
                    <GoalType title="Other" type="category" id="other">
                        <BlocksSVG className="w-12 h-12" />
                    </GoalType>
                </div>
                <Button color="primary" onPress={() => {
                    if (category === "") {
                        toast.error("Please select a category.");
                        return;
                    }

                    setStep(1);
                }}>Next</Button>
            </>
        );
    }

    function step2() {
        return (
            <>
                <div className="grid grid-cols-3 gap-4">
                    <GoalType title="Daily" type="timeframe" id="daily">
                        <DailySVG className="w-12 h-12" />
                    </GoalType>
                    <GoalType title="Weekly" type="timeframe" id="weekly">
                        <WeeklySVG className="w-12 h-12" />
                    </GoalType>
                    <GoalType title="Monthly+" type="timeframe" id="monthly+">
                        <MonthlySVG className="w-14 h-14" pathClassName="stroke-1 fill-none stroke-black" />
                    </GoalType>
                </div>
                <Button color="primary" onPress={() => {
                    if (timeframe === "") {
                        toast.error("Please select a timeframe.");
                        return;
                    }

                    setStep(2);
                }}>Next</Button>
            </>
        );
    }

    function step3() {
        return (
            <>
                <form className="w-full flex flex-col items-center justify-center" action={async (data: FormData) => {
                    if (name === "") {
                        toast.error("Please enter a name.");
                        return;
                    }

                    setLoading(true);
                    const { goal, goalsCreated } = await createGoal(user, category as GoalCategory, timeframe as GoalTimeFrame, name);
                    setGoals(goals => [...goals, goal]);
                    await update();
                    toast.success("Goal created!");

                    if (goalsCreated >= 50) await awardAchievement(user, Achievements.GoalMaster, achievementControls);
                    else if (goalsCreated >= 10) await awardAchievement(user, Achievements.GoalMaker, achievementControls);
                    else if (goalsCreated >= 1) await awardAchievement(user, Achievements.GoalSetter, achievementControls);

                    setCategory("");
                    setTimeframe("");
                    setName("");
                    setStep(0);
                    onClose();
                    setLoading(false);
                }}>
                    <Input className="w-full max-w-[450px] mb-2" variant="faded" placeholder="Name" value={name} onValueChange={setName} autoComplete="off" />
                    <Button color="primary" className="w-full max-w-[450px]" type="submit" isLoading={loading} disabled={loading}>Finish</Button>
                </form>
            </>
        );
    }

    function getStep() {
        switch (step) {
            case 0:
                return step1();
            case 1:
                return step2();
            case 2:
                return step3();
        }

        return null;
    }

    return getStep();
}