/**
 * TPPG contact details used across the site.
 *
 * PLACEHOLDERS: phone, email, Messenger link, office address, and hours are mockup values.
 * Replace them with TPPG's official details before launch. The office pin is set to
 * Megaworld's Iloilo Business Park (Mandurriao) for now.
 */
export const CONTACT = {
  phone: { display: "+63 900 000 0000", href: "tel:+639000000000" },
  email: { display: "inquiries@example.com", href: "mailto:inquiries@example.com" },
  messenger: { label: "Messenger", href: "https://m.me/" },
  office: {
    name: "The Premier Property Group",
    building: "Iloilo Business Park",
    street: "Megaworld Boulevard, Mandurriao",
    city: "Iloilo City, 5000 Iloilo",
    lat: 10.71472,
    lng: 122.54472,
    hours: [
      { days: "Monday – Saturday", time: "9:00 AM – 6:00 PM" },
      { days: "Sunday", time: "By appointment" },
    ],
  },
} as const;

const { lat, lng } = CONTACT.office;
export const OFFICE_DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
export const OFFICE_MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
export const OFFICE_ADDRESS = `${CONTACT.office.building}, ${CONTACT.office.street}, ${CONTACT.office.city}`;

export const CONTACT_FAQ = [
  {
    q: "How do I inquire about a property?",
    a: "Fill out the inquiry form on this page, or open any listing and tap “Inquire about this property.” Include the property or area you’re interested in so we can match you with the right property specialist.",
  },
  {
    q: "Can I schedule a property viewing?",
    a: "Yes. Tell us which property you’d like to see and your preferred dates, and a property specialist will arrange the site visit or model unit tour with the developer.",
  },
  {
    q: "Can you help me find a property within my budget?",
    a: "Yes. Share your budget range and preferred location, and we’ll shortlist options and walk you through the total contract price, reservation fee, downpayment, and monthly terms.",
  },
  {
    q: "Do you offer pre-selling and ready-for-occupancy properties?",
    a: "Yes. We have both pre-selling and ready-for-occupancy (RFO) projects. You can filter by selling status on the Properties page.",
  },
  {
    q: "Which areas do you cover?",
    a: "Most of our projects are in Iloilo, with select developments in Cebu and Palawan.",
  },
];
