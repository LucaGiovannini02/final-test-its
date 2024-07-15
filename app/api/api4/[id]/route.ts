import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { formatZodError, jsonParse } from "../../utils";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        if(isNaN(Number(params.id))) {
            return NextResponse.json({ status: "KO", error: "L'ID passato sul param deve essere un numero" })
        }
    
        const id = Number(params.id)
        const aus = await prisma.tOfferteLavoro.findUnique({ where: { OffertaLavoroID: id }})
        if(!aus) {
            return NextResponse.json({ status: "KO", error: `Offerta di lavoro con ID ${id} non trovata` }, { status: 404 })
        }
    
        const data = await prisma.tOfferteLavoro.delete({ where: { OffertaLavoroID: id } })
    
        return NextResponse.json({ status: "OK", data }, { status: 202 })
    } catch {
        return NextResponse.json({ staus: "KO", error: "Internal server error" }, { status: 500 })
    }
}