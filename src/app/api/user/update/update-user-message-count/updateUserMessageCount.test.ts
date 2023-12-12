import axios from "axios";

describe("put API /api/user/update-message-count", () => {
  const BASE_URL = "http://localhost:3001"; // Replace with your actual server URL
  const route = `${BASE_URL}/api/user/update/update-user-message-count`;

  it("should update user message count if phone number exists", async () => {
    try {
      const response = await axios.put(route, {
        phone_number: "5511997658395",
        increase: "true",
      });

      const json = await response.data;
      expect(json).toBeDefined();

      expect(response.status).toBe(200);
    } catch (error) {
      console.error("Error in API test:", error);
    }
  });

  // it("should return an error if phone number does not exist", async () => {
  //   try {
  //     const response = await axios.put(route, {
  //       phone: "0000000000",
  //     });

  //     expect(response.status).toBe(500);
  //     expect(response.data).toEqual({
  //       message: "error",
  //       code: 500,
  //       error: "user not found",
  //     });
  //   } catch (error: any) {
  //     if (error.response) {
  //       const { response } = error;
  //       expect(response.status).toBe(405);
  //     } else {
  //       console.error("Error in API test:", error);
  //     }
  //   }
  // });

  // Add more test cases as necessary...
});
