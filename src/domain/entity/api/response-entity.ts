export interface HttpResponse<T> {
    status: boolean
    message: string
    data?: T
}