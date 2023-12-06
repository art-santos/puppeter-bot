import { IUser } from "@/functions/utils/types/interfaces/User.interface.types";
import axios from "axios";

describe("User Creation Endpoint", () => {
  const BASE_URL = "http://localhost:3001"; // Replace with your server's URL
  const route = `${BASE_URL}/api/users/create`;

  it("should create a new user", async () => {
    const newUser = {
      // Provide a mock user object that matches the IUser interface
      phone_number: "+5511998765432",
      // ... other fields as necessary
    };

    const response = await axios.post(route, newUser);

    expect(response.status).toBe(201);
    expect(response.data).toHaveProperty("data");
    // Add more assertions related to the response data
  });

  it("should not create a user if phone number is duplicate", async () => {
    const duplicateUser = {
      // Provide a mock user object with a duplicate phone number
      phone_number: "+5511998765432",
      // ... other fields as necessary
    };

    const response = await axios.post(route, duplicateUser);

    expect(response.status).toBe(23504); // Assuming this is the code for duplicates
    // Add more assertions as needed
  });

  // Additional tests for other scenarios...
});
