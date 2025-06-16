const { sesClient } = require('./sesClient'); // Import your SES client
const { createSendEmailCommand } = require('./sendEmail'); // Import your email command function

const testEmail = async () => {
  const sendEmailCommand = createSendEmailCommand(
    "shivanshchaturvedi5@gmail.com", // Replace with a verified recipient
    "no-reply@dtcc.live"             // Replace with sender email under your verified domain
  );

  try {
    const response = await sesClient.send(sendEmailCommand);
    console.log("Email sent successfully:", response);
  } catch (error) {
    console.error("Error sending email:", error.message);
  }
};

testEmail();