import { EntityUser, HttpResponse, ILoginUserPurchasingUseCase, IPurchasingRepo } from '../..'
import bcrypt from 'bcryptjs'
import { AppError } from '@jpj-common/module'

export class LoginUserPurchasingUseCase implements ILoginUserPurchasingUseCase {
  private purchasingRepo: IPurchasingRepo

  constructor(purchasingRepo: IPurchasingRepo) {
    this.purchasingRepo = purchasingRepo
  }

  async execute(data: EntityUser): Promise<any> {
    try {
      const result = new Map<string, boolean | HttpResponse>()
      let res = await this.purchasingRepo.checkDeviceId(data.deviced_id!)

      if (res == null) {
        result.set('error', true)
        result.set('dataError', {
          status: false,
          message: 'Data anda tidak ada'
        })
        return result
      }

      if (!res?.deviced_id) {
        result.set('error', true)
        result.set('dataError', {
          status: false,
          message: 'Data device id anda tidak ada'
        })
        return result
      }

      if (res.deviced_id != data.deviced_id) {
        result.set('error', true)
        result.set('dataError', {
          status: false,
          message: 'Device id anda tidak cocok'
        })
        return result
      }

      let comparePassword = await bcrypt.compare(
        `${data?.kode_akses!}`,
        `${res?.kode_akses!}`
      )

      if (!comparePassword) {
        result.set('error', true)
        result.set('dataError', {
          status: false,
          message: 'Password anda salah'
        })
        return result
      }

      result.set('dataSuccess', {
        status: true,
        message: 'Login Berhasil',
        data: res
      })
      return result
    } catch (error) {
      throw new AppError(400, false, `${error}`, '401')
    }
  }
}
