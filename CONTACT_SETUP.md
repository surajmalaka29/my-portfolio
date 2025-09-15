# Contact Form Setup Guide

This contact form uses EmailJS to send emails directly from the client-side without needing a backend server.

## Quick Setup (5 minutes)

### 1. Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account (allows 200 emails/month)

### 2. Set up Email Service

1. Go to **Email Services** tab
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, Yahoo, etc.)
4. Follow the setup instructions
5. Note your **Service ID** (e.g., `service_xyz123`)

### 3. Create Email Template

1. Go to **Email Templates** tab
2. Click **Create New Template**
3. Use this template content:

**Subject:**

```
New Contact Form Message: {{subject}}
```

**Body:**

```
Hello Malaka,

You have received a new message from your portfolio website.

Name: {{from_name}}
Email: {{from_email}}
Subject: {{subject}}

Message:
{{message}}

Sent at: {{timestamp}}

---
This message was sent from your portfolio contact form.
Reply directly to this email to respond to {{from_name}}.
```

4. Save and note your **Template ID** (e.g., `template_abc456`)

### 4. Get Public Key

1. Go to **Integration** tab
2. Copy your **Public Key** (e.g., `user_xyz789abc`)

### 5. Update Configuration

1. Open `js/email-config.js`
2. Replace the placeholder values:

```javascript
const EMAIL_CONFIG = {
  PUBLIC_KEY: "user_xyz789abc", // Your Public Key
  SERVICE_ID: "service_xyz123", // Your Service ID
  TEMPLATE_ID: "template_abc456", // Your Template ID
  // ... rest of config
};
```

### 6. Test the Form

1. Open your website
2. Fill out the contact form
3. Submit and check your email
4. Check browser console for any errors

## Troubleshooting

### Form shows "Opening email client" instead of sending

- Check that `email-config.js` is loaded correctly
- Verify all three IDs are correctly set (not placeholder values)
- Check browser console for error messages

### Emails not arriving

- Check spam/junk folder
- Verify template variables match exactly
- Test with EmailJS dashboard first
- Check monthly email quota (200 for free accounts)

### SSL/HTTPS Issues

- EmailJS requires HTTPS in production
- Use `http-server` or similar for local testing
- GitHub Pages, Netlify, Vercel work great for hosting

## Features Included

✅ **Real-time validation** - Instant feedback as users type  
✅ **Loading states** - Visual feedback during submission  
✅ **Fallback support** - Opens email client if EmailJS fails  
✅ **Responsive design** - Works on all devices  
✅ **Spam protection** - EmailJS includes basic protection  
✅ **Error handling** - Graceful failure with helpful messages  
✅ **Analytics ready** - Google Analytics event tracking included

## Advanced Configuration

### Custom Email Template Variables

Add more variables to capture additional information:

```javascript
const templateParams = {
  from_name: name,
  from_email: email,
  subject: subject,
  message: message,
  to_name: "Malaka Perera",
  reply_to: email,
  timestamp: new Date().toISOString(),
  page_url: window.location.href, // Which page sent the message
  user_agent: navigator.userAgent, // User's browser info
};
```

### Multiple Contact Forms

If you have multiple contact forms, create different template IDs and specify them in the EmailJS send call.

### Auto-Reply Setup

Create a second EmailJS template to send automatic replies to users confirming their message was received.

## Production Checklist

- [ ] EmailJS account created and verified
- [ ] Email service connected and tested
- [ ] Template created with correct variables
- [ ] Configuration file updated with real credentials
- [ ] Contact form tested successfully
- [ ] Website deployed with HTTPS
- [ ] Backup email address set in fallback

## Support

If you need help:

1. Check EmailJS documentation: [https://www.emailjs.com/docs/](https://www.emailjs.com/docs/)
2. Test in EmailJS dashboard first
3. Check browser console for error messages
4. Verify all credentials are correct

The contact form will work immediately once configured - no backend server required!
