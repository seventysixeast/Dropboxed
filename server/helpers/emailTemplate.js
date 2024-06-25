require('dotenv').config();
const SITE_URL = process.env.SITE_URL;
const VERIFY_URL = process.env.VERIFY_URL;
const GALLERY_IMAGE_URL = process.env.GALLERY_IMAGE_URL;
const CLIENTS_IMAGE_URL = process.env.CLIENTS_IMAGE_URL;

exports.SEND_VERIFICATION_EMAIL = (subdomain, email, verificationToken) => `
<div style="display: flex; justify-content: center; align-items: center; height: auto;">
    <span style="width: 100%; max-width: 600px; display: block; font-family: Arial, Verdana, sans-serif; padding-top: 0.5rem; border: 2px solid black; margin: 0.3rem;">
        <table cellpadding="0" cellspacing="0" width="100%">
            <tbody>
                <tr>
                    <td style="padding-top: 10px; text-align:center;">
                        <img src="${SITE_URL}static/media/dropboxed-logo.2d35e13a620811e2a750.png" style="width: 150px;" alt="Logo"/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <table style="font-size: 14px; width: 100%; background: #fff; border-radius: 0;">
                            <tbody>
                                <tr>
                                    <td style="padding: 30px; width: 100%;" valign="top">
                                        <div style="font-size: 14px; font-weight: normal; line-height: 1.8em; text-align: left;">
                                            <p>Welcome to Studiio.au!</p>
                                            <p>To complete your registration, please verify your email address by clicking on the following link:</p>
                                            <p><a href="https://${subdomain}.${VERIFY_URL}verify-email/${verificationToken}">Verify Email</a></p>
                                            <p>If you did not sign up for <a href="mailto:${email}">${email}</a>, you can ignore this email.</p>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table style="margin: 10px auto 10px auto;" cellpadding="0" cellspacing="0" border="0">
                            <tbody>
                                <tr>
                                    <td align="center" style="font-size: 12px; font-weight: normal; line-height: normal; color: #001737;">
                                        <a href="https://www.studiio.au">https://www.studiio.au</a><br>
                                        Questions? Reply to this email.
                                        <p>Powered by <img src="${SITE_URL}static/media/dropboxed-logo.2d35e13a620811e2a750.png" style="width: 150px; vertical-align: middle;" alt="Logo"/></p>
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

exports.SEND_VERIFICATION_CLIENT_EMAIL = (subdomain, logo, email, verificationToken) => `
<div style="display: flex; justify-content: center; align-items: center; height: auto;">
    <span style="width: 100%; max-width: 600px; display: block; font-family: Arial, Verdana, sans-serif; padding-top: 0.5rem; border: 2px solid black; margin: 0.3rem;">
        <table cellpadding="0" cellspacing="0" width="100%">
            <tbody>
                <tr>
                    <td style="padding-top: 10px; text-align:center;">
                        ${logo && logo !== '' 
                            ? `<img src="${CLIENTS_IMAGE_URL}/${logo}" style="width: 150px;" alt="Logo"/>` 
                            : `<h1 style="text-transform: uppercase; color: #00b5b8;">${subdomain}</h1>`
                        }
                    </td>
                </tr>
                <tr>
                    <td>
                        <table style="font-size: 14px; width: 100%; background: #fff; border-radius: 0;">
                            <tbody>
                                <tr>
                                    <td style="padding: 30px; width: 100%;" valign="top">
                                        <div style="font-size: 14px; font-weight: normal; line-height: 1.8em; text-align: left;">
                                            <p>Welcome to ${subdomain}!</p>
                                            <p>To complete your registration, please verify your email address by clicking on the following link:</p>
                                            <p><a href="https://${subdomain}.${VERIFY_URL}verify-email/${verificationToken}">Verify Email</a></p>
                                            <p>If you did not sign up for <a href="mailto:${email}">${email}</a>, you can ignore this email.</p>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table style="margin: 10px auto 10px auto;" cellpadding="0" cellspacing="0" border="0">
                            <tbody>
                                <tr>
                                    <td align="center" style="font-size: 12px; font-weight: normal; line-height: normal; color: #001737;">
                                        <a href="https://${subdomain}.${VERIFY_URL}">https://${subdomain}.${VERIFY_URL}</a><br>
                                        Questions? Reply to this email.
                                        <p>Powered by <img src="${SITE_URL}static/media/dropboxed-logo.2d35e13a620811e2a750.png" style="width: 150px; vertical-align: middle;" alt="Logo"/></p>
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

