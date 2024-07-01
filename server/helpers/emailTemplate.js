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
                                                        <a href="https://${subdomain}.${VERIFY_URL}view-gallery/${data.slug}" style="display: inline-block; padding: 6px 15px; margin-bottom: 4px; color: #fff; background: #00b5b8; text-decoration: none;" rel="noreferrer" target="_blank"><b>VIEW PROJECT</b></a>
                                                        <a href="https://${subdomain}.${VERIFY_URL}dashboard" style="display: inline-block; padding: 6px 15px; margin-bottom: 4px; color: #fff; background: #00b5b8; text-decoration: none;" rel="noreferrer" target="_blank"><b>DASHBOARD</b></a>
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
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Invoice</title>
</head>
<body style="font-family: Arial, Helvetica, sans-serif; color: #000000;">
  <div style="margin-bottom: 1.875rem; box-shadow: 0 10px 40px 0 rgba(62, 57, 107, 0.07), 0 2px 9px 0 rgba(62, 57, 107, 0.06); background-color: #fff; padding: 1.5rem;">
    <table width="100%" style="border-collapse: collapse;">
      <tr>
        <td style="width: 33%;">
          <p style="font-weight: 700; margin: 0; color: #101010;">${invoiceData.adminInfo.businessName}</p>
          <p style="margin: 0;">${invoiceData.adminInfo.address}</p>
          <p style="margin: 0;">${invoiceData.adminInfo.phone}</p>
          <p style="margin: 0;">${invoiceData.adminInfo.email}</p>
          <p style="margin: 0;">ABN ${invoiceData.adminInfo.abn}</p>
        </td>
        <td style="width: 33%; text-align: center;">
          <p style="font-weight: bolder; font-size: x-large; color: #4f90bb; margin: 0;">Tax Invoice ${invoiceData.invoiceNumber}</p>
        </td>
        <td style="width: 33%; text-align: right;">
          ${invoiceData.logo && invoiceData.logo !== '' 
            ? `<img src="${CLIENTS_IMAGE_URL}/${invoiceData.logo}" alt="company-logo" style="max-width: 60%; height: auto;" />` 
            : `<h1 style="text-transform: uppercase; color: #00b5b8; margin: 0;">${invoiceData.subdomain}</h1>`
          }
        </td>
      </tr>
    </table>
    <hr style="border: 1px solid #4f90bb; margin: 1rem 0;" />
    <table width="100%" style="border-collapse: collapse;">
    <tr>
        <td style="width: 50%; padding-right: 10px;">
        <p style="font-weight: 700; margin: 0; color: #101010;">INVOICE TO</p>
        <p style="margin: 0;">${invoiceData.clientName}</p>
        <p style="margin: 0;">${invoiceData.clientInfo.address}</p>
        </td>
        <td style="width: 50%; text-align: right;">
        <table width="100%" style="border-collapse: collapse;">
            <tr>
            <td style="width: 33%; padding: 1.5rem 2.5rem; background-color: #dce9f1; text-align: center;">
                <p style="color: #4f90bb; margin: 0;">Date</p>
                <p style="color: #4f90bb; margin: 0;">${invoiceData.invoiceDate}</p>
            </td>
            <td style="width: 33%; padding: 1.5rem 2.5rem; background-color: #4f90bb; text-align: center;">
                <p style="color: whitesmoke; margin: 0;">Please Pay</p>
                <p style="color: whitesmoke; margin: 0;">A$${invoiceData.amountDue.toFixed(2)}</p>
            </td>
            <td style="width: 34%; padding: 1.5rem 2.5rem; background-color: #dce9f1; text-align: center;">
                <p style="color: #4f90bb; margin: 0;">Due Date</p>
                <p style="color: #4f90bb; margin: 0;">${invoiceData.dueDate}</p>
            </td>
            </tr>
        </table>
        </td>
    </tr>
    </table>
    <div style="overflow-x: auto; border-top: 2px solid #dee2e6; border-bottom: 2px solid #dee2e6; margin-top: 1rem;">
      <table width="100%" style="border-collapse: collapse;">
        <thead>
          <tr>
            <th style="border-bottom: 2px solid #dee2e6; padding: 8px;">ACTIVITY</th>
            <th style="border-bottom: 2px solid #dee2e6; padding: 8px;">DESCRIPTION</th>
            <th style="border-bottom: 2px solid #dee2e6; padding: 8px;">QTY</th>
            <th style="border-bottom: 2px solid #dee2e6; padding: 8px;">RATE</th>
            <th style="border-bottom: 2px solid #dee2e6; padding: 8px;">AMOUNT</th>
          </tr>
        </thead>
        <tbody>
          ${invoiceData.items.map(item => `
          <tr>
            <td style="padding: 8px; font-weight: 700; color: #101010;">${item.name}</td>
            <td style="padding: 8px;">${item.description}</td>
            <td style="padding: 8px;">${item.quantity}</td>
            <td style="padding: 8px;">${item.price}</td>
            <td style="padding: 8px;">${item.price}</td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>
    <div style="margin-top: 1rem;">
      <p style="margin: 0;">Please make payment to:</p>
      <p style="margin: 0;">Name: ${invoiceData.adminInfo.accountName}</p>
      <p style="margin: 0;">BSB: ${invoiceData.adminInfo.bsb}</p>
      <p style="margin: 0;">Account: ${invoiceData.adminInfo.accountNumber}</p>
      <p style="margin: 0;">NOTE: ${invoiceData.notes}</p>
      <p style="margin: 0;">44 Blue Seas Parade, Lennox Head NSW, Australia</p>
    </div>
    <div style="text-align: right; margin-top: 2rem;">
      <table style="width: auto; margin-left: auto; border-collapse: collapse;">
        <tr>
          <td style="padding: 4px 0; color: #4f90bb;">SUBTOTAL</td>
          <td style="padding: 4px 0;">${invoiceData.subTotal.toFixed(2)}</td>
        </tr>
        <tr>
          <td style="padding: 4px 0; color: #4f90bb;">GST TOTAL</td>
          <td style="padding: 4px 0;">${invoiceData.taxAmount.toFixed(2)}</td>
        </tr>
        <tr>
          <td style="padding: 4px 0; color: #4f90bb;">TOTAL</td>
          <td style="padding: 4px 0;">${invoiceData.amountDue.toFixed(2)}</td>
        </tr>
        <tr style="border-top: 2px solid #dee2e6; border-bottom: 1px solid #4f90bb;">
          <td style="padding: 4px 0; color: #4f90bb;">TOTAL DUE</td>
          <td style="padding: 4px 0;">${invoiceData.amountDue}</td>
        </tr>
      </table>
    </div>
  </div>
</body>
</html>
`;