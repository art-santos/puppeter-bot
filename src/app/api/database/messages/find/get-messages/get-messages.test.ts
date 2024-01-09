import { GET } from "./route";

describe("Must get the id of the all message tables in supabase", () => {
  it("should get the id of the all message tables in supabase", async () => {
    const response = await GET();
    const { data } = await response.json();

    console.log("data", data.data);

    expect(data).toBeDefined();

    expect(response.status).toBe(200);
  });
});
