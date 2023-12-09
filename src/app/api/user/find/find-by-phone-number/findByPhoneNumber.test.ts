import axios from "axios";

const BASE_URL = "http://localhost:3001"; // Replace with the URL of your running server

describe("API /api/user/find/find-by-phone-number", () => {
  const route = BASE_URL + `/api/user/find/find-by-phone-number`;

  it("should find a user by phone number", async () => {
    // Replace 'test-phone-number' with a valid test phone number

    const user = {
      // Provide a mock user object that matches the IUser interface
      phone_number: "+5511998765432",
      // ... other fields as necessary
    };

    const response = await axios.post(route, user);

    expect(response.status).toBe(200);
    expect(response.data).toEqual({
      data: expect.anything(),
      code: 200,
      error: null,
    });
    // Add more assertions as needed
  });

  // Add more test cases as necessary...
});
