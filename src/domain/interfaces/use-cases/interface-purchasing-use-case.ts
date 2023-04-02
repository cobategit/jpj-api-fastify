import { CurrencyEntity, EntityUser, FreightBankEntity, FreightEntity, ParamsEntity, PkhoaEntity, PksCurahEntity, PurchasingEntity, StockpileEntity } from '../../entity'

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
  execute(conf?: ParamsEntity): Promise<Record<string, any>>
}

export interface IGetAllPksCurahBankUseCase {
  execute(conf?: ParamsEntity): Promise<Record<string, any>>
}

export interface IGetOnePksCurahUseCase {
  execute(id?: number): Promise<PksCurahEntity | null>
}

export interface IUpdatePksCurahUseCase {
  execute(id: number, user_id: number, data?: PksCurahEntity): Promise<any>
}

export interface IDeletePksCurahUseCase {
  execute(id: number, user_id: number): Promise<any>
}

export interface IGetAllFreightUseCase {
  execute(conf?: ParamsEntity): Promise<Record<string, any>>
}

export interface IGetOneFreightUseCase {
  execute(id?: number): Promise<FreightEntity | null>
}

export interface IUpdateFreightUseCase {
  execute(id: number, user_id: number, data?: FreightEntity): Promise<any>
}

export interface IDeleteFreightUseCase {
  execute(id: number, user_id: number): Promise<any>
}

export interface IGetAllCurrencyUseCase {
  execute(conf?: ParamsEntity): Promise<Record<string, any>>
}

export interface IGetOneCurrencyUseCase {
  execute(id?: number): Promise<CurrencyEntity | null>
}

export interface IGetAllFreightBankUseCase {
  execute(conf?: ParamsEntity): Promise<Record<string, any>>
}

export interface IGetOneStockpileUseCase {
  execute(id?: number): Promise<StockpileEntity | null>
}

export interface IGetAllStockpileUseCase {
  execute(conf?: ParamsEntity): Promise<Record<string, any>>
}

export interface IGetBankByFreightIdUseCase {
  execute(id?: number): Promise<FreightBankEntity[]>
}

export interface IPengajuanPkhoaUseCase {
  execute(user_id?: number, data?: PkhoaEntity): Promise<any>
}

export interface IGetAllPkhoaUseCase {
  execute(conf?: ParamsEntity): Promise<Record<string, any>>
}

export interface IGetOnePkhoaUseCase {
  execute(id?: number): Promise<PkhoaEntity | null>
}

export interface IUpdatePkhoaUseCase {
  execute(id: number, user_id: number, data?: PkhoaEntity): Promise<any>
}

export interface IDeletePkhoaUseCase {
  execute(id: number, user_id: number): Promise<any>
}

export interface IPengajuanKontrakPksUseCase {
  execute(user_id?: number, data?: PurchasingEntity): Promise<any>
}