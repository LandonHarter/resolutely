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

export default function NewGoal({ user, onClose }: { user: User, onClose: () => void }) {
    const { update } = useSession();

    const [step, setStep] = useState(0);
    const [name, setName] = useState("");
    const [category, setCategory] = useState<GoalCategory | "">("");
    const [timeframe, setTimeframe] = useState<GoalTimeFrame | "">("");
    const [loading, setLoading] = useState(false);

    const { setGoals } = useContext(FilterContext);

    function GoalType({ title, id, type, children }: { title: string, id: GoalCategory | GoalTimeFrame, type: "category" | "timeframe", children: React.ReactNode }) {
        let selected = false;
        if (type === "category" && category === id) selected = true;
        if (type === "timeframe" && timeframe === id) selected = true;

        return (
            <div className={"flex flex-col items-center justify-center border-2 p-6 rounded-xl cursor-pointer hover:bg-gray-100 transition-all " + (selected ? "border-[hsl(var(--resolutely-primary))]" : "border-gray-300")} onClick={() => {
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
                        <StreakSVG className="w-12 h-12" />
                    </GoalType>
                    <GoalType title="Reading" type="category" id="reading">
                        <StreakSVG className="w-12 h-12" />
                    </GoalType>
                    <GoalType title="Financial" type="category" id="financial">
                        <StreakSVG className="w-12 h-12" />
                    </GoalType>
                    <GoalType title="Academic" type="category" id="academic">
                        <StreakSVG className="w-12 h-12" />
                    </GoalType>
                    <GoalType title="Social" type="category" id="social">
                        <StreakSVG className="w-12 h-12" />
                    </GoalType>
                    <GoalType title="Other" type="category" id="other">
                        <StreakSVG className="w-12 h-12" />
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
                        <StreakSVG className="w-12 h-12" />
                    </GoalType>
                    <GoalType title="Weekly" type="timeframe" id="weekly">
                        <StreakSVG className="w-12 h-12" />
                    </GoalType>
                    <GoalType title="Monthly+" type="timeframe" id="monthly+">
                        <StreakSVG className="w-12 h-12" />
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
                    const goal = await createGoal(user, category as GoalCategory, timeframe as GoalTimeFrame, name);
                    setGoals(goals => [...goals, goal]);
                    await update();
                    toast.success("Goal created!");

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