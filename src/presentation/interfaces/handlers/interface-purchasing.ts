export interface IPurchasingHandler {
  register(request: any, reply: any): Promise<void>
  login(request: any, reply: any): Promise<void>
  pengajuanPksCurah(request: any, reply: any): Promise<void>
  pengajuanFreight(request: any, reply: any): Promise<void>
  findAllPksCurah(request: any, reply: any): Promise<void>
  findOnePksCurah(request: any, reply: any): Promise<void>
  updatePksCurah(request: any, reply: any): Promise<void>
  findAllFreight(request: any, reply: any): Promise<void>
  findOneFreight(request: any, reply: any): Promise<void>
  updateFreight(request: any, reply: any): Promise<void>
  findAllCurrency(request: any, reply: any): Promise<void>
  findAllFreightBank(request: any, reply: any): Promise<void>
  findAllStockpile(request: any, reply: any): Promise<void>
  findBankByFreightId(request: any, reply: any): Promise<void>
  pengajuanPkhoa(request: any, reply: any): Promise<void>
  findAllPkhoa(request: any, reply: any): Promise<void>
}