import { EntityUser, PksCurahEntity } from '../../entity'

export interface IRegisterUserPurchasingUseCase {
  execute(data: EntityUser): Promise<any>
}

export interface ILoginUserPurchasingUseCase {
  execute(data: EntityUser): Promise<EntityUser | null>
}

export interface IPengajuanPksCurahUseCase {
  execute(data?: PksCurahEntity): Promise<any>
}