"use client";

import { createPost } from "@/backend/server/actions/community";
import { User } from "@/types/User";
import { Avatar, Button, Card, CardBody, CardFooter, CardHeader, Input, Textarea } from "@nextui-org/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export default function NewPost({ user }: { user: User | null }) {
    const router = useRouter();
    const postForm = useRef<HTMLFormElement>(null);

    const searchParams = useSearchParams();
    const achievementName = searchParams.get("name");
    const achievementId = searchParams.get("id");
    const achievementDescription = searchParams.get("desc");

    const [name, setName] = useState("");
    const [body, setBody] = useState("");

    useEffect(() => {
        if (achievementName && achievementId && achievementDescription) {
            setName(`I just got the ${achievementName} achievement!`);
            setBody(`I just got the ${achievementName} achievement! ${achievementDescription}`);
        }
    }, [searchParams]);

    return (
        <form action={async (data: FormData) => {
            if (user == null) {
                toast.error("Must be signed in to create a post.");
                return;
            }

            const title = data.get("title") as string;
            const body = data.get("body") as string;
            if (!title || !body) {
                toast.error("Please fill out all fields.");
                return;
            }

            postForm.current?.reset();

            let image = "";
            if (achievementId) image = "/images/achievements/" + achievementId + ".svg";
            await createPost(user, title, body, image);

            router.push("/community");
            router.refresh();
        }} ref={postForm}>
            <Card className="w-[600px] px-6 pt-6">
                <CardHeader className="justify-between">
                    <div className="flex gap-5">
                        <Avatar isBordered radius="full" size="md" src={user?.image} showFallback />
                        <div className="flex flex-col gap-1 items-start justify-center">
                            <h4 className="text-xl font-semibold">{user?.name || "Resolutely User"}</h4>
                        </div>
                    </div>
                </CardHeader>
                <CardBody className="px-3 py-2">
                    <Input name="title" variant="faded" placeholder="Title" autoComplete="off" className="text-2xl font-semibold mb-2" value={name} onValueChange={setName} />
                    <Textarea name="body" variant="faded" placeholder="Your post content..." autoComplete="off" value={body} onValueChange={setBody} />
                </CardBody>
                <CardFooter className="w-full flex items-center justify-end">
                    <Button color="primary" className="font-medium" type="submit">Post</Button>
                </CardFooter>
            </Card>
        </form>
    );
}