export type FilmLab = {
  slug: string;
  name: string;
  city: string;
  tagline: string;
  rating: number;
  reviews: number;
  turnaround: string;
  fromPrice: number;
  image: string;
  specialties: string[];
  formats: string[];
  scans: string;
  about: string;
};

export const filmLabs: FilmLab[] = [
  {
    slug: "silverhalide-atelier",
    name: "Silverhalide Atelier",
    city: "Portland, OR",
    tagline: "Hand-dip C-41 & true optical scans",
    rating: 4.9,
    reviews: 412,
    turnaround: "3–4 days",
    fromPrice: 14,
    image: "https://images.unsplash.com/photo-1495707902641-75cac588d2e9?w=1200&h=900&fit=crop&auto=format",
    specialties: ["C-41", "E-6 Slide", "Push/Pull"],
    formats: ["35mm", "120", "220"],
    scans: "Frontier & Noritsu",
    about:
      "A two-person darkroom running dip-and-dunk C-41 by hand. Every roll is dust-blown, sleeved, and scanned on both a Frontier SP-3000 and a Noritsu HS-1800 so you choose the tone you love.",
  },
  {
    slug: "north-loop-film",
    name: "North Loop Film Co.",
    city: "Minneapolis, MN",
    tagline: "Black & white masters since 1988",
    rating: 4.8,
    reviews: 309,
    turnaround: "5–7 days",
    fromPrice: 12,
    image: "https://images.unsplash.com/photo-1524234107056-1c1f48f64ab8?w=1200&h=900&fit=crop&auto=format",
    specialties: ["B&W Dev", "Archival Prints", "Contact Sheets"],
    formats: ["35mm", "120", "4x5"],
    scans: "Epson V850 flatbed",
    about:
      "Traditional silver-gelatin processing in Rodinal, D-76 and HC-110. We hand-print fiber enlargements and archive negatives in acid-free sleeves for the long haul.",
  },
  {
    slug: "goldenhour-collective",
    name: "Goldenhour Collective",
    city: "Austin, TX",
    tagline: "High-res scans for the working pro",
    rating: 4.7,
    reviews: 528,
    turnaround: "2–3 days",
    fromPrice: 18,
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1200&h=900&fit=crop&auto=format",
    specialties: ["C-41", "E-6 Slide", "Drum Scans"],
    formats: ["35mm", "120", "4x5", "8x10"],
    scans: "Hasselblad X5 drum",
    about:
      "A production lab built for editorial and wedding shooters. Rush service, colour-managed drum scans up to 8×10, and same-day proofing delivered to your gallery.",
  },
  {
    slug: "tidewater-darkroom",
    name: "Tidewater Darkroom",
    city: "Savannah, GA",
    tagline: "Slow craft, coastal light",
    rating: 4.9,
    reviews: 187,
    turnaround: "6–8 days",
    fromPrice: 13,
    image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=1200&h=900&fit=crop&auto=format",
    specialties: ["E-6 Slide", "B&W Dev", "Cross Process"],
    formats: ["35mm", "120"],
    scans: "Noritsu HS-1800",
    about:
      "A small-batch lab tucked into a historic district. We favour slow, careful development and cross-processing experiments that lean into warm coastal palettes.",
  },
];

export const services = [
  { name: "Develop & Scan — 35mm", price: 14, unit: "per roll", note: "C-41 dip-and-dunk + standard-res scan" },
  { name: "Develop & Scan — 120", price: 16, unit: "per roll", note: "Medium format, sleeved & scanned" },
  { name: "High-Res Scan Upgrade", price: 9, unit: "per roll", note: "Up to 80MP, colour managed" },
  { name: "Push / Pull Processing", price: 4, unit: "per stop", note: "Compensated development" },
  { name: "Archival Sleeve & Return", price: 6, unit: "per order", note: "Acid-free storage + shipping back" },
];

export type TrackStage = {
  key: string;
  title: string;
  detail: string;
  at: string; // human timestamp, empty if not reached
};

export type Order = {
  id: string;
  lab: string;
  labSlug: string;
  city: string;
  rolls: number;
  film: string;
  services: string[];
  total: number;
  placed: string;
  eta: string;
  status: string;
  tone: string;
  // index of the stage currently in progress (0-based). Stages before are done.
  currentStage: number;
  stages: TrackStage[];
};

