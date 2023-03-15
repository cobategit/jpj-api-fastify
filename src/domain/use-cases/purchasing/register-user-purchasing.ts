import { AppError } from '@jpj-common/module'
import {
  EntityUser,
  IRegisterUserPurchasingUseCase,
  IPurchasingRepo,
} from '../..'
import bcryptjs from 'bcryptjs'

export class RegisterUserPurchasingUseCase
  implements IRegisterUserPurchasingUseCase {
  private purchasingRepo: IPurchasingRepo

  constructor(purchasingRepo: IPurchasingRepo) {
    this.purchasingRepo = purchasingRepo
  }

  async execute(data: EntityUser): Promise<any> {
    try {
      let saltPass = await bcryptjs.genSalt(5)
      let hashPass = await bcryptjs.hash(data.kode_akses!, saltPass)
      data!.kode_akses = hashPass

      const checkEmail = await this.purchasingRepo.checkEmail(data.user_email!)

      if (!checkEmail) {
        return { invalidEmail: 'Email tidak terdaftar' }
      }

      if (checkEmail.deviced_id) {
        return {
          existDeviceId: 'Device Id anda sudah terdaftar',
        }
      }

      const res = await this.purchasingRepo.registerUserPurchasing(data)

      return res
    } catch (error) {
      throw new AppError(500, false, `${error}`, '501')
    }
  }
}
