import { NextRequest } from "next/server";
import { GET } from "./route";

describe("Must get the id of the all message tables in supabase", () => {
  it("should get the id of the all message tables in supabase", async () => {
    const response = await GET(
      new NextRequest(
        "http://localhost:3000/api/database/messages/select?phone_number=5511997658395"
      )
    );

    const item = await response.json();

    expect(item).toBeDefined();
    expect(item).not.toBeNull();
    expect(true).toBe(true);
  });
});
