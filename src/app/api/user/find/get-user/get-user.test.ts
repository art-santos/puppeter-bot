import { describe, expect, test } from "@jest/globals";

import { GET } from "./route";

import { NextRequest } from "next/server";

const BASE_URL = "http://localhost:3001"; // Replace with the URL of your running server

const mockRequest = new NextRequest(
  `${BASE_URL}/api/user?phone_number=1234567890`
);

describe("GET /api/user", () => {
  test("should return error if no phone number is provided", async () => {
    const response = await GET(mockRequest);

    if (!mockRequest.nextUrl.searchParams.get("phone_number")) {
      expect(response.status).toBe(400);
    } else {
      expect(response.status).toBe(200);
    }
  });

  test("should return an User", async () => {
    const response = await GET(mockRequest);
    const data = await response.json();
    console.log("🚀 ~ file: get-user.test.ts:27 ~ test ~ data:", data.data);

    expect(response.status).toBe(200);
    expect(data).toHaveProperty("data");
    expect(data.data).toHaveProperty("id");
  });
});
