

const cron = require("node-cron");
const { subDays, startOfDay, endOfDay } = require("date-fns");
const sendEmail = require("./sendEmail");
const ConnectionRequest = require("../models/connectionRequest");

cron.schedule("* 8 * * *", async () => {
  //  Send Email to all Users who got request Previous Day

  try {
    const yesterday = subDays(new Date(), 1);
    const yesterdayStart = startOfDay(yesterday);
    const yesterdayEnd = endOfDay(yesterday);

    const pendingRequests = await ConnectionRequest.find({
      status: "intrested",
      createdAt: {
        $gte: yesterdayStart,
        $lt: yesterdayEnd,
      }
    }).populate("fromUserId toUserId");

    const listOfEmails = [...new Set(pendingRequests.map(req => req.toUserId?.email))];

    console.log("List of Emails to send: ", listOfEmails);

    for (const email of listOfEmails) {
      // Find the first request for this email to get the sender's name
      const req = pendingRequests.find(r => r.toUserId?.email === email);
      const fromuser = req ? req.fromUserId : null;

      try {
        const res = await sendEmail.run(
          "A new connection request has been sent to you from " + (fromuser?.firstName || "Someone")
        );
        console.log(res);
      }
      catch (err) {
        console.log(`Error in sending email to ${email}`, err);
      }
    }
  }
  catch (err) {
    console.log("Error in sending email to users", err);
  }
});