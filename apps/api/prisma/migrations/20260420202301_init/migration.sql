-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'REVIEWER', 'SPEAKER', 'ATTENDEE');

-- CreateEnum
CREATE TYPE "DelegateCategory" AS ENUM ('INTERNATIONAL', 'NATIONAL', 'SAARC', 'RESIDENT_MO_PARAMEDICS');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'VERIFIED', 'REJECTED', 'REFUNDED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('BANK_TRANSFER', 'QR_PAYMENT');

-- CreateEnum
CREATE TYPE "AbstractStatus" AS ENUM ('DRAFT', 'SUBMITTED', 'UNDER_REVIEW', 'REVISION_REQUIRED', 'ACCEPTED', 'REJECTED', 'WITHDRAWN', 'SCHEDULED');

-- CreateEnum
CREATE TYPE "PresentationType" AS ENUM ('ORAL', 'POSTER', 'EPOSTER', 'EITHER');

-- CreateEnum
CREATE TYPE "SessionType" AS ENUM ('KEYNOTE', 'PANEL', 'WORKSHOP', 'ORAL_PRESENTATION', 'EPOSTER_SESSION', 'BREAK', 'NETWORKING');

-- CreateEnum
CREATE TYPE "InvitationStatus" AS ENUM ('PENDING', 'INVITED', 'CONFIRMED', 'DECLINED');

-- CreateEnum
CREATE TYPE "InquiryType" AS ENUM ('REGISTRATION', 'ABSTRACT', 'GENERAL');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'ATTENDEE',
    "passwordHash" TEXT,
    "googleId" TEXT,
    "phone" TEXT,
    "country" TEXT,
    "institution" TEXT,
    "specialty" TEXT,
    "designation" TEXT,
    "isEmailVerified" BOOLEAN NOT NULL DEFAULT false,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RefreshToken" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "tokenHash" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "revokedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RefreshToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Registration" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "registrationCode" TEXT NOT NULL,
    "category" "DelegateCategory" NOT NULL,
    "workshopSelected" BOOLEAN NOT NULL DEFAULT false,
    "amount" DECIMAL(10,2) NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "paymentStatus" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "qrCodeData" TEXT,
    "badgeUrl" TEXT,
    "certificateUrl" TEXT,
    "invitationLetterUrl" TEXT,
    "invitationLetterRequested" BOOLEAN NOT NULL DEFAULT false,
    "notes" TEXT,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Registration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" TEXT NOT NULL,
    "registrationId" TEXT NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "method" "PaymentMethod" NOT NULL,
    "proofUrl" TEXT,
    "status" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "verifiedAt" TIMESTAMP(3),
    "verifiedById" TEXT,
    "adminNotes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Abstract" (
    "id" TEXT NOT NULL,
    "submitterId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "wordCount" INTEGER NOT NULL,
    "topic" TEXT NOT NULL,
    "presentationType" "PresentationType" NOT NULL,
    "status" "AbstractStatus" NOT NULL DEFAULT 'DRAFT',
    "fileUrl" TEXT,
    "coAuthors" JSONB NOT NULL,
    "reviewerComments" TEXT,
    "finalScore" DOUBLE PRECISION,
    "sessionId" TEXT,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Abstract_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" TEXT NOT NULL,
    "abstractId" TEXT NOT NULL,
    "reviewerId" TEXT NOT NULL,
    "originality" INTEGER NOT NULL,
    "scientificMerit" INTEGER NOT NULL,
    "clinicalRelevance" INTEGER NOT NULL,
    "presentationQuality" INTEGER NOT NULL,
    "overallScore" DOUBLE PRECISION NOT NULL,
    "comments" TEXT,
    "recommendation" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Speaker" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "institution" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "photoUrl" TEXT,
    "email" TEXT,
    "linkedInUrl" TEXT,
    "invitationStatus" "InvitationStatus" NOT NULL DEFAULT 'PENDING',
    "updateToken" TEXT,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Speaker_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "hall" TEXT NOT NULL,
    "day" INTEGER NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "type" "SessionType" NOT NULL,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "speakerId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SavedSession" (
    "userId" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SavedSession_pkey" PRIMARY KEY ("userId","sessionId")
);

-- CreateTable
CREATE TABLE "NewsPost" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "excerpt" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "coverImageUrl" TEXT,
    "category" TEXT NOT NULL,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NewsPost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmailSubscriber" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EmailSubscriber_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContactInquiry" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "inquiryType" "InquiryType" NOT NULL,
    "message" TEXT NOT NULL,
    "isResolved" BOOLEAN NOT NULL DEFAULT false,
    "resolvedBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ContactInquiry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuditLog" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "entityType" TEXT NOT NULL,
    "entityId" TEXT NOT NULL,
    "changes" JSONB,
    "ipAddress" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContentBlock" (
    "id" TEXT NOT NULL,
    "section" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "updatedBy" TEXT,

    CONSTRAINT "ContentBlock_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_googleId_key" ON "User"("googleId");

-- CreateIndex
CREATE UNIQUE INDEX "RefreshToken_tokenHash_key" ON "RefreshToken"("tokenHash");

-- CreateIndex
CREATE INDEX "RefreshToken_userId_idx" ON "RefreshToken"("userId");

-- CreateIndex
CREATE INDEX "RefreshToken_tokenHash_idx" ON "RefreshToken"("tokenHash");

-- CreateIndex
CREATE UNIQUE INDEX "Registration_registrationCode_key" ON "Registration"("registrationCode");

-- CreateIndex
CREATE INDEX "Registration_userId_idx" ON "Registration"("userId");

-- CreateIndex
CREATE INDEX "Registration_paymentStatus_idx" ON "Registration"("paymentStatus");

-- CreateIndex
CREATE INDEX "Payment_registrationId_idx" ON "Payment"("registrationId");

-- CreateIndex
CREATE INDEX "Payment_status_idx" ON "Payment"("status");

-- CreateIndex
CREATE INDEX "Abstract_submitterId_idx" ON "Abstract"("submitterId");

-- CreateIndex
CREATE INDEX "Abstract_status_idx" ON "Abstract"("status");

-- CreateIndex
CREATE UNIQUE INDEX "Review_abstractId_reviewerId_key" ON "Review"("abstractId", "reviewerId");

-- CreateIndex
CREATE UNIQUE INDEX "Speaker_updateToken_key" ON "Speaker"("updateToken");

-- CreateIndex
CREATE INDEX "Session_day_hall_idx" ON "Session"("day", "hall");

-- CreateIndex
CREATE UNIQUE INDEX "NewsPost_slug_key" ON "NewsPost"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "EmailSubscriber_email_key" ON "EmailSubscriber"("email");

-- CreateIndex
CREATE INDEX "AuditLog_userId_idx" ON "AuditLog"("userId");

-- CreateIndex
CREATE INDEX "AuditLog_createdAt_idx" ON "AuditLog"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "ContentBlock_section_key" ON "ContentBlock"("section");

-- AddForeignKey
ALTER TABLE "RefreshToken" ADD CONSTRAINT "RefreshToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Registration" ADD CONSTRAINT "Registration_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_registrationId_fkey" FOREIGN KEY ("registrationId") REFERENCES "Registration"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_verifiedById_fkey" FOREIGN KEY ("verifiedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Abstract" ADD CONSTRAINT "Abstract_submitterId_fkey" FOREIGN KEY ("submitterId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Abstract" ADD CONSTRAINT "Abstract_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_abstractId_fkey" FOREIGN KEY ("abstractId") REFERENCES "Abstract"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_reviewerId_fkey" FOREIGN KEY ("reviewerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_speakerId_fkey" FOREIGN KEY ("speakerId") REFERENCES "Speaker"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedSession" ADD CONSTRAINT "SavedSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedSession" ADD CONSTRAINT "SavedSession_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
