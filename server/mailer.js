const sgMail = require("@sendgrid/mail");

const sendVerificationEmail = async (user, url) => {
  sgMail.setApiKey(process.env.SEND_GRID_API_KEY);
  const html = `<div style="max-width:700px;margin-bottom:1rem;display:flex;align-items:center;gap:10px;font-family:Roboto;font-weight:600;color:#3b5998"><img src="https://res.cloudinary.com/dmhcnhtng/image/upload/v1645134414/logo_cs1si5.png" alt="" style="width:30px"><span>Action request : Activate your facebook account</span></div><div style="padding:1rem 0;border-top:1px solid #e5e5e5;border-bottom:1px solid #e5e5e5;color:#141823;font-size:17px;font-family:Roboto"><span>Hello ${user.first_name}</span><div style="padding:20px 0"><span style="padding:1.5rem 0">You recently created an account on Facebook. To complete your registration, please confirm your account.</span></div><a href=${url} style="width:200px;padding:10px 15px;background:#4c649b;color:#fff;text-decoration:none;font-weight:600">Confirm your account</a><br><div style="padding-top:20px"><span style="margin:1.5rem 0;color:#898f9c">Facebook allows you to stay in touch with all your friends, once registered on facebook, you can share photos, organize events and much more.</span></div></div>`;
  const msg = {
    from: process.env.EMAIL_ID,
    to: user.email,
    subject: "Verify your account!",
    html,
  };

  await sgMail.send(msg);
};

module.exports;

const sendPasswordResetOTP = async (user, OTP) => {
  sgMail.setApiKey(process.env.SEND_GRID_API_KEY);
  const html = `<div style="max-width:700px;margin-bottom:1rem;display:flex;align-items:center;gap:10px;font-family:Roboto;font-weight:600;color:#3b5998"><img src="https://res.cloudinary.com/dmhcnhtng/image/upload/v1645134414/logo_cs1si5.png" alt="" style="width:30px"><span>Action request : Reset your password</span></div><div style="padding:1rem 0;border-top:1px solid #e5e5e5;border-bottom:1px solid #e5e5e5;color:#141823;font-size:17px;font-family:Roboto"><span>Hello ${user.first_name}</span><div style="padding:20px 0"><span style="padding:1.5rem 0">You recently requested for resetting your password. To change your password, please provide us this ${OTP} OTP.</span></div><a style="width:200px;padding:10px 15px;background:#4c649b;color:#fff;text-decoration:none;font-weight:600"></a><br><div style="padding-top:20px"><span style="margin:1.5rem 0;color:#898f9c">Facebook allows you to stay in touch with all your friends, once registered on facebook, you can share photos, organize events and much more.</span></div></div>`;
  const msg = {
    from: process.env.EMAIL_ID,
    to: user.email,
    subject: "Reset Your Password!",
    html,
  };

  await sgMail.send(msg);
};

module.exports = { sendVerificationEmail, sendPasswordResetOTP };
