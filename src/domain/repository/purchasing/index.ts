import { ICurrencyDataSource, IFreighDataSource, IHistoryLogDataSource, IPkhoaDataSource, IPksCurahDataSource, IPoPksDataSource, IPurchasingDataSource, ISetupsDataSource, IStockpileDataSource, IUsersDataSource, IVendorKontrakDataSource } from '../../../data'
import { CurrencyEntity, EntityUser, FreightBankEntity, FreightEntity, HistoryLogEntity, ParamsEntity, PkhoaEntity, PksCurahBankEntity, PksCurahEntity, PoPksEntity, PurchasingEntity, StockpileEntity, VendorKontrakEntity } from '../../entity'
import { IPurchasingRepo } from '../../interfaces'
import { format } from 'date-fns'

export class PurchasingRepository implements IPurchasingRepo {
  private userDataSource: IUsersDataSource
  private pksCurahDataSource: IPksCurahDataSource
  private freightDataSource: IFreighDataSource
  private historyLogDataSource: IHistoryLogDataSource
  private currencyDataSource: ICurrencyDataSource
  private stockpileDataSource: IStockpileDataSource
  private pkhoaDataSource: IPkhoaDataSource
  private purchasingDataSource: IPurchasingDataSource
  private poPksDataSource: IPoPksDataSource
  private vendorKontrakDataSource: IVendorKontrakDataSource
  private setupsDataSource: ISetupsDataSource

  constructor(userDataSource: IUsersDataSource, pksCurahDataSource: IPksCurahDataSource, freightDataSource: IFreighDataSource, historyLogDataSource: IHistoryLogDataSource, currencyDataSource: ICurrencyDataSource, stockpileDataSource: IStockpileDataSource, pkhoaDataSource: IPkhoaDataSource, purchasingDataSource: IPurchasingDataSource, poPksDataSource: IPoPksDataSource, vendorKontrakDataSource: IVendorKontrakDataSource, setupsDataSource: ISetupsDataSource) {
    this.userDataSource = userDataSource
    this.pksCurahDataSource = pksCurahDataSource
    this.freightDataSource = freightDataSource
    this.historyLogDataSource = historyLogDataSource
    this.currencyDataSource = currencyDataSource
    this.stockpileDataSource = stockpileDataSource
    this.pkhoaDataSource = pkhoaDataSource
    this.purchasingDataSource = purchasingDataSource
    this.poPksDataSource = poPksDataSource
    this.vendorKontrakDataSource = vendorKontrakDataSource
    this.setupsDataSource = setupsDataSource
  }

  async registerUserPurchasing(data: EntityUser): Promise<any> {
    const res = await this.userDataSource.registerUserPurchasing(data!)
    return res
  }

  async checkEmail(email: string): Promise<EntityUser | null> {
    const res = await this.userDataSource.selectByEmail(email!)
    return res
  }

  async checkDeviceId(deviceId: string): Promise<EntityUser | null> {
    const res = await this.userDataSource.selectByDeviceId(deviceId!)
    return res
  }

  async pengajuanPksCurah(user_id?: number, data?: PksCurahEntity | undefined): Promise<any> {
    const res = await this.pksCurahDataSource.insert(data)

    let vendor_type = data?.curah == 0 ? 'PKS' : 'CURAH'
    const dataHistoryLog: HistoryLogEntity = {
      tanggal: `${format(new Date(), 'yyyy-MM-dd HH:mm:ss')}`,
      transaksi: `${res[0].insertId}`,
      cud: 'CREATE',
      isitransaksi_baru: `MENGAJUKAN VENDOR ${vendor_type} BARU DENGAN NAMA ${data?.vendor_name}`,
      user_id: user_id
    }

    Promise.all(
      [data?.file_rekbank?.map(async (val: string) => {
        const dataBank: PksCurahBankEntity = {
          vendor_id: res[0].insertId,
          file_rekbank: val,
          active: 2
        }

        await this.pksCurahDataSource.insertBank(dataBank)
      })]
    )

    await this.historyLogDataSource.insert(dataHistoryLog)

    return res
  }

