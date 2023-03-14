import { EntityUser } from '../../entity'

export interface IRegisterUserPurchasingUseCase {
  executed(data?: EntityUser): Promise<any>
}

export interface ILoginUserPurchasingUseCase {
  executed(
    data?: Pick<EntityUser, 'user_email' | 'mobile_device' | 'kode_access'>
  ): Promise<EntityUser>
}
