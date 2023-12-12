import { getDifferences } from "../../../../../functions/utils/base/getDifferences";
import supabase from "../../../../../app/clients/supabaseClient";
import { NextResponse } from "next/server";

export async function PUT(req: Request, res: Response) {
  try {
    const jsonData = await req.json();

    const { phone_number, increase } = jsonData;

    let isIncrease = increase === "true" ? true : false;

    const { data: user, error: userError } = await supabase
      .from("chats")
      .select("messages_sent")
      .eq("phone_number", phone_number)
      .single();

    if (userError) {
      throw new Error(userError.message);
    }

    const { data: updatedUser, error: updatedUserError } = await supabase
      .from("chats")
      .update({
        messages_sent: isIncrease
          ? user.messages_sent + 1
          : user.messages_sent - 1,
      })
      .eq("phone_number", phone_number)
      .select()
      .single();

    if (updatedUserError) {
      throw new Error(updatedUserError.message);
    }

    if (user === undefined || updatedUser === undefined) {
      throw new Error("error");
    }

    getDifferences(user, updatedUser);

    //check if user message count is updated

    if (user.messages_sent === updatedUser.messages_sent) {
      throw new Error("user not updated");
    }

    console.log(user, updatedUser);

    return NextResponse.json({ message: "OK", data: user, status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "error", error: error });
  }
}
