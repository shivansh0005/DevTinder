const { SendEmailCommand } = require('@aws-sdk/client-ses');
const { sesClient } = require('./sesClient'); // Ensure sesClient is correctly configured

// Function to create the SendEmailCommand
const createSendEmailCommand = (toAddress, fromAddress,subject,body) => {
  return new SendEmailCommand({
    Destination: {
      ToAddresses: [toAddress], // Recipient email
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: "You have recieved new connection Request",
        },
        Text: {
          Charset: "UTF-8",
          Data: "Hello world from AWS SES. This is the email body in plain text format.",
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: subject,
      },
    },
    Source: fromAddress, // Sender email
    ReplyToAddresses: [], // Optional reply-to addresses
  });
};

// Function to send the email
const run = async (subject,body) => {
  const sendEmailCommand = createSendEmailCommand(
    "shivanshchaturvedi5@gmail.com", // Verified recipient email
    "no-reply@dtcc.live",
    subject,
    body         // Sender email under your verified domain
  );

  try {
    console.log("Sending email...");
    const response = await sesClient.send(sendEmailCommand);
    console.log("Email sent successfully:", response);
    return response;
  } catch (error) {
    console.error("Error sending email:", error.message);
    if (error instanceof Error && error.name === "MessageRejected") {
      console.warn("Message rejected by AWS SES:", error);
      return error;
    }
    throw error;
  }
};

module.exports = { run ,createSendEmailCommand};