  async pengajuanFreight(user_id?: number, data?: FreightEntity | undefined): Promise<any> {
    const res = await this.freightDataSource.insert(data)
    const dataHistoryLog: HistoryLogEntity = {
      tanggal: `${format(new Date(), 'yyyy-MM-dd HH:mm:ss')}`,
      transaksi: `${res[0].insertId}`,
      cud: 'CREATE',
      isitransaksi_baru: `MENGAJUKAN VENDOR BARU DENGAN NAMA ${data?.freight_supplier}`,
      user_id: user_id
    }

    Promise.all(
      [data?.file_rekbank?.map(async (val: string) => {
        const dataBank: FreightBankEntity = {
          freight_id: res[0].insertId,
          file_rekbank: val,
          active: 2
        }

        await this.freightDataSource.insertBank(dataBank)
      })]
    )

    await this.historyLogDataSource.insert(dataHistoryLog)

    return res
  }

  async findAllPksCurah(conf?: Pick<ParamsEntity, 'limit' | 'offset' | 'search' | 'vendor_type'>): Promise<{ count: number, rows: PksCurahEntity[] }> {
    const count = await this.pksCurahDataSource.count()
    const rows = await this.pksCurahDataSource.selectAll(conf)
    return { count: count.count, rows }
  }

  async findAllPksCurahBank(conf?: Pick<ParamsEntity, 'limit' | 'offset' | 'search'>): Promise<{ count: number, rows: PksCurahBankEntity[] }> {
    const count = await this.pksCurahDataSource.count()
    const rows = await this.pksCurahDataSource.selectAllBank(conf)
    return { count: count.count, rows }
  }

  async findBankByPksCurahId(id?: number[] | undefined): Promise<PksCurahBankEntity[]> {
    const rows = await this.pksCurahDataSource.selectBankByPksCurahId(id)
    return rows
  }

  async findOnePksCurah(id?: number): Promise<PksCurahEntity | null> {
    const rows = await this.pksCurahDataSource.selectOne(id)
    return rows
  }

  async updatePksCurah(id: number, user_id: number, data?: PksCurahEntity): Promise<any> {
    const res = await this.pksCurahDataSource.update(id, data)

    let vendor_type = data?.curah == 0 ? 'PKS' : 'CURAH'
    const dataHistoryLog: HistoryLogEntity = {
      tanggal: `${format(new Date(), 'yyyy-MM-dd HH:mm:ss')}`,
      transaksi: `${id}`,
      cud: 'UPDATE',
      isitransaksi_lama: `MENGUBAH VENDOR ${vendor_type} BARU YANG DIAJUKAN DENGAN NAMA ${data?.vendor_name}`,
      user_id: user_id
    }

    // await Promise.all(
    //   [
    //     data?.file_rekbank?.map(async (val: string) => {
    //       const dataBank: PksCurahBankEntity = {
    //         vendor_id: id,
    //         file_rekbank: val,
    //         active: 2
    //       }

    //       await this.pksCurahDataSource.updateBank(id, dataBank)
    //     })
    //   ]
    // )

    await this.historyLogDataSource.insert(dataHistoryLog)

    return res
  }

  async deletePksCurah(id?: number | undefined, user_id?: number | undefined): Promise<any> {
    const row = await this.pksCurahDataSource.delete(id!)

    const dataHistoryLog: HistoryLogEntity = {
      tanggal: `${format(new Date(), 'yyyy-MM-dd HH:mm:ss')}`,
      transaksi: `${id}`,
      cud: 'DELETE',
      isitransaksi_lama: `MENGUBAH STATUS VENDOR MENJADI TIDAK AKTIF`,
      user_id: user_id
    }
    await this.historyLogDataSource.insert(dataHistoryLog)

    return row
  }

  async findAllFreight(conf?: Pick<ParamsEntity, 'limit' | 'offset' | 'search'>): Promise<{ count: number, rows: FreightEntity[] }> {
    const count = await this.freightDataSource.count()
    const rows = await this.freightDataSource.selectAll(conf)
    return { count: count.count, rows }
  }

  async findOneFreight(id?: number): Promise<PksCurahEntity | null> {
    const rows = await this.freightDataSource.selectOne(id)
    return rows
  }

  async updateFreight(id: number, user_id: number, data?: FreightEntity): Promise<any> {
    const res = await this.freightDataSource.update(id, data)
    const dataHistoryLog: HistoryLogEntity = {
      tanggal: `${format(new Date(), 'yyyy-MM-dd HH:mm:ss')}`,
      transaksi: `${id}`,
      cud: 'UPDATE',
      isitransaksi_lama: `MENGUBAH VENDOR BARU YANG DIAJUKAN DENGAN NAMA ${data?.freight_supplier}`,
      user_id: user_id
    }

    // Promise.all(
    //   [data?.file_rekbank?.forEach(async (val: string) => {
    //     const dataBank: FreightBankEntity = {
    //       freight_id: id,
    //       file_rekbank: val,
    //       active: 2
    //     }

    //     await this.freightDataSource.updateBank(dataBank.freight_id, dataBank)
    //   })]
    // )

    await this.historyLogDataSource.insert(dataHistoryLog)

    return res
  }

