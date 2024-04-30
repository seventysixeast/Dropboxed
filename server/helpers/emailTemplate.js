require('dotenv').config();
const SITE_URL = process.env.SITE_URL;
exports.BUSINESS_REGISTRATION_EMAIL = `
<div width="100%" style="background:#f8f8f8;padding:0px 0px;font-family:arial;line-height:28px;height:100%;width:100%;color:#514d6a">
    <div style="max-width:700px;padding-bottom:50px;margin:0px auto;font-size:12px">
        <table style="width:100%;background:#a0aec4" cellspacing="0" cellpadding="0" border="0">
            <tbody>
            <tr>
                <td style="vertical-align:top;padding-bottom:30px" align="center">
                    <a href="${SITE_URL}" rel="noreferrer" target="_blank" data-saferedirecturl="https://www.google.com/url?q=${SITE_URL}&amp;source=gmail&amp;ust=1641457345553000&amp;usg=AOvVaw15R6_z4rpNvufqJGRc1j-5">
                        <img src="${SITE_URL}app-assets/images/logo/logo.png" alt="MediaDrive" style="border:none" class="CToWUd" width="60" height="60">
                        <br>
                        MediaDrive
                    </a>
                </td>
            </tr>
            </tbody>
        </table>
        <div style="padding:40px;background:#fff">
            <table style="width:100%" cellspacing="0" cellpadding="0" border="0">
                <tbody>
                <tr>
                    <td>
                        <p>Dear <b>#adminName#</b></p>
                        <p>A new user registration at MediaDrive</p>
                    </td>
                </tr>
                <tr>
                    <td style="padding:20px 0;border-top:1px solid #f6f6f6">
                        <div>
                            <table width="100%" cellspacing="0" cellpadding="0">
                                <tbody>
                                <tr>
                                    <td style="width:30%;font-family:arial;font-size:14px;vertical-align:middle;margin:0;padding:9px 0">Name</td>
                                    <td style="width:70%;font-family:arial;font-size:14px;vertical-align:middle;margin:0;padding:9px 0" align="right">#name#</td>
                                </tr>
                                <tr>
                                    <td style="width:30%;font-family:arial;font-size:14px;vertical-align:middle;border-top-width:1px;border-top-color:#f6f6f6;border-top-style:solid;margin:0;padding:9px 0">Username</td>
                                    <td style="width:70%;font-family:arial;font-size:14px;vertical-align:middle;border-top-width:1px;border-top-color:#f6f6f6;border-top-style:solid;margin:0;padding:9px 0" align="right">#username#</td>
                                </tr>
                                <tr>
                                    <td style="width:30%;font-family:arial;font-size:14px;vertical-align:middle;border-top-width:1px;border-top-color:#f6f6f6;border-top-style:solid;margin:0;padding:9px 0">Email</td>
                                    <td style="width:70%;font-family:arial;font-size:14px;vertical-align:middle;border-top-width:1px;border-top-color:#f6f6f6;border-top-style:solid;margin:0;padding:9px 0" align="right">#email#</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td align="center">
                        <a href="${SITE_URL}login.php" style="display:inline-block;padding:11px 30px;margin:20px 0px 30px;font-size:15px;color:#fff;background:#fb9678;border-radius:60px;text-decoration:none" rel="noreferrer" target="_blank" data-saferedirecturl="https://www.google.com/url?q=${SITE_URL}login.php"><b>Login to see registered users</b></a>
                    </td>
                </tr>
                <tr>
                    <td>
                        Thanks <br>
                        <b>MediaDrive</b>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <div style="text-align:center;font-size:12px;color:#b2b2b5;margin-top:20px">
            <p> © Copyright 2021. Photography <br></p><div class="yj6qo"></div><div class="adL">
        </div></div><div class="adL">
    </div></div><div`;

exports.SEND_OTP = `
  <!DOCTYPE html>
    <title>Forgot Password</title>
    <html>
       <head> 
          <meta charset='UTF-8'>
       </head>
       <body style="margin:0px; padding:20px; background-color: #198ae3;color:#212529;font-family:Verdana,Geneva,sans-serif;">
          <div align="center">
             <div style="background-color:rgb(255,255,255);max-width:660px;padding:0px;">
                <div>
                   <table style="width:100%;">
                      <tbody>
                         <tr>
                            <td style="padding:30px;width:100%;" valign="top">
                               <div style="font-size:14px;font-weight:normal;line-height:1.8em;text-align:left">
                                  <h3>Please enter the below mentioned OTP for reset password!</h3>                     
                                   Email  : #email# <br>
                                   OTP  : #otp# </p>
                               </div>
                               <br>
                               <br>
                                <p>Best Regards,<br>
                                Dropboxed Team </p>
                               <hr>                    
                            </td>
                         </tr>
                      </tbody>
                   </table>
                </div>
             </div>
          </div>
       </body>
    </html>`;