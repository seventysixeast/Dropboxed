require('dotenv').config();
const SITE_URL = process.env.SITE_URL;
exports.SEND_NEW_PASSWORD = (name, email, password) =>`
    <div>
        <span style="display:block; font-family: Arial, Verdana, sans-serif; background: #f8f9fb; padding-top: 0.5rem; border: 7px solid #eee; margin: 0.3rem; border-radius: 1rem;">
            <table cellpadding="0" cellspacing="0" width="100%">
                <tbody>
                    <tr>
                        <td style="padding-top: 10px; text-align:center;">
                            <img style="width: 150px;" src="${SITE_URL}static/media/dropboxed-logo.322340896b9613ac2abc.png" alt="Logo" />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <table style="font-size: 14px; width:100%; background: #fff; border-radius: 0;">
                                <tbody>
                                    <tr>
                                        <td style="padding:30px; width:100%;" valign="top">
                                            <div style="font-size:14px;font-weight:normal;line-height:1.8em;text-align:left;">Dear <b>${name}</b>,<br>
                                                <h3>Your new password</h3>
                                                Name: ${name} <br> 
                                                Email: ${email} <br> 
                                                Password: ${password}
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="center">
                                            <a href="${SITE_URL}login" style="display:inline-block;padding:11px 30px;color:#fff;background:#00b5b8 ;border-radius:60px;text-decoration:none;" rel="noreferrer" target="_blank" data-saferedirecturl="https://www.google.com/url?q=${SITE_URL}login.php"><b>Login to continue</b></a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding:30px; width:100%;" valign="top">
                                            <div style="font-size:14px;font-weight:normal;line-height:1.8em;text-align:left;">
                                                Thanks <br>
                                                <b>studiio.au</b>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <table style="margin: 10px auto 10px auto;" cellpadding="0" cellspacing="0" border="0">
                                <tbody>
                                    <tr>
                                        <td style="font-size: 12px;font-weight: normal;font-style: normal;font-stretch: normal;line-height: normal;letter-spacing: normal;color: #001737;">
                                            Copyright © ${new Date().getFullYear()} studiio.au. All rights reserved.
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>
        </span>
    </div>
`;

exports.SEND_VERIFICATION_EMAIL = (studioName, email, verificationToken) => `
<div>
    <span style="display:block; font-family: Arial, Verdana, sans-serif; background: #f8f9fb; padding-top: 0.5rem; border: 7px solid #eee; margin: 0.3rem; border-radius: 1rem;">
        <table cellpadding="0" cellspacing="0" width="100%">
            <tbody>
                <tr>
                    <td style="padding-top: 10px; text-align:center;">
                        <img style="width: 150px;" src="${SITE_URL}static/media/dropboxed-logo.322340896b9613ac2abc.png" alt="Logo" />
                    </td>
                </tr>
                <tr>
                    <td>
                        <table style="font-size: 14px; width:100%; background: #fff; border-radius: 0;">
                            <tbody>
                                <tr>
                                    <td style="padding:30px; width:100%;" valign="top">
                                        <div style="font-size:14px;font-weight:normal;line-height:1.8em;text-align:left;">
                                            <p>Dear ${studioName},</p>
                                            <p>Welcome to ${studioName}!</p>
                                            <p>To complete your registration, please verify your email address by clicking on the following link:</p>
                                            <p><a href="${SITE_URL}verify-email/${verificationToken}"
                                            >Verify Email</a></p>
                                            <p>If you did not sign up for ${email}, you can ignore this email.</p>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table style="margin: 10px auto 10px auto;" cellpadding="0" cellspacing="0" border="0">
                            <tbody>
                            <tr>
                                <td style="font-size: 12px;font-weight: normal;font-style: normal;font-stretch: normal;line-height: normal;letter-spacing: normal;color: #001737;">
                                    Copyright © ${new Date().getFullYear()} studiio.au. All rights reserved.
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table>
    </span>
</div>
`;

exports.SEND_OTP = (name, email, otp) =>`
<div>
    <span style="display:block; font-family: Arial, Verdana, sans-serif; background: #f8f9fb; padding-top: 0.5rem; border: 7px solid #eee; margin: 0.3rem; border-radius: 1rem;">
        <table cellpadding="0" cellspacing="0" width="100%">
            <tbody>
                <tr>
                    <td style="padding-top: 10px; text-align:center;">
                        <img style="width: 150px;" src="${SITE_URL}static/media/dropboxed-logo.322340896b9613ac2abc.png" alt="Logo" />
                    </td>
                </tr>
                <tr>
                    <td>
                        <table style="font-size: 14px; width:100%; background: #fff; border-radius: 0;">
                            <tbody>
                                <tr>
                                    <td style="padding:30px; width:100%;" valign="top">
                                        <div style="font-size:14px;font-weight:normal;line-height:1.8em;text-align:left;">Dear <b>${name}</b>,<br>
                                            <h3>Please enter the below mentioned OTP for reset password!</h3> 
                                            Email: ${email} <br> 
                                            OTP: ${otp}
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table style="margin: 10px auto 10px auto;" cellpadding="0" cellspacing="0" border="0">
                            <tbody>
                                <tr>
                                    <td style="font-size: 12px;font-weight: normal;font-style: normal;font-stretch: normal;line-height: normal;letter-spacing: normal;color: #001737;">
                                        Copyright © ${new Date().getFullYear()} studiio.au. All rights reserved.
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table>
    </span>
</div>
`;