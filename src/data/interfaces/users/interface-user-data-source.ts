import { EntityUser } from '../../../domain'

export interface IUsersDataSource {
  registerUserPurchasing(data?: EntityUser): Promise<any>
  selectByEmailAndMobileDevice(data?: EntityUser): Promise<EntityUser>
}
