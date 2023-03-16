import { EntityUser, ILoginUserPurchasingUseCase, IPurchasingRepo } from '../..'
import bcrypt from 'bcryptjs'
import { AppError } from '@jpj-common/module'

export class LoginUserPurchasingUseCase implements ILoginUserPurchasingUseCase {
  private purchasingRepo: IPurchasingRepo

  constructor(purchasingRepo: IPurchasingRepo) {
    this.purchasingRepo = purchasingRepo
  }

  async execute(data: EntityUser): Promise<EntityUser | null> {
    try {
      let res = await this.purchasingRepo.checkDeviceId(data.deviced_id!)

      if (res == null) {
        return null
      }

      if (!res?.deviced_id) {
        return { deviced_id: 'Kosong' }
      }

      if (res.deviced_id != data.deviced_id) {
        return { deviced_id: 'Tidak cocok' }
      }

      let comparePassword = await bcrypt.compare(
        `${data?.kode_akses!}`,
        `${res?.kode_akses!}`
      )

      if (!comparePassword) {
        return { kode_akses: 'Salah' }
      }

      return res
    } catch (error) {
      throw new AppError(400, false, `${error}`, '401')
    }
  }
}
