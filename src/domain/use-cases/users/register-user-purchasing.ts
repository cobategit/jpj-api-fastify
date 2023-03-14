import { AppError } from '@jpj-common/module'
import { EntityUser, IRegisterUserPurchasingUseCase, IUsersRepo } from '../..'
import bcryptjs from 'bcryptjs'

export class RegisterUserPurchasingUseCase
  implements IRegisterUserPurchasingUseCase
{
  private userRepo: IUsersRepo

  constructor(userRepo: IUsersRepo) {
    this.userRepo = userRepo
  }

  async executed(data?: EntityUser): Promise<any> {
    try {
      let saltPass = await bcryptjs.genSalt(5)
      let hashPass = await bcryptjs.hash(data?.kode_access!, saltPass)
      data!.kode_access = hashPass

      const res = await this.userRepo.registerUserPurchasing(data)

      return res
    } catch (error) {
      throw new AppError(
        500,
        false,
        'Terjadi kesalahan register user purchasing use case',
        '501'
      )
    }
  }
}
