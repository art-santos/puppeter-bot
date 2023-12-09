import { IUser } from "@/functions/utils/types/interfaces/User.interface.types";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { trimPhone } from "@/functions/utils/trimPhone";
import { POST } from "./route";
import { NextApiRequest } from "next";

describe("User Creation Endpoint", () => {
  const BASE_URL = "http://localhost:3001"; // Replace with your server's URL
  const route = `${BASE_URL}/api/user/create`;

  it("should create a new user", async () => {
    const newUser = {
      // Provide a mock user object that matches the IUser interface
      phone_number: Math.random().toString(36).substring(7),
      // ... other fields as necessary
    };

    const response = await axios.post(route, newUser);
    console.log("🚀 ~ file: createUser.test.ts:57 ~ response:", response);

    expect(response.status).toBe(200);

    // Add more assertions related to the response data
  });

  it("should not create a user if phone number is duplicate", async () => {
    const duplicateUser = {
      // Provide a mock user object with a duplicate phone number
      phone_number: "+5511998765432",
    };

    const response = await axios.post(route, duplicateUser);
    console.log("🚀 ~ file: createUser.test.ts:34 ~ it ~ response:", response);

    // Add more assertions as needed
  });

  // Additional tests for other scenarios...
});
