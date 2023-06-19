export interface ParamsEntity {
    search?: string
    limit?: number
    offset?: number
    vendor_type?: string
    vendor_id?: number
    freight_id?: number
    freight_cost_id?: number
    page?: number
    size?: number
    stockpile_id?: number
    currency_id?: number
    columnKey?: string
    columnValue?: string | number
    whereKey?: string
    whereValue?: Array<string | number>
    filter?: string | number
    kontrak_type?: string | number
    pks_type?: string | number
    purchasing_id?: number
    re_entry?: boolean
    final_status?: number
    status?: number
    purchasing_detail_id?: number
    options?: string
    user_id?: number
}