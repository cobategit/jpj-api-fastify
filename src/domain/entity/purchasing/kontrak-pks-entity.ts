export interface PurchasingEntity {
    purchasing_id?: number
    stockpile_id?: number
    contract_type?: number
    vendor_id?: number
    jenis_file?: string
    kategori_file?: string
    upload_file?: string
    approval_file?: string
    upload_file1?: string
    upload_file2?: string
    upload_file3?: string
    upload_file4?: string
    entry_by?: number
    entry_date?: string
    contract_id?: number
    quantity?: number
    price?: number
    ppn?: number
    freight?: number
    freight_cost_id?: number
    admin_input?: string
    status?: number
    company?: number
    ho?: number
    link?: number
    import2?: string
    reject_note?: string
    payment_id?: number
    open_add?: number
    import2_date?: string
    add_time?: number
    payment_type?: number
    plan_payment_date?: string
    type?: number
    logbook_status?: number
    tempVendor?: string
}

export interface PoPksEntity {
    po_pks_id?: number
    contract_no?: string
    spb_no?: string
    stockpile_id?: number
    vendor_id?: number
    currency_id?: number
    exchange_rate?: number
    price?: number
    price_converted?: number
    quantity?: number
    po_status?: number
    lock_contract?: number
    notes?: string
    company_id?: number
    entry_by?: number
    entry_date?: string
    sync_by?: number
    sync_date?: string
    purchasing_id?: number
    final_status?: number
    notes2?: string
    reject_status?: number
}

export interface VendorKontrakEntity {
    vendor_contract_id?: number
    freight_cost_id?: number
    po_pks_id?: number
    stockpile_contract_id?: number
    quantity?: number
    stockpile_quantity?: number
    status?: number
    entry_by?: number
    entry_date?: string
    updated_at?: string
}