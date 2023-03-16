import { IFreighDataSource, IPksCurahDataSource, IUsersDataSource } from '../../../data'
import { EntityUser, PksCurahEntity } from '../../entity'
import { IPurchasingRepo } from '../../interfaces'

export class PurchasingRepository implements IPurchasingRepo {
  private userDataSource: IUsersDataSource
  private pksCurahDataSource: IPksCurahDataSource
  private freightDataSource: IFreighDataSource

  constructor(userDataSource: IUsersDataSource, pksCurahDataSource: IPksCurahDataSource, freightDataSource: IFreighDataSource) {
    this.userDataSource = userDataSource
    this.pksCurahDataSource = pksCurahDataSource
    this.freightDataSource = freightDataSource
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

  async pengajuanPksCurah(data?: PksCurahEntity | undefined): Promise<any> {
    const res = await this.pksCurahDataSource.insert(data)
    return res
  }

  async pengajuanFreight(data?: PksCurahEntity | undefined): Promise<any> {
    const res = await this.freightDataSource.insert(data)
    return res
  }

  async getPksCurah(): Promise<PksCurahEntity[]> {
    const res = await this.pksCurahDataSource.selectAll()
    return res
  }
}