exports.SEND_OTP = (email, otp) => `
<div style="display: flex; justify-content: center; align-items: center; height: auto;">
    <span style="width: 100%; max-width: 600px; display: block; font-family: Arial, Verdana, sans-serif; padding-top: 0.5rem; border: 2px solid black; margin: 0.3rem;">
        <table cellpadding="0" cellspacing="0" width="100%">
            <tbody>
                <tr>
                    <td style="padding-top: 10px; text-align:center;">
                    <img src="${SITE_URL}static/media/dropboxed-logo.2d35e13a620811e2a750.png" style="width: 150px;" alt="Logo"/>
                </td>
                </tr>
                <tr>
                    <td>
                        <table style="font-size: 14px; width: 100%; background: #fff; border-radius: 0;">
                            <tbody>
                                <tr>
                                    <td style="padding: 30px; width: 100%;" valign="top">
                                        <div style="font-size: 14px; font-weight: normal; line-height: 1.8em; text-align: left;">
                                            <h3>Hello!</h3>
                                            <p>Please enter the below mentioned OTP for reset password!</p>
                                            Email: <a href="mailto:${email}">${email}</a> <br>
                                            OTP: ${otp}
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table style="margin: 10px auto 10px auto;" cellpadding="0" cellspacing="0" border="0">
                            <tbody>
                                <tr>
                                    <td align="center" style="font-size: 12px; font-weight: normal; line-height: normal; color: #001737;">
                                        <a href="https://www.studiio.au">https://www.studiio.au</a><br>
                                        Questions? Reply to this email.
                                        <p>Powered by <img src="${SITE_URL}static/media/dropboxed-logo.2d35e13a620811e2a750.png" style="width: 150px; vertical-align: middle;" alt="Logo"/></p>
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

exports.WELCOME_EMAIL = () => `
<div style="display: flex; justify-content: center; align-items: center; height: auto;">
    <span style="width: 100%; max-width: 600px; display: block; font-family: Arial, Verdana, sans-serif; padding-top: 0.5rem; border: 2px solid black; margin: 0.3rem;">
        <table cellpadding="0" cellspacing="0" width="100%">
            <tbody>
                <tr>
                    <td style="padding-top: 10px; text-align:center;">
                        <img src="${SITE_URL}static/media/dropboxed-logo.2d35e13a620811e2a750.png" style="width: 150px;" alt="Logo"/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <table style="font-size: 14px; width:100%; background: #fff; border-radius: 0;">
                            <tbody>
                                <tr>
                                    <td style="padding: 30px; width:100%;" valign="top">
                                        <div style="font-size: 14px; font-weight: normal; line-height: 1.8em; text-align: left;">
                                            <p>Welcome to Studiio.au!</p>
                                            <p>We're thrilled to have you join our community.</p>
                                            <p>At studiio.au, you'll find all the tools you and your business will need to manage your bookings, galleries, invoices and more. Whether you're here to organise your business better, or take on a new system we're here to make your experience enjoyable and seamless.</p>
                                            <p>If you have any questions or need assistance, feel free to reach out to our support team at <a href="mailto:info@studiio.au">info@studiio.au</a></p>
                                            <p>Once again, welcome aboard!<br>
                                            Best regards,<br>
                                            Pete<br>
                                            Director<br>
                                            Studiio.au</p>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td align="center" style="padding-bottom: 30px; width: 100%;" valign="top">
                                        <a href="${SITE_URL}dashboard" style="display: inline-block; padding: 11px 30px; color: #fff; background: #00b5b8; text-decoration: none;" rel="noreferrer" target="_blank"><b>DASHBOARD</b></a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table style="margin: 10px auto 10px auto;" cellpadding="0" cellspacing="0" border="0">
                            <tbody>
                                <tr>
                                    <td align="center" style="font-size: 12px; font-weight: normal; font-style: normal; font-stretch: normal; line-height: normal; letter-spacing: normal; color: #001737;">
                                        <a href="https://www.studiio.au">https://www.studiio.au</a><br>
                                        Questions? Reply to this email.
                                        <p>Powered by <img src="${SITE_URL}static/media/dropboxed-logo.2d35e13a620811e2a750.png" style="width: 150px; vertical-align: middle;" alt="Logo"/></p>
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

