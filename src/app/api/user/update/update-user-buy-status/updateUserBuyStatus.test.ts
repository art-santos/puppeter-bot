import axios from "axios";
import {
  PAYMENT_STATUS,
  getPaymentStatusByKey,
} from "./../../../../../functions/utils/types/enums/PAYMENT_STATUS.enum.types";
import {
  BUY_STATUS,
  convertPaymentStatusToBuyStatus,
} from "./../../../../../functions/utils/types/enums/BUY_STATUS.enum.types";

describe("API /api/user/update/update-user-buy-status", () => {
  const BASE_URL = "http://localhost:3001";
  const USER_CREATE_ROUTE = BASE_URL + "/api/user/create";
  const UPDATE_BUY_STATUS_ROUTE =
    BASE_URL + "/api/user/update/update-user-buy-status";

  it("must create a user and then update the buy status", async () => {
    // Creating a user
    const createUserRequestBody = {
      phone_number: Math.random().toString().slice(2, 12), // Random 10 digit phone number
      // other necessary fields to create user
    };

    const createUserResponse = await axios.post(
      USER_CREATE_ROUTE,
      createUserRequestBody
    );

    expect(createUserResponse.status).toBe(200); // Assuming 201 is the success status code for creation

    // Updating buy status for the created user
    const updateBuyStatusRequestBody = {
      phone_number: createUserRequestBody.phone_number,
      status: PAYMENT_STATUS.Paid,
    };

    const PAYMENT: BUY_STATUS = convertPaymentStatusToBuyStatus(
      getPaymentStatusByKey(updateBuyStatusRequestBody.status)
    );

    const updateBuyStatusResponse = await axios.put(
      UPDATE_BUY_STATUS_ROUTE,
      updateBuyStatusRequestBody
    );

    expect(updateBuyStatusResponse.status).toBe(200); // Assuming 200 is the success status code for update
    expect(updateBuyStatusResponse.data).toEqual({
      data: expect.anything(), // Validate the structure of the data object as needed
      code: 200,
      error: null,
      phone_number: updateBuyStatusRequestBody.phone_number,
      buy_status: PAYMENT,
      differences: {
        buy_status: { before: "WAITING", after: "APPROVED" },
      },
      id: expect.anything(),
    });
  });

  // ... other tests
});
