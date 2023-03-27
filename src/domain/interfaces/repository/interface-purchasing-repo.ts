import {
  CurrencyEntity,
  EntityUser,
  FreightBankEntity,
  FreightEntity,
  ParamsEntity,
  PkhoaEntity,
  PksCurahEntity,
  StockpileEntity,
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
  findOnePksCurah(id?: number): Promise<PksCurahEntity>
  updatePksCurah(
    id: number,
    user_id: number,
    data?: PksCurahEntity
  ): Promise<any>
  findAllFreight(
    conf?: Pick<ParamsEntity, 'limit' | 'offset' | 'search'>
  ): Promise<{ count: number; rows: FreightEntity[] }>
  findOneFreight(id?: number): Promise<FreightEntity>
  updateFreight(id: number, user_id: number, data?: FreightEntity): Promise<any>
  findAllCurrency(
    conf?: Pick<ParamsEntity, 'limit' | 'offset'>
  ): Promise<{ count: number; rows: CurrencyEntity[] }>
  findAllFreightBank(
    conf?: Pick<ParamsEntity, 'limit' | 'offset'>
  ): Promise<{ count: number; rows: FreightBankEntity[] }>
  findAllStockpile(
    conf?: Pick<ParamsEntity, 'limit' | 'offset'>
  ): Promise<{ count: number; rows: StockpileEntity[] }>
  findBankByFreightId(id?: number): Promise<FreightBankEntity[]>
  pengajuanPkhoa(user_id?: number, data?: PkhoaEntity): Promise<any>
  findAllPkhoa(conf?: Pick<ParamsEntity, 'limit' | 'offset' | 'search'>): Promise<{ count: number; rows: PkhoaEntity[] }>
  findOnePkhoa(id?: number): Promise<PkhoaEntity>
  updatePkhoa(
    id: number,
    user_id: number,
    data?: PkhoaEntity
  ): Promise<any>
}
