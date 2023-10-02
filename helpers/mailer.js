const sendMail = (email, subject, text) => {
  const transporter = nodemailer.createTransport({
    // Set up your email provider configuration
    // ...
    service: "gmail",
    auth: {
      user: "demsdems28@gmail.com",
      pass: `${process.env.GMAIL_PASS}`,
    },
  });

  const mailOptions = {
    from: "demsdems28@gmail.com",
    to: email,
    subject: subject,
    text: text,
  };

  return transporter.sendMail(mailOptions);
};
module.exports = sendMail;
