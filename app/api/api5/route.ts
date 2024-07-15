import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);

        const max = searchParams.get('max')
        let take = !isNaN(Number(max)) && max != undefined ? Number(max) : undefined

        let where
        const filter = searchParams.get('filter')
        if(filter != undefined) {
            where = { OR: [{ Titolo: { contains: filter }}, { DescrizioneBreve: { contains: filter }}]}
        }
        
        const data = await prisma.tOfferteLavoro.findMany({ 
            take, 
            orderBy: [{ DataInserimento: "desc" }], 
            where
        })
        return NextResponse.json({ status: "OK", data })
    } catch(e) {
        return NextResponse.json({ status: "KO", error: "Internal server error" }, { status: 500 })
    }
}