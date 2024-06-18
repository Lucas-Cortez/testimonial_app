import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export const GET = auth(async (req) => {
  const session = req.auth;

  if (session) {
    return NextResponse.json({ data: "Protected data" });
  }

  return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
});
