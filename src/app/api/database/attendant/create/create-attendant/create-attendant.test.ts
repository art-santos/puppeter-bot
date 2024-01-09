import axios from "axios";

describe("Must create an attendant", () => {
  const BASE_URL = "http://localhost:3001"; // Replace with your server's URL
  const route = `${BASE_URL}/api/database/attendant/create/create-attendant`;

  it("should create an attendant using phone number", async () => {
    const requestData = {
      connected: true,
      machine_address: `https://${Math.random().toString(36).substring(7)}`,
      phone_number: `${Math.random().toString().slice(2, 12)}`,
    };

    const response = await axios.post(route, requestData);

    expect(response.data).toBeDefined();
  });

  // Additional test cases (e.g., handling different response statuses, error handling) can be added here
});
