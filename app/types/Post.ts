import { Timestamp } from "firebase/firestore";

export type Post = {
    title: string;
    body: string;
    image: string;
    createdAt: Timestamp;
    author: {
        id: string;
        name: string;
        avatar: string;
    }
}