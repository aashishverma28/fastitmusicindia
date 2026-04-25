const { Resend } = require("resend");
const resend = new Resend("re_ePZHqJui_Dkr61TbhBJV1Mhak3G8bNZX1");
resend.emails.get("b3616a4e-771e-477f-9083-1772d01053fa").then(console.log).catch(console.error);