exports.WELCOME_CLIENT_EMAIL = (subdomain, subdomain_email, logo, name, email, password) => `
<div style="display: flex; justify-content: center; align-items: center; height: auto;">
    <span style="width: 100%; max-width: 600px; display: block; font-family: Arial, Verdana, sans-serif; padding-top: 0.5rem; border: 2px solid black; margin: 0.3rem;">
        <table cellpadding="0" cellspacing="0" width="100%">
            <tbody>
                <tr>
                    <td style="padding-top: 10px; text-align:center;">
                        ${logo && logo !== '' 
                            ? `<img src="${CLIENTS_IMAGE_URL}/${logo}" style="width: 150px;" alt="Logo"/>` 
                            : `<h1 style="text-transform: uppercase; color: #00b5b8;">${subdomain}</h1>`
                        }
                    </td>
                </tr>
                <tr>
                    <td>
                        <table style="font-size: 14px; width: 100%; background: #fff; border-radius: 0;">
                            <tbody>
                                <tr>
                                    <td style="padding: 30px; width: 100%;" valign="top">
                                        <div style="font-size: 14px; font-weight: normal; line-height: 1.8em; text-align: left;">
                                            <p>Welcome to ${subdomain}!</p>
                                            <p>Dear ${name},</p>
                                            <p>We're thrilled to have you.</p>
                                            <p>At ${subdomain}, you'll find all the tools you need to manage your bookings, galleries, invoices and more. </p>
                                            <p>We're here to make your experience enjoyable and seamless.</p>
                                            <p>Here are the login details:</p>
                                            <p>URL: <a href="https://${subdomain}.${VERIFY_URL}login">https://${subdomain}.${VERIFY_URL}login</a> <br> 
                                            Email: <a href="mailto:${email}">${email}</a> <br> 
                                            Password: ${password}</p>
                                            <p>If you have any questions or need assistance, feel free to reach out to our support team at <a href="mailto:${subdomain_email}">${subdomain_email}</a></p>
                                            <p>Once again, welcome aboard!</p>
                                            <p>Best regards,<br>
                                            ${subdomain}<br>
                                            Director<br>
                                            ${subdomain}.studiio.au</p>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td align="center" style="padding-bottom: 30px; width: 100%;" valign="top">
                                        <a href="https://${subdomain}.${VERIFY_URL}login" style="display: inline-block; padding: 11px 30px; color: #fff; background: #00b5b8; text-decoration: none;" rel="noreferrer" target="_blank"><b>LOGIN TO CONTINUE</b></a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table style="margin: 10px auto 10px auto;" cellpadding="0" cellspacing="0" border="0">
                            <tbody>
                                <tr>
                                    <td align="center" style="font-size: 12px; font-weight: normal; font-style: normal; font-stretch: normal; line-height: normal; letter-spacing: normal; color: #001737;">
                                        <a href="https://${subdomain}.${VERIFY_URL}">https://${subdomain}.${VERIFY_URL}</a><br>
                                        Questions? Reply to this email.
                                        <p>Powered by <img src="${SITE_URL}static/media/dropboxed-logo.2d35e13a620811e2a750.png" style="width: 150px; vertical-align: middle;" alt="Logo"/></p>
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

exports.NEW_CLIENT_BOOKING = (subdomain, logo, subdomainContact, address, name, data, contacts, teamMembers, serviceNames) => `
<div style="display: flex; justify-content: center; align-items: center; padding: 0 10px; box-sizing: border-box;">
    <div style="width: 100%; max-width: 600px; margin: 0.3rem; font-family: Arial, Verdana, sans-serif; box-sizing: border-box;">
        <table style="width: 100%; border: 2px solid black; border-collapse: collapse;">
            <tr>
                <td valign="top" style="padding: 20px; font-family: Arial, sans-serif; font-size: 14px; width: 70%; box-sizing: border-box;">
                    <h1 style="font-size: 18px; margin-bottom: 30px;">New Booking</h1>
                    <p>Hello ${name},</p>
                    <p>Your booking has been confirmed with ${subdomain}</p>
                    <hr>
                    <p><b>Date:</b> ${data.booking_date}</p>
                    <p><b>Time:</b> ${data.booking_time}</p>
                    <p><b>Project:</b> ${data.booking_title}</p>
                    <p><b>Services:</b> ${serviceNames}</p>
                    <p><b>Team Members:</b> ${teamMembers}</p>
                    <p><b>Contacts:</b> ${contacts}</p>
                    <hr>
                    <p>Thank you,<br>
                    ${subdomain}</p>
                    <p style="margin-top: 30px;">You have received this message due to a recent booking</p>
                </td>
                <td valign="top" style="background-color: #f2f2f2; padding: 20px; font-family: Arial, sans-serif; font-size: 14px; width: 30%; box-sizing: border-box;">
                    <table style="width: 100%; margin-top: 30%; border-collapse: collapse;">
                        <tr>
                            <td style="padding-top: 10px; text-align:center;">
                                ${logo && logo !== '' 
                                    ? `<img src="${CLIENTS_IMAGE_URL}/${logo}" style="width: 30%;" alt="Logo"/>` 
                                    : `<h1 style="text-transform: uppercase; color: #00b5b8;">${subdomain}</h1>`
                                }
                            </td>
                        </tr>
                        <tr>
                            <td align="center" style="font-size: 16px;">${address}</td>
                        </tr>
                        <tr>
                            <td align="center" style="font-size: 14px;">${subdomainContact}</td>
                        </tr>
                        <tr>
                            <td align="center">
                                <a href="https://${subdomain}.${VERIFY_URL}dashboard" style="display: inline-block; padding: 11px 15px; color: #fff; background: #00b5b8; text-decoration: none; margin-top:30px;" rel="noreferrer" target="_blank"><b>DASHBOARD</b></a>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
        <table style="width: 100%; border-collapse: collapse; text-align:right">
            <tbody>
                <tr>
                    <td style="font-size: 12px; font-weight: normal; line-height: normal; color: #001737;">
                        <p>Powered by <img src="${SITE_URL}static/media/dropboxed-logo.2d35e13a620811e2a750.png" style="width: 150px; vertical-align: middle;" alt="Logo"/></p>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
`;

exports.UPDATE_CLIENT_BOOKING = (subdomain, logo, subdomainContact, address, name, data, contacts, teamMembers, serviceNames) => `
<div style="display: flex; justify-content: center; align-items: center; padding: 0 10px; box-sizing: border-box;">
    <div style="width: 100%; max-width: 600px; margin: 0.3rem; font-family: Arial, Verdana, sans-serif; box-sizing: border-box;">
        <table style="width: 100%; border: 2px solid black; border-collapse: collapse;">
            <tr>
                <td valign="top" style="padding: 20px; font-family: Arial, sans-serif; font-size: 14px; width: 70%; box-sizing: border-box;">
                    <h1 style="font-size: 18px; margin-bottom: 30px;">Update Booking</h1>
                    <p>Hello ${name},</p>
                    <p>Your booking has been confirmed with ${subdomain}</p>
                    <hr>
                    <p><b>Date:</b> ${data.booking_date}</p>
                    <p><b>Time:</b> ${data.booking_time}</p>
                    <p><b>Project:</b> ${data.booking_title}</p>
                    <p><b>Services:</b> ${serviceNames}</p>
                    <p><b>Team Members:</b> ${teamMembers}</p>
                    <p><b>Contacts:</b> ${contacts}</p>
                    <hr>
                    <p>Thank you,<br>
                    ${subdomain}</p>
                    <p style="margin-top: 30px;">You have received this message due to a recent booking</p>
                </td>
                <td valign="top" style="background-color: #f2f2f2; padding: 20px; font-family: Arial, sans-serif; font-size: 14px; width: 30%; box-sizing: border-box;">
                    <table style="width: 100%; margin-top: 30%; border-collapse: collapse;">
                        <tr>
                            <td style="padding-top: 10px; text-align:center;">
                                ${logo && logo !== '' 
                                    ? `<img src="${CLIENTS_IMAGE_URL}/${logo}" style="width: 150px;" alt="Logo"/>` 
                                    : `<h1 style="text-transform: uppercase; color: #00b5b8;">${subdomain}</h1>`
                                }
                            </td>
                        </tr>
                        <tr>
                            <td align="center" style="font-size: 16px;">${address}</td>
                        </tr>
                        <tr>
                            <td align="center" style="font-size: 14px;">${subdomainContact}</td>
                        </tr>
                        <tr>
                            <td align="center">
                                <a href="https://${subdomain}.${VERIFY_URL}dashboard" style="display: inline-block; padding: 11px 15px; color: #fff; background: #00b5b8; text-decoration: none; margin-top:30px;" rel="noreferrer" target="_blank"><b>DASHBOARD</b></a>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
        <table style="width: 100%; border-collapse: collapse; text-align:right">
            <tbody>
                <tr>
                    <td style="font-size: 12px; font-weight: normal; line-height: normal; color: #001737;">
                        <p>Powered by <img src="${SITE_URL}static/media/dropboxed-logo.2d35e13a620811e2a750.png" style="width: 150px; vertical-align: middle;" alt="Logo"/></p>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
