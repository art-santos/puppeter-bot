import axios from "axios";

describe("PUT API /api/user/update-message-count", () => {
  const BASE_URL = "http://localhost:3001"; // Replace with your actual server URL
  const route = `${BASE_URL}/api/user/update/update-user-message-count`;

  it("should update user message count if phone number exists", async () => {
    try {
      const response = await axios.put(route, {
        phone_number: "5511997658395",
        increase: "true",
      });

      expect(response.status).toBe(200);
      expect(response.data).toBeDefined();
      expect(response.data.message).toBe("OK");
      expect(response.data.data.phone_number).toBe("5511997658395");
      expect(typeof response.data.data.messages_sent).toBe("number");
      // Additional assertions can be added here
    } catch (error) {
      console.error("Error in API test:", error);
      throw error; // Rethrow the error to fail the test
    }
  });

  it("should return an error if phone number does not exist", async () => {
    const nonExistentPhoneNumber = "0000000000";
    try {
      await axios.put(route, {
        phone_number: nonExistentPhoneNumber,
        increase: "true",
      });
    } catch (error: any) {
      expect(error.response.status).toBe(404); // Assuming 404 for not found
      expect(error.response.data.message).toBe("Error");
      expect(error.response.data.error).toBe("User not found");
    }
  });

  it("should handle invalid input data", async () => {
    try {
      await axios.put(route, { invalidData: "test" });
    } catch (error: any) {
      expect(error.response.status).toBe(400); // Assuming 400 for bad request
      expect(error.response.data.message).toBe("Error");
      // Add more specific assertions based on your API's error handling
    }
  });

  // Add more test cases as necessary...
});
