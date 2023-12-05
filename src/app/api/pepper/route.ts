import supabase from "@/app/clients/supabaseClient";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
  const info = await req.json();

  console.log("🚀 ~ file: route.ts:19 ~ POST ~ info", info);

  return NextResponse.json({ message: "success", code: 201 });
}
