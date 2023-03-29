export interface HttpResponse {
    status: number
    message: string
    data: Record<string, any>
}