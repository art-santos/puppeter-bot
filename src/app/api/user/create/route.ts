import { IUser } from "../../../../functions/utils/types/interfaces/User.interface.types";
import supabase from "../../../clients/supabaseClient";
import { trimPhone } from "./../../../../functions/utils/trimPhone";
import { NextResponse } from "next/server";
import { getBuyStatusByKey } from "../../../../functions/utils/types/enums/BUY_STATUS.enum.types";

export async function POST(req: Request, res: Response) {
  const userInfo: IUser = (await req.json()) as IUser;

  const phone = trimPhone(userInfo.phone_number);

  //first verify that the phone number is not already in the Infobase
  const { data: user, error: userError } = await supabase
    .from("users")
    .select("phone_number")
    .eq("phone_number", phone)
    .limit(1);

  if (userError) {
    console.log(userError);
    return NextResponse.json({ message: "error", code: 500 });
  }

  if (user !== undefined && user.length > 0) {
    return NextResponse.json({ message: "duplicate", code: 23504 });
  }

  try {
    const BUY_STATUS = getBuyStatusByKey("");
    const { data, error } = await supabase
      .from("chats")
      .insert({
        phone_number: phone,
        buy_status: BUY_STATUS,
        messages: [],
        messages_sent: 0,
      })
      .select()
      .returns<IUser>();

    if (error) {
      if (
        error.message.includes("duplicate key value violates unique constraint")
      ) {
        return NextResponse.json({ message: "duplicate", code: 23505 });
      }
    }

    if (data === undefined || data === null) {
      return NextResponse.json({ message: "error", code: 500 });
    }

    // Prepare response data

    const responseData = {
      ...data,
      phone_number: phone,
      buy_status: BUY_STATUS,
    };

    if (data) {
      return NextResponse.json({
        data: responseData,
        error: null,
      });
    }
  } catch (error) {
    console.log(error);
  }

  return NextResponse.json({ message: "success", code: 201 });
}
