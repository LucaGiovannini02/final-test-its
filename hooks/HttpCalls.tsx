
import API from "@/lib/axios"
import { useEffect, useState } from "react"

const HttpCalls = (endPoint: string) => {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState<any>()
    const [error, setError] = useState<any>()

    useEffect(() => {
        fetch()
    }, [endPoint])

    const fetch = () => {
        setLoading(true)
        API.get(`/api/${endPoint}`).then((res) => {
            setData(res.data)
        }).then((err) => {
            setError(err)
        }).finally(() => {
            setLoading(false)
        })
    }

    return [ loading, data, error, fetch ]
}

export default HttpCalls