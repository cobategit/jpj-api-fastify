export interface PksCurahEntity {
    vendor_id?: number
    vendor_code?: string
    vendor_name?: string
    vendor_address?: string
    entry_date?: string
    stockpile_id?: number
    active?: number
    pic?: string
    phone_pic?: string
    ppn_tax_id?: number
    ppn?: number
    file_npwp?: string
    file_pkp?: string
    file_rekbank?: string[]
    curah?: number
    jenis_file?: string
    kategori_file?: string
    notes?: string
    v_bank_id?: string | string[]
    bank?: PksCurahBankEntity[]
}

export interface PksCurahBankEntity {
    v_bank_id?: number
    vendor_id?: number
    bank_name?: string
    account_no?: string
    active?: number
    file_rekbank?: string
}