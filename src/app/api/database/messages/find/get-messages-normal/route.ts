import supabase from "../../../../../../app/clients/supabaseClient";

import { NextResponse } from "next/server";

export async function GET() {
  try {
    const result = await supabase.from("normal_messages").select(`*
    normal_message_id
    `);
    console.log("result", result);
    console.log("result", result.data);

    if (result.error) {
      throw new Error(result.error.message);
    }
    return NextResponse.json(
      { data: result, message: "OK", result },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { data: null, message: "Error", error },
      { status: 500 }
    );
  }
}
