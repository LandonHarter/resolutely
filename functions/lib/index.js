"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const scheduler_1 = require("firebase-functions/v2/scheduler");
const admin = require("firebase-admin");
admin.initializeApp();
exports.sendReminder = (0, scheduler_1.onSchedule)("45 13 * * *", async (event) => {
    const db = admin.firestore();
    const usersRef = db.collection("users");
    const users = await usersRef.get();
    users.forEach(async (user) => {
        const email = user.data().email;
        await db.collection("email").add({
            to: email,
            message: {
                subject: "Don't forget your goals!",
                text: "Make sure you log into resolutely every day to keep track of your goals! We all know how easy it is to forget about them. Try to increase your streak every day, you are almost at " + user.data().streak + " days! 🔥🔥"
            },
        });
    });
});
//# sourceMappingURL=index.js.map