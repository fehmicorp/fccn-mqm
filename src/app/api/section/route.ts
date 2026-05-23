import { NextRequest, NextResponse } from "next/server";
import { sectionData } from "@/data/section";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const main = searchParams.get("main");
    const sub = searchParams.get("sub");
    if (!main) {
      return NextResponse.json({ success: true, data: sectionData }, { status: 200 });
    }
    const filteredData = sectionData.filter((node) => {
      const matchMain = node.pageTag === main;
      const matchSub = sub ? node.secTag === sub : !node.secTag;
      return matchMain && matchSub;
    });

    return NextResponse.json(
      {
        success: true,
        data: filteredData,
      },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json(
      {
        success: false,
        error: err.message || "Internal Server Layout Configuration Processing Exception",
      },
      { status: 500 }
    );
  }
}