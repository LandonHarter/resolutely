import { useAuthState } from "@/hooks/useAuthState";
import { redirect } from "next/navigation";
import GoalsSidebar from "./sidebar";
import GoalsContent from "./content";
import { FilterProvider } from "./context";
import { checkStreaks } from "@/backend/server/streaks";
import { createMetadata } from "@/utils/metadata";

export const metadata = createMetadata({
    title: "My Goals | Resolutely"
});
export default async function GoalsPage() {
    const { user, signedIn } = await useAuthState();
    if (!signedIn) redirect("/");
    const streak = await checkStreaks(user);

    return (
        <main className="w-screen h-screen flex bg-[#F5F4F5]">
            <FilterProvider>
                <GoalsSidebar />
                <GoalsContent user={user} />
            </FilterProvider>
        </main>
    );
}