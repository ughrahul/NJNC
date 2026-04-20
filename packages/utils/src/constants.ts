// ─── Conference Constants ────────────────────────────────────

export const CONFERENCE = {
  name: 'Nepal Japan Neurological Conference',
  shortName: 'NJNC 2028',
  year: 2028,
  dates: {
    start: new Date('2028-09-18T00:00:00Z'),
    end: new Date('2028-09-19T23:59:59Z'),
  },
  venue: {
    name: 'Hotel Radisson Blu',
    city: 'Kathmandu',
    country: 'Nepal',
    address: 'Lazimpat, Kathmandu 44600, Nepal',
    mapUrl: 'https://maps.google.com/?q=Radisson+Hotel+Kathmandu',
  },
  secretary: {
    name: 'Ms. Medhawee Nepal',
    whatsapp: '9779801203457',
    phone: '+977-9801203457',
  },
  bankDetails: {
    accountHolder: 'Annapurna Neurological Institute And Allied Science Pvt.Ltd',
    accountNumber: '50215027772',
    swiftCode: 'SIDDNPKAXXX',
    swiftCodeAlt: 'SIDDNPKA',
    bankName: 'Siddhartha Bank Ltd.',
    location: 'Kathmandu, Anamnagar',
  },
  halls: ['Hall A', 'Hall B', 'Workshop Room'] as const,
  days: [1, 2] as const,
} as const;

// ─── Delegate Categories ─────────────────────────────────────

export const DELEGATE_CATEGORIES = [
  { value: 'INTERNATIONAL', label: 'International' },
  { value: 'NATIONAL', label: 'National' },
  { value: 'SAARC', label: 'SAARC' },
  { value: 'RESIDENT_MO_PARAMEDICS', label: 'Resident / Medical Officer / Paramedics' },
] as const;

// ─── Abstract Topics ────────────────────────────────────────

export const ABSTRACT_TOPICS = [
  'Epilepsy Surgery',
  'Neuroimaging',
  'Genetics',
  'Pediatric Epilepsy',
  'Neuroimmunology',
  'Stroke',
  'Movement Disorders',
  'Neurocritical Care',
  'Headache Medicine',
  'Neuromuscular Disorders',
  'Neuro-Oncology',
  'Dementia & Cognitive Disorders',
  'Sleep Medicine',
  'Other',
] as const;

// ─── Presentation Types ─────────────────────────────────────

export const PRESENTATION_TYPES = [
  { value: 'ORAL', label: 'Oral Presentation' },
  { value: 'POSTER', label: 'Poster' },
  { value: 'EPOSTER', label: 'E-Poster' },
  { value: 'EITHER', label: 'Either (No Preference)' },
] as const;

// ─── Inquiry Types ──────────────────────────────────────────

export const INQUIRY_TYPES = [
  { value: 'REGISTRATION', label: 'Registration Query' },
  { value: 'ABSTRACT', label: 'Abstract Query' },
  { value: 'GENERAL', label: 'General Inquiry' },
] as const;

// ─── Abstract Constraints ───────────────────────────────────

export const ABSTRACT_CONSTRAINTS = {
  titleMaxWords: 20,
  bodyMaxWords: 300,
  maxCoAuthors: 10,
  maxFileSize: 5 * 1024 * 1024, // 5MB
  allowedFileTypes: ['.pdf', '.doc', '.docx'],
} as const;

// ─── News Categories ────────────────────────────────────────

export const NEWS_CATEGORIES = [
  'Conference Update',
  'Deadline',
  'Speaker Announcement',
  'Venue',
  'General',
] as const;
