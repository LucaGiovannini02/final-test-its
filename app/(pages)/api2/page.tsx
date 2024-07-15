"use client"

import { DatePicker } from "@/components/DatePicker"
import Loading from "@/components/Loading"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import API from "@/lib/axios"
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { AlertCircle, CalendarIcon } from "lucide-react"
import { redirect } from "next/navigation"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

const formSchema = z.object({
    Titolo: z.string().min(3),
    DescrizioneBreve: z.string().min(3),
    RetribuzioneLorda: z.string().regex(/^\d+$/, "Max must be a numeric and grater than 0").transform((val) => (val ? parseInt(val, 10) : undefined))
})

const Page = () => {
    const router = useRouter()
    const [date, setDate] = useState<Date>()
    const [errorDate, setErrorDate] = useState<string | undefined>(undefined)
    const [error, setError] = useState<string | undefined>(undefined)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if(date) {
            setErrorDate(undefined)
        }
    }, [date])

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            Titolo: "",
            DescrizioneBreve: "",
            RetribuzioneLorda: undefined
        },
    })
    
    function onSubmit(values: z.infer<typeof formSchema>) {
        if(!date) {
            setErrorDate("Date is required")
            return
        }

        setLoading(true)
        API.post("/api/api2", { ...values, DataInserimento: date }).then(() => {
            router.push("/")
        }).catch((e) => {
            setError(e.data.error)
        }).finally(() => {
            setLoading(false)
        })
    }

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 relative">
                    <FormField
                        control={form.control}
                        name="Titolo"
                        disabled={loading}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Titolo</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        disabled={loading}
                        name="DescrizioneBreve"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Descrizione breve</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormItem className="flex flex-col">
                        <FormLabel className="mb-[1px]">Data inserimento</FormLabel>
                        <FormControl>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-full justify-start text-left font-normal",
                                        !date && "text-muted-foreground"
                                    )}
                                    disabled={loading}
                                    >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                    mode="single"
                                    selected={date}
                                    onSelect={setDate}
                                    initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </FormControl>
                        {errorDate && <div className="text-sm text-red-500">{errorDate}</div>}
                    </FormItem>



                    <FormField
                        control={form.control}
                        name="RetribuzioneLorda"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Retribuzione lorda</FormLabel>
                                <FormControl>
                                    <Input type="number" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button disabled={loading} type="submit">{loading && <div className="mr-3"><Loading /></div>} Aggiungi offerta</Button>
                </form>
            </Form>

            {error && (
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>
                        {error}
                    </AlertDescription>
                </Alert>
            )}
        </>
    )
}

export default Page