export interface IPurchasingHandler {
  register(request: any, reply: any): Promise<void>
  login(request: any, reply: any): Promise<void>
  pengajuanPksCurah(request: any, reply: any): Promise<void>
  pengajuanFreight(request: any, reply: any): Promise<void>
  findAllPksCurah(request: any, reply: any): Promise<void>
  findOnePksCurah(request: any, reply: any): Promise<void>
  updatePksCurah(request: any, reply: any): Promise<void>
}