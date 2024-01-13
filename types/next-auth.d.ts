import { User } from "@/types/User";
import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {

    interface Session {
        user: User & DefaultSession["user"]
    }

}