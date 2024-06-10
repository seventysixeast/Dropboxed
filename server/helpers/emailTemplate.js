require('dotenv').config();
const SITE_URL = process.env.SITE_URL;
const VERIFY_URL = process.env.VERIFY_URL;
const GALLERY_IMAGE_URL = process.env.GALLERY_IMAGE_URL;

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

exports.SEND_VERIFICATION_CLIENT_EMAIL = (subdomain, email, verificationToken) => `
<div style="display: flex; justify-content: center; align-items: center; height: auto;">
    <span style="width: 100%; max-width: 600px; display: block; font-family: Arial, Verdana, sans-serif; padding-top: 0.5rem; border: 2px solid black; margin: 0.3rem;">
        <table cellpadding="0" cellspacing="0" width="100%">
            <tbody>
                <tr>
                    <td style="padding-top: 10px; text-align:center;">
                        <h1 style="text-transform: uppercase; color: #00b5b8;">${subdomain}</h1>
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

exports.SEND_OTP = (name, logo, email, otp) => `
<div style="display: flex; justify-content: center; align-items: center; height: auto;">
    <span style="width: 100%; max-width: 600px; display: block; font-family: Arial, Verdana, sans-serif; padding-top: 0.5rem; border: 2px solid black; margin: 0.3rem;">
        <table cellpadding="0" cellspacing="0" width="100%">
            <tbody>
                <tr>
                    <td style="padding-top: 10px; text-align:center;">
                    ${logo ? `<img src="${GALLERY_IMAGE_URL}/${logo}" style="width: 150px;" alt="Logo"/>` : `<h1 style="text-transform: uppercase; color: #00b5b8;">${subdomain}</h1>`}
                </td>
                </tr>
                <tr>
                    <td>
                        <table style="font-size: 14px; width: 100%; background: #fff; border-radius: 0;">
                            <tbody>
                                <tr>
                                    <td style="padding: 30px; width: 100%;" valign="top">
                                        <div style="font-size: 14px; font-weight: normal; line-height: 1.8em; text-align: left;">
                                            <h3>Hello ${name}!</h3>
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
                        ${logo ? `<img src="${GALLERY_IMAGE_URL}/${logo}" style="width: 150px;" alt="Logo"/>` : `<h1 style="text-transform: uppercase; color: #00b5b8;">${subdomain}</h1>`}
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

exports.NEW_BOOKING = (subdomain, logo, subdomainContact, name, data, contact, teamMember) => `
<div style="display: flex; justify-content: center; align-items: center; height: 100vh;">
    <span style="width: 100%; max-width: 600px; display: block; font-family: Arial, Verdana, sans-serif; padding-top: 0.5rem; border: 2px solid black; margin: 0.3rem;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
                <td width="50%" valign="top" style="padding: 20px; font-family: Arial, sans-serif; font-size: 14px;">
                    <h1 style="font-size: 18px; margin-bottom: 10px;">New Booking</h1>
                    <p>Hello ${name},</p>
                    <p>Your booking has been confirmed with ${subdomain}</p>
                    <p><b>Date:</b> ${data.booking_date}</p>
                    <p><b>Time:</b> ${data.booking_time}</p>
                    <p><b>Project:</b> ${data.booking_title}</p>
                    <p><b>Team Member:</b> ${teamMember}</p>
                    <p><b>Contact:</b> ${contact}</p>
                    <p>Thank you,</p>
                    <p>${subdomain}</p>
                    <p>You have received this message due to a recent booking</p>
                </td>
                <td width="50%" valign="top" style="background-color: #f2f2f2; padding: 20px; font-family: Arial, sans-serif; font-size: 14px;">
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                        <td align="center">
                            ${logo ? `<img src="${GALLERY_IMAGE_URL}/${logo}" style="width: 150px;" alt="Logo"/>` : `<h1 style="text-transform: uppercase; color: #00b5b8;">${subdomain}</h1>`}
                        </td>
                    </td>
                    </tr>
                    <tr>
                        <td align="center" style="font-size: 16px; font-weight: bold;">${subdomain}</td>
                    </tr>
                    <tr>
                        <td align="center" style="font-size: 14px;">${subdomainContact}</td>
                    </tr>
                    <tr>
                        <td align="center" style="margin-top: 20px;">
                            <a href="https://${subdomain}.${VERIFY_URL}dashboard" style="display: inline-block; padding: 11px 15px; color: #fff; background: #00b5b8; text-decoration: none;" rel="noreferrer" target="_blank"><b>DASHBOARD</b></a>
                        </td>
                    </tr>
                </table>
                </td>
            </tr>
        </table>
        <table style="margin: 30px auto 10px auto;" cellpadding="0" cellspacing="0" border="0">
            <tbody>
                <tr>
                    <td style="font-size: 12px; font-weight: normal; line-height: normal; color: #001737;">
                <p>Powered by <img src="${SITE_URL}static/media/dropboxed-logo.2d35e13a620811e2a750.png" style="width: 150px; vertical-align: middle;" alt="Logo"/></p>
                    </td>
                </tr>
            </tbody>
        </table>
    </span>
</div>
`;

