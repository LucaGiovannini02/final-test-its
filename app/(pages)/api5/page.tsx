'use client'

import InfoCard from "@/components/InfoCard"
import LavoroCard from "@/components/LavoroCard"
import Loading from "@/components/Loading"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import API from "@/lib/axios"
import { HttpResponse, Lavoro } from "@/lib/definitions"
import { useEffect, useState } from "react"

const Page = () => {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState<HttpResponse<Lavoro[]> | undefined>(undefined)
    const [error, setError] = useState<any>()

    const [filter, setFilter] = useState('')
    const [max, setMax] = useState<number | undefined>()

    useEffect(() => {
        getData()
    }, [])

    const getData = (x: string = '') => {
        setData(undefined)
        setLoading(true)
        API.get<HttpResponse<Lavoro[]>>(`/api/api5${x}`).then((res) => {
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

    const apply = () => {
        let aus = '?'
        if(max) {
            aus += `max=${max}`
        }
        if(filter) {
            if(aus.length > 1)
                aus += `&filter=${filter}`
            else
                aus += `filter=${filter}`
        }

        if(aus.length > 1)
            getData(aus)
        else 
            getData()
    }

    return (
        <>
            <InfoCard
                link="http://localhost:3000/api/prova"
                title="API 1"
                description="Restituire la lista delle richieste di finanziamento (in ordine decrescente di
                    DataInserimentoRichiesta) inviando tramite Get il numero massimo di Richieste di finanziamento
                    che si vogliono visualizzare"
                type="GET"
                exampleOutput={(<div>
                    &#123; <br />
                    &emsp;    "status": "OK", <br />
                    &emsp;    "data": [ <br />
                    &emsp;&emsp;&#123; <br />
                    &emsp;&emsp;&emsp;    "id": 1, <br />
                    &emsp;&emsp;&emsp;    "nome": "Luca", <br />
                    &emsp;&emsp;&emsp;    "descrizione": "Ciao mi piace" <br />
                    &emsp;&emsp;&#125; <br />
                    &emsp;] <br />
                    &#125;
                </div>)} />

            <div className="flex space-x-3 mt-3">
                <Input onChange={(e) => setFilter(e.target.value)} placeholder="Titolo o breve descrizione" className="w-[500px]" />
                <Input min={0} value={max} onChange={(e) => handleMaxChange(e.target.value)} placeholder="Numero massimo" className="w-[200px]" type="number" />
                <Button onClick={apply}>Applica</Button>
            </div>
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