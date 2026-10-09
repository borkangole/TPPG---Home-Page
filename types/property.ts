// Shapes of the public-safe views. Adjust column names to match the Portal's actual schema.

export type PropertyType = "Condo" | "House and Lot" | "Lot";
export type SellingStatus = "RFO" | "Pre-selling";

export type PublicProperty = {
  id: string;
  slug: string;
  name: string;
  developer_name: string;
  developer_logo_url: string | null;
  location: string;
  property_type: PropertyType;
  selling_status: SellingStatus;
  image_url: string | null;
  latitude: number | null;
  longitude: number | null;
  starting_tcp: number | null;
  available_units: number;
};

export type PublicUnit = {
  id: string;
  property_id: string;
  unit_name: string;
  tcp: number;
  reservation_fee: number | null;
  full_downpayment: number | null;
  downpayment_terms: number | null;
  monthly_dp: number | null;
  bedrooms: string | null; // includes "Studio"
  sqm: number | null;
  lot_type: string | null;
  furnishing: string | null;
  construction_status: "RFO" | "Under Construction" | "Pre-selling";
  est_finish_date: string | null;
};

export type InquiryInput = {
  name: string;
  mobile: string;
  email?: string;
  message?: string;
  property_id?: string;
  location?: string;
  budget?: string;
  source?: string; // e.g. "property_page", "contact_page", "find_my_property"
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
};