const STAGE_TEMPLATE: Omit<TrackStage, "at">[] = [
  { key: "placed", title: "Order placed", detail: "Booking confirmed and payment authorized." },
  { key: "label", title: "Shipping label ready", detail: "Prepaid label emailed — drop your rolls in the post." },
  { key: "received", title: "Film received at lab", detail: "Your rolls arrived and were logged in." },
  { key: "developing", title: "Developing", detail: "Negatives running through the chemistry line." },
  { key: "scanning", title: "Scanning", detail: "High-resolution scans in progress." },
  { key: "qc", title: "Quality check", detail: "Dust removal, colour balance and review." },
  { key: "shipped", title: "Shipped back", detail: "Negatives sleeved and returned to you." },
  { key: "delivered", title: "Delivered", detail: "Scans available and negatives on the way." },
];

// Build a stage list where the first `current` stages carry timestamps.
function buildStages(current: number, times: string[]): TrackStage[] {
  return STAGE_TEMPLATE.map((s, i) => ({ ...s, at: i <= current ? times[i] ?? "" : "" }));
}

export const orders: Order[] = [
  {
    id: "A-2291",
    lab: "Silverhalide Atelier",
    labSlug: "silverhalide-atelier",
    city: "Portland, OR",
    rolls: 3,
    film: "Portra 400",
    services: ["Develop & Scan — 35mm", "High-Res Scan Upgrade"],
    total: 69,
    placed: "Sep 22, 2026",
    eta: "Sep 28, 2026",
    status: "Scanning",
    tone: "text-[var(--color-amber)]",
    currentStage: 4,
    stages: buildStages(4, [
      "Sep 22 · 09:14",
      "Sep 22 · 09:15",
      "Sep 24 · 11:02",
      "Sep 25 · 08:40",
      "Sep 26 · 15:20",
    ]),
  },
  {
    id: "A-2287",
    lab: "Goldenhour Collective",
    labSlug: "goldenhour-collective",
    city: "Austin, TX",
    rolls: 1,
    film: "Ektar 100",
    services: ["Develop & Scan — 120", "Drum Scan"],
    total: 34,
    placed: "Sep 18, 2026",
    eta: "Sep 24, 2026",
    status: "Shipped back",
    tone: "text-[var(--color-sand)]",
    currentStage: 6,
    stages: buildStages(6, [
      "Sep 18 · 14:30",
      "Sep 18 · 14:31",
      "Sep 20 · 10:12",
      "Sep 21 · 09:05",
      "Sep 22 · 13:44",
      "Sep 23 · 16:20",
      "Sep 24 · 08:15",
    ]),
  },
  {
    id: "A-2280",
    lab: "North Loop Film Co.",
    labSlug: "north-loop-film",
    city: "Minneapolis, MN",
    rolls: 5,
    film: "HP5 Plus",
    services: ["Develop & Scan — 35mm"],
    total: 70,
    placed: "Sep 25, 2026",
    eta: "Oct 2, 2026",
    status: "Developing",
    tone: "text-[var(--color-amber)]",
    currentStage: 3,
    stages: buildStages(3, ["Sep 25 · 18:02", "Sep 25 · 18:03", "Sep 27 · 09:30", "Sep 27 · 14:10"]),
  },
  {
    id: "A-2261",
    lab: "Tidewater Darkroom",
    labSlug: "tidewater-darkroom",
    city: "Savannah, GA",
    rolls: 2,
    film: "Provia 100F",
    services: ["Develop & Scan — 35mm", "Archival Sleeve & Return"],
    total: 40,
    placed: "Sep 5, 2026",
    eta: "Sep 13, 2026",
    status: "Delivered",
    tone: "text-[var(--color-sand)]",
    currentStage: 7,
    stages: buildStages(7, [
      "Sep 5 · 11:00",
      "Sep 5 · 11:01",
      "Sep 8 · 09:20",
      "Sep 9 · 10:15",
      "Sep 10 · 14:40",
      "Sep 11 · 16:05",
      "Sep 12 · 09:30",
      "Sep 13 · 12:48",
    ]),
  },
];

export const steps = [
  { n: "01", title: "Pick your lab", body: "Browse vetted labs by process, format and turnaround." },
  { n: "02", title: "Book a service", body: "Choose develop, scan and finishing options for each roll." },
  { n: "03", title: "Mail your film", body: "Print a prepaid label and drop your rolls in the post." },
  { n: "04", title: "Download scans", body: "Get an email the moment your gallery is ready to grab." },
];
