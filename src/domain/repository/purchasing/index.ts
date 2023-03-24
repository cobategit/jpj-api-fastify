import { IFreighDataSource, IHistoryLogDataSource, IPksCurahDataSource, IUsersDataSource } from '../../../data'
import { EntityUser, FreightEntity, HistoryLogEntity, ParamsEntity, PksCurahBankEntity, PksCurahEntity } from '../../entity'
import { IPurchasingRepo } from '../../interfaces'
import { format } from 'date-fns'

export class PurchasingRepository implements IPurchasingRepo {
  private userDataSource: IUsersDataSource
  private pksCurahDataSource: IPksCurahDataSource
  private freightDataSource: IFreighDataSource
  private historyLogDataSource: IHistoryLogDataSource

  constructor(userDataSource: IUsersDataSource, pksCurahDataSource: IPksCurahDataSource, freightDataSource: IFreighDataSource, historyLogDataSource: IHistoryLogDataSource) {
    this.userDataSource = userDataSource
    this.pksCurahDataSource = pksCurahDataSource
    this.freightDataSource = freightDataSource
    this.historyLogDataSource = historyLogDataSource
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

        console.log(`data bank: ${dataBank}`)

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
    await this.historyLogDataSource.insert(dataHistoryLog)

    return res
  }
}
