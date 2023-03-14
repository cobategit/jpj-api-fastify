import { EntityUser, ILoginUserPurchasingUseCase } from '../..'

export class LoginUserPurchasingUseCase implements ILoginUserPurchasingUseCase {
  executed(
    data?: Pick<EntityUser, 'user_email' | 'mobile_device' | 'kode_access'>
  ): Promise<EntityUser> {
    throw new Error('Method not implemented.')
  }
}
