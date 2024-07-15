import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);

        const max = searchParams.get('max')
        let take = !isNaN(Number(max)) && max != undefined ? Number(max) : undefined
        
        const data = await prisma.tOfferteLavoro.findMany({ take, orderBy: [{ DataInserimento: "desc" }] })
        return NextResponse.json({ status: "OK", data })
    } catch(e) {
        return NextResponse.json({ status: "KO", error: "Internal server error" }, { status: 500 })
    }
}