`;

exports.NEW_PHOTOGRAPHER_TEAM_BOOKING = (subdomain, logo, subdomainContact, address, name, data, contacts, teamMembers, serviceNames) => `
<div style="display: flex; justify-content: center; align-items: center; padding: 0 10px; box-sizing: border-box;">
    <div style="width: 100%; max-width: 600px; margin: 0.3rem; font-family: Arial, Verdana, sans-serif; box-sizing: border-box;">
        <table style="width: 100%; border: 2px solid black; border-collapse: collapse;">
            <tr>
                <td valign="top" style="padding: 20px; font-family: Arial, sans-serif; font-size: 14px; width: 70%; box-sizing: border-box;">
                    <h1 style="font-size: 18px; margin-bottom: 30px;">New Booking</h1>
                    <p>Hello ${name},</p>
                    <p>Booking has been confirmed with ${subdomain}</p>
                    <hr>
                    <p><b>Date:</b> ${data.booking_date}</p>
                    <p><b>Time:</b> ${data.booking_time}</p>
                    <p><b>Project:</b> ${data.booking_title}</p>
                    <p><b>Services:</b> ${serviceNames}</p>
                    <p><b>Team Members:</b> ${teamMembers}</p>
                    <p><b>Contacts:</b> ${contacts}</p>
                    <hr>
                    <p>Thank you,<br>
                    ${subdomain}</p>
                    <p style="margin-top: 30px;">You have received this message due to a recent booking</p>
                </td>
                <td valign="top" style="background-color: #f2f2f2; padding: 20px; font-family: Arial, sans-serif; font-size: 14px; width: 30%; box-sizing: border-box;">
                    <table style="width: 100%; margin-top: 30%; border-collapse: collapse;">
                        <tr>
                            <td style="padding-top: 10px; text-align:center;">
                                ${logo && logo !== '' 
                                    ? `<img src="${CLIENTS_IMAGE_URL}/${logo}" style="width: 150px;" alt="Logo"/>` 
                                    : `<h1 style="text-transform: uppercase; color: #00b5b8;">${subdomain}</h1>`
                                }
                            </td>
                        </tr>
                        <tr>
                            <td align="center" style="font-size: 16px;">${address}</td>
                        </tr>
                        <tr>
                            <td align="center" style="font-size: 14px;">${subdomainContact}</td>
                        </tr>
                        <tr>
                            <td align="center">
                                <a href="https://${subdomain}.${VERIFY_URL}dashboard" style="display: inline-block; padding: 11px 15px; color: #fff; background: #00b5b8; text-decoration: none; margin-top:30px;" rel="noreferrer" target="_blank"><b>DASHBOARD</b></a>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
        <table style="width: 100%; border-collapse: collapse; text-align:right">
            <tbody>
                <tr>
                    <td style="font-size: 12px; font-weight: normal; line-height: normal; color: #001737;">
                        <p>Powered by <img src="${SITE_URL}static/media/dropboxed-logo.2d35e13a620811e2a750.png" style="width: 150px; vertical-align: middle;" alt="Logo"/></p>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
