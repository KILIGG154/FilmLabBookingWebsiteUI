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

export const steps = [
  { n: "01", title: "Pick your lab", body: "Browse vetted labs by process, format and turnaround." },
  { n: "02", title: "Book a service", body: "Choose develop, scan and finishing options for each roll." },
  { n: "03", title: "Mail your film", body: "Print a prepaid label and drop your rolls in the post." },
  { n: "04", title: "Download scans", body: "Get an email the moment your gallery is ready to grab." },
];
