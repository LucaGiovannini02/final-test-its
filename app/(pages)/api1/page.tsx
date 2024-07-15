'use client'

import InfoCard from "@/components/InfoCard"
import LavoroCard from "@/components/LavoroCard"
import API from "@/lib/axios"
import { HttpResponse, Lavoro } from "@/lib/definitions"
import { useEffect, useState } from "react"

const Page = () => {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState<HttpResponse<Lavoro[]> | undefined>(undefined)
    const [error, setError] = useState<any>()

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

            {data && <div>
                {data.data.map((l) => (
                    <div key={l.OffertaLavoroID} className="mt-3">
                        <LavoroCard lavoro={l} />
                    </div>
                ))}
            </div>}
        </>
    )
}

export default Page