import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";

export type Info = {
    title: string,
    type: 'POST' | 'GET' | 'DELETE',
    link: string,
    description: string,
    exampleInput?: string | React.ReactNode,
    exampleOutput?: string | React.ReactNode
}

// &#123; --> {
// &#125; --> }
// &emsp; --> tab

const InfoCard = (info: Info) => {
    return (
        <Card className="w-full">
            <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                    <CardHeader>
                        <AccordionTrigger>
                            <CardTitle>{info.title}</CardTitle>
                        </AccordionTrigger>
                    </CardHeader>
                    <AccordionContent>
                        <CardContent className="space-y-3">
                            <div className="flex">Tipo: <div className="bg-gray-200 rounded px-2 ml-3 font-extralight text-red-500">{info.type}</div></div>
                            <div className="flex">Endpoint: <a href={info.link} target="_blank" className="hover:underline bg-gray-200 rounded px-2 ml-3 font-extralight text-red-500">{info.link}</a></div>
                            <div className="flex">Descrizione: {info.description}</div>
                            {info.exampleInput && <div>Esempio input: <div className="bg-gray-200 rounded mt-2 px-2 font-extralight text-red-500">{info.exampleInput}</div></div>}
                            {info.exampleOutput && <div>Esempio output: <div className="bg-gray-200 rounded mt-2 px-2 font-extralight text-red-500">{info.exampleOutput}</div></div>}
                        </CardContent>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </Card>
    )
}

export default InfoCard