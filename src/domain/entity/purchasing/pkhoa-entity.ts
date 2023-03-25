export interface PkhoaEntity {
    id?: number
    contract_pkhoa?: string
    stockpile_id?: number
    freight_id?: number
    vendor_id?: number
    currency_id?: number
    exchange_rate?: number
    price?: number
    price_converted?: number
    payment_notes?: string
    company_id?: number
    remarks?: string
    shrink_tolerance_kg?: number
    shrink_tolerance_persen?: number
    shrink_claim?: number
    active_from?: string
    file?: string
    status?: number
    modify_by?: string
    modify_date?: string
    entry_by?: string
    entry_date?: string
    cara_pembayaran?: number
}