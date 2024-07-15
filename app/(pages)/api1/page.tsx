'use client'

import InfoCard from "@/components/InfoCard"
import LavoroCard from "@/components/LavoroCard"
import Loading from "@/components/Loading"
import { Input } from "@/components/ui/input"
import API from "@/lib/axios"
import { HttpResponse, Lavoro } from "@/lib/definitions"
import { useEffect, useState } from "react"

const Page = () => {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState<HttpResponse<Lavoro[]> | undefined>(undefined)
    const [error, setError] = useState<any>()

    const [max, setMax] = useState<number | undefined>()

    useEffect(() => {
        getData()
    }, [])

    const getData = (x: number | undefined = undefined) => {
        setLoading(true)
        setData(undefined)
        API.get<HttpResponse<Lavoro[]>>(`/api/api1?max=${x}`).then((res) => {
            setData(res.data)
        }).then((err) => {
            setError(err)
        }).finally(() => {
            setLoading(false)
        })
    }

    const handleMaxChange = (value: string) => {
        if(value == '') {
            setMax(undefined)
        } else if (!isNaN(Number(value))) {
            if(Number(value) >= 0)
                setMax(Number(value))
            else 
                setMax(0)
        }
    }

    useEffect(() => {
        getData(max)
    }, [max])


    return (
        <>
            <InfoCard
                link="http://localhost:3000/api/api1"
                title="API 1"
                description="Restituire la lista delle richieste di lavoro"
                type="GET"
                exampleOutput={(<div>
                    &#123; <br />
                    &emsp;    "status": "OK", <br />
                    &emsp;    "data": [ <br />
                    &emsp;&emsp;&#123; <br />
                    &emsp;&emsp;&emsp;     <br />
                    &emsp;&emsp;&emsp;    "nome": "Luca", <br />
                    &emsp;&emsp;&emsp;    "descrizione": "Ciao mi piace" <br />
                    &emsp;&emsp;&#125; <br />
                    &emsp;] <br />
                    &#125;
                </div>)} />

            <Input min={0} value={max} onChange={(e) => handleMaxChange(e.target.value)} placeholder="Numero massimo" className="w-[200px] mt-3" type="number" />
            {data && <div>
                {data.data.map((l) => (
                    <div key={l.OffertaLavoroID} className="mt-3">
                        <LavoroCard lavoro={l} />
                    </div>
                ))}
            </div>}

            {loading && <Loading />}
        </>
    )
}

export default Page