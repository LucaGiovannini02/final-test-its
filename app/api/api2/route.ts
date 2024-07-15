import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { formatZodError, jsonParse } from "../utils";
import prisma from "@/lib/prisma";

const schema = z.object({
    Titolo: z.string().min(3),
    DescrizioneBreve: z.string().min(3),
    DataInserimento: z.string().datetime(),
    RetribuzioneLorda: z.number()
})

export async function POST(req: NextRequest) {
    try {
        const body = schema.safeParse(await jsonParse(req))
        if (!body.success) {
            return NextResponse.json({ status: "KO", error: formatZodError(body.error) }, { status: 400 })
        }
    
        const data = await prisma.tOfferteLavoro.create({ data: body.data })
        return NextResponse.json({ status: "OK", data }, { status: 201 })
    } catch {
        return NextResponse.json({ staus: "KO", error: "Internal server error" }, { status: 500 })
    }
}