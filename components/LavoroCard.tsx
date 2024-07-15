import { Lavoro } from "@/lib/definitions"
import { Card } from "./ui/card"

const LavoroCard = ({ lavoro, button }: { lavoro: Lavoro, button?: React.ReactNode })  => {
    return (
        <Card className="w-full flex p-3 items-center">
            <div className="w-1/12">{lavoro.OffertaLavoroID}</div>
            <div className="w-2/12">{lavoro.Titolo}</div>
            <div className="w-4/12">{lavoro.DescrizioneBreve}</div>
            <div className="w-2/12">{lavoro.DataInserimento.toString().split('T')[0]}</div>
            <div className="w-2/12">{lavoro.RetribuzioneLorda}</div>
            <div className="w-1/12">{button}</div>
        </Card>
    )
}

export default LavoroCard