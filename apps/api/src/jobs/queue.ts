import { Queue } from 'bullmq';
import Redis from 'ioredis';

const connection = new Redis(process.env.REDIS_URL || 'redis://localhost:6379', {
  maxRetriesPerRequest: null,
});

export const emailQueue = new Queue('email', {
  connection,
  defaultJobOptions: {
    removeOnComplete: 100,
    removeOnFail: 500,
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 2000,
    },
  },
});

export const pdfQueue = new Queue('pdf', {
  connection,
  defaultJobOptions: {
    removeOnComplete: 50,
    removeOnFail: 200,
    attempts: 2,
    backoff: {
      type: 'exponential',
      delay: 3000,
    },
  },
});

export const whatsappQueue = new Queue('whatsapp', {
  connection,
  defaultJobOptions: {
    removeOnComplete: 100,
    removeOnFail: 500,
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 5000,
    },
  },
});

export type EmailJobData = {
  template: string;
  to: string;
  subject: string;
  data: Record<string, unknown>;
};

export type PdfJobData = {
  type: 'badge' | 'certificate' | 'invitation-letter';
  registrationId: string;
  data: Record<string, unknown>;
};

export type WhatsAppJobData = {
  phoneNumber: string;
  templateName: string;
  parameters: string[];
};
