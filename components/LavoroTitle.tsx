import { Card } from "./ui/card"

const LavoroTitle = ()  => {
    return (
        <Card className="w-full flex p-3 mt-3 items-center font-semibold">
            <div className="w-1/12">ID</div>
            <div className="w-2/12">Titolo</div>
            <div className="w-4/12">DescrizioneBreve</div>
            <div className="w-2/12">DataInserimento</div>
            <div className="w-2/12">RetribuzioneLorda</div>
            <div className="w-1/12"></div>
        </Card>
    )
}

export default LavoroTitle