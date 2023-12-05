import axios from "axios";

describe("POST API /api/user/update", () => {
  const BASE_URL = "http://localhost:3001"; // Replace with your actual server URL
  const route = `${BASE_URL}/api/user/update/update-user-buy-status`;

  it("should update user buy status if phone number exists", async () => {
    try {
      const response = await axios.post(route, {
        phone: "12345627890",
        buy_status: "new-status",
      });

      expect(response.status).toBe(201);
      expect(response.data).toEqual({
        data: expect.anything(),
        code: 201,
        error: null,
      });
    } catch (error) {
      // Handle error
      console.error("Error in API test:", error);
    }
  });

  it("should return an error if phone number does not exist", async () => {
    try {
      const response = await axios.post(route, {
        phone: "12345627890",
        buy_status: "new-status",
      });

      expect(response.status).toBe(500);
      expect(response.data).toEqual({
        message: "error",
        code: 500,
        error: "user not found",
      });
    } catch (error: any) {
      // Handle HTTP error response
      if (error.response) {
        console.log(
          "🚀 ~ file: updateUserBuyStatus.test.ts:42 ~ it ~ error:",
          error
        );

        const { response } = error;
        expect(response.status).toBe(500);
      } else {
        console.error("Error in API test:", error);
      }
    }
  });

  // Add more test cases as necessary...
});
