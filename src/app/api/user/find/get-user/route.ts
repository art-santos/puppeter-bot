import { NextRequest, NextResponse } from "next/server";
import { trimPhone } from "./../../../../../functions/utils/trimPhone";
import supabase from "../../../../../app/clients/supabaseClient";

import { NextURL } from "next/dist/server/web/next-url";

export async function GET(req: NextRequest) {
  const data = new NextURL(req.nextUrl);
  console.log("🚀 ~ file: route.ts:9 ~ GET ~ data:", data);
  console.log(
    "🚀 ~ file: route.ts:9 ~ GET ~ data.searchParams:",
    data.searchParams
  );

  const phone = trimPhone(data.searchParams.get("phone_number") as string);

  try {
    console.log("🚀 ~ file: route.ts:11 ~ GET ~ phone:", phone);
    //  Check if phone number is provided
    if (!phone) {
      return NextResponse.json({
        message: "error",
        code: 400,
        error: "phone number missing",
      });
    }

    //Get user from database

    const { data, error } = await supabase
      .from("chats")
      .select()
      .eq("phone_number", phone)
      .single();
    if (error) {
      console.log(error);
      return NextResponse.json({ message: "error", code: 500 });
    }

    // Prepare response data
    const responseData = { ...data };

    return NextResponse.json({ data: responseData, code: 200, error: null });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({
      message: "error",
      code: 500,
      error: error.message,
    });
  }
}