`;

exports.UPDATE_PHOTOGRAPHER_TEAM_BOOKING = (subdomain, logo, subdomainContact, address, name, data, contacts, teamMembers, serviceNames) => `
<div style="display: flex; justify-content: center; align-items: center; padding: 0 10px; box-sizing: border-box;">
    <div style="width: 100%; max-width: 600px; margin: 0.3rem; font-family: Arial, Verdana, sans-serif; box-sizing: border-box;">
        <table style="width: 100%; border: 2px solid black; border-collapse: collapse;">
            <tr>
                <td valign="top" style="padding: 20px; font-family: Arial, sans-serif; font-size: 14px; width: 70%; box-sizing: border-box;">
                    <h1 style="font-size: 18px; margin-bottom: 30px;">Update Booking</h1>
                    <p>Hello ${name},</p>
                    <p>Booking has been confirmed with ${subdomain}</p>
                    <hr>
                    <p><b>Date:</b> ${data.booking_date}</p>
                    <p><b>Time:</b> ${data.booking_time}</p>
                    <p><b>Project:</b> ${data.booking_title}</p>
                    <p><b>Services:</b> ${serviceNames}</p>
                    <p><b>Team Members:</b> ${teamMembers}</p>
                    <p><b>Contacts:</b> ${contacts}</p>
                    <hr>
                    <p>Thank you,<br>
                    ${subdomain}</p>
                    <p style="margin-top: 30px;">You have received this message due to a recent booking</p>
                </td>
                <td valign="top" style="background-color: #f2f2f2; padding: 20px; font-family: Arial, sans-serif; font-size: 14px; width: 30%; box-sizing: border-box;">
                    <table style="width: 100%; margin-top: 30%; border-collapse: collapse;">
                        <tr>
                            <td style="padding-top: 10px; text-align:center;">
                                ${logo && logo !== '' 
                                    ? `<img src="${CLIENTS_IMAGE_URL}/${logo}" style="width: 150px;" alt="Logo"/>` 
                                    : `<h1 style="text-transform: uppercase; color: #00b5b8;">${subdomain}</h1>`
                                }
                            </td>
                        </tr>
                        <tr>
                            <td align="center" style="font-size: 16px;">${address}</td>
                        </tr>
                        <tr>
                            <td align="center" style="font-size: 14px;">${subdomainContact}</td>
                        </tr>
                        <tr>
                            <td align="center">
                                <a href="https://${subdomain}.${VERIFY_URL}dashboard" style="display: inline-block; padding: 11px 15px; color: #fff; background: #00b5b8; text-decoration: none; margin-top:30px;" rel="noreferrer" target="_blank"><b>DASHBOARD</b></a>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
        <table style="width: 100%; border-collapse: collapse; text-align:right">
            <tbody>
                <tr>
                    <td style="font-size: 12px; font-weight: normal; line-height: normal; color: #001737;">
                        <p>Powered by <img src="${SITE_URL}static/media/dropboxed-logo.2d35e13a620811e2a750.png" style="width: 150px; vertical-align: middle;" alt="Logo"/></p>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
`;

exports.NEW_COLLECTION = (subdomain, logo, data) => `
<div style="display: flex; justify-content: center; align-items: center; height: auto;">
    <span style="width: 100%; max-width: 600px; display: block; font-family: Arial, Verdana, sans-serif; padding-top: 0.5rem; border: 2px solid black; margin: 0.3rem;">
        <table cellpadding="0" cellspacing="0" width="100%">
            <tbody>
                <tr>
                    <td style="padding-top: 10px; text-align:center;">
                        ${logo && logo !== '' 
                            ? `<img src="${CLIENTS_IMAGE_URL}/${logo}" style="width: 30%;" alt="Logo"/>` 
                            : `<h1 style="text-transform: uppercase; color: #00b5b8;">${subdomain}</h1>`
                        }
                    </td>
                </tr>
                <tr>
                    <td style="text-align: center;">
                        <img src="${GALLERY_IMAGE_URL}/${data.banner}" alt="Banner Image" style="width: 100%; height: auto; max-height: 300px; object-fit: cover;">
                    </td>
                </tr>
                <tr>
                    <td>
                        <table style="font-size: 14px; width: 100%; background: #fff; border-radius: 0;">
                            <tbody>
                                <tr>
                                    <td align="center" style="padding: 30px; width: 100%;" valign="top">
                                        <div style="font-size: 14px; font-weight: normal; line-height: 1.8em;">
                                            <h2>${data.name}</h2>
                                            <p>Your project "${data.name}" is ready.</p>
                                            <table cellpadding="0" cellspacing="0" border="0">
                                                <tr>
                                                    <td align="center" style="padding-bottom: 30px; width: 100%;" valign="top">
                                                        <a href="https://${subdomain}.${VERIFY_URL}view-gallery/${data.slug}" style="display: inline-block; padding: 11px 15px; color: #fff; background: #00b5b8; text-decoration: none;" rel="noreferrer" target="_blank"><b>VIEW PROJECT</b></a>
                                                        <a href="https://${subdomain}.${VERIFY_URL}dashboard" style="display: inline-block; padding: 11px 15px; color: #fff; background: #00b5b8; text-decoration: none;" rel="noreferrer" target="_blank"><b>DASHBOARD</b></a>
                                                    </td>
                                                </tr>
                                            </table>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table style="margin: 10px auto 10px auto;" cellpadding="0" cellspacing="0" border="0">
                            <tbody>
                                <tr>
                                    <td align="center" style="font-size: 12px; font-weight: normal; line-height: normal; color: #001737;">
                                        <a href="https://${subdomain}.${VERIFY_URL}">https://${subdomain}.${VERIFY_URL}</a><br>
                                        Questions? Reply to this email.
                                        <p>Powered by <img src="${SITE_URL}static/media/dropboxed-logo.2d35e13a620811e2a750.png" style="width: 150px; vertical-align: middle;" alt="Logo"/></p>
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

