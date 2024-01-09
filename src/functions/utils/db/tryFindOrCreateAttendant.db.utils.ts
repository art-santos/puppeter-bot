import axios, { AxiosError } from "axios";
import { APILINKS } from "../links/links.enum.types";
import { PepperWebhookPayload } from "../types/pepper.interface";
import { IUser } from "../types/interfaces/User.interface.types";

interface IFoundOrCreatedResponse {
  data: IUser | undefined;
  message: string;
  code: number;
  error: string | null;
}

export async function tryToFindOrCreateUser(
  info: PepperWebhookPayload
): Promise<IFoundOrCreatedResponse> {
  console.log("info", info);
  try {
    // Attempt to find the user
    const { data: findData } = await axios.post(APILINKS.FIND_USER, {
      phone_number: info.phone_number,
    });

    // If user is found, return the user data
    if (findData.data[0] !== undefined) {
      return {
        data: findData.data[0],
        message: "found",
        code: 200,
        error: null,
      };
    }

    // If user is not found, attempt to create a new user
    const { data: createUserData } = await axios.post(APILINKS.CREATE_USER, {
      phone_number: info.phone_number,
    });

    return {
      data: createUserData.data,
      message: "created",
      code: 201,
      error: null,
    };
  } catch (error) {
    console.error("Error in tryToFindOrCreateUser:", error);
    // Handle the error based on your application's needs
    // This could be returning `null`, throwing a custom error, etc.
    return {
      data: undefined,
      message: "error",
      code: 500,
      error: (error as AxiosError).message,
    };
  }
}
