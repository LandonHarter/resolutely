import { firestore } from "@/backend/client/firebase";
import { Post } from "@/types/Post";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { createMetadata } from "@/utils/metadata";
import Link from "next/link";
import { Avatar, Card, CardBody, CardHeader } from "@nextui-org/react";
import Image from "next/image";
import { useAuthState } from "@/hooks/useAuthState";
import NewPost from "./new";

export const metadata = createMetadata({
    title: "Community | Resolutely",
    description: "A community of people who are trying to better themselves."
});
export default async function CommunityPage() {
    const posts = await getCommunityPosts();
    const { user } = await useAuthState();

    return (
        <main className="w-full flex flex-col items-center gap-8 py-[80px]">
            <NewPost user={user} />
            {posts.map((post, i) => {
                return (
                    <Link key={i} href={"/" + post.author.id + "/achievements"}>
                        <Card className="w-[600px] p-6">
                            <CardHeader className="justify-between">
                                <div className="flex gap-5">
                                    <Avatar isBordered radius="full" size="md" src={post.author.avatar} />
                                    <div className="flex flex-col gap-1 items-start justify-center">
                                        <h4 className="text-xl font-semibold">{post.author.name}</h4>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardBody className="px-3 py-2">
                                <h1 className="text-2xl font-semibold mb-2">{post.title}</h1>
                                <p className="text-gray-600">
                                    {post.body}
                                </p>
                                {post.image && <Image src={post.image} alt={post.title} width={600} height={400} className="w-full max-h-[150px] mt-4 rounded-xl" />}
                            </CardBody>
                        </Card>
                    </Link>
                )
            })}
        </main>
    );
}

async function getCommunityPosts() {
    const postsQuery = query(collection(firestore, "posts"), limit(25), orderBy("createdAt", "desc"));
    const posts = await getDocs(postsQuery);

    return posts.docs.map(doc => doc.data()) as Post[];
}