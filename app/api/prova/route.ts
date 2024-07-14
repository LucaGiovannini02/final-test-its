import prisma from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { formatZodError, jsonParse } from "../utils"

const schema = z.object({
    nome: z.string().min(3),
    descrizione: z.string().min(3)
})

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);

    const max = searchParams.get('max')
    let take = !isNaN(Number(max)) && max != undefined ? Number(max) : undefined

    const data = await prisma.prova.findMany({ take })

    return NextResponse.json({ status: "OK", data }, { status: 200 })
}

export async function POST(req: NextRequest) {
    try {
        const body = schema.safeParse(await jsonParse(req))
        if (!body.success) {
            return NextResponse.json({ status: "KO", error: formatZodError(body.error) }, { status: 400 })
        }

        const data = await prisma.prova.create({ data: body.data })
        return NextResponse.json({ status: "OK", data }, { status: 201 })
    } catch (e) {
        return NextResponse.json({ status: "KO", error: "Internal server error" }, { status: 500 })
    }
}