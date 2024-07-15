import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { formatZodError, jsonParse } from "../../utils";
import prisma from "@/lib/prisma";

const schema = z.object({
    Titolo: z.string().min(3).optional(),
    DescrizioneBreve: z.string().min(3).optional(),
    DataInserimento: z.string().datetime().optional(),
    RetribuzioneLorda: z.number().optional()
})

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        if(isNaN(Number(params.id))) {
            return NextResponse.json({ status: "KO", error: "L'ID passato sul param deve essere un numero" })
        }
        
        const body = schema.safeParse(await jsonParse(req))
        if (!body.success) {
            return NextResponse.json({ status: "KO", error: formatZodError(body.error) }, { status: 400 })
        }
    
        const id = Number(params.id)
        const aus = await prisma.tOfferteLavoro.findUnique({ where: { OffertaLavoroID: id }})
        if(!aus) {
            return NextResponse.json({ status: "KO", error: `Offerta di lavoro con ID ${id} non trovata` }, { status: 404 })
        }
    
        const data = await prisma.tOfferteLavoro.update({ 
            where: { OffertaLavoroID: id },
            data: body.data
        })
    
        return NextResponse.json({ status: "OK", data }, { status: 202 })
    } catch {
        return NextResponse.json({ staus: "KO", error: "Internal server error" }, { status: 500 })
    }
}