exports.NEW_TASK = (subdomain, logo, name, client_name, task, date, description, comments) => `
<div style="display: flex; justify-content: center; align-items: center; height: auto;">
    <span style="width: 100%; max-width: 600px; display: block; font-family: Arial, Verdana, sans-serif; padding-top: 0.5rem; border: 2px solid black; margin: 0.3rem;">
        <table cellpadding="0" cellspacing="0" width="100%">
            <tbody>
                <tr>
                    <td style="padding-top: 10px; text-align:center;">
                        ${logo && logo !== '' 
                            ? `<img src="${CLIENTS_IMAGE_URL}/${logo}" style="width: 150px;" alt="Logo"/>` 
                            : `<h1 style="text-transform: uppercase; color: #00b5b8;">${subdomain}</h1>`
                        }
                    </td>
                </tr>
                <tr>
                    <td>
                        <table style="font-size: 14px; width:100%; background: #fff; border-radius: 0;">
                            <tbody>
                                <tr>
                                    <td style="padding:30px; width:100%;" valign="top">
                                        <div style="font-size:14px;font-weight:normal;line-height:1.8em;text-align:left;">
                                            <p>Hello ${name}!</p>
                                            <p>Here is the task request from ${client_name}:</p>
                                            <hr>
                                            Task: ${task} <br>
                                            Date: ${date} <br>
                                            Description: ${description} <br>
                                            Comment: ${comments} <br>
                                        </div>
                                        <hr>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 0px 30px 20px 30px; width:100%;" valign="top">
                                        <div style="font-size:14px;font-weight:normal;line-height:1.8em;text-align:left;">
                                            Thank you, <br>
                                            <b>${subdomain}</b>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 0px 30px 20px 30px; width:100%;" valign="top">
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table style="margin: 10px auto 10px auto;" cellpadding="0" cellspacing="0" border="0">
                            <tbody>
                                <tr>
                                    <td align="center" style="font-size: 12px; font-weight: normal; line-height: normal; color: #001737;">
                                        <a href="https://${subdomain}.${VERIFY_URL}">https://${subdomain}.${VERIFY_URL}</a><br>
                                        Questions? Reply to this email.
                                        <p>Powered by <img src="${SITE_URL}static/media/dropboxed-logo.2d35e13a620811e2a750.png" style="width: 150px; vertical-align: middle;" alt="Logo"/></p>
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

exports.COMPLETED_TASK = (subdomain, logo, name, task, date, description, comments) => `
<div style="display: flex; justify-content: center; align-items: center; height: auto;">
    <span style="width: 100%; max-width: 600px; display: block; font-family: Arial, Verdana, sans-serif; padding-top: 0.5rem; border: 2px solid black; margin: 0.3rem;">
        <table cellpadding="0" cellspacing="0" width="100%">
            <tbody>
                <tr>
                    <td style="padding-top: 10px; text-align:center;">
                        ${logo && logo !== '' 
                            ? `<img src="${CLIENTS_IMAGE_URL}/${logo}" style="width: 150px;" alt="Logo"/>` 
                            : `<h1 style="text-transform: uppercase; color: #00b5b8;">${subdomain}</h1>`
                        }
                    </td>
                </tr>
                <tr>
                    <td>
                        <table style="font-size: 14px; width:100%; background: #fff; border-radius: 0;">
                            <tbody>
                                <tr>
                                    <td style="padding:30px; width:100%;" valign="top">
                                        <div style="font-size:14px;font-weight:normal;line-height:1.8em;text-align:left;">
                                            <p>Hello ${name}!</p>
                                            <p>The below task is completed:</p>
                                            <hr>
                                            Task: ${task} <br>
                                            Date: ${date} <br>
                                            Description: ${description} <br>
                                            Comment: ${comments} <br>
                                        </div>
                                        <hr>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 0px 30px 20px 30px; width:100%;" valign="top">
                                        <div style="font-size:14px;font-weight:normal;line-height:1.8em;text-align:left;">
                                            Thank you, <br>
                                            <b>${subdomain}</b>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 0px 30px 20px 30px; width:100%;" valign="top">
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table style="margin: 10px auto 10px auto;" cellpadding="0" cellspacing="0" border="0">
                            <tbody>
                                <tr>
                                    <td align="center" style="font-size: 12px; font-weight: normal; line-height: normal; color: #001737;">
                                        <a href="https://${subdomain}.${VERIFY_URL}">https://${subdomain}.${VERIFY_URL}</a><br>
                                        Questions? Reply to this email.
                                        <p>Powered by <img src="${SITE_URL}static/media/dropboxed-logo.2d35e13a620811e2a750.png" style="width: 150px; vertical-align: middle;" alt="Logo"/></p>
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

