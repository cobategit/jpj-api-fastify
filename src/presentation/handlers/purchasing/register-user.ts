import { ApiResponse, AppError } from '@jpj-common/module'
import { IRegisterUserPurchasingHandler } from '../..'
import { EntityUser, IRegisterUserPurchasingUseCase } from '../../../domain'

export class RegisterUserPurchasingHandler
  implements IRegisterUserPurchasingHandler {
  private registerUserPurchasingUseCase: IRegisterUserPurchasingUseCase

  constructor(registerUserPurchasingUseCase: IRegisterUserPurchasingUseCase) {
    this.registerUserPurchasingUseCase = registerUserPurchasingUseCase
  }

  async execute(request: any, reply: any): Promise<void> {
    try {
      const data: EntityUser = request.body

      const res = await this.registerUserPurchasingUseCase.execute(data)

      if (res.invalidEmail)
        throw new AppError(404, false, `Email tidak terdaftar`, '401')

      if (res.existDeviceId)
        throw new AppError(404, false, `DeviceId anda sudah terdaftar`, '401')

      return ApiResponse.created(request, reply, {
        success: true,
        message: 'Data deviced id berhasil diinput',
        changed: res[0].changedRows,
      })
    } catch (error) {
      throw new AppError(500, false, `${error}`, '501')
    }
  }
}
