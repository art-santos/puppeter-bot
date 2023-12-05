import supabase from "@/app/clients/supabaseClient";
import { NextResponse } from "next/server";

//req for this must contain the phone number and the buy status
export async function POST(req: Request, res: Response) {
  //check if the req contains the phone number and the buy status

  const info = await req.json();

  const phone = trimPhone(info.phone);

  //check if the req contains the phone number and the buy status
  if (info.phone === undefined || info.buy_status === undefined) {
    return NextResponse.json({
      message: "error",
      code: 500,
      error: "phone number or buy status missing",
    });
  }

  //first verify that the phone number is not already in the database
  const { data: user, error: userError } = await supabase
    .from("chats")
    .select("phone_number")
    .eq("phone_number", phone);

  if (userError) {
    console.log(userError);
    return NextResponse.json({ message: "error", code: 500, error: userError });
  }

  //now update the user's buy status
  const { data, error } = await supabase
    .from("chats")
    .update({ buy_status: info.buy_status })
    .eq("phone_number", phone);

  if (error) {
    console.log(error);
    return NextResponse.json({ message: "error", code: 500, error: error });
  }

  //if the user is not in the database, return an error
  if (user === undefined || user.length === 0) {
    return NextResponse.json({
      message: "error",
      code: 500,
      error: "user not found",
    });
  }

  //check if the change was successful
  if (data === undefined) {
    return NextResponse.json({
      message: "error",
      code: 500,
      error: "user not updated",
    });
  }

  return NextResponse.json({ data: user, code: 201, error: null });
}
