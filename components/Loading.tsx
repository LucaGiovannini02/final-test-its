import { Loader2 } from "lucide-react"

const Loading = () => {
    return (
        <div className="w-full py-12 flex justify-center">
            <Loader2 className="animate-spin" />
        </div>
    )
}

export default Loading