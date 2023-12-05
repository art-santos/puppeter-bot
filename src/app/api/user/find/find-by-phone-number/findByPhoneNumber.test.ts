import axios from "axios";

const BASE_URL = "http://localhost:3001"; // Replace with the URL of your running server

describe("API /api/user/find/find-by-phone-number", () => {
  const route = BASE_URL + `/api/user/find/find-by-phone-number`;

  it("should find a user by phone number", async () => {
    // Replace 'test-phone-number' with a valid test phone number
    const response = await axios.post(route, { phone: "12345627890" });

    expect(response.status).toBe(200);
    expect(response.data).toEqual({
      data: expect.anything(),
      code: 201,
      error: null,
    });
    // Add more assertions as needed
  });

  // Add more test cases as necessary...
});
