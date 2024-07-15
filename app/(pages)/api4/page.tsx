'use client'

import InfoCard from "@/components/InfoCard"
import LavoroCard from "@/components/LavoroCard"
import Loading from "@/components/Loading"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import API from "@/lib/axios"
import { HttpResponse, Lavoro } from "@/lib/definitions"
import { AlertCircle, Trash } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const Page = () => {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState<HttpResponse<Lavoro[]> | undefined>(undefined)
    const [error, setError] = useState<any>()

    useEffect(() => {
        getData()
    }, [])

    const getData = () => {
        setLoading(true)
        API.get<HttpResponse<Lavoro[]>>(`/api/api1`).then((res) => {
            setData(res.data)
        }).then((err) => {
            setError(err)
        }).finally(() => {
            setLoading(false)
        })
    }

    const deleteOne = (id: number) => {
        setLoading(true)
        setData(undefined)
        API.get(`/api/api4/${id}`).then(() => {
            router.push("/")
        }).catch(e => {
            setError(e)
        }).finally(() => {
            setLoading(false)
        })
    }


    return (
        <>
            <InfoCard
                link="http://localhost:3000/api/api1/5"
                title="API 4"
                description="Inviare tramite get una offerta di lavoro per poterla eliminare"
                type="GET"
                exampleOutput={(
                    <div>
                        &#123; <br />
                        &emsp;    "status": "OK", <br />
                        &emsp;    "data": [ <br />
                        &emsp;&emsp;&#123; <br />
                        &emsp;&emsp;&emsp;    "OffertaLavoroID": 5 <br />
                        &emsp;&emsp;&emsp;    "Titolo": "Web developer full stacks", <br />
                        &emsp;&emsp;&emsp;    "DescrizioneBreve": "Angular, MongoDB, Express" <br />
                        &emsp;&emsp;&emsp;    "DataInserimento": "2024-07-15T22:00:00.000Z" <br />
                        &emsp;&emsp;&emsp;    "RetribuzioneLorda": "2301" <br />
                        &emsp;&emsp;&#125; <br />
                        &emsp;] <br />
                        &#125;
                    </div>
                )}
                />

            {data && <div>
                {data.data.map((l) => (
                    <div key={l.OffertaLavoroID} className="mt-3">
                        <LavoroCard lavoro={l} button={(
                            <AlertDialog>
                                <AlertDialogTrigger><Trash className="hover:text-red-500 cursor-pointer" /></AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Sei sicuro di eliminare queste offerta?</AlertDialogTitle>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>No</AlertDialogCancel>
                                        <AlertDialogAction onClick={() => deleteOne(l.OffertaLavoroID)}>Si</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        )} />
                    </div>
                ))}
            </div>}

            {loading && <Loading />}
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