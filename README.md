# My_Portfolio

Software Developer skilled in Python (Django), JavaScript, HTML, CSS, React and PostgreSQL. Interested in AI, Web &amp; Mobile App Development

# Cyprien HAGENIMANA RWENDERE - Portfolio

This is a personal portfolio website showcasing skills, experience, and contact information.

## Setting Up Email Contact Form

To make the contact form functional and receive emails when someone submits the form, follow these steps:

### 1. Create an EmailJS Account

1. Go to [EmailJS.com](https://www.emailjs.com/) and sign up for a free account.
2. The free plan allows 200 emails per month, which should be sufficient for a personal portfolio.

### 2. Set Up Email Service

1. Once logged in, go to the "Email Services" tab.
2. Click "Add New Service" and select your email provider (Gmail, Outlook, etc.)
3. Follow the instructions to connect your email account.
4. Note down the "Service ID" for your email service.

### 3. Create an Email Template

1. Go to the "Email Templates" tab.
2. Click "Create New Template".
3. Design your email template with the following variables:
   - `{{from_name}}` - Sender's name
   - `{{from_email}}` - Sender's email
   - `{{subject}}` - Message subject
   - `{{message}}` - The message content
4. Save the template and note down the "Template ID".

### 4. Get Your Public Key

1. Go to the "Account" tab.
2. Find your "Public Key" under the API Keys section.

### 5. Update the JavaScript Code

1. Open the `js/script.js` file.
2. Replace `YOUR_EMAILJS_PUBLIC_KEY` with your actual public key.
3. In the `emailjs.send()` function:
   - Replace `'default_service'` with your Email Service ID.
   - Replace `'template_id'` with your Email Template ID.

Example:

```javascript
// Initialize EmailJS
function initEmailJS() {
  emailjs.init("your_actual_public_key");
}

// In the contact form handler:
emailjs.send("your_service_id", "your_template_id", templateParams);
```

### 6. Test the Form

1. Fill out the contact form on your website and submit it.
2. Check your email to verify that you've received the message.
3. If you encounter any issues, check the browser console for error messages.

## Additional Features

- **Modern Responsive Design**: The website is fully responsive and works on all device sizes.
- **Interactive Elements**: Animated skill bars, smooth scrolling, and hover effects.
- **Social Media Integration**: Links to GitHub, LinkedIn, and Twitter profiles.

## Customization

Feel free to customize the colors, fonts, and content to match your personal style. The CSS variables in `css/style.css` make it easy to change the color scheme:

```css
:root {
  --primary-color: #2563eb;
  --secondary-color: #10b981;
  /* other colors... */
}
```
