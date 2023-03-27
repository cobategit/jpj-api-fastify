export interface StockpileEntity {
  stockpile_id?: number
  stockpile_code?: string
  stockpile_name?: string
  stockpile_address?: string
  stockpile_email?: string
  freight_weight_rule?: number
  curah_weight_rule?: number
  shrink_tolerance_kg?: number
  shrink_tolerance_persen?: number
  shrink_claim?: number
  latitude?: string
  longitude?: string
  url_cctv?: string
  active?: number
  vendor_portal?: number
  entry_by?: string
  entry_date?: string
  sync_by?: number
  updated_by?: number
  sync_date?: string
}
