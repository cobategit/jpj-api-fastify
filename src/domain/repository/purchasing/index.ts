import { ICurrencyDataSource, IFreighDataSource, IHistoryLogDataSource, IPkhoaDataSource, IPksCurahDataSource, IPoPksDataSource, IPurchasingDataSource, IPurchasingDetailDataSource, IPurchasingFreightCostDataSource, ISetupsDataSource, IStockpileDataSource, IUsersDataSource, IVendorKontrakDataSource } from '../../../data'
import { CurrencyEntity, EntityUser, FreightBankEntity, FreightEntity, HistoryLogEntity, ParamsEntity, PkhoaEntity, PksCurahBankEntity, PksCurahEntity, PoPksEntity, PurchasingDetailEntity, PurchasingEntity, PurchasingFreightCostEntity, StockpileEntity, TypePengajuanKontrakPks, VendorKontrakEntity } from '../../entity'
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
  private purchasingFreightCostDataSource: IPurchasingFreightCostDataSource
  private purchasingDetailDataSource: IPurchasingDetailDataSource

  constructor(userDataSource: IUsersDataSource, pksCurahDataSource: IPksCurahDataSource, freightDataSource: IFreighDataSource, historyLogDataSource: IHistoryLogDataSource, currencyDataSource: ICurrencyDataSource, stockpileDataSource: IStockpileDataSource, pkhoaDataSource: IPkhoaDataSource, purchasingDataSource: IPurchasingDataSource, poPksDataSource: IPoPksDataSource, vendorKontrakDataSource: IVendorKontrakDataSource, setupsDataSource: ISetupsDataSource, purchasingFreightCostDataSource: IPurchasingFreightCostDataSource, purchasingDetailDataSource: IPurchasingDetailDataSource) {
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
    this.purchasingFreightCostDataSource = purchasingFreightCostDataSource
    this.purchasingDetailDataSource = purchasingDetailDataSource
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

  async updateKodeAksesUser(deviced_id: string, kode_akses: string): Promise<any> {
    const res = await this.userDataSource.updateKodeAksesUserPurchasing(deviced_id, kode_akses)
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

  async findOnePksCurahBank(id?: number | undefined): Promise<PksCurahBankEntity | null> {
    const row = await this.pksCurahDataSource.selectOneBank(id);
    return row
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

    let vBankId: number[] = []


    if (Array.isArray(data!.v_bank_id)) {
      vBankId = data?.v_bank_id!
    } else {
      vBankId.push(data?.v_bank_id!)
    }

    await Promise.all(
      [
        data?.file_rekbank?.forEach(async (val: string, i: number) => {
          if (vBankId[i]) {
            const dataBank: PksCurahBankEntity = {
              v_bank_id: vBankId[i],
              file_rekbank: val,
              active: 2
            }
            await this.pksCurahDataSource.updateBank(vBankId[i], dataBank)
          } else {
            const dataBank: PksCurahBankEntity = {
              vendor_id: id,
              file_rekbank: val,
              active: 2
            }
            await this.pksCurahDataSource.insertBank(dataBank)
          }
        })
      ]
    )

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

    let fBankId: number[] = []

    if (Array.isArray(data!.f_bank_id)) {
      fBankId = data?.f_bank_id!
    } else {
      fBankId.push(data?.f_bank_id!)
    }


    await Promise.all(
      [
        data?.file_rekbank?.forEach(async (val: string, i: number) => {
          if (fBankId[i]) {
            const dataBank: FreightBankEntity = {
              f_bank_id: fBankId[i],
              file_rekbank: val,
              active: 2
            }
            await this.freightDataSource.updateBank(fBankId[i], dataBank)
          } else {
            const dataBank: FreightBankEntity = {
              f_bank_id: id,
              file_rekbank: val,
              active: 2
            }
            await this.freightDataSource.insertBank(dataBank)
          }
        })
      ]
    )

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

  async findOnePkhoaDynamic(conf?: Pick<ParamsEntity, 'columnKey' | 'columnValue'> | undefined): Promise<PkhoaEntity[]> {
    const rows = await this.pkhoaDataSource.selectOneDynamic(conf)
    return rows
  }

  async getPkhoaExclude(stockpile_id: number, vendor_id: number, req_payment_date: string): Promise<any> {
    const rows = await this.pkhoaDataSource.selectPkhoaExclude(stockpile_id, vendor_id, req_payment_date)
    return rows
  }

  async pengajuanKontrakPks(user_id?: number, data?: TypePengajuanKontrakPks): Promise<any> {

    const resPurchasing = await this.purchasingDataSource.insert(data)
    const resPpn = await this.setupsDataSource.selectByNama(process.env.PPN_NAME)

    let jumlahPpn = Number(1) + Number(resPpn.nilai!)
    let pricePoPks: number = data?.ppn == 1 ? Number(data?.price!) / Number(jumlahPpn) : data?.price!

    let dataPoPks: PoPksEntity = {
      purchasing_id: resPurchasing[0].insertId,
      stockpile_id: data?.stockpile_id,
      vendor_id: data?.vendor_id,
      entry_by: user_id,
      currency_id: 1,
      exchange_rate: 1,
      price: pricePoPks,
      price_converted: 1 * pricePoPks,
      company_id: 2,
      lock_contract: 1,
      po_status: 0,
      quantity: data?.quantity,
      final_status: 4,
      entry_date: data?.entry_date
    }
    const resPoPks = await this.poPksDataSource.insert(dataPoPks)

    if (data?.freight == 2) {
      let tmpFreighCostId: number[] = []

      if (Array.isArray(data!.freight_cost_id)) {
        tmpFreighCostId = data?.freight_cost_id!
      } else {
        tmpFreighCostId.push(data?.freight_cost_id!)
      }

      if (tmpFreighCostId.length > 0)
        await Promise.all(
          tmpFreighCostId.map(async (val: number, i: number) => {
            let dataVendorKontrak = new Map<string, VendorKontrakEntity>()
            let dataPurchasingFreightCost = new Map<string, PurchasingFreightCostEntity>()
            dataVendorKontrak.set('data', {
              freight_cost_id: val,
              po_pks_id: resPoPks[0].insertId,
              stockpile_contract_id: 0,
              quantity: data?.quantity,
              entry_date: data?.entry_date,
              entry_by: user_id,
              status: 1
            })
            dataPurchasingFreightCost.set('data', {
              purchasing_id: resPurchasing[0].insertId,
              freight_cost_id: val,
              entry_date: `${format(new Date(), 'yyyy-MM-dd HH:mm:ss')}`
            })
            const resVendorKontrak = await this.vendorKontrakDataSource.insert(dataVendorKontrak.get('data'))
            const resPurchasingFreightCost = await this.purchasingFreightCostDataSource.insert(dataPurchasingFreightCost.get('data'))

            const dataHistoryLogVendorKontrak: HistoryLogEntity = {
              tanggal: `${format(new Date(), 'yyyy-MM-dd HH:mm:ss')}`,
              transaksi: `${resVendorKontrak![0].insertId}`,
              cud: 'CREATE',
              isitransaksi_baru: `MENGAJUKAN KONTRAK PKS ( table vendor kontrak )`,
              user_id: user_id
            }
            const dataHistoryLogPurchasingFreightCost: HistoryLogEntity = {
              tanggal: `${format(new Date(), 'yyyy-MM-dd HH:mm:ss')}`,
              transaksi: `${resPurchasingFreightCost![0].insertId}`,
              cud: 'CREATE',
              isitransaksi_baru: `MENGAJUKAN KONTRAK PKS ( table purchasing freight cost )`,
              user_id: user_id
            }
            await this.historyLogDataSource.insert(dataHistoryLogVendorKontrak)
            await this.historyLogDataSource.insert(dataHistoryLogPurchasingFreightCost)
          }),
        )
    }

    let dataPurchasingDetail = new Map<string, PurchasingDetailEntity>()
    dataPurchasingDetail.set('data', {
      purchasing_id: resPurchasing[0].insertId,
      quantity_payment: data?.quantity_payment,
      payment_type: data?.payment_type,
      entry_by: user_id,
      entry_date: `${format(new Date(), 'yyyy-MM-dd HH:mm:ss')}`,
      termin: 1,
      status: 0,
    })
    const insertPurchasingDetail = await this.purchasingDetailDataSource.insert(dataPurchasingDetail.get('data'))

    const dataLogPurchasingDetail = new Map<string, HistoryLogEntity>()
    dataLogPurchasingDetail.set('data', {
      cud: "CREATE",
      isitransaksi_baru: "INSERT TERMIN",
      transaksi: insertPurchasingDetail[0].insertId,
      tanggal: `${format(new Date(), 'yyyy-MM-dd HH:mm:ss')}`,
      user_id: user_id
    })
    const dataHistoryLogPurchasing = new Map<string, HistoryLogEntity>()
    dataHistoryLogPurchasing.set('data', {
      tanggal: `${format(new Date(), 'yyyy-MM-dd HH:mm:ss')}`,
      transaksi: `${resPurchasing[0].insertId}`,
      cud: 'CREATE',
      isitransaksi_baru: `MENGAJUKAN KONTRAK PKS ( table purchasing )`,
      user_id: user_id
    })
    const dataHistoryLogPoPks = new Map<string, HistoryLogEntity>()
    dataHistoryLogPoPks.set('data', {
      tanggal: `${format(new Date(), 'yyyy-MM-dd HH:mm:ss')}`,
      transaksi: `${resPoPks[0].insertId}`,
      cud: 'CREATE',
      isitransaksi_baru: `MENGAJUKAN KONTRAK PKS ( table po pks)`,
      user_id: user_id
    })

    await Promise.all(
      [
        this.historyLogDataSource.insert(dataHistoryLogPurchasing.get('data')),
        this.historyLogDataSource.insert(dataHistoryLogPoPks.get('data')),
        this.historyLogDataSource.insert(dataLogPurchasingDetail.get('data'))
      ]
    )

    return resPurchasing
  }

  async findOnePurchasingDynamic(conf?: Pick<ParamsEntity, 'columnKey' | 'columnValue'> | undefined): Promise<PurchasingEntity[]> {
    const rows = await this.purchasingDataSource.selectOneDynamic(conf)
    return rows
  }

  async findOnePoPksDynamic(conf?: Pick<ParamsEntity, 'columnKey' | 'columnValue'> | undefined): Promise<PoPksEntity[]> {
    const rows = await this.poPksDataSource.selectOneDynamic(conf)
    return rows
  }

  async findOneVendorKontrakDynamic(conf?: Pick<ParamsEntity, 'columnKey' | 'columnValue'> | undefined): Promise<VendorKontrakEntity[]> {
    const rows = await this.vendorKontrakDataSource.selectOneDynamic(conf)
    return rows
  }

  async findAllKontrakPks(conf?: ParamsEntity): Promise<{ count: number, rows: PurchasingEntity[] }> {
    const count = await this.purchasingDataSource.count()
    const rows = await this.purchasingDataSource.selectAll(conf!)
    return { count: count.count, rows }
  }

  async findOneKontrakPks(id?: number | undefined): Promise<PurchasingEntity | null> {
    const rows = await this.purchasingDataSource.selectOne(id)
    return rows
  }

  async findPlanPaymentDate(): Promise<any> {
    const rows = await this.purchasingDataSource.selectPlanPaymentDate()
    return rows
  }

  async deletePurchasing(id?: number | undefined, user_id?: number | undefined): Promise<any> {
    const row = await this.purchasingDataSource.delete(id!)

    const dataHistoryLog: HistoryLogEntity = {
      tanggal: `${format(new Date(), 'yyyy-MM-dd HH:mm:ss')}`,
      transaksi: `${id}`,
      cud: 'DELETE',
      isitransaksi_lama: `MENGHAPUS DATA PURCHASING`,
      user_id: user_id
    }
    await this.historyLogDataSource.insert(dataHistoryLog)

    return row
  }

  async deletePopks(id?: number | undefined, user_id?: number | undefined): Promise<any> {
    const row = await this.poPksDataSource.delete(id!)

    const dataHistoryLog: HistoryLogEntity = {
      tanggal: `${format(new Date(), 'yyyy-MM-dd HH:mm:ss')}`,
      transaksi: `${id}`,
      cud: 'DELETE',
      isitransaksi_lama: `MENGHAPUS DATA PO PKS`,
      user_id: user_id
    }
    await this.historyLogDataSource.insert(dataHistoryLog)

    return row
  }

  async deletePurchasingFreightCost(id?: number | undefined, user_id?: number | undefined): Promise<any> {
    const row = await this.purchasingFreightCostDataSource.delete(id!)

    const dataHistoryLog: HistoryLogEntity = {
      tanggal: `${format(new Date(), 'yyyy-MM-dd HH:mm:ss')}`,
      transaksi: `${id}`,
      cud: 'DELETE',
      isitransaksi_lama: `MENGHAPUS DATA PURCHASING FREIGHT COST`,
      user_id: user_id
    }
    await this.historyLogDataSource.insert(dataHistoryLog)

    return row
  }

  async deleteVendorKontrak(id?: number | undefined, user_id?: number | undefined): Promise<any> {
    const row = await this.vendorKontrakDataSource.delete(id!)

    const dataHistoryLog: HistoryLogEntity = {
      tanggal: `${format(new Date(), 'yyyy-MM-dd HH:mm:ss')}`,
      transaksi: `${id}`,
      cud: 'DELETE',
      isitransaksi_lama: `MENGHAPUS DATA VENDOR KONTRAK`,
      user_id: user_id
    }
    await this.historyLogDataSource.insert(dataHistoryLog)

    return row
  }

  async updateFilePurchasing(id?: number | undefined, user_id?: number | undefined, data?: Pick<PurchasingEntity, 'upload_file' | 'approval_file' | 'upload_file1' | 'upload_file2' | 'upload_file3' | 'upload_file4'> | undefined): Promise<any> {
    const res = await this.purchasingDataSource.updateFile(id, data)

    const dataHistoryLog: HistoryLogEntity = {
      tanggal: `${format(new Date(), 'yyyy-MM-dd HH:mm:ss')}`,
      transaksi: `${id}`,
      cud: 'UPDATE',
      isitransaksi_lama: `MENGUBAH KONTRAK PKS FILE PURCHASING YANG DIAJUKAN`,
      user_id: user_id
    }

    await this.historyLogDataSource.insert(dataHistoryLog)

    return res
  }

  async updateFileSpbPurchasing(id?: number | undefined, user_id?: number | undefined, data?: Pick<PurchasingEntity, 'import2' | 'approval_file' | 'upload_file1' | 'upload_file2' | 'upload_file3' | 'upload_file4' | 'import2_date'> | undefined): Promise<any> {
    data!.import2_date = `${format(new Date(), 'yyyy-MM-dd HH:mm:ss')}`
    const res = await this.purchasingDataSource.updateFileSpb(id, data)

    const dataHistoryLog: HistoryLogEntity = {
      tanggal: `${format(new Date(), 'yyyy-MM-dd HH:mm:ss')}`,
      transaksi: `${id}`,
      cud: 'UPDATE',
      isitransaksi_lama: `MENGUBAH KONTRAK PKS FILE SPB PURCHASING YANG DIAJUKAN`,
      user_id: user_id
    }

    await this.historyLogDataSource.insert(dataHistoryLog)

    return res
  }

  async addTerminKontrakPks(data?: PurchasingDetailEntity | undefined): Promise<any> {
    const insert = await this.purchasingDetailDataSource.insert(data!)

    const logInsertPurchasingDetail = new Map<string, HistoryLogEntity>()
    logInsertPurchasingDetail.set('data', {
      tanggal: `${format(new Date(), 'yyyy-MM-dd HH:mm:ss')}`,
      transaksi: `${insert[0].insertId}`,
      cud: 'UPDATE',
      isitransaksi_lama: `MENAMBAH TERMIN`,
      user_id: data?.entry_by
    })
    await this.historyLogDataSource.insert(logInsertPurchasingDetail.get('data'))

    return insert
  }

  async findOneDynamicPurchasingDetail(conf?: Pick<ParamsEntity, 'columnKey' | 'columnValue' | 'options'> | undefined): Promise<PurchasingDetailEntity[] | []> {
    const res = await this.purchasingDetailDataSource.selectOneDynamic(conf!)
    return res
  }

  async checkQuantityTerminKontrakPks(type?: string | undefined, data?: TypePengajuanKontrakPks | undefined): Promise<any> {
    const res = await this.purchasingDetailDataSource.availableQuantity(type!, data!)
    return res
  }

  async updateTerminKontrakPks(id?: number | undefined, user_id?: number | undefined, data?: PurchasingDetailEntity | undefined): Promise<any> {
    const update = await this.purchasingDetailDataSource.update(id, data)

    const logUpdatePurchasingDetail = new Map<string, HistoryLogEntity>()
    logUpdatePurchasingDetail.set('data', {
      tanggal: `${format(new Date(), 'yyyy-MM-dd HH:mm:ss')}`,
      transaksi: `${id}`,
      cud: 'UPDATE',
      isitransaksi_lama: `MENGUBAH TERMIN`,
      user_id: user_id
    })
    await this.historyLogDataSource.insert(logUpdatePurchasingDetail.get('data'))

    return update
  }

  async deleteTerminKontrakPks(id?: number | undefined, user_id?: number | undefined): Promise<any> {
    const delet = await this.purchasingDetailDataSource.delete(id)

    const logDeletePurchasingDetail = new Map<string, HistoryLogEntity>()
    logDeletePurchasingDetail.set('data', {
      tanggal: `${format(new Date(), 'yyyy-MM-dd HH:mm:ss')}`,
      transaksi: `${id}`,
      cud: 'DELETE',
      isitransaksi_lama: `MENGHAPUS TERMIN`,
      user_id: user_id
    })
    await this.historyLogDataSource.insert(logDeletePurchasingDetail.get('data'))

    return delet
  }

}
