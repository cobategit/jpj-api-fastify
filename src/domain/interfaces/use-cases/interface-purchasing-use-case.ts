import { CurrencyEntity, EntityUser, FreightBankEntity, FreightEntity, ParamsEntity, PkhoaEntity, PksCurahEntity, StockpileEntity } from '../../entity'

export interface IRegisterUserPurchasingUseCase {
  execute(data: EntityUser): Promise<any>
}

export interface ILoginUserPurchasingUseCase {
  execute(data: EntityUser): Promise<EntityUser | null>
}

export interface IPengajuanPksCurahUseCase {
  execute(user_id?: number, data?: PksCurahEntity): Promise<any>
}

export interface IPengajuanFreightUseCase {
  execute(user_id?: number, data?: FreightEntity): Promise<any>
}

export interface IGetAllPksCurahUseCase {
  execute(conf?: Pick<ParamsEntity, 'limit' | 'offset' | 'search' | 'vendor_type'>): Promise<{ count: number, rows: PksCurahEntity[] }>
}

export interface IGetOnePksCurahUseCase {
  execute(id?: number): Promise<PksCurahEntity | null>
}

export interface IUpdatePksCurahUseCase {
  execute(id: number, user_id: number, data?: PksCurahEntity): Promise<any>
}

export interface IGetAllFreightUseCase {
  execute(conf?: Pick<ParamsEntity, 'limit' | 'offset' | 'search'>): Promise<{ count: number, rows: FreightEntity[] }>
}

export interface IGetOneFreightUseCase {
  execute(id?: number): Promise<FreightEntity | null>
}

export interface IUpdateFreightUseCase {
  execute(id: number, user_id: number, data?: FreightEntity): Promise<any>
}

export interface IGetAllCurrencyUseCase {
  execute(conf?: Pick<ParamsEntity, 'limit' | 'offset'>): Promise<{ count: number, rows: CurrencyEntity[] }>
}

export interface IGetAllFreightBankUseCase {
  execute(conf?: Pick<ParamsEntity, 'limit' | 'offset'>): Promise<{ count: number, rows: FreightBankEntity[] }>
}

export interface IGetAllStockpileUseCase {
  execute(conf?: Pick<ParamsEntity, 'limit' | 'offset'>): Promise<{ count: number, rows: StockpileEntity[] }>
}

export interface IGetBankByFreightIdUseCase {
  execute(id?: number): Promise<FreightBankEntity[]>
}

export interface IPengajuanPkhoaUseCase {
  execute(user_id?: number, data?: PkhoaEntity): Promise<any>
}