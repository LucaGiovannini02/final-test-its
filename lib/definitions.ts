export type HttpResponse<T> = {
    status: string,
    data: T
}

export type Lavoro = {
    OffertaLavoroID: number
    Titolo: string,
    DescrizioneBreve: string,
    DataInserimento: Date,
    RetribuzioneLorda: number
}