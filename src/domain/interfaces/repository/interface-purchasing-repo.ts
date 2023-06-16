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
  PurchasingDetailEntity,
  PurchasingEntity,
  StockpileEntity,
  TypePengajuanKontrakPks,
  VendorKontrakEntity,
} from '../../entity'

export interface IPurchasingRepo {
  registerUserPurchasing(data: EntityUser): Promise<any>
  checkEmail(email: string): Promise<EntityUser | null>
  checkDeviceId(deviceId: string): Promise<EntityUser | null>
  updateKodeAksesUser(deviced_id: string, kode_akses: string): Promise<any>
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
  findOnePkhoaDynamic(conf?: Pick<ParamsEntity, 'columnKey' | 'columnValue'>): Promise<PkhoaEntity[]>
  getPkhoaExclude(stockpile_id: number, vendor_id: number, req_payment_date: string): Promise<any>
  pengajuanKontrakPks(user_id?: number, data?: TypePengajuanKontrakPks): Promise<any>
  findOnePurchasingDynamic(conf?: Pick<ParamsEntity, 'columnKey' | 'columnValue'>): Promise<PurchasingEntity[]>
  findOnePoPksDynamic(conf?: Pick<ParamsEntity, 'columnKey' | 'columnValue'>): Promise<PoPksEntity[]>
  findOneVendorKontrakDynamic(conf?: Pick<ParamsEntity, 'columnKey' | 'columnValue'>): Promise<VendorKontrakEntity[]>
  findAllKontrakPks(conf?: ParamsEntity): Promise<{ count: number; rows: PurchasingEntity[] }>
  findOneKontrakPks(id?: number): Promise<PurchasingEntity | null>
  findPlanPaymentDate(): Promise<any>
  deletePurchasing(id?: number, user_id?: number): Promise<any>
  deletePopks(id?: number, user_id?: number): Promise<any>
  deleteVendorKontrak(id?: number, user_id?: number): Promise<any>
  deletePurchasingFreightCost(id?: number, user_id?: number): Promise<any>
  updateFilePurchasing(id?: number, user_id?: number, data?: Pick<PurchasingEntity, 'upload_file' | 'approval_file' | 'upload_file1' | 'upload_file2' | 'upload_file3' | 'upload_file4'>): Promise<any>
  updateFileSpbPurchasing(id?: number, user_id?: number, data?: Pick<PurchasingEntity, 'import2' | 'approval_file' | 'upload_file1' | 'upload_file2' | 'upload_file3' | 'upload_file4' | 'import2_date'>): Promise<any>
  addTerminKontrakPks(data?: PurchasingDetailEntity): Promise<any>
  findOneTerminKontrakPks(id?: number): Promise<PurchasingDetailEntity | null>
  findOneDynamicPurchasingDetail(conf?: Pick<ParamsEntity, "columnKey" | "columnValue" | "options">): Promise<PurchasingDetailEntity[] | []>
  checkQuantityTerminKontrakPks(type?: string, data?: TypePengajuanKontrakPks): Promise<any>
  updateTerminKontrakPks(id?: number, user_id?: number, data?: PurchasingDetailEntity): Promise<any>
  deleteTerminKontrakPks(id?: number, user_id?: number): Promise<any>
}
