import { NextResponse } from "next/server";
import { GET as getNormalMessages } from "./get-messages-normal/route";
import { GET as getFinalMessages } from "./get-messages-final/route";
import { GET as getOverflowMessages } from "./get-messages-overflow/route";

export async function GET() {
  try {
    const normalMessages = await getNormalMessages();
    const finalMessages = await getFinalMessages();
    const overflowMessages = await getOverflowMessages();

    const { data: normalMessagesData } = await normalMessages.json();
    const { data: finalMessagesData } = await finalMessages.json();
    const { data: overflowMessagesData } = await overflowMessages.json();

    const result = {
      normalMessages: normalMessagesData.data,
      finalMessages: finalMessagesData.data,
      overflowMessages: overflowMessagesData.data,
    };

    if (normalMessagesData.error) {
      throw new Error(normalMessagesData.error.message);
    }

    if (finalMessagesData.error) {
      throw new Error(finalMessagesData.error.message);
    }

    if (overflowMessagesData.error) {
      throw new Error(overflowMessagesData.error.message);
    }

    const trimAndRemoveQuotes = (text: string): string => {
      // Replace both single and double quotes with an empty string
      const trimmedText = text.replace(/['"]/g, "");

      // Alternatively, you can use a regular expression to remove only specific quotes
      // const trimmedText = text.replace(/^"(.+)"$/, "$1"); // Removes only double quotes

      return trimmedText;
    };

    await result.normalMessages.map((message: { message_text: string }) => {
      message.message_text = trimAndRemoveQuotes(message.message_text);
    });

    return NextResponse.json(
      { data: result, message: "OK", result },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { data: null, message: "Error", error },
      { status: 500 }
    );
  }
}
