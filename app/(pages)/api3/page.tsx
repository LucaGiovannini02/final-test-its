'use client'

import InfoCard from "@/components/InfoCard"
import LavoroCard from "@/components/LavoroCard"
import Loading from "@/components/Loading"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import API from "@/lib/axios"
import { HttpResponse, Lavoro } from "@/lib/definitions"
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { addDays, format } from "date-fns"
import { CalendarIcon, Pencil } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

const formSchema = z.object({
    OffertaLavoroID: z.number(),
    Titolo: z.string().min(3),
    DescrizioneBreve: z.string().min(3),
    RetribuzioneLorda: z.coerce.number()
})

const Page = () => {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState<HttpResponse<Lavoro[]> | undefined>(undefined)
    const [error, setError] = useState<any>()

    const [date, setDate] = useState<Date>()
    const [errorDate, setErrorDate] = useState<string | undefined>(undefined)

    useEffect(() => {
        setLoading(true)
        API.get<HttpResponse<Lavoro[]>>(`/api/api1`).then((res) => {
            setData(res.data)
        }).then((err) => {
            setError(err)
        }).finally(() => {
            setLoading(false)
        })
    }, [])

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            Titolo: undefined,
            DescrizioneBreve: undefined,
            RetribuzioneLorda: undefined
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        if(!date) {
            setErrorDate("Date is required")
            return
        }

        const aus = addDays(date, 1)
        console.log(aus.toISOString())

        setLoading(true)
        setData(undefined)
        const { OffertaLavoroID, ...res } = values
        API.post(`/api/api3/${values.OffertaLavoroID}`, { ...res, DataInserimento: aus }).then(() => {
            router.push("/")
        }).catch((e) => {
            setError(e.data.error)
        }).finally(() => {
            setLoading(false)
        })
    }

    return (
        <>
            <InfoCard
                link="http://localhost:3000/api/api1"
                title="API 3"
                description="Inviare tramite post una offerta di lavoro per poterla modificare"
                type="POST"
                exampleOutput={(<div>
                    &#123; <br />
                    &emsp;    "status": "OK", <br />
                    &emsp;    "data": [ <br />
                    &emsp;&emsp;&#123; <br />
                    &emsp;&emsp;&emsp;    "Titolo": "Aiuto magazzino", <br />
                    &emsp;&emsp;&emsp;    "DescrizioneBreve": "Personale per aiuto magazzino full-time" <br />
                    &emsp;&emsp;&emsp;    "DataInserimento": "2024-07-10T00:00:00.000Z" <br />
                    &emsp;&emsp;&emsp;    "RetribuzioneLorda": "2700" <br />
                    &emsp;&emsp;&#125; <br />
                    &emsp;] <br />
                    &#125;
                </div>)} />

            {data && <div>
                {data.data.map((l) => (
                    <div key={l.OffertaLavoroID} className="mt-3">
                        <LavoroCard lavoro={l} button={(
                            <Dialog>
                                <DialogTrigger><Pencil  onClick={() => { setDate(new Date(l.DataInserimento.toString().split('T')[0])) }} className="hover:text-blue-500 cursor-pointer" /></DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]">
                                    <DialogHeader>
                                        <DialogTitle>Modifica lavoro</DialogTitle>
                                    </DialogHeader>
                                    <Form {...form}>
                                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 relative">
                                            <FormField
                                                control={form.control}
                                                name="OffertaLavoroID"
                                                disabled={loading}
                                                defaultValue={l.OffertaLavoroID}
                                                render={({ field }) => (
                                                    <Input className="hidden" placeholder="Name" {...field} />
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name="Titolo"
                                                disabled={loading}
                                                defaultValue={l.Titolo}
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
                                                defaultValue={l.DescrizioneBreve}
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
                                                    <Popover modal={true}>
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
                                                defaultValue={l.RetribuzioneLorda}
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

                                            <Button disabled={loading} type="submit">{loading && <div className="mr-3"><Loading /></div>} Conferma modifica</Button>
                                        </form>
                                    </Form>
                                </DialogContent>
                            </Dialog>
                        )} />
                    </div>
                ))}
            </div>}

            {loading && <Loading />}
        </>
    )
}

export default Page