/*exports.INVOICE_EMAIL = (invoiceData) => `
<div style="display: flex; justify-content: center; align-items: center; height: auto;">
    <span style="width: 100%; max-width: 800px; display: block; font-family: Arial, Verdana, sans-serif; padding: 0.5rem; border: 2px solid black; margin: 0.3rem; overflow-x: auto;">
        <table cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;">
            <tbody>
                <tr>
                    <td style="padding-top: 10px; text-align:center;">
                        <img src="${SITE_URL}static/media/dropboxed-logo.2d35e13a620811e2a750.png" style="width: 150px; max-width: 100%;" alt="Logo"/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <table style="font-size: 14px; width:100%; background: #fff; border-radius: 0;">
                            <tbody>
                                <tr>
                                    <td style="padding: 20px;" valign="top">
                                        <div style="font-size:14px;font-weight:normal;line-height:1.8em;text-align:left;">
                                            <p>Dear ${invoiceData.clientName},</p>
                                            <p>Thank you for your business. Here is your invoice:</p>
                                            <p>Invoice Number: ${invoiceData.invoiceNumber}</p>
                                            <p>Invoice Date: ${invoiceData.invoiceDate}</p>
                                            <p>Due Date: ${invoiceData.dueDate}</p>
                                            <p>Amount Due: $ ${invoiceData.amountDue}</p>
                                            <table style="width: 100%; border-collapse: collapse;">
                                                <thead>
                                                    <tr>
                                                        <th style="border: 1px solid #ddd; padding: 8px;">Item</th>
                                                        <th style="border: 1px solid #ddd; padding: 8px;">Description</th>
                                                        <th style="border: 1px solid #ddd; padding: 8px;">Price</th>
                                                        <th style="border: 1px solid #ddd; padding: 8px;">Quantity</th>
                                                        <th style="border: 1px solid #ddd; padding: 8px;">Total</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    ${invoiceData.items.map(item => `
                                                    <tr>
                                                        <td style="border: 1px solid #ddd; padding: 8px;">${item.name}</td>
                                                        <td style="border: 1px solid #ddd; padding: 8px;">${item.description}</td>
                                                        <td style="border: 1px solid #ddd; padding: 8px;">${item.price}</td>
                                                        <td style="border: 1px solid #ddd; padding: 8px;">${item.quantity}</td>
                                                        <td style="border: 1px solid #ddd; padding: 8px;">$ ${item.price}</td>
                                                    </tr>`).join('')}
                                                </tbody>
                                            </table>
                                            <p>If you have any questions about this invoice, please contact us at <a href="mailto:info@studiio.au">info@studiio.au</a></p>
                                            <p>Thank you for your prompt payment.</p>
                                            <p>Best regards,<br>
                                            Studiio.au Team</p>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td align="center" style="padding-top: 20px;" valign="top">
                                        <a href="${SITE_URL}dashboard" style="display:inline-block;padding:11px 30px;color:#fff;background:#00b5b8;text-decoration:none;" rel="noreferrer" target="_blank"><b>VIEW INVOICE</b></a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table style="margin: 10px auto 10px auto; width: 100%; border-collapse: collapse;" cellpadding="0" cellspacing="0" border="0">
                            <tbody>
                                <tr>
                                    <td align="center" style="font-size: 12px;font-weight: normal;font-style: normal;font-stretch: normal;line-height: normal;letter-spacing: normal;color: #001737;">
                                        <a href="https://www.studiio.au">https://www.studiio.au</a><br>
                                        Questions? Reply to this email.
                                        <p>Powered by <img src="${SITE_URL}static/media/dropboxed-logo.2d35e13a620811e2a750.png" style="width: 150px; max-width: 100%; vertical-align: middle;" alt="Logo"/></p>
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
`;*/

