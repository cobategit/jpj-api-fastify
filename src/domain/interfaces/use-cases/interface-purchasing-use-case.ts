import { EntityUser, FreightEntity, ParamsEntity, PksCurahEntity } from '../../entity'

export interface IRegisterUserPurchasingUseCase {
  execute(data: EntityUser): Promise<any>
}

export interface ILoginUserPurchasingUseCase {
  execute(data: EntityUser): Promise<EntityUser | null>
}

export interface IPengajuanPksCurahUseCase {
  execute(user_id?: number, data?: PksCurahEntity): Promise<any>
}

export interface IPengajuanFreight {
  execute(user_id?: number, data?: FreightEntity): Promise<any>
}

export interface IGetAllPksCurahUseCase {
  execute(conf?: Pick<ParamsEntity, 'limit' | 'offset' | 'search' | 'vendor_type'>): Promise<{ count: number, rows: PksCurahEntity[] }>
}