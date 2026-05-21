import { headerData, headerUI, sidebarData, sidebarUI } from "@/data/sidebar";
import { NextResponse } from "next/server";

export async function GET() {
   const res = {
    success: true,
    data: {
      sidebar: {
        data: sidebarData,
        ui: sidebarUI,
      },
      header: {
        data: headerData,
        ui: headerUI,
      }
    }
   }
  return NextResponse.json(res, {
    status: 200,
  });
}