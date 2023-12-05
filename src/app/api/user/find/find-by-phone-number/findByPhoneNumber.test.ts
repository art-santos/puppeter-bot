import axios from "axios";

const BASE_URL = "http://localhost:3001"; // Replace with the URL of your running server

describe("API /api/user/find/find-by-phone-number", () => {
  const route =
    BASE_URL + `/api/user/find/find-by-phone-number?phone=1234567890`;

  it("should find a user by phone number", async () => {
    // Replace 'test-phone-number' with a valid test phone number
    const response = await axios.get(route);

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
