import { IUser } from "./../../../../../functions/utils/types/interfaces/User.interface.types";
import {
  BUY_STATUS,
  convertPaymentStatusToBuyStatus,
} from "./../../../../../functions/utils/types/enums/BUY_STATUS.enum.types";
import { NextResponse } from "next/server";
import { tryToFindOrCreateUser } from "@/functions/utils/db/tryToFindOrCreateUser.db.utils";
import { getPaymentStatusByKey } from "@/functions/utils/types/enums/PAYMENT_STATUS.enum.types";
import { PepperWebhookPayload } from "@/functions/utils/types/pepper.interface";
import _ from "lodash";
import { diff, DiffEdit } from "deep-diff";
import supabase from "@/app/clients/supabaseClient";
import { getDifferences } from "@/functions/utils/base/getDifferences";
//req for this must contain the phone number and the buy status

export async function POST(req: Request, res: Response) {
  //check if the req contains the phone number and the buy status
  const info = (await req.json()) as PepperWebhookPayload;

  const PAYMENT: BUY_STATUS = convertPaymentStatusToBuyStatus(
    getPaymentStatusByKey(info.status)
  );
  const newInfo = {
    ...info,
    buy_status: PAYMENT,
  };

  const { data } = await tryToFindOrCreateUser(newInfo);

  const { data: updatedUser, error: updatedUserError } = await supabase
    .from("chats")
    .update({ buy_status: PAYMENT })
    .eq("phone_number", data?.phone_number)
    .select()
    .returns<IUser>()
    .single();

  if (updatedUser === undefined || updatedUserError !== null) {
    const responseData = {
      data: null,
      code: 201,
      id: undefined,
      phone_number: undefined,
      buy_status: undefined,
      differences: undefined,
      error: updatedUserError,
    };

    return NextResponse.json({ ...responseData });
  }

  if (data === undefined || updatedUser === undefined) {
    const responseData = {
      data: null,
      code: 201,
      id: undefined,
      phone_number: undefined,
      buy_status: undefined,
      differences: undefined,
      error: "error",
    };

    return NextResponse.json({ ...responseData });
  }

  const updated: IUser = updatedUser;

  const differences = getDifferences(data, updatedUser);

  const responseData = {
    data: updatedUser,
    code: 201,
    id: updated.id,
    phone_number: updated.phone_number,
    buy_status: updated.buy_status,
    differences,
    error: null,
  };

  return NextResponse.json({ ...responseData });
}