  async deleteFreight(id?: number | undefined, user_id?: number | undefined): Promise<any> {
    const row = await this.freightDataSource.delete(id!)

    const dataHistoryLog: HistoryLogEntity = {
      tanggal: `${format(new Date(), 'yyyy-MM-dd HH:mm:ss')}`,
      transaksi: `${id}`,
      cud: 'DELETE',
      isitransaksi_lama: `MENGUBAH STATUS FREIGHT MENJADI TIDAK AKTIF`,
      user_id: user_id
    }
    await this.historyLogDataSource.insert(dataHistoryLog)

    return row
  }

  async findAllFreightBank(conf?: Pick<ParamsEntity, 'limit' | 'offset'>): Promise<{ count: number, rows: FreightBankEntity[] }> {
    const count = await this.freightDataSource.count()
    const rows = await this.freightDataSource.selectAllBank(conf)
    return { count: count.count, rows }
  }

  async findBankByFreightId(id?: number[] | undefined): Promise<FreightBankEntity[]> {
    const rows = await this.freightDataSource.selectBankByFreightId(id)
    return rows
  }

  async findAllCurrency(conf?: Pick<ParamsEntity, 'limit' | 'offset'>): Promise<{ count: number, rows: CurrencyEntity[] }> {
    const count = await this.currencyDataSource.count()
    const rows = await this.currencyDataSource.selectAll(conf)
    return { count: count.count, rows }
  }

  async findOneCurrency(id?: number): Promise<CurrencyEntity> {
    const rows = await this.currencyDataSource.selectOne(id)
    return rows
  }

  async findOneStockpile(id?: number): Promise<StockpileEntity | null> {
    const rows = await this.stockpileDataSource.selectOne(id)
    return rows
  }

  async findAllStockpile(conf?: Pick<ParamsEntity, 'limit' | 'offset'>): Promise<{ count: number, rows: StockpileEntity[] }> {
    const count = await this.stockpileDataSource.count()
    const rows = await this.stockpileDataSource.selectAll(conf)
    return { count: count.count, rows }
  }

  async pengajuanPkhoa(user_id?: number, data?: PkhoaEntity): Promise<any> {
    const res = await this.pkhoaDataSource.insert(data)

    const dataHistoryLog: HistoryLogEntity = {
      tanggal: `${format(new Date(), 'yyyy-MM-dd HH:mm:ss')}`,
      transaksi: `${res[0].insertId}`,
      cud: 'CREATE',
      isitransaksi_baru: `MENGAJUKAN PKHOA`,
      user_id: user_id
    }

    await this.historyLogDataSource.insert(dataHistoryLog)

    return res
  }

  async findAllPkhoa(conf?: Pick<ParamsEntity, 'limit' | 'offset' | 'search'>): Promise<{ count: number, rows: PkhoaEntity[] }> {
    const count = await this.pkhoaDataSource.count()
    const rows = await this.pkhoaDataSource.selectAll(conf)
    return { count: count.count, rows }
  }

  async findOnePkhoa(id?: number): Promise<PkhoaEntity | null> {
    const rows = await this.pkhoaDataSource.selectOne(id!)
    return rows
  }

  async updatePkhoa(id: number, user_id: number, data?: PkhoaEntity): Promise<any> {
    const res = await this.pkhoaDataSource.update(id, data)

    const dataHistoryLog: HistoryLogEntity = {
      tanggal: `${format(new Date(), 'yyyy-MM-dd HH:mm:ss')}`,
      transaksi: `${id}`,
      cud: 'UPDATE',
      isitransaksi_lama: `MENGUBAH PENGAJUAN PKHOA BARU YANG DIAJUKAN`,
      user_id: user_id
    }

    await this.historyLogDataSource.insert(dataHistoryLog)

    return res
  }

  async deletePkhoa(id?: number | undefined, user_id?: number | undefined): Promise<any> {
    const row = await this.pkhoaDataSource.delete(id!)

    const dataHistoryLog: HistoryLogEntity = {
      tanggal: `${format(new Date(), 'yyyy-MM-dd HH:mm:ss')}`,
      transaksi: `${id}`,
      cud: 'DELETE',
      isitransaksi_lama: `MENGUBAH STATUS FREIGHT COST MENJADI TIDAK AKTIF`,
      user_id: user_id
    }
    await this.historyLogDataSource.insert(dataHistoryLog)

    return row
  }

