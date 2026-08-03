from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.contrib.auth.tokens import default_token_generator
from django.core.mail import send_mail, EmailMultiAlternatives
from django.conf import settings
from smtplib import SMTPException

from decimal import Decimal
from datetime import datetime
import requests
import uuid
import json


class EmailService:

    def __init__(self, email_instance, subject=None, text_message=None, html_message=None):
        self.email_instance = email_instance
        self.subject = subject
        self.text_message = text_message
        self.html_message = html_message

    def send_email(self, subject=None, text_message=None, html_message=None):
        """
        Helper function to send an email with both plain-text and HTML content.
        """
        try:
            # Create the email with both plain-text and HTML versions
            # email = EmailMultiAlternatives(
            #     subject=subject,
            #     body=text_message,
            #     from_email=settings.DEFAULT_FROM_EMAIL,
            #     to=[settings.DEFAULT_FROM_EMAIL],
            #     reply_to=[self.email_instance.email],
            # )
            # email.attach_alternative(html_message, "text/html")
            # email.send(fail_silently=False)
            

            url = 'https://api.brevo.com/v3/smtp/email'
            brevo_api_key = settings.BREVO_SMTP_API_KEY
            headers = {
                "accept": 'application/json',
                "api-key": brevo_api_key,
                "content-type": 'application/json'
            }
            data = {
                "sender": {
                    "name": f"Portfolio Website",
                    "email": settings.EMAIL_HOST_USER
                },
                "to": [
                    {
                        "email": settings.EMAIL_HOST_USER
                    }
                ],
                "replyTo": {
                    "name": f"{self.email_instance.first_name} {self.email_instance.last_name}",
                    "email": self.email_instance.email,
                },
                "subject": subject,
                "htmlContent": html_message,
                "textContent": text_message
            }

            response = requests.post(url=url, json=data, headers=headers)
            response_data = response.json()
            print(f'Email sent to: {settings.EMAIL_HOST_USER}')
            print('RESPONSE', response_data)

            if response_data.get('messageId', None):
                self.email_instance.sent = True
                self.email_instance.save(update_fields=["sent"])

            return True
        except SMTPException as e:
            return False
        except Exception as e:
            return False

    def send_email_notification(self):
        """
        Send email notification from contact form.
        """
        subject = f"[{self.email_instance.service_type or 'General Enquiry'}] New Contact from {self.email_instance.first_name} {self.email_instance.last_name}"
        
        text_message = f"""
        NEW CONTACT FORM SUBMISSION

        You have received a new enquiry from your website.

        ----------------------------------------
        CONTACT DETAILS
        ----------------------------------------
        Name: {self.email_instance.first_name} {self.email_instance.last_name}
        Email: {self.email_instance.email}
        Service: {self.email_instance.service_type or "Not specified"}

        ----------------------------------------
        PROJECT BRIEF
        ----------------------------------------

        {self.email_instance.project_brief}

        ----------------------------------------

        This message was submitted via your website contact form.

        Please reply directly to:
        {self.email_instance.email}
        """

        html_message = f"""
        <!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Contact Form Submission</title>
        </head>

        <body style="margin:0;padding:40px;background:#080808;font-family:Inter,Arial,sans-serif;color:#e8e8e8;">

        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
        <tr>
        <td align="center">

        <table role="presentation"
            cellspacing="0"
            cellpadding="0"
            border="0"
            width="650"
            style="max-width:650px;background:#111111;border:1px solid #222222;border-radius:12px;overflow:hidden;">

            <!-- Header -->
            <tr>
                <td style="padding:35px;background:#161616;border-bottom:1px solid #222222;text-align:center;">
                    <h1 style="margin:0;color:#FF6B35;font-size:28px;font-family:Syne,Arial,sans-serif;font-weight:700;">
                        New Contact Enquiry
                    </h1>

                    <p style="margin:10px 0 0;color:#999999;font-size:15px;line-height:1.6;">
                        A new message has been submitted from your website contact form.
                    </p>
                </td>
            </tr>

            <!-- Contact Details -->
            <tr>
                <td style="padding:35px;">

                    <h2 style="margin:0 0 20px;color:#ffffff;font-size:20px;font-family:Syne,Arial,sans-serif;">
                        Contact Information
                    </h2>

                    <table width="100%" cellpadding="10" cellspacing="0" style="border-collapse:collapse;">

                        <tr>
                            <td width="160" style="color:#666666;border-bottom:1px solid #222222;">
                                First Name
                            </td>

                            <td style="color:#ffffff;border-bottom:1px solid #222222;">
                                {self.email_instance.first_name}
                            </td>
                        </tr>

                        <tr>
                            <td style="color:#666666;border-bottom:1px solid #222222;">
                                Last Name
                            </td>

                            <td style="color:#ffffff;border-bottom:1px solid #222222;">
                                {self.email_instance.last_name}
                            </td>
                        </tr>

                        <tr>
                            <td style="color:#666666;border-bottom:1px solid #222222;">
                                Email
                            </td>

                            <td style="border-bottom:1px solid #222222;">
                                <a href="mailto:{self.email_instance.email}"
                                style="color:#4A9EFF;text-decoration:none;">
                                {self.email_instance.email}
                                </a>
                            </td>
                        </tr>

                        <tr>
                            <td style="color:#666666;">
                                Service
                            </td>

                            <td style="color:#ffffff;">
                                {self.email_instance.service_type or "Not specified"}
                            </td>
                        </tr>

                    </table>

                </td>
            </tr>

            <!-- Project Brief -->
            <tr>
                <td style="padding:0 35px 35px;">

                    <h2 style="margin:0 0 18px;color:#ffffff;font-size:20px;font-family:Syne,Arial,sans-serif;">
                        Project Brief
                    </h2>

                    <div style="
                        background:#161616;
                        border-left:4px solid #FF6B35;
                        padding:24px;
                        color:#e8e8e8;
                        line-height:1.8;
                        border-radius:8px;
                        white-space:pre-wrap;
                    ">
                        {self.email_instance.project_brief}
                    </div>

                </td>
            </tr>

            <!-- CTA -->
            <tr>
                <td style="padding:0 35px 35px;">

                    <a href="mailto:{self.email_instance.email}"
                    style="
                            display:inline-block;
                            background:#FF6B35;
                            color:#ffffff;
                            text-decoration:none;
                            padding:14px 28px;
                            border-radius:8px;
                            font-weight:600;
                    ">
                        Reply to {self.email_instance.first_name}
                    </a>

                </td>
            </tr>

            <!-- Footer -->
            <tr>
                <td style="
                    padding:24px;
                    text-align:center;
                    background:#161616;
                    border-top:1px solid #222222;
                    color:#666666;
                    font-size:13px;
                    line-height:1.7;
                ">

                    This email was automatically generated from your website contact form.

                </td>
            </tr>

        </table>

        </td>
        </tr>
        </table>

        </body>
        </html>
        """

        # Send the welcome email using the helper function
        return self.send_email(subject, text_message, html_message)

