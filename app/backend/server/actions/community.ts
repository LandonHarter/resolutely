"use server";

import { firestore } from "@/backend/client/firebase";
import { Post } from "@/types/Post";
import { User } from "@/types/User";
import { Timestamp, addDoc, collection, doc } from "firebase/firestore";

export async function createPost(user: User, title: string, body: string, image?: string) {
    const post = {
        title,
        body,
        createdAt: Timestamp.now(),
        image,
        author: {
            name: user.name,
            id: user.id,
            avatar: user.image
        }
    } as Post;

    const postsCollection = collection(firestore, "posts");
    await addDoc(postsCollection, post);
}