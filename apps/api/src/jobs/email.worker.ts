import { Worker } from 'bullmq';
import Redis from 'ioredis';
import type { EmailJobData } from './queue';

const connection = new Redis(process.env.REDIS_URL || 'redis://localhost:6379', {
  maxRetriesPerRequest: null,
});

/**
 * Email worker — processes jobs from the 'email' queue.
 * Uses Resend API in production, logs in development.
 */
const emailWorker = new Worker<EmailJobData>(
  'email',
  async (job) => {
    const { template, to, subject, data } = job.data;

    console.log(`📧 Processing email job ${job.id}: ${template} → ${to}`);

    if (process.env.NODE_ENV === 'production' && process.env.RESEND_API_KEY) {
      // Production: send via Resend
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: process.env.EMAIL_FROM || 'noreply@njnc2028.com',
          to,
          subject,
          // Template rendering would go here — for now send plain text
          text: `Email template: ${template}\nData: ${JSON.stringify(data)}`,
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`Resend API error: ${error}`);
      }

      console.log(`✅ Email sent: ${template} → ${to}`);
    } else {
      // Development: use MailHog (SMTP on port 1025)
      // In dev, we'd use nodemailer with MailHog
      console.log(`📬 [DEV] Email queued: ${template} → ${to} | Subject: ${subject}`);
      console.log(`   Data: ${JSON.stringify(data)}`);
    }
  },
  {
    connection,
    concurrency: 5,
    limiter: {
      max: 10,
      duration: 1000, // 10 emails per second max
    },
  }
);

emailWorker.on('completed', (job) => {
  console.log(`✅ Email job ${job.id} completed`);
});

emailWorker.on('failed', (job, err) => {
  console.error(`❌ Email job ${job?.id} failed:`, err.message);
});

export default emailWorker;
