import { ICurrencyDataSource, IFreighDataSource, IHistoryLogDataSource, IPkhoaDataSource, IPksCurahDataSource, IStockpileDataSource, IUsersDataSource } from '../../../data'
import { CurrencyEntity, EntityUser, FreightBankEntity, FreightEntity, HistoryLogEntity, ParamsEntity, PkhoaEntity, PksCurahBankEntity, PksCurahEntity, StockpileEntity } from '../../entity'
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

  constructor(userDataSource: IUsersDataSource, pksCurahDataSource: IPksCurahDataSource, freightDataSource: IFreighDataSource, historyLogDataSource: IHistoryLogDataSource, currencyDataSource: ICurrencyDataSource, stockpileDataSource: IStockpileDataSource, pkhoaDataSource: IPkhoaDataSource) {
    this.userDataSource = userDataSource
    this.pksCurahDataSource = pksCurahDataSource
    this.freightDataSource = freightDataSource
    this.historyLogDataSource = historyLogDataSource
    this.currencyDataSource = currencyDataSource
    this.stockpileDataSource = stockpileDataSource
    this.pkhoaDataSource = pkhoaDataSource
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
      [data?.file_rekbank?.forEach(async (val: string) => {
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
      [data?.file_rekbank?.forEach(async (val: string) => {
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

  async findOnePksCurah(id?: number): Promise<PksCurahEntity> {
    const rows = await this.pksCurahDataSource.selectOne(id)
    return rows
  }

  async updatePksCurah(id: number, user_id: number, data?: PksCurahEntity): Promise<any> {
    const res = await this.pksCurahDataSource.update(id, data)

    let vendor_type = data?.curah == 0 ? 'PKS' : 'CURAH'
    const dataHistoryLog: HistoryLogEntity = {
      tanggal: `${format(new Date(), 'yyyy-MM-dd HH:mm:ss')}`,
      transaksi: `${res[0].insertId}`,
      cud: 'UPDATE',
      isitransaksi_lama: `MENGUBAH VENDOR ${vendor_type} BARU YANG DIAJUKAN DENGAN NAMA ${data?.vendor_name}`,
      user_id: user_id
    }

    Promise.all(
      [data?.file_rekbank?.forEach(async (val: string) => {
        const dataBank: PksCurahBankEntity = {
          vendor_id: res[0].insertId,
          file_rekbank: val,
          active: 2
        }

        await this.pksCurahDataSource.updateBank(dataBank.vendor_id, dataBank)
      })]
    )

    await this.historyLogDataSource.insert(dataHistoryLog)

    return res
  }

  async findAllFreight(conf?: Pick<ParamsEntity, 'limit' | 'offset' | 'search'>): Promise<{ count: number, rows: FreightEntity[] }> {
    const count = await this.freightDataSource.count()
    const rows = await this.freightDataSource.selectAll(conf)
    return { count: count.count, rows }
  }

  async findOneFreight(id?: number): Promise<PksCurahEntity> {
    const rows = await this.freightDataSource.selectOne(id)
    return rows
  }

  async updateFreight(id: number, user_id: number, data?: FreightEntity): Promise<any> {
    const res = await this.freightDataSource.update(id, data)
    const dataHistoryLog: HistoryLogEntity = {
      tanggal: `${format(new Date(), 'yyyy-MM-dd HH:mm:ss')}`,
      transaksi: `${res[0].insertId}`,
      cud: 'UPDATE',
      isitransaksi_lama: `MENGUBAH VENDOR BARU YANG DIAJUKAN DENGAN NAMA ${data?.freight_supplier}`,
      user_id: user_id
    }

    Promise.all(
      [data?.file_rekbank?.forEach(async (val: string) => {
        const dataBank: FreightBankEntity = {
          freight_id: res[0].insertId,
          file_rekbank: val,
          active: 2
        }

        await this.freightDataSource.updateBank(dataBank.freight_id, dataBank)
      })]
    )

    await this.historyLogDataSource.insert(dataHistoryLog)

    return res
  }

  async findAllFreightBank(conf?: Pick<ParamsEntity, 'limit' | 'offset'>): Promise<{ count: number, rows: FreightBankEntity[] }> {
    const count = await this.freightDataSource.count()
    const rows = await this.freightDataSource.selectAllBank(conf)
    return { count: count.count, rows }
  }

  async findBankByFreightId(id?: number | undefined): Promise<FreightBankEntity[]> {
    const rows = await this.freightDataSource.selectBankByFreightId(id)
    return rows
  }

  async findAllCurrency(conf?: Pick<ParamsEntity, 'limit' | 'offset'>): Promise<{ count: number, rows: CurrencyEntity[] }> {
    const count = await this.currencyDataSource.count()
    const rows = await this.currencyDataSource.selectAll(conf)
    return { count: count.count, rows }
  }

  async findOneStockpile(id?: number): Promise<StockpileEntity> {
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

  async findOnePkhoa(id?: number): Promise<PkhoaEntity> {
    const rows = await this.pkhoaDataSource.selectOne(id)
    return rows
  }

  async updatePkhoa(id: number, user_id: number, data?: PkhoaEntity): Promise<any> {
    const res = await this.pkhoaDataSource.update(id, data)

    const dataHistoryLog: HistoryLogEntity = {
      tanggal: `${format(new Date(), 'yyyy-MM-dd HH:mm:ss')}`,
      transaksi: `${res[0].insertId}`,
      cud: 'UPDATE',
      isitransaksi_lama: `MENGUBAH PENGAJUAN PKHOA BARU YANG DIAJUKAN DENGAN`,
      user_id: user_id
    }

    await this.historyLogDataSource.insert(dataHistoryLog)

    return res
  }
}
