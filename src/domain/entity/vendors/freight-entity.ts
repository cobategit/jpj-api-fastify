export interface FreightEntity {
    freight_id?: number
    freight_code?: string
    freight_supplier?: string
    freight_address?: string
    id_user_stockpile?: number
    pic?: string
    phone_pic?: string
    active?: number
    entry_date?: string
    file_npwp?: string
    file_pkp?: string
    file_ktp?: string
    file_rekbank?: string[]
    jenis_file?: string
    kategori_file?: string
    notes?: string
    bank?: FreightBankEntity[]
}

export interface FreightBankEntity {
    f_bank_id?: number
    freight_id?: number
    bank_name?: string
    account_no?: string
    active?: number
    file_rekbank?: string
}

export interface FreightGroupEntity {
    master_group_id?: number
    group_name?: string
    entry_by?: number
    entry_date?: string
}