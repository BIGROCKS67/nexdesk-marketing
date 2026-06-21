export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  rating: number;
  quote: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "James Whitfield",
    role: "Managing Director",
    company: "Whitfield Property Group",
    rating: 5,
    quote:
      "NexDesk replaced a patchwork of spreadsheets and WhatsApp threads with a CRM our agents actually use. Pipeline visibility went from zero to real-time overnight.",
  },
  {
    id: "2",
    name: "Sarah Al-Mansoori",
    role: "Head of Operations",
    company: "Gulf Talent Partners",
    rating: 5,
    quote:
      "The recruitment platform they built handles our entire desk — candidates, clients, and placements — without the bloat of enterprise software we never needed.",
  },
  {
    id: "3",
    name: "David Chen",
    role: "CFO",
    company: "Meridian Advisory",
    rating: 5,
    quote:
      "Our finance dashboard finally gives leadership one view of invoicing, subscriptions, and cash flow. The team stopped exporting CSVs every Monday.",
  },
  {
    id: "4",
    name: "Emma Richardson",
    role: "HR Director",
    company: "Collective Studios",
    rating: 5,
    quote:
      "Leave requests, documents, and policies in one portal — our HR inbox volume dropped significantly within the first month of launch.",
  },
  {
    id: "5",
    name: "Marcus Okonkwo",
    role: "Founder",
    company: "BuildRight Contracting",
    rating: 5,
    quote:
      "The website NexDesk built for us looks premium and converts. Quote requests doubled compared to our old template site.",
  },
  {
    id: "6",
    name: "Helen Park",
    role: "CEO",
    company: "Ventura Legal",
    rating: 5,
    quote:
      "Their client portal let us show matter progress, documents, and invoices in one branded space. Clients notice the difference immediately.",
  },
];