exports.INVOICE_EMAIL = (invoiceData) => `
<div
style="
  margin-bottom: 1.875rem;
  border: none;
  border-radius: 0;
  box-shadow: 0 10px 40px 0 rgba(62, 57, 107, 0.07),
    0 2px 9px 0 rgba(62, 57, 107, 0.06);
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.45;
  color: #000000;
  text-align: left;
  font-family: Arial, Helvetica, sans-serif;
"
>
<div style="flex: 1 1 auto; min-height: 1px; padding: 1.5rem">
  <div
    style="
      display: flex;
      flex-wrap: wrap;
      margin-right: 0px;
      margin-left: 0px;
      border-bottom: none;
      border-radius: calc(0.25rem - 1px) calc(0.25rem - 1px) 0 0;
      margin-bottom: 2rem;
    "
  >
    <div style="margin-bottom: 0.5rem !important; flex: 1">
      <p style="font-weight: 700; margin: 0px; color: #101010">
      ${invoiceData.adminInfo.businessName}
      </p>
      <p style="margin: 0; word-wrap: break-word; width: calc(50% - 4px)">
      ${invoiceData.adminInfo.address}
      </p>
      <p style="margin: 0; word-wrap: break-word">${invoiceData.adminInfo.phone}</p>
      <p style="margin: 0; word-wrap: break-word">
        ${invoiceData.adminInfo.email}
      </p>
      <p style="margin: 0; word-wrap: break-word">ABN ${invoiceData.adminInfo.abn}</p>
    </div>
    <div style="flex: 1">
      <div
        style="
          display: flex;
          align-items: center;
          justify-content: space-between;
        "
      >
        <div>
          <span
            style="
              font-weight: bolder;
              font-size: x-large;
              color: #4f90bb;
              white-space: nowrap;
            "
            >Tax Invoice ${invoiceData.invoiceNumber}</span
          >
        </div>
      </div>
    </div>
    <div style="flex: 1">
      <div
        style="
          display: flex;
          align-items: center;
          justify-content: space-between;
        "
      >
        <div>
          <img
            src="${SITE_URL}static/media/dropboxed-logo.2d35e13a620811e2a750.png"
            alt="company-logo"
            style="margin: 0; max-width: 300px; height: auto"
          />
        </div>
      </div>
    </div>
  </div>
  <hr style="border: 1px solid #4f90bb" />

  <div style="display: flex; padding: 0; margin-bottom: 4rem">
    <div
      style="
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
      "
    >
      <p style="font-weight: 700; margin: 0px; color: #101010">
        INVOICE TO
      </p>
      <p style="margin: 0; word-wrap: break-word">${invoiceData.clientName}</p>
      <p style="margin: 0; word-wrap: break-word; width: calc(50% - 4px)">
        ${invoiceData.clientInfo.address}
      </p>
    </div>
    <div
      style="
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
      "
    >
      <div
        style="
          border-bottom: 1px solid #4f90bb;
          display: flex;
          float: end;
          font-size: large;
        "
      >
        <div style="padding: 1.5rem 2.5rem; background-color: #dce9f1">
          <p
            style="
              color: #4f90bb;
              padding: 0;
              margin: 0;
              text-align: center;
            "
          >
            Date
          </p>
          <p
            style="
              color: #4f90bb;
              padding: 0;
              margin: 0;
              text-align: center;
            "
          >
          ${invoiceData.invoiceDate}
          </p>
        </div>
        <div
          style="
            padding: 1.5rem 2.5rem;
            background-color: #4f90bb;
            margin-bottom: 2px;
          "
        >
          <p
            style="
              color: whitesmoke;
              padding: 0;
              margin: 0;
              text-align: center;
              text-wrap: nowrap;
            "
          >
            Please Pay
          </p>
          <p
            style="
              color: whitesmoke;
              padding: 0;
              margin: 0;
              text-align: center;
            "
          >
            A$${invoiceData.amountDue}
          </p>
        </div>
        <div style="padding: 1.5rem 2.5rem; background-color: #dce9f1">
          <p
            style="
              color: #4f90bb;
              padding: 0;
              margin: 0;
              text-align: center;
            "
          >
             ${invoiceData.dueDate}
          </p>
          <p
            style="
              color: #4f90bb;
              padding: 0;
              margin: 0;
              text-align: center;
            "
          >
            12/06/2024
          </p>
        </div>
      </div>
    </div>
  </div>
  <div
    style="
      padding-top: 0px;
      overflow-x: auto;
      border-top: 2px solid #dee2e6;
      border-bottom: 2px solid #dee2e6;
    "
  >
    <table style="width: 100%; border-collapse: collapse">
      <thead>
        <tr>
          <th
            style="
              border-bottom: 2px solid #dee2e6;
              border-top: none;
              padding: 8px;
            "
          >
            <p style="font-weight: 700; margin: 0px; color: #101010">
              ACTIVITY
            </p>
          </th>
          <th
            style="
              border-bottom: 2px solid #dee2e6;
              border-top: none;
              padding: 8px;
            "
          >
            <p style="font-weight: 700; margin: 0px; color: #101010">
              DESCRIPTION
            </p>
          </th>
          <th
            style="
              border-bottom: 2px solid #dee2e6;
              border-top: none;
              padding: 8px;
            "
          >
            <p style="font-weight: 700; margin: 0px; color: #101010">
              QTY
            </p>
          </th>
          <th
            style="
              border-bottom: 2px solid #dee2e6;
              border-top: none;
              padding: 8px;
            "
          >
            <p style="font-weight: 700; margin: 0px; color: #101010">
              RATE
            </p>
          </th>
          <th
            style="
              border-bottom: 2px solid #dee2e6;
              border-top: none;
              padding: 8px;
            "
          >
            <p style="font-weight: 700; margin: 0px; color: #101010">
              AMOUNT
            </p>
          </th>
        </tr>
      </thead>
      <tbody>
        ${invoiceData.items.map(item => `
            <tr>
                <td style="padding: 8px; font-weight: 700; color: #101010">${item.name}</td>
                <td style="padding: 8px;">${item.description}</td>
                <td style="padding: 8px;">${item.price}</td>
                <td style="padding: 8px;">${item.quantity}</td>
                <td style="padding: 8px;" class="font-weight-bold">$ ${item.price}</td>
            </tr>`).join('')}
      </tbody>
    </table>
  </div>

  <div
    style="
      padding-top: 8px;
      display: flex;
      justify-content: space-between;
    "
  >
    <div style="width: 50%;">
      <p style="margin: 0; word-wrap: break-word">
        Please make payment to:
      </p>
      <p style="margin: 0; word-wrap: break-word">Name: ${invoiceData.adminInfo.accountName}</p>
      <p style="margin: 0; word-wrap: break-word">BSB: ${invoiceData.adminInfo.bsb}</p>
      <p style="margin: 0; word-wrap: break-word">Account: ${invoiceData.adminInfo.accountNumber}</p>
      <p style="margin: 0; word-wrap: break-word">
        NOTE: ${invoiceData.notes}
      </p>
      <p style="margin: 0; word-wrap: break-word; width: calc(50% - 4px)">
        44 Blue Seas Parade, Lennox Head NSW, Australia
      </p>
    </div>
    <div
      style="display: flex; justify-content: flex-end; width: 50%;"
    >
      <ul
        style="
          list-style-type: none;
          padding: 0;
          margin: 0;
        "
      >
        <li
          style="
            display: flex;
            justify-content: space-between;
            padding: 4px 0;
          "
        >
          <span style="margin-right: 8px; color: #4f90bb">SUBTOTAL</span>
          <span>${invoiceData.subTotal}</span>
        </li>
        <li
          style="
            display: flex;
            justify-content: space-between;
            padding: 4px 0;
          "
        >
          <span style="margin-right: 8px; color: #4f90bb">GST TOTAL</span>
          <span>${invoiceData.taxAmount}</span>
        </li>
        <li
          style="
            display: flex;
            justify-content: space-between;
            padding: 4px 0;
          "
        >
          <span style="margin-right: 8px; color: #4f90bb">TOTAL</span>
          <span>${invoiceData.amountDue}</span>
        </li>
        <li
          style="
            display: flex;
            justify-content: space-between;
            padding: 4px 0;
            border-top: 2px solid #dee2e6;
            border-bottom: 1px solid #4f90bb;
          "
        >
          <span style="margin-right: 8px; color: #4f90bb">TOTAL DUE</span>
          <span>${invoiceData.amountDue}</span>
        </li>
      </ul>
    </div>
  </div>
</div>
</div>


`;