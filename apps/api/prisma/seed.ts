import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // ─── Admin User ────────────────────────────────────────────
  const adminPasswordHash = await bcrypt.hash("Admin@2028", 12);
  const admin = await prisma.user.upsert({
    where: { email: "admin@njnc2028.com" },
    update: {},
    create: {
      email: "admin@njnc2028.com",
      name: "NJNC Admin",
      role: "ADMIN",
      passwordHash: adminPasswordHash,
      isEmailVerified: true,
      country: "Nepal",
      institution: "NJNC Organizing Committee",
    },
  });
  console.log(`  ✅ Admin user: ${admin.email}`);

  // ─── Sample Speakers ─────────────────────────────────────
  const speakers = await Promise.all([
    prisma.speaker.upsert({
      where: { id: "speaker-1" },
      update: {},
      create: {
        id: "speaker-1",
        name: "Dr. Rajesh Sharma",
        title: "Prof.",
        institution: "TU Teaching Hospital",
        country: "Nepal",
        bio: "Professor of Neurology at Tribhuvan University Teaching Hospital with 25 years of experience in epilepsy surgery and neuroimaging.",
        invitationStatus: "CONFIRMED",
        isPublished: true,
      },
    }),
    prisma.speaker.upsert({
      where: { id: "speaker-2" },
      update: {},
      create: {
        id: "speaker-2",
        name: "Dr. Yuki Tanaka",
        title: "Dr.",
        institution: "Tokyo Medical University",
        country: "Japan",
        bio: "Associate Professor specializing in pediatric epilepsy and genetic neurology. Published over 120 peer-reviewed papers.",
        invitationStatus: "CONFIRMED",
        isPublished: true,
      },
    }),
    prisma.speaker.upsert({
      where: { id: "speaker-3" },
      update: {},
      create: {
        id: "speaker-3",
        name: "Dr. Priya Patel",
        title: "Dr.",
        institution: "AIIMS New Delhi",
        country: "India",
        bio: "Senior consultant in neurocritical care and stroke management at All India Institute of Medical Sciences.",
        invitationStatus: "INVITED",
        isPublished: true,
      },
    }),
    prisma.speaker.upsert({
      where: { id: "speaker-4" },
      update: {},
      create: {
        id: "speaker-4",
        name: "Dr. James Mitchell",
        title: "Prof.",
        institution: "Johns Hopkins University",
        country: "USA",
        bio: "Director of the Epilepsy Center at Johns Hopkins. World-renowned expert in epilepsy surgery outcomes research.",
        invitationStatus: "CONFIRMED",
        isPublished: true,
      },
    }),
    prisma.speaker.upsert({
      where: { id: "speaker-5" },
      update: {},
      create: {
        id: "speaker-5",
        name: "Dr. Sunita Basnet",
        title: "Dr.",
        institution: "Annapurna Neurological Institute",
        country: "Nepal",
        bio: "Specialist in movement disorders and deep brain stimulation. Pioneered DBS program in Nepal.",
        invitationStatus: "CONFIRMED",
        isPublished: true,
      },
    }),
  ]);
  console.log(`  ✅ ${speakers.length} speakers created`);

  // ─── Sample News Posts ────────────────────────────────────
  const newsPosts = await Promise.all([
    prisma.newsPost.upsert({
      where: { slug: "registration-now-open" },
      update: {},
      create: {
        title: "Registration Now Open for NJNC 2028",
        slug: "registration-now-open",
        excerpt:
          "We are pleased to announce that registration for NJNC 2028 is now open. Early bird rates available.",
        body: "The Nepal Japan Neurological Conference 2028 organizing committee is delighted to announce that registration is now open for the upcoming conference scheduled for September 18-19, 2028, at Hotel Radisson Blu, Kathmandu, Nepal.",
        category: "Conference Update",
        isPublished: true,
        publishedAt: new Date(),
      },
    }),
    prisma.newsPost.upsert({
      where: { slug: "call-for-abstracts" },
      update: {},
      create: {
        title: "Call for Abstracts — Deadline Extended",
        slug: "call-for-abstracts",
        excerpt:
          "Submit your abstracts for NJNC 2028. The deadline has been extended to give more researchers the opportunity to participate.",
        body: "We are accepting abstract submissions across all neurology subspecialties. Submit your original research for oral or poster presentation.",
        category: "Deadline",
        isPublished: true,
        publishedAt: new Date(),
      },
    }),
    prisma.newsPost.upsert({
      where: { slug: "keynote-speakers-announced" },
      update: {},
      create: {
        title: "Keynote Speakers Announced",
        slug: "keynote-speakers-announced",
        excerpt:
          "We are thrilled to announce our distinguished keynote speakers from Japan, India, USA, and Nepal.",
        body: "The scientific committee has confirmed an outstanding lineup of keynote speakers for NJNC 2028, featuring leading neurologists from across the globe.",
        category: "Speaker Announcement",
        isPublished: true,
        publishedAt: new Date(),
      },
    }),
  ]);
  console.log(`  ✅ ${newsPosts.length} news posts created`);

  // ─── Default Content Blocks ───────────────────────────────
  const contentBlocks = await Promise.all([
    prisma.contentBlock.upsert({
      where: { section: "homepage_hero" },
      update: {},
      create: {
        section: "homepage_hero",
        data: {
          title: "Nepal Japan Neurological Conference 2028",
          subtitle: "Advancing Neurology Together",
          theme: "Bridging Borders in Brain Science",
          dates: "September 18-19, 2028",
          venue: "Hotel Radisson Blu, Kathmandu, Nepal",
        },
      },
    }),
    prisma.contentBlock.upsert({
      where: { section: "about_description" },
      update: {},
      create: {
        section: "about_description",
        data: {
          content:
            "NJNC is an international medical conference organized by the Nepal Epilepsy Society in collaboration with ILAE, bringing together neurologists, researchers, and specialists from across the world.",
        },
      },
    }),
  ]);
  console.log(`  ✅ ${contentBlocks.length} content blocks created`);

  console.log("✅ Seeding complete!");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
