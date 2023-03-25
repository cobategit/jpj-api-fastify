export interface CurrencyEntity {
    currency_id?: number
    currency_code?: string
    currency_name?: string
    is_country_currency?: number
    is_purchase_currency?: number
    is_sales_currency?: number
    is_report_currency?: number
    entry_by?: string
    entry_date?: string
    sync_by?: string
    sync_date?: string
}