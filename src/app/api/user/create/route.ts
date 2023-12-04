import supabase from "@/app/clients/supabaseClient";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
  const info = await req.json();

  //first verify that the phone number is not already in the database
  const { data: user, error: userError } = await supabase
    .from("users")
    .select("phone_number")
    .eq("phone_number", info.phone);

  if (userError) {
    console.log(userError);
    return NextResponse.json({ message: "error", code: 500 });
  }

  if (user !== undefined && user.length > 0) {
    console.log("🚀 ~ file: route.ts:19 ~ POST ~ user:", user);
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
      console.log("🚀 ~ file: route.ts:19 ~ POST ~ data:", data);
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
