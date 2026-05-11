import nodemailer from "nodemailer";


const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});



export const sendInviteEmail = async (to: string, link: string) => {
  await transporter.sendMail({
    from: `"TeamForge" <${process.env.EMAIL}>`,
    to,
    subject: "You're invited to a project",
    html: `
      <h2>Project Invitation</h2>
      <p>You have been invited to join a project.</p>
      <a href="${link}">Click here to join</a>
    `,
  });
};