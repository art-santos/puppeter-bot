import { NextRequest, NextResponse } from "next/server";

import { GET as messages } from "../find/route";
import { GET as user } from "../../../user/find/get-user/route";
import { PUT as updateUserMessageCount } from "../../../user/update/update-user-message-count/route";
import axios from "axios";

const BASE_URL = process.env.BASE_URL || "http://localhost:3001"; // Replace with your actual server URL

export async function GET(req: NextRequest) {
  let messageData;
  let userData;
  try {
    messageData = await messages();
    userData = await user(req);
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }

  try {
    const { data: messageRes } = await messageData.json();
    const { data: userRes } = await userData.json();

    const result = {
      messages: messageRes,
      user: userRes,
    };

    const getUserMessages = () => {
      return result.user?.messages_sent || 0;
    };

    const getMessages = () => {
      const messages = result!.messages.normalMessages;
      const messageCount = getUserMessages();
      // Calculate the index for the message to return
      const messageIndex = messageCount % messages.length;

      return messages[messageIndex];
    };

    const message = getMessages();

    // Update the user message count if necessary
    // Assuming updateUserMessageCount function handles the update logic
    const updateRes = await axios.put(
      `${BASE_URL}/api/user/update/update-user-message-count`,
      {
        phone_number: "5511997658395",
        increase: "true",
      }
    );

    const { data: updateData } = await updateRes.data;

    if (messageRes.error) {
      throw new Error(messageRes.error.message);
    }

    if (userRes.error) {
      throw new Error(userRes.error.message);
    }

    const resultData = {
      message: message.message_text,
      user: updateData,
    };

    return NextResponse.json({ message: "OK", data: resultData, status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