  async findOnePkhoaDynamic(conf?: Pick<ParamsEntity, 'tableCol1' | 'tableVal1'> | undefined): Promise<PkhoaEntity[]> {
    const rows = await this.pkhoaDataSource.selectOneDynamic(conf)
    return rows
  }

  async pengajuanKontrakPks(user_id?: number, data?: PurchasingEntity): Promise<any> {
    let pricePoPks: number = data?.price!
    const resPurchasing = await this.purchasingDataSource.insert(data)
    const resPpn = await this.setupsDataSource.selectByNama('ppn 11%')

    if (data?.ppn == 1) {
      pricePoPks = data?.price! / (1 + resPpn.nilai!)
    }
    let dataPoPks: PoPksEntity = {
      purchasing_id: resPurchasing[0].insertId,
      stockpile_id: data?.stockpile_id,
      vendor_id: data?.vendor_id,
      currency_id: 1,
      exchange_rate: 1,
      price: pricePoPks,
      final_status: 4,
    }
    const resPoPks = await this.poPksDataSource.insert(dataPoPks)

    if (data?.freight == 2) {
      let dataVendorKontrak: VendorKontrakEntity = {
        po_pks_id: resPoPks[0].insertId,
        freight_cost_id: data?.freight_cost_id,
        quantity: data?.quantity,
        status: 1
      }
      const resVendorKontrak = await this.vendorKontrakDataSource.insert(dataVendorKontrak)

      const dataHistoryLogVendorKontrak: HistoryLogEntity = {
        tanggal: `${format(new Date(), 'yyyy-MM-dd HH:mm:ss')}`,
        transaksi: `${resVendorKontrak![0].insertId}`,
        cud: 'CREATE',
        isitransaksi_baru: `MENGAJUKAN KONTRAK PKS ( table vendor kontrak )`,
        user_id: user_id
      }
      await this.historyLogDataSource.insert(dataHistoryLogVendorKontrak)
    }

    const dataHistoryLogPurchasing: HistoryLogEntity = {
      tanggal: `${format(new Date(), 'yyyy-MM-dd HH:mm:ss')}`,
      transaksi: `${resPurchasing[0].insertId}`,
      cud: 'CREATE',
      isitransaksi_baru: `MENGAJUKAN KONTRAK PKS ( table purchasing )`,
      user_id: user_id
    }
    const dataHistoryLogPoPks: HistoryLogEntity = {
      tanggal: `${format(new Date(), 'yyyy-MM-dd HH:mm:ss')}`,
      transaksi: `${resPoPks[0].insertId}`,
      cud: 'CREATE',
      isitransaksi_baru: `MENGAJUKAN KONTRAK PKS ( table po pks)`,
      user_id: user_id
    }

    await Promise.all(
      [
        this.historyLogDataSource.insert(dataHistoryLogPurchasing),
        this.historyLogDataSource.insert(dataHistoryLogPoPks),
      ]
    )

    return resPurchasing
  }

  async findOnePurchasingDynamic(conf?: Pick<ParamsEntity, 'tableCol1' | 'tableVal1'> | undefined): Promise<PurchasingEntity[]> {
    const rows = await this.purchasingDataSource.selectOneDynamic(conf)
    return rows
  }

  async findOnePoPksDynamic(conf?: Pick<ParamsEntity, 'tableCol1' | 'tableVal1'> | undefined): Promise<PoPksEntity[]> {
    const rows = await this.poPksDataSource.selectOneDynamic(conf)
    return rows
  }

  async findOneVendorKontrakDynamic(conf?: Pick<ParamsEntity, 'tableCol1' | 'tableVal1'> | undefined): Promise<VendorKontrakEntity[]> {
    const rows = await this.vendorKontrakDataSource.selectOneDynamic(conf)
    return rows
  }

  async findAllKontrakPks(conf?: Pick<ParamsEntity, 'limit' | 'offset' | 'search' | 'kontrak_type' | 'pks_type'>): Promise<{ count: number, rows: PurchasingEntity[] }> {
    const count = await this.purchasingDataSource.count()
    const rows = await this.purchasingDataSource.selectAll(conf!)
    return { count: count.count, rows }
  }

}
