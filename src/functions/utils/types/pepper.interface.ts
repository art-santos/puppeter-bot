import { PAYMENT_STATUS } from "./enums/PAYMENT_STATUS.enum.types";

export interface PepperWebhookPayload {
  currency: string;
  payment_engine: string;
  transaction: string;
  abandonment_id?: string;
  abandonmentId?: string;
  client_id: string;
  payment_type: string;
  status: PAYMENT_STATUS;
  prod: number;
  prod_name: string;
  producer_name: string;
  producer_document: string;
  producer_legal_nature: string;
  purchase_date: string;
  confirmation_purchase_date: string;
  product_support_email: string;
  installments_number: number;
  original_offer_price: string;
  warranty_date: string;
  order_bump: boolean;
  main_transaction: string;
  cms_market_place: string;
  cms_vendor: string;
  off: number;
  price: string;
  full_price: string;
  email: string;
  name: string;
  first_name: string;
  last_name: string;
  doc: string;
  phone_number: string;
  billet_url: string | null;
  billet_barcode: string | null;
  pix_URL?: string | null;
  pix_url?: string | null;
  pix_qrcode: string | null;
  utm_campaign: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_content: string | null;
  utm_term: string | null;
  src: string | null;
  sck: string | null;
}
