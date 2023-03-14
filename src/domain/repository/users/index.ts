import { IUsersDataSource } from '../../../data'
import { EntityUser } from '../../entity'
import { IUsersRepo } from '../../interfaces'

export class UserRepository implements IUsersRepo {
  private userDataSource: IUsersDataSource

  constructor(userDataSource: IUsersDataSource) {
    this.userDataSource = userDataSource
  }

  async registerUserPurchasing(data?: EntityUser): Promise<any> {
    const res = await this.userDataSource.registerUserPurchasing(data!)
    return res
  }

  async loginUserPurchasing(
    data?: Pick<EntityUser, 'mobile_device' | 'kode_access' | 'user_email'>
  ): Promise<EntityUser> {
    const res = await this.userDataSource.selectByEmailAndMobileDevice(data!)
    return res
  }
}
