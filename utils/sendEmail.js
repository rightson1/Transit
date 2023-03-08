import fetch from "node-fetch";

const SENDGRID_API = "https://api.sendgrid.com/v3/mail/send";
const SENDGRID_API_KEY =
  "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";

const sendEmail = async ({ name, email }) => {
  await fetch(SENDGRID_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${SENDGRID_API_KEY}`,
    },
    body: JSON.stringify({
      personalizations: [
        {
          to: [
            {
              email,
            },
          ],
          subject: "Demo success :)",
        },
      ],
      from: {
        email: "rightson.tole@riarauniversity.ac.ke",
        name: "Test SendGrid",
      },
      content: [
        {
          type: "text/html",
          value: `Congratulations <b>${name}</b>, you just sent an email with sendGrid`,
        },
      ],
    }),
  });
};

export { sendEmail };
