import {
  CurrencyEntity,
  EntityUser,
  FreightBankEntity,
  FreightEntity,
  ParamsEntity,
  PkhoaEntity,
  PksCurahBankEntity,
  PksCurahEntity,
  PoPksEntity,
  PurchasingEntity,
  StockpileEntity,
  VendorKontrakEntity,
} from '../../entity'

export interface IPurchasingRepo {
  registerUserPurchasing(data: EntityUser): Promise<any>
  checkEmail(email: string): Promise<EntityUser | null>
  checkDeviceId(deviceId: string): Promise<EntityUser | null>
  pengajuanPksCurah(user_id?: number, data?: PksCurahEntity): Promise<any>
  pengajuanFreight(user_id?: number, data?: FreightEntity): Promise<any>
  findAllPksCurah(
    conf?: Pick<ParamsEntity, 'limit' | 'offset' | 'search' | 'vendor_type'>
  ): Promise<{ count: number; rows: PksCurahEntity[] }>
  findAllPksCurahBank(
    conf?: Pick<ParamsEntity, 'limit' | 'offset' | 'search'>
  ): Promise<{ count: number; rows: PksCurahBankEntity[] }>
  findOnePksCurahBank(id?: number): Promise<PksCurahBankEntity | null>
  findBankByPksCurahId(id?: number[]): Promise<PksCurahBankEntity[]>
  findOnePksCurah(id?: number): Promise<PksCurahEntity | null>
  updatePksCurah(
    id: number,
    user_id: number,
    data?: PksCurahEntity
  ): Promise<any>
  deletePksCurah(id?: number, user_id?: number): Promise<any>
  findAllFreight(
    conf?: Pick<ParamsEntity, 'limit' | 'offset' | 'search'>
  ): Promise<{ count: number; rows: FreightEntity[] }>
  findOneFreight(id?: number): Promise<FreightEntity | null>
  updateFreight(id: number, user_id: number, data?: FreightEntity): Promise<any>
  deleteFreight(id?: number, user_id?: number): Promise<any>
  findAllFreightBank(
    conf?: Pick<ParamsEntity, 'limit' | 'offset'>
  ): Promise<{ count: number; rows: FreightBankEntity[] }>
  findAllCurrency(
    conf?: Pick<ParamsEntity, 'limit' | 'offset'>
  ): Promise<{ count: number; rows: CurrencyEntity[] }>
  findOneCurrency(id?: number): Promise<CurrencyEntity>
  findOneStockpile(id?: number): Promise<StockpileEntity | null>
  findAllStockpile(
    conf?: Pick<ParamsEntity, 'limit' | 'offset'>
  ): Promise<{ count: number; rows: StockpileEntity[] }>
  findBankByFreightId(id?: number[]): Promise<FreightBankEntity[]>
  pengajuanPkhoa(user_id?: number, data?: PkhoaEntity): Promise<any>
  findAllPkhoa(conf?: Pick<ParamsEntity, 'limit' | 'offset' | 'search'>): Promise<{ count: number; rows: PkhoaEntity[] }>
  findOnePkhoa(id?: number): Promise<PkhoaEntity | null>
  updatePkhoa(
    id: number,
    user_id: number,
    data?: PkhoaEntity
  ): Promise<any>
  deletePkhoa(id?: number, user_id?: number): Promise<any>
  findOnePkhoaDynamic(conf?: Pick<ParamsEntity, 'tableCol1' | 'tableVal1'>): Promise<PkhoaEntity[]>
  getPkhoaExclude(stockpile_id: number, vendor_id: number): Promise<any>
  pengajuanKontrakPks(user_id?: number, data?: PurchasingEntity): Promise<any>
  findOnePurchasingDynamic(conf?: Pick<ParamsEntity, 'tableCol1' | 'tableVal1'>): Promise<PurchasingEntity[]>
  findOnePoPksDynamic(conf?: Pick<ParamsEntity, 'tableCol1' | 'tableVal1'>): Promise<PoPksEntity[]>
  findOneVendorKontrakDynamic(conf?: Pick<ParamsEntity, 'tableCol1' | 'tableVal1'>): Promise<VendorKontrakEntity[]>
  findAllKontrakPks(conf?: ParamsEntity): Promise<{ count: number; rows: PurchasingEntity[] }>
}
