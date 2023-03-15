export interface IRegisterUserPurchasingHandler {
  execute(request: any, reply: any): Promise<void>
}

export interface ILoginUserPurchasingHandler {
  execute(request: any, reply: any): Promise<void>
}

export interface IPengajuanPksCurahHandler {
  execute(request: any, reply: any): Promise<void>
}
