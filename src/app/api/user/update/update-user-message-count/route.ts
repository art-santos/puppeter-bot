import { getDifferences } from "../../../../../functions/utils/base/getDifferences";
import supabase from "../../../../../app/clients/supabaseClient";
import { NextResponse } from "next/server";

export async function PUT(req: Request, res: Response) {
  try {
    const jsonData = await req.json();
    const { phone_number, increase } = jsonData;

    // Check if the user exists
    const { data: existingUser, error: userFetchError } = await supabase
      .from("chats")
      .select("messages_sent")
      .eq("phone_number", phone_number)
      .single();

    if (userFetchError) {
      throw new Error(userFetchError.message);
    }

    if (!existingUser) {
      throw new Error("User not found");
    }

    // Update the user's message count
    let isIncrease = increase === "true";
    const { data: updatedUser, error: updatedUserError } = await supabase
      .from("chats")
      .update({
        messages_sent: isIncrease
          ? existingUser.messages_sent + 1
          : existingUser.messages_sent - 1,
      })
      .eq("phone_number", phone_number)
      .select()
      .single();

    if (updatedUserError) {
      throw new Error(updatedUserError.message);
    }

    if (!updatedUser) {
      throw new Error("User not updated");
    }

    // Calculate the differences
    const differences = getDifferences(existingUser, updatedUser);

    // Return the updated user data and differences
    return NextResponse.json({
      message: "OK",
      data: updatedUser,
      differences,
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Error",
      error: (error as Error).message || "An unexpected error occurred",
      status: 500,
    });
  }
}
