import { NextResponse } from "next/server";
import { manifestAPI } from "@/app/config";

export function GET() {
  return new NextResponse(JSON.stringify(manifestAPI), {
    status: 200,
    headers: {
      "Content-Type": "application/manifest+json",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}