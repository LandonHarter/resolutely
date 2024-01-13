export type Achievement = {
    id: string;
    name: string;
    description: string;
};

export const Achievements = {
    ThreeDayStreak: {
        id: "streak",
        name: "Up and Coming",
        description: "Build a 3 day streak."
    },
    WeekStreak: {
        id: "streak",
        name: "Consistency is Key",
        description: "Build a 7 day streak."
    },
    MonthStreak: {
        id: "streak",
        name: "Dedication",
        description: "Build a 30 day streak."
    },
    YearStreak: {
        id: "streak",
        name: "New Year?!",
        description: "Build a 365 day streak."
    },
    GoalSetter: {
        id: "goals",
        name: "Goal Setter",
        description: "Create 1 goal."
    },
    GoalMaker: {
        id: "goals",
        name: "Goal Maker",
        description: "Create 10 goals."
    },
    GoalMaster: {
        id: "goals",
        name: "Goal Master",
        description: "Create 50 goals."
    },
};