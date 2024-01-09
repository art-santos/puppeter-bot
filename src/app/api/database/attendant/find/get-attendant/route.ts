import { trimPhone } from "./../../../../../../functions/utils/trimPhone";

import supabase from "../../../../../../app/clients/supabaseClient";

import { NextRequest, NextResponse } from "next/server";
import { NextURL } from "next/dist/server/web/next-url";

export async function GET(req: NextRequest, res: NextResponse) {
  const data = new NextURL(req.nextUrl);

  const phone_raw = data.searchParams.get("phone_number") as string;

  const phone = trimPhone(phone_raw);
  console.log("🚀 ~ GET ~ phone:", phone);

  if (!phone) {
    return NextResponse.json(
      { data: null, message: "Error", error: "phone number missing" },
      { status: 400 }
    );
  }

  try {
    const { data, error } = await supabase
      .from("attendants")
      .select()
      .eq("phone_number", phone)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return NextResponse.json(
      { data, message: "OK", result: data },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { data: null, message: "Error", error },
      { status: 500 }
    );
  }
}
