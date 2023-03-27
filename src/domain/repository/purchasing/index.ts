import { ICurrencyDataSource, IFreighDataSource, IHistoryLogDataSource, IPksCurahDataSource, IStockpileDataSource, IUsersDataSource } from '../../../data'
import { CurrencyEntity, EntityUser, FreightBankEntity, FreightEntity, HistoryLogEntity, ParamsEntity, PksCurahBankEntity, PksCurahEntity, StockpileEntity } from '../../entity'
import { IPurchasingRepo } from '../../interfaces'
import { format } from 'date-fns'

export class PurchasingRepository implements IPurchasingRepo {
  private userDataSource: IUsersDataSource
  private pksCurahDataSource: IPksCurahDataSource
  private freightDataSource: IFreighDataSource
  private historyLogDataSource: IHistoryLogDataSource
  private currencyDataSource: ICurrencyDataSource
  private stockpileDataSource: IStockpileDataSource

  constructor(userDataSource: IUsersDataSource, pksCurahDataSource: IPksCurahDataSource, freightDataSource: IFreighDataSource, historyLogDataSource: IHistoryLogDataSource, currencyDataSource: ICurrencyDataSource, stockpileDataSource: IStockpileDataSource) {
    this.userDataSource = userDataSource
    this.pksCurahDataSource = pksCurahDataSource
    this.freightDataSource = freightDataSource
    this.historyLogDataSource = historyLogDataSource
    this.currencyDataSource = currencyDataSource
    this.stockpileDataSource = stockpileDataSource
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
      transaksi: `CREATE PENGAJUAN VENDOR ${vendor_type}`,
      cud: 'CREATE',
      isitransaksi_baru: `MENGAJUKAN VENDOR BARU DENGAN NAMA ${data?.vendor_name}`,
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
      transaksi: `CREATE PENGAJUAN VENDOR TRANSPORTER`,
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
      transaksi: `UPDATE PENGAJUAN VENDOR ${vendor_type}`,
      cud: 'UPDATE',
      isitransaksi_baru: `MENGUBAH VENDOR BARU YANG DIAJUKAN DENGAN NAMA ${data?.vendor_name}`,
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
      transaksi: `UPDATE PENGAJUAN VENDOR FREIGHT`,
      cud: 'UPDATE',
      isitransaksi_baru: `MENGUBAH VENDOR BARU YANG DIAJUKAN DENGAN NAMA ${data?.freight_supplier}`,
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

  async findAllCurrency(conf?: Pick<ParamsEntity, 'limit' | 'offset'>): Promise<{ count: number, rows: CurrencyEntity[] }> {
    const count = await this.currencyDataSource.count()
    const rows = await this.currencyDataSource.selectAll(conf)
    return { count: count.count, rows }
  }

  async findAllFreightBank(conf?: Pick<ParamsEntity, 'limit' | 'offset'>): Promise<{ count: number, rows: FreightBankEntity[] }> {
    const count = await this.freightDataSource.count()
    const rows = await this.freightDataSource.selectAllBank(conf)
    return { count: count.count, rows }
  }

  async findAllStockpile(conf?: Pick<ParamsEntity, 'limit' | 'offset'>): Promise<{ count: number, rows: StockpileEntity[] }> {
    const count = await this.stockpileDataSource.count()
    const rows = await this.stockpileDataSource.selectAll(conf)
    return { count: count.count, rows }
  }
}
