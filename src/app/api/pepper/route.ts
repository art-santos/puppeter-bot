import supabase from "@/app/clients/supabaseClient";
import { PepperWebhookPayload } from "@/functions/utils/types/pepper.interface";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
  try {
    // Parse and type-cast the request body to PepperWebhookPayload
    const webhookData: PepperWebhookPayload =
      (await req.json()) as PepperWebhookPayload;

    const abandonmentId =
      webhookData.abandonmentId === undefined ? "" : webhookData.abandonmentId;

    const insertData: PepperWebhookPayload = {
      currency: webhookData.currency,
      payment_engine: webhookData.payment_engine,
      transaction: webhookData.transaction,
      abandonment_id: abandonmentId,
      client_id: webhookData.client_id,
      payment_type: webhookData.payment_type,
      status: webhookData.status,
      prod: webhookData.prod,
      prod_name: webhookData.prod_name,
      producer_name: webhookData.producer_name,
      producer_document: webhookData.producer_document,
      producer_legal_nature: webhookData.producer_legal_nature,
      purchase_date: webhookData.purchase_date,
      confirmation_purchase_date: webhookData.confirmation_purchase_date,
      product_support_email: webhookData.product_support_email,
      installments_number: webhookData.installments_number,
      original_offer_price: webhookData.original_offer_price,
      warranty_date: webhookData.warranty_date,
      order_bump: webhookData.order_bump,
      main_transaction: webhookData.main_transaction,
      cms_market_place: webhookData.cms_market_place,
      cms_vendor: webhookData.cms_vendor,
      off: webhookData.off,
      price: webhookData.price,
      full_price: webhookData.full_price,
      email: webhookData.email,
      name: webhookData.name,
      first_name: webhookData.first_name,
      last_name: webhookData.last_name,
      doc: webhookData.doc,
      phone_number: webhookData.phone_number,
      billet_url: webhookData.billet_url,
      billet_barcode: webhookData.billet_barcode,
      pix_url: webhookData.pix_URL,
      pix_qrcode: webhookData.pix_qrcode,
      utm_campaign: webhookData.utm_campaign,
      utm_source: webhookData.utm_source,
      utm_medium: webhookData.utm_medium,
      utm_content: webhookData.utm_content,
      utm_term: webhookData.utm_term,
      src: webhookData.src,
      sck: webhookData.sck,
    };

    // Now use insertData to insert into the database

    // Save the webhook data to Supabase
    const { data, error } = await supabase
      .from("pepper_webhook_payloads") // Replace 'webhook_logs' with your table name
      .insert(insertData)
      .select();

    if (error) {
      throw error;
    }

    // get the webhook id

    return NextResponse.json({
      data: data[0].id,
      error: null,
    });
  } catch (error: any) {
    console.error("Error processing webhook:", error);
    return NextResponse.json({
      data: null,
      error: {
        message: error.message,
        code: error.code,
      },
    });
  }
}
