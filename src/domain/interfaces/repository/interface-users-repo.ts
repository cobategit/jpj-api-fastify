import { EntityUser } from '../../entity'

export interface IUsersRepo {
  registerUserPurchasing(data?: EntityUser): Promise<any>
  loginUserPurchasing(
    data?: Pick<EntityUser, 'user_email' | 'mobile_device' | 'kode_access'>
  ): Promise<EntityUser>
}
