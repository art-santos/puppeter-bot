import supabase from "@/app/clients/supabaseClient";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
  const info = await req.json();

  const phone = trimPhone(info.phone);
  //first verify that the phone number is not already in the database
  const { data: user, error: userError } = await supabase
    .from("users")
    .select("phone_number")
    .eq("phone_number", phone);

  if (userError) {
    console.log(userError);
    return NextResponse.json({ message: "error", code: 500, error: userError });
  }

  return NextResponse.json({ data: user, code: 201, error: null });
}
