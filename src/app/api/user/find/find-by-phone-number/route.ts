import { trimPhone } from "./../../../../../functions/utils/trimPhone";
import supabase from "@/app/clients/supabaseClient";
import { NextURL } from "next/dist/server/web/next-url";
import { NextResponse } from "next/server";

export async function GET(req: Request, res: Response) {
  //check the req params for the phone number
  const data = new NextURL(req.url).searchParams.get("phone");

  //check if the req contains the phone number and the message count
  if (data === undefined || data === null) {
    return NextResponse.json({
      message: "error",
      code: 500,
      error: "phone number",
    });
  }
  const phone = trimPhone(data);
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
