import axios from "axios";

const route = "http://localhost:3001/api/user/create";

describe("POST /api/user/create", () => {
  console.log(route);
  it("should create a new user if phone number is not duplicate", async () => {
    const response = await axios.post(route, {
      //CONVERT IT TO A RANDOM NUMBER

      phone: "12345627890",
    });

    expect(response.status).toBe(200);
    expect(response.data).toEqual({
      message: "success",
      code: 200,
    });
    // Add more assertions as needed
  });

  it("should not create a user if phone number is duplicate", async () => {
    // Assuming '1234567890' is a duplicate phone number
    const response = await axios.post(route, {
      phone: "1234567890",
    });

    expect(response.status).toBe(200); // or the status code you return for duplicates
    expect(response.data).toEqual({
      message: "duplicate",
      code: 23505, // or the error code you use for duplicates
    });
    // Add more assertions as needed
  });

  // Add more test cases as necessary...
});
