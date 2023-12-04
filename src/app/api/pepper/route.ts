import { NextResponse } from "next/server";
const { Client, LocalAuth } = require("whatsapp-web.js");

const client = new Client({
  authStrategy: new LocalAuth(),
});

export function POST(req: Request) {
  const { body } = req;

  console.log(client);
  // Create a new client using the provided authentication

  return NextResponse.json(body);
}
