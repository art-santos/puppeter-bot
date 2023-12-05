// pages/api/[...pepper].js

import { PepperWebhookPayload } from "@/functions/utils/types/pepper.interface";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
  try {
    // Parse and type-cast the request body to PepperWebhookPayload
    const webhookData: PepperWebhookPayload =
      (await req.json()) as PepperWebhookPayload;
    console.log("Received webhook:", webhookData);

    // Implement your logic to process the webhook data here

    return NextResponse.json({
      message: "Webhook received successfully",
      code: 200,
    });
  } catch (error) {
    console.error("Error processing webhook:", error);
    return NextResponse.json({
      message: "Error processing webhook",
      code: 500,
      error,
    });
  }
}
