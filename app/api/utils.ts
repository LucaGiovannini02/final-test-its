import { ZodError, ZodIssue, z } from "zod";

export async function jsonParse(body: any) {
    try {
        const res = await body.json()
        return res
    } catch {
        return null
    }
}

const formatZodIssue = (issue: ZodIssue): {[key: string]: string} => {
    const { path, message } = issue
    const pathString = path.join('.') ? path.join('.') : "error"

    return { [pathString]: message }
}

export const formatZodError = (error: ZodError): {[key: string]: string}[] => {
    const { issues } = error

    if (issues.length) {
        return issues.map(issue => {
            return formatZodIssue(issue)
        })
    } else {
        return []
    }
}