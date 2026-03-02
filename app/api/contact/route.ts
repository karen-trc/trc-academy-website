import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { verifyRecaptchaToken } from '@/src/lib/recaptcha';

// Admin email stored as base64 to prevent scraping from source code.
// Decoded value: karen@tabularasacoaching.com
const ENCODED_ADMIN = 'a2FyZW5AdGFidWxhcmFzYWNvYWNoaW5nLmNvbQ==';

function decodeAdmin(): string {
  return Buffer.from(ENCODED_ADMIN, 'base64').toString('utf-8');
}

// Strip all HTML tags and trim whitespace to prevent injection attacks.
function sanitize(value: unknown): string {
  if (typeof value !== 'string') return '';
  return value.replace(/<[^>]*>/g, '').trim();
}

// Initialize Resend with API key (you'll need to add this to your .env file)
// Use a placeholder key if not set to avoid build errors
const resend = new Resend(process.env.RESEND_API_KEY || 're_placeholder_key');

export async function POST(request: Request) {
  // Check if API key is properly configured
  if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY === 're_YOUR_RESEND_API_KEY') {
    return NextResponse.json(
      { error: 'Email service is not configured. Please contact us directly at karen@tabularasacoaching.com or call (610) 228-4145' },
      { status: 503 }
    );
  }

  try {
    const { name, email, phone, interest, message, recaptchaToken, website } = await request.json();

    // Honeypot check — bots fill hidden fields, real users do not.
    // Return a fake success so bots don't know they were blocked.
    if (website) {
      return NextResponse.json(
        { success: true, message: 'Your message has been sent successfully. Karen will respond within 24 hours.' },
        { status: 200 }
      );
    }

    // Sanitize all user-supplied inputs
    const safeName     = sanitize(name);
    const safeEmail    = sanitize(email);
    const safePhone    = sanitize(phone);
    const safeInterest = sanitize(interest);
    const safeMessage  = sanitize(message);

    // Validate required fields
    if (!safeName || !safeEmail || !safeInterest) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(safeEmail)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    // Verify reCAPTCHA token if provided
    if (recaptchaToken) {
      const recaptchaResult = await verifyRecaptchaToken(recaptchaToken, 'submit_contact_form');
      if (!recaptchaResult.success) {
        console.warn('reCAPTCHA verification failed:', recaptchaResult.error);
        return NextResponse.json(
          { error: recaptchaResult.error || 'Security verification failed. Please try again.' },
          { status: 403 }
        );
      }
      console.log(`reCAPTCHA verified successfully (score: ${recaptchaResult.score})`);
    }

    const adminRecipient = process.env.CONTACT_EMAIL || decodeAdmin();

    // Email to Karen
    const adminEmailHtml = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${safeName}</p>
      <p><strong>Email:</strong> ${safeEmail}</p>
      <p><strong>Phone:</strong> ${safePhone || 'Not provided'}</p>
      <p><strong>Interest:</strong> ${safeInterest}</p>
      <p><strong>Message:</strong></p>
      <p>${safeMessage || 'No message provided'}</p>
      <hr>
      <p><small>Submitted on ${new Date().toLocaleString()}</small></p>
    `;

    // Send email to Karen
    // Note: Using onboarding@resend.dev as sender until tabularasacoaching.com is verified
    const adminEmail = await resend.emails.send({
      from: 'TRC Contact Form <onboarding@resend.dev>',
      to: adminRecipient,
      subject: `New Contact Form Submission from ${safeName}`,
      html: adminEmailHtml,
      replyTo: safeEmail,
    });

    // Check if admin email was sent successfully
    if (adminEmail.error) {
      console.error('Email send error:', JSON.stringify(adminEmail.error, null, 2));
      console.error('Admin email result:', adminEmail);
      return NextResponse.json(
        { error: 'Failed to send email notification', details: adminEmail.error?.message || 'Unknown error' },
        { status: 500 }
      );
    }

    // Send confirmation email to customer
    const customerEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
        <div style="background: linear-gradient(135deg, #1e3a5f, #2c5282); padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 24px;">TRC Training Academy</h1>
        </div>
        <div style="padding: 30px; background: #ffffff;">
          <h2 style="color: #1e3a5f;">Thank You, ${safeName}!</h2>
          <p>We have received your inquiry regarding <strong>${safeInterest}</strong> and appreciate your interest in TRC Training Academy.</p>
          <p>Karen will personally review your message and get back to you <strong>within 24 hours</strong>.</p>
          <div style="background: #f7fafc; border-left: 4px solid #d69e2e; padding: 15px; margin: 20px 0; border-radius: 4px;">
            <p style="margin: 0; font-weight: bold; color: #1e3a5f;">In the meantime, feel free to reach out directly:</p>
            <p style="margin: 8px 0 0 0;">Email: karen@tabularasacoaching.com<br>Phone: (610) 228-4145</p>
          </div>
          <p>We look forward to connecting with you!</p>
          <p style="margin-top: 20px;">Warm regards,<br><strong>TRC Training Academy</strong></p>
        </div>
        <div style="background: #f7fafc; padding: 15px; text-align: center; font-size: 12px; color: #718096;">
          <p style="margin: 0;">TRC Training Academy | trctrainingacademy.com</p>
        </div>
      </div>
    `;

    const customerEmail = await resend.emails.send({
      from: 'TRC Training Academy <onboarding@resend.dev>',
      to: safeEmail,
      subject: 'Thank You for Contacting TRC Training Academy',
      html: customerEmailHtml,
    });

    if (customerEmail.error) {
      console.warn('Customer confirmation email failed:', customerEmail.error);
    }

    console.log(`Contact form submission from ${safeName} (${safeEmail}) - Admin notified, confirmation sent`);

    return NextResponse.json(
      {
        success: true,
        message: 'Your message has been sent successfully. Karen will respond within 24 hours.'
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'An error occurred while processing your request' },
      { status: 500 }
    );
  }
}
