import supabase from "@/app/clients/supabaseClient";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { data, error } = await supabase
    .from("users")
    .select(
      //find where phone_number is equal to the requested phone number
      "phone_number"
    )
    .eq("phone_number", "test");

  console.log(data, error);

  return NextResponse.json({ hello: data });
}
