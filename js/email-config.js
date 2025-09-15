/**
 * EmailJS Configuration
 *
 * To set up email functionality:
 * 1. Sign up at https://www.emailjs.com/
 * 2. Create a new service (Gmail, Outlook, etc.)
 * 3. Create an email template
 * 4. Replace the values below with your actual credentials
 * 5. Update the template variables to match your needs
 */

const EMAIL_CONFIG = {
  // Your EmailJS Public Key (from Integration tab)
  PUBLIC_KEY: "4_0XlH0QTjHSfGEqU",

  // Your Service ID (from Email Services tab)
  SERVICE_ID: "service_3l64prc",

  // Your Template ID (from Email Templates tab)
  TEMPLATE_ID: "template_bvfliwf",

  // Email template variables that will be sent
  // Make sure these match your EmailJS template variables
  TEMPLATE_PARAMS: {
    from_name: "{{from_name}}", // Sender's name
    from_email: "{{from_email}}", // Sender's email
    mobile: "{{mobile}}", // Sender's mobile number
    to_name: "Malaka Perera", // Your name
    subject: "{{subject}}", // Email subject
    message: "{{message}}", // Email message
    reply_to: "{{from_email}}", // Reply-to address
    timestamp: "{{timestamp}}", // When the email was sent
  },
};

/**
 * Example EmailJS Template Content:
 *
 * Subject: New Contact Form Message: {{subject}}
 *
 * Body:
 * Hello {{to_name}},
 *
 * You have received a new message from your portfolio website.
 *
 * Name: {{from_name}}
 * Email: {{from_email}}
 * Mobile: {{mobile}}
 * Subject: {{subject}}
 *
 * Message:
 * {{message}}
 *
 * Sent at: {{timestamp}}
 *
 * ---
 * This message was sent from your portfolio contact form.
 */

// Export configuration if using modules
if (typeof module !== "undefined" && module.exports) {
  module.exports = EMAIL_CONFIG;
}
