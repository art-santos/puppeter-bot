import { trimPhone } from "./../../../../../../functions/utils/trimPhone";
import supabase from "../../../../../../app/clients/supabaseClient";

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const userInfo = await req.json();

  let phone_number = userInfo.phone_number;
  console.log("🚀 ~ POST ~ phone_number:", phone_number);
  console.log("🚀 ~ POST ~ userInfo:", userInfo);

  try {
    phone_number = trimPhone(userInfo.phone_number);
  } catch (e) {
    console.log(e);
  }

  const connected = userInfo.connected;
  const machine_address = userInfo.machine_address;

  if (!phone_number) {
    return NextResponse.json(
      { data: null, message: "Error", error: "phone number missing" },
      { status: 400 }
    );
  }

  try {
    const result = await supabase.from("attendants").insert({
      connected,
      phone_number,
      machine_address,
    });

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
