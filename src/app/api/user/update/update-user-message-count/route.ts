import supabase from "@/app/clients/supabaseClient";
import { NextResponse } from "next/server";

//req for this must contain the phone number and the message count
export async function POST(req: Request, res: Response) {
  //check if the req contains the phone number and the message count

  const info = await req.json();

  //check if the req contains the phone number and the message count
  if (info.phone === undefined) {
    return NextResponse.json({
      message: "error",
      code: 500,
      error: "phone number",
    });
  }

  //first verify that the phone number is not already in the database
  //return phone number and messages sent
  const { data: user, error: userError } = await supabase
    .from("chats")
    .select(`phone_number, messages_sent`)
    .eq("phone_number", info.phone);

  if (userError) {
    console.log(userError);
    return NextResponse.json({ message: "error", code: 500, error: userError });
  }

  console.log("🚀 ~ file: route.ts:19 ~ POST ~ user:", user);
  //now update the user's message count
  const totalMessages =
    user[0].messages_sent !== null ? user[0].messages_sent : 0;
  const { data, error } = await supabase
    .from("chats")
    .update({ messages_sent: totalMessages + 1 })
    .eq("phone_number", info.phone);

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
