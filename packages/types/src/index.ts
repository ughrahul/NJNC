// ─── User ────────────────────────────────────────────────────

export type Role = "ADMIN" | "REVIEWER" | "SPEAKER" | "ATTENDEE";

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  phone?: string | null;
  country?: string | null;
  institution?: string | null;
  specialty?: string | null;
  designation?: string | null;
  isEmailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

// ─── Registration ────────────────────────────────────────────

export type DelegateCategory =
  | "INTERNATIONAL"
  | "NATIONAL"
  | "SAARC"
  | "RESIDENT_MO_PARAMEDICS";

export type PaymentStatus =
  | "PENDING"
  | "VERIFIED"
  | "REJECTED"
  | "REFUNDED"
  | "CANCELLED";

export type PaymentMethod = "BANK_TRANSFER" | "QR_PAYMENT";

export interface Registration {
  id: string;
  userId: string;
  registrationCode: string;
  category: DelegateCategory;
  workshopSelected: boolean;
  amount: string; // Decimal as string
  currency: string;
  paymentStatus: PaymentStatus;
  qrCodeData?: string | null;
  badgeUrl?: string | null;
  certificateUrl?: string | null;
  invitationLetterUrl?: string | null;
  invitationLetterRequested: boolean;
  notes?: string | null;
  createdAt: string;
  updatedAt: string;
}

// ─── Payment ─────────────────────────────────────────────────

export interface Payment {
  id: string;
  registrationId: string;
  amount: string;
  currency: string;
  method: PaymentMethod;
  proofUrl?: string | null;
  status: PaymentStatus;
  verifiedAt?: string | null;
  verifiedById?: string | null;
  adminNotes?: string | null;
  createdAt: string;
  updatedAt: string;
}

// ─── Abstract ────────────────────────────────────────────────

export type AbstractStatus =
  | "DRAFT"
  | "SUBMITTED"
  | "UNDER_REVIEW"
  | "REVISION_REQUIRED"
  | "ACCEPTED"
  | "REJECTED"
  | "WITHDRAWN"
  | "SCHEDULED";

export type PresentationType = "ORAL" | "POSTER" | "EPOSTER" | "EITHER";

export interface CoAuthor {
  name: string;
  institution: string;
  email: string;
}

export interface Abstract {
  id: string;
  submitterId: string;
  title: string;
  body: string;
  wordCount: number;
  topic: string;
  presentationType: PresentationType;
  status: AbstractStatus;
  fileUrl?: string | null;
  coAuthors: CoAuthor[];
  reviewerComments?: string | null;
  finalScore?: number | null;
  sessionId?: string | null;
  createdAt: string;
  updatedAt: string;
}

// ─── Review ──────────────────────────────────────────────────

export type ReviewRecommendation = "ACCEPT" | "REJECT" | "REVISE";

export interface Review {
  id: string;
  abstractId: string;
  reviewerId: string;
  originality: number;
  scientificMerit: number;
  clinicalRelevance: number;
  presentationQuality: number;
  overallScore: number;
  comments?: string | null;
  recommendation: ReviewRecommendation;
  createdAt: string;
}

// ─── Speaker ─────────────────────────────────────────────────

export type InvitationStatus = "PENDING" | "INVITED" | "CONFIRMED" | "DECLINED";

export interface Speaker {
  id: string;
  name: string;
  title: string;
  institution: string;
  country: string;
  bio: string;
  photoUrl?: string | null;
  email?: string | null;
  linkedInUrl?: string | null;
  invitationStatus: InvitationStatus;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

// ─── Session / Program ──────────────────────────────────────

export type SessionType =
  | "KEYNOTE"
  | "PANEL"
  | "WORKSHOP"
  | "ORAL_PRESENTATION"
  | "EPOSTER_SESSION"
  | "BREAK"
  | "NETWORKING";

export interface Session {
  id: string;
  title: string;
  description?: string | null;
  hall: string;
  day: number;
  startTime: string;
  endTime: string;
  type: SessionType;
  isPublished: boolean;
  speakerId?: string | null;
  createdAt: string;
  updatedAt: string;
}

// ─── News ────────────────────────────────────────────────────

export interface NewsPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  coverImageUrl?: string | null;
  category: string;
  isPublished: boolean;
  publishedAt?: string | null;
  createdAt: string;
  updatedAt: string;
}

// ─── Contact Inquiry ─────────────────────────────────────────

export type InquiryType = "REGISTRATION" | "ABSTRACT" | "GENERAL";

export interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  inquiryType: InquiryType;
  message: string;
  isResolved: boolean;
  resolvedBy?: string | null;
  createdAt: string;
  updatedAt: string;
}

// ─── API Response Envelope ──────────────────────────────────

export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
  meta?: PaginationMeta;
}

export interface PaginationMeta {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
}

export interface ApiErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    fields?: Record<string, string>;
  };
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;