exports.UPDATE_BOOKING = (subdomain, logo, subdomainContact, name, data, contact, teamMember) => `
<div style="display: flex; justify-content: center; align-items: center; height: 100vh;">
    <span style="width: 100%; max-width: 600px; display: block; font-family: Arial, Verdana, sans-serif; padding-top: 0.5rem; border: 2px solid black; margin: 0.3rem;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
                <td width="50%" valign="top" style="padding: 20px; font-family: Arial, sans-serif; font-size: 14px;">
                    <h1 style="font-size: 18px; margin-bottom: 10px;">Update Booking</h1>
                    <p>Hello ${name},</p>
                    <p>Your booking has been confirmed with ${subdomain}</p>
                    <p><b>Date:</b> ${data.booking_date}</p>
                    <p><b>Time:</b> ${data.booking_time}</p>
                    <p><b>Project:</b> ${data.booking_title}</p>
                    <p><b>Team Member:</b> ${teamMember}</p>
                    <p><b>Contact:</b> ${contact}</p>
                    <p>Thank you,</p>
                    <p>${subdomain}</p>
                    <p>You have received this message due to a recent booking</p>
                </td>
                <td width="50%" valign="top" style="background-color: #f2f2f2; padding: 20px; font-family: Arial, sans-serif; font-size: 14px;">
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                        <td align="center">
                            ${logo ? `<img src="${GALLERY_IMAGE_URL}/${logo}" style="width: 150px;" alt="Logo"/>` : `<h1 style="text-transform: uppercase; color: #00b5b8;">${subdomain}</h1>`}
                        </td>
                    </td>
                    </tr>
                    <tr>
                        <td align="center" style="font-size: 16px; font-weight: bold;">${subdomain}</td>
                    </tr>
                    <tr>
                        <td align="center" style="font-size: 14px;">${subdomainContact}</td>
                    </tr>
                    <tr>
                        <td align="center" style="margin-top: 20px;">
                            <a href="https://${subdomain}.${VERIFY_URL}dashboard" style="display: inline-block; padding: 11px 15px; color: #fff; background: #00b5b8; text-decoration: none;" rel="noreferrer" target="_blank"><b>DASHBOARD</b></a>
                        </td>
                    </tr>
                </table>
                </td>
            </tr>
        </table>
        <table style="margin: 30px auto 10px auto;" cellpadding="0" cellspacing="0" border="0">
            <tbody>
                <tr>
                    <td style="font-size: 12px; font-weight: normal; line-height: normal; color: #001737;">
                <p>Powered by <img src="${SITE_URL}static/media/dropboxed-logo.2d35e13a620811e2a750.png" style="width: 150px; vertical-align: middle;" alt="Logo"/></p>
                    </td>
                </tr>
            </tbody>
        </table>
    </span>
</div>
`;

exports.NEW_COLLECTION = (subdomain, logo, data) => `
<div style="display: flex; justify-content: center; align-items: center; height: 100vh;">
    <span style="width: 100%; max-width: 600px; display: block; font-family: Arial, Verdana, sans-serif; padding-top: 0.5rem; border: 2px solid black; margin: 0.3rem;">
        <table cellpadding="0" cellspacing="0" width="100%">
            <tbody>
                <tr>
                    <td style="padding-top: 10px; text-align:center;">
                        ${logo ? `<img src="${GALLERY_IMAGE_URL}/${logo}" style="width: 150px;" alt="Logo"/>` : `<h1 style="text-transform: uppercase; color: #00b5b8;">${subdomain}</h1>`}
                    </td>
                </tr>
                <tr>
                    <td style="text-align: center; padding-top: 10px;">
                        <img src="${GALLERY_IMAGE_URL}/${data.banner}" alt="Banner Image" style="width: 100%; height: auto; max-height: 200px; object-fit: cover;">
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
                                                        <a href="https://${subdomain}.${VERIFY_URL}dashboard" style="display: inline-block; padding: 11px 15px; color: #fff; background: #00b5b8; text-decoration: none;" rel="noreferrer" target="_blank"><b>VIEW PROJECT</b></a>
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
<div style="display: flex; justify-content: center; align-items: center; height: 100vh;">
    <span style="width: 100%; max-width: 600px; display: block; font-family: Arial, Verdana, sans-serif; padding-top: 0.5rem; border: 2px solid black; margin: 0.3rem;">
        <table cellpadding="0" cellspacing="0" width="100%">
            <tbody>
                <tr>
                    <td style="padding-top: 10px; text-align:center;">
                        ${logo ? `<img src="${GALLERY_IMAGE_URL}/${logo}" style="width: 150px;" alt="Logo"/>` : `<h1 style="text-transform: uppercase; color: #00b5b8;">${subdomain}</h1>`}
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
<div style="display: flex; justify-content: center; align-items: center; height: 100vh;">
    <span style="width: 100%; max-width: 600px; display: block; font-family: Arial, Verdana, sans-serif; padding-top: 0.5rem; border: 2px solid black; margin: 0.3rem;">
        <table cellpadding="0" cellspacing="0" width="100%">
            <tbody>
                <tr>
                    <td style="padding-top: 10px; text-align:center;">
                        ${logo ? `<img src="${GALLERY_IMAGE_URL}/${logo}" style="width: 150px;" alt="Logo"/>` : `<h1 style="text-transform: uppercase; color: #00b5b8;">${subdomain}</h1>`}
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

exports.INVOICE_EMAIL = (invoiceData) => `
<div style="display: flex; justify-content: center; align-items: center; height: auto;">
    <span style="width:50%; display:block; font-family: Arial, Verdana, sans-serif; padding-top: 0.5rem; border: 2px solid black; margin: 0.3rem;">
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
                                    <td style="padding:30px; width:100%;" valign="top">
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
                                                    <td style="border: 1px solid #ddd; padding: 8px;">${item.product_price}</td>
                                                    <td style="border: 1px solid #ddd; padding: 8px;">${item.quantity}</td>
                                                    <td style="border: 1px solid #ddd; padding: 8px;">$ ${item.product_price}</td>
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
                                    <td align="center" style="padding-bottom:30px; width:100%;" valign="top">
                                        <a href="${SITE_URL}dashboard" style="display:inline-block;padding:11px 30px;color:#fff;background:#00b5b8;text-decoration:none;" rel="noreferrer" target="_blank"><b>VIEW INVOICE</b></a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table style="margin: 10px auto 10px auto;" cellpadding="0" cellspacing="0" border="0">
                            <tbody>
                                <tr>
                                    <td align="center" style="font-size: 12px;font-weight: normal;font-style: normal;font-stretch: normal;line-height: normal;letter-spacing: normal;color: #001737;">
                                        <a href="https://www.studiio.au">https://www.studiio.au</a><br>
                                        Questions? Reply to this email.
                                        <p>Power by <img src="${SITE_URL}static/media/dropboxed-logo.2d35e13a620811e2a750.png" style="width: 150px; vertical-align: middle;" alt="Logo"/></p>
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