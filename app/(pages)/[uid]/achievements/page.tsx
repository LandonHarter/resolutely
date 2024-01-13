import { getAdmin } from "@/backend/server/admin";
import { User } from "@/types/User";

export async function generateMetadata(context: { params: { uid: string } }) {
    const user = await getUser(context.params.uid);

    return {
        title: user.name + "'s Achievements | Resolutely",
        description: "Check out " + user.name + "'s Achievements on Resolutely.",
    };
}

export default async function AchievementsPage(context: { params: { uid: string } }) {
    const user = await getUser(context.params.uid);

    return (
        <>{user.name}</>
    );
}

const admin = getAdmin();
async function getUser(uid: string) {
    const user = await admin.firestore().collection("users").doc(uid).get();
    return user.data() as User;
}