import { EntityUser, PksCurahEntity } from '../../entity'

export interface IPurchasingRepo {
  registerUserPurchasing(data: EntityUser): Promise<any>
  checkEmail(email: string): Promise<EntityUser | null>
  pengajuanPksCurah(data?: PksCurahEntity): Promise<any>
}
