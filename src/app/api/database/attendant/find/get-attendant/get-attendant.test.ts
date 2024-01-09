import axios from "axios";

describe("Must find an attendant", () => {
  const BASE_URL = "http://localhost:3001"; // Replace with your server's URL
  const route = `${BASE_URL}/api/database/attendant/find/get-attendant`;

  it("should find a new user by the phone number", async () => {
    const response = await axios.get(route, {
      params: {
        phone_number: "+5511997658395",
      },
    });

    expect(response.data).toBeDefined();
  });

  // Additional test cases (e.g., handling different response statuses, error handling) can be added here
});
