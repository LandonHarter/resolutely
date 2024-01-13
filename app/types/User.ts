export type User = {
    name: string;
    email: string;
    emailVerified: boolean | null;
    image: string;
    id: string;

    initialized: boolean; // because we are not using a SQL or typed database, we must track if we have initialized the users fields with a default value

    lastDayActive: string;
    streak: number;
};