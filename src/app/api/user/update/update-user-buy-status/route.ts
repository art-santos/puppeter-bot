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
import supabase from "@/app/clients/supabaseClient";
import { getDifferences } from "@/functions/utils/base/getDifferences";

export async function PUT(req: Request, res: Response) {
  try {
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

    if (updatedUser === undefined || updatedUserError !== null || !data) {
      throw new Error(updatedUserError?.message || "Failed to update user");
    }

    const updated: IUser = updatedUser;
    const original: IUser = data;
    const differences = getDifferences(original, updatedUser);

    const responseData = {
      data: updatedUser,
      code: 200, // OK status
      id: updated.id,
      phone_number: updated.phone_number,
      buy_status: updated.buy_status,
      differences,
      error: null,
    };

    return NextResponse.json({ ...responseData });
  } catch (error: any) {
    return NextResponse.json({
      data: null,
      code: 500, // Internal Server Error
      error: error.message || "An unexpected error occurred",
    });
  }
}
