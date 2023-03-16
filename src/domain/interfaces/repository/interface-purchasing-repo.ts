import { EntityUser, FreightEntity, PksCurahEntity } from '../../entity'

export interface IPurchasingRepo {
  registerUserPurchasing(data: EntityUser): Promise<any>
  checkEmail(email: string): Promise<EntityUser | null>
  checkDeviceId(deviceId: string): Promise<EntityUser | null>
  pengajuanPksCurah(data?: PksCurahEntity): Promise<any>
  pengajuanFreight(data?: FreightEntity): Promise<any>
  getPksCurah(): Promise<PksCurahEntity[]>
}
