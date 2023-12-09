import { trimPhone } from "./../../../../../functions/utils/trimPhone";
import supabase from "@/app/clients/supabaseClient";
import { IUser } from "@/functions/utils/types/interfaces/User.interface.types";

import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
  const userInfo: IUser = (await req.json()) as IUser;
  try {
    // Validate the user info
    if (!userInfo || !userInfo.phone_number) {
      return NextResponse.json({
        message: "error",
        code: 500,
        error: "phone number missing",
      });
    }

    const phone = trimPhone(userInfo.phone_number);

    // Verify that the phone number is not already in the database
    const { data: existingUser, error: userError } = await supabase

      .from("chats")
      .select("phone_number")
      .eq("phone_number", phone)
      .limit(1)
      .select()
      .returns<IUser>();

    if (userError) {
      console.log(userError);
      return NextResponse.json({ message: "error", code: 500 });
    }
    // Prepare response data
    const responseData = { ...existingUser, phone_number: phone };

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
