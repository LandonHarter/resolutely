import { User } from "./User";

export type AuthState = {} & (
    {
        user: User;
        signedIn: true;
    } | {
        user: null;
        signedIn: false;
    }
);