require('dotenv').config();
const SITE_URL = process.env.SITE_URL;

exports.SEND_OTP = (name, email, otp) => `
<div style="display: flex; justify-content: center; align-items: center; height: 100vh;">
    <span style="width:50%; display:block; font-family: Arial, Verdana, sans-serif; background: #f8f9fb; padding-top: 0.5rem; border: 2px solid black; margin: 0.3rem;">
        <table cellpadding="0" cellspacing="0" width="100%">
            <tbody>
                <tr>
                    <td style="padding-top: 10px; text-align:center;">
                        <h1>Studiio.au</h1>
                    </td>
                </tr>
                <tr>
                    <td>
                        <table style="font-size: 14px; width:100%; background: #fff; border-radius: 0;">
                            <tbody>
                                <tr>
                                    <td style="padding:30px; width:100%;" valign="top">
                                        <div style="font-size:14px;font-weight:normal;line-height:1.8em;text-align:left;">
                                            <h3>Hello ${name} !</h3>
                                            <p>Please enter the below mentioned OTP for reset password!</p>
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
                                        Power by studiio.au
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
<div style="display: flex; justify-content: center; align-items: center; height: 100vh;">
    <span style="width:50%; display:block; font-family: Arial, Verdana, sans-serif; background: #f8f9fb; padding-top: 0.5rem; border: 2px solid black; margin: 0.3rem;">
        <table cellpadding="0" cellspacing="0" width="100%">
            <tbody>
                <tr>
                    <td style="padding-top: 10px; text-align:center;">
                        <h1 style="text-transform: uppercase;">${studioName}</h1>
                    </td>
                </tr>
                <tr>
                    <td>
                        <table style="font-size: 14px; width:100%; background: #fff; border-radius: 0;">
                            <tbody>
                                <tr>
                                    <td style="padding:30px; width:100%;" valign="top">
                                        <div style="font-size:14px;font-weight:normal;line-height:1.8em;text-align:left;">
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
                                        Power by studiio.au
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

exports.WELCOME_LOGIN = (name, email) => `
<div style="display: flex; justify-content: center; align-items: center; height: 100vh;">
    <span style="width:50%; display:block; font-family: Arial, Verdana, sans-serif; background: #f8f9fb; padding-top: 0.5rem; border: 2px solid black; margin: 0.3rem;">
        <table cellpadding="0" cellspacing="0" width="100%">
            <tbody>
                <tr>
                    <td style="padding-top: 10px; text-align:center;">
                        <h1 style="text-transform: uppercase;">${name}</h1>
                    </td>
                </tr>
                <tr>
                    <td>
                        <table style="font-size: 14px; width:100%; background: #fff; border-radius: 0;">
                            <tbody>
                                <tr>
                                    <td style="padding:30px; width:100%;" valign="top">
                                        <div style="font-size:14px;font-weight:normal;line-height:1.8em;text-align:left;">
                                        <p>Welcome to my-studiio!</p>
                                        <p>Dear ${name},</p>
                                        <p>Welcome to ${name}.studiio.au! We're thrilled to have you.</p>
                                        <p>At my-studio, you'll find all the tools you need to manage your bookings, galleries, invoices and more.</p>
                                        <p>we're here to make your experience enjoyable and seamless.</p>
                                        <p>If you have any questions or need assistance, feel free to reach out to our support team at ${email}</p>
                                        <p>Once again, welcome aboard!<br>
                                        Best regards,</p>
                                        <p>${name}<br>
                                        Director<br>
                                        my-studio.au</p>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td align="center" style="padding-bottom:30px; width:100%;" valign="top">
                                        <a href="${SITE_URL}login" style="display:inline-block;padding:11px 30px;color:#fff;background:#00b5b8 ;text-decoration:none;" rel="noreferrer" target="_blank" data-saferedirecturl="https://www.google.com/url?q=${SITE_URL}login.php"><b>DASHBOARD</b></a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table style="margin: 10px auto 10px auto;" cellpadding="0" cellspacing="0" border="0">
                            <tbody>
                                <tr>
                                    <td align="center" style="font-size: 12px;font-weight: normal;font-style: normal;font-stretch: normal;line-height: normal;letter-spacing: normal;color: #001737;">
                                        <a href="${email}">${email}</a><br>
                                        Questions? Reply to this email.
                                        <p>Power by <b>studiio.au</b></p>
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

exports.WELCOME_EMAIL = (subdomain, subdomain_email, name, email, password) => `
<div style="display: flex; justify-content: center; align-items: center; height: 100vh;">
    <span style="width:50%; display:block; font-family: Arial, Verdana, sans-serif; background: #f8f9fb; padding-top: 0.5rem; border: 2px solid black; margin: 0.3rem;">
        <table cellpadding="0" cellspacing="0" width="100%">
            <tbody>
                <tr>
                    <td style="padding-top: 10px; text-align:center;">
                        <h1 style="text-transform: uppercase;">${subdomain}</h1>
                    </td>
                </tr>
                <tr>
                    <td>
                        <table style="font-size: 14px; width:100%; background: #fff; border-radius: 0;">
                            <tbody>
                                <tr>
                                    <td style="padding:30px; width:100%;" valign="top">
                                        <div style="font-size:14px;font-weight:normal;line-height:1.8em;text-align:left;">
                                        <p>Welcome to my-studio!</p>
                                        <p>Dear ${name},</p>
                                        <p>Welcome to ${subdomain}.studiio.au! We're thrilled to have you.</p>
                                        <p>At my-studio, you'll find all the tools you need to manage your bookings, galleries, invoices and more.</p>
                                        <p>we're here to make your experience enjoyable and seamless.</p>
                                        <p>Email: ${email} <br> 
                                        Password: ${password}</p>
                                        <p>If you have any questions or need assistance, feel free to reach out to our support team at ${subdomain_email}</p>
                                        <p>Once again, welcome aboard!<br>
                                        Best regards,</p>
                                        <p>${name}<br>
                                        Director<br>
                                        my-studio.au</p>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td align="center" style="padding-bottom:30px; width:100%;" valign="top">
                                        <a href="${SITE_URL}login" style="display:inline-block;padding:11px 30px;color:#fff;background:#00b5b8 ;text-decoration:none;" rel="noreferrer" target="_blank" data-saferedirecturl="https://www.google.com/url?q=${SITE_URL}login.php"><b>LOGIN TO CONTINUE</b></a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table style="margin: 10px auto 10px auto;" cellpadding="0" cellspacing="0" border="0">
                            <tbody>
                                <tr>
                                    <td align="center" style="font-size: 12px;font-weight: normal;font-style: normal;font-stretch: normal;line-height: normal;letter-spacing: normal;color: #001737;">
                                        <a href="${subdomain_email}">${subdomain_email}</a><br>
                                        Questions? Reply to this email.
                                        <p>Power by <b>studiio.au</b></p>
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

exports.NEW_BOOKING = (subdomain, name, data, contact) => `
<div style="display: flex; justify-content: center; align-items: center; height: 100vh;">
    <span style="width:50%; display:block; font-family: Arial, Verdana, sans-serif; background: #f8f9fb; padding-top: 0.5rem; border: 2px solid black; margin: 0.3rem;">
        <table cellpadding="0" cellspacing="0" width="100%">
            <tbody>
                <tr>
                    <td style="padding-top: 10px; text-align:center;">
                    <h1 style="text-transform: uppercase;">${subdomain}</h1>
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
                                            <p>Your booking has been confirmed with Photographer.</p>

                                            Date: ${data.booking_date} <br>
                                            Time: ${data.booking_time} <br>
                                            Address: ${data.booking_title} <br>
                                            Contact: ${contact} <br>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 0px 30px 20px 30px; width:100%;" valign="top">
                                        <div style="font-size:14px;font-weight:normal;line-height:1.8em;text-align:left;">
                                            Thanks <br>
                                            <b>studiio.au</b>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 0px 30px 20px 30px; width:100%;" valign="top">
                                        <div style="font-size:14px;font-weight:normal;line-height:1.8em;text-align:left;">
                                            You have received this message due to a recent booking.
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table style="margin: 10px auto 10px auto;" cellpadding="0" cellspacing="0" border="0">
                            <tbody>
                                <tr>
                                    <td style="font-size: 12px;font-weight: normal;font-style: normal;font-stretch: normal;line-height: normal;letter-spacing: normal;color: #001737;">
                                        Power by studiio.au
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

exports.NEW_COLLECTION = (subdomain, client_email, data) => `
<div style="display: flex; justify-content: center; align-items: center; height: 100vh;">
    <span style="width:50%; display:block; font-family: Arial, Verdana, sans-serif; background: #f8f9fb; padding-top: 0.5rem; border: 2px solid black; margin: 0.3rem;">
        <table cellpadding="0" cellspacing="0" width="100%">
            <tbody>
                <tr>
                    <td style="padding-top: 10px; text-align:center;">
                    <h1 style="text-transform: uppercase;">${subdomain}</h1>
                    </td>
                </tr>
                <tr>
                    <td style="text-align: center; padding-top: 10px;">
                        <img src="https://cdn.pixabay.com/photo/2022/06/12/22/48/gradient-7258997_1280.png" alt="Banner Image" style="width: 100%; height: auto; max-height: 200px; object-fit: cover;">
                    </td>
                </tr>
                <tr>
                    <td>
                        <table style="font-size: 14px; width:100%; background: #fff; border-radius: 0;">
                            <tbody>
                                <tr>
                                    <td align="center" style="padding:30px; width:100%;" valign="top">
                                        <div style="font-size:14px;font-weight:normal;line-height:1.8em;">
                                            <h2>${data.name}</h2>
                                            <p>Your project  “${data.name}” is ready</p>
                                            <tr>
                                                <td align="center" style="padding-bottom:30px; width:100%;" valign="top">
                                                    <a href="/dashboard" style="display:inline-block;padding:11px 15px;color:#fff;background:#00b5b8 ;text-decoration:none;" rel="noreferrer" target="_blank" data-saferedirecturl="https://www.google.com/url?q=${SITE_URL}dashboard"><b>VIEW PROJECT</b></a>
                                                    <a href="/dashboard" style="display:inline-block;padding:11px 15px;color:#fff;background:#00b5b8 ;text-decoration:none;" rel="noreferrer" target="_blank" data-saferedirecturl="https://www.google.com/url?q=${SITE_URL}dashboard"><b>DASHBOARD</b></a>
                                                    <p>${subdomain}<br>
                                                    ${client_email}<br>
                                                    Questions? Reply to this email.
                                                    </p>
                                                </td>
                                            </tr>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table style="margin: 10px auto 10px auto;" cellpadding="0" cellspacing="0" border="0">
                            <tbody>
                                <tr>
                                    <td style="font-size: 12px;font-weight: normal;font-style: normal;font-stretch: normal;line-height: normal;letter-spacing: normal;color: #001737;">
                                        Power by studiio.au
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