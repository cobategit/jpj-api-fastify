import { IUsersDataSource } from '../../../data'
import { EntityUser } from '../../entity'
import { IPurchasingRepo } from '../../interfaces'

export class PurchasingRepository implements IPurchasingRepo {
  private userDataSource: IUsersDataSource

  constructor(userDataSource: IUsersDataSource) {
    this.userDataSource = userDataSource
  }

  async registerUserPurchasing(data: EntityUser): Promise<any> {
    const res = await this.userDataSource.registerUserPurchasing(data!)
    return res
  }

  async checkEmail(email: string): Promise<EntityUser | null> {
    const res = await this.userDataSource.selectByEmail(email!)
    return res
  }
}
