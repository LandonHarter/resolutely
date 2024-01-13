import { getAdmin } from "@/backend/server/admin";
import { User } from "@/types/User";
import Image from "next/image";
import AchievementBadge from "./achievement";
import Header from "@/components/header/header";

export async function generateMetadata(context: { params: { uid: string } }) {
    const user = await getUser(context.params.uid);

    return {
        title: user.name + "'s Achievements | Resolutely",
        description: "Check out " + user.name + "'s Achievements on Resolutely.",
    };
}

export default async function AchievementsPage(context: { params: { uid: string } }) {
    const user = await getUser(context.params.uid);

    function formatDate(date: Date) {
        const month = date.toLocaleString("default", { month: "long" });
        const day = date.getDate();
        const year = date.getFullYear();
        return month + " " + day + ", " + year;
    }

    return (
        <>
            <Header />
            <main className="flex flex-col">
                <div className="absolute left-0 top-[80px] w-screen h-[300px] bg-[hsl(var(--resolutely-primary))]" />
                <Image src={user.image} alt={user.name} width={150} height={150} className="absolute left-[50px] top-[330px] rounded-full" />
                <h1 className="absolute left-[220px] top-[390px] font-semibold text-4xl">{user.name}</h1>
                <p className="absolute left-[220px] top-[435px] text-xl text-gray-400">Joined {formatDate(new Date(user.joinedAt))}</p>

                <div className="absolute left-[60px] top-[540px] flex flex-wrap gap-4">
                    {user.achievements.map((achievement, i) => {
                        return <AchievementBadge key={i} achievement={achievement} />;
                    })}
                </div>
            </main>
        </>
    );
}

const admin = getAdmin();
async function getUser(uid: string) {
    const user = await admin.firestore().collection("users").doc(uid).get();
    return user.data() as User;
}