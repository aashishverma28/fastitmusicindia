const { Resend } = require("resend");
const resend = new Resend("re_ePZHqJui_Dkr61TbhBJV1Mhak3G8bNZX1");
resend.emails.send({
  from: "Fastit Music India <onboarding@fastitmusic.in>",
  to: ["test@example.com"],
  subject: "Test",
  html: "Test"
}).then(console.log).catch(console.error);
