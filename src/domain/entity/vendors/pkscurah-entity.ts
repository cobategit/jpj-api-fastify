export interface PksCurahEntity {
    id?: number
    vendor_code?: string
    vendor_name?: string
    vendor_address?: string
    entry_date?: string
    stockpile_id?: number
    active?: number
    pic?: string
    phone_pic?: string
    file_npwp?: string
    file_pkp?: string
    file_rekbank?: string[]
    curah?: number
    jenis_file?: string
    kategori_file?: string
    notes?: string
}

export interface PksCurahBankEntity {
    v_bank_id?: number
    vendor_id?: number
    bank_name?: string
    account_no?: string
    active?: number
    file_rekbank?: string
}