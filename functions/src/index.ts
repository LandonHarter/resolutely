import { ScheduledEvent, onSchedule } from "firebase-functions/v2/scheduler";
import * as admin from "firebase-admin";

admin.initializeApp();
exports.sendReminder = onSchedule("0 10 * * *", async (event: ScheduledEvent) => {

});