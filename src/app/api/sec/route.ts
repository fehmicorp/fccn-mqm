import { sections } from "@/data/section";
import { NextResponse } from "next/server";

export async function GET() {
   const res = {
    success: true,
    data: sections
   }
  return NextResponse.json(res, {
    status: 200,
  });
}