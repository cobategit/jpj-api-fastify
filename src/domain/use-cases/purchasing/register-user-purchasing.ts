import { AppError } from '@jpj-common/module'
import {
  EntityUser,
  IRegisterUserPurchasingUseCase,
  IPurchasingRepo,
  HttpResponse,
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
      const result = new Map<string, string | number | boolean | HttpResponse>()
      let saltPass = await bcryptjs.genSalt(5)
      let hashPass = await bcryptjs.hash(data.kode_akses!, saltPass)
      data!.kode_akses = hashPass

      const checkEmail = await this.purchasingRepo.checkEmail(data.user_email!)

      if (!checkEmail) {
        result.set('error', true)
        result.set('dataError', {
          status: false,
          message: 'Email anda tidak terdaftar'
        })
        return result
      }

      if (checkEmail.deviced_id == data.deviced_id) {
        result.set('error', true)
        result.set('dataError', {
          status: false,
          message: 'Device Id anda sudah terdaftar'
        })
        return result
      }

      data!.user_id = checkEmail.user_id
      const res = await this.purchasingRepo.registerUserPurchasing(data)
      result.set('dataSuccess', {
        status: true,
        message: 'Data deviced id berhasil di input',
        data: res[0].changedRows
      })

      return result
    } catch (error) {
      throw new AppError(500, false, `${error}`, '501')
    }
  }
}
