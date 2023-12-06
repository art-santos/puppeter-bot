import { BUY_STATUS } from "../enums/BUY_STATUS.enum.types";

export interface IUser {
  id: bigint;
  number: number;
  inserted_at: string; // assuming the date will be handled as a string in JavaScript
  updated_at: string; // assuming the date will be handled as a string in JavaScript
  messages_sent: number;
  buy_status: BUY_STATUS;
  phone_number: string;
  messages: string[]; // array of strings
}
