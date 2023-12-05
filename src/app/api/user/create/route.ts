import supabase from "../../../clients/supabaseClient";
import { trimPhone } from "./../../../../functions/utils/trimPhone";
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
    return NextResponse.json({ message: "error", code: 500 });
  }

  if (user !== undefined && user.length > 0) {
    return NextResponse.json({ message: "duplicate", code: 23504 });
  }

  try {
    const { data, error } = await supabase
      .from("chats")
      .insert({ phone_number: info.phone });
    if (error) {
      if (
        error.message.includes("duplicate key value violates unique constraint")
      ) {
        return NextResponse.json({ message: "duplicate", code: 23505 });
      }
    }
    if (data) {
      return NextResponse.json({
        message: "success",
        code: 201,
      });
    }
  } catch (error) {
    console.log(error);
  }

  return NextResponse.json({ message: "success", code: 201 });
}
