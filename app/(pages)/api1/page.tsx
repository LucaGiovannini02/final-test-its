'use client'

import InfoCard from "@/components/InfoCard"
import { useEffect, useState } from "react"
import API from "@/lib/axios"
import HttpCalls from "@/hooks/HttpCalls"
import { Button } from "@/components/ui/button"

const Page = () => {
    const [ loading, data, error, fetch ] = HttpCalls("/prova")

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

            {!loading ? <div>{JSON.stringify(data)}</div> : <div>loading</div>}
        </>
    )
}

export default Page