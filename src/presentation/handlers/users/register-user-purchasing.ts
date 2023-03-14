import { ApiResponse, AppError } from '@jpj-common/module'
import { IRegisterUserPurchasingHandler } from '../..'
import { EntityUser, IRegisterUserPurchasingUseCase } from '../../../domain'

export class RegisterUserPurchasingHandler
  implements IRegisterUserPurchasingHandler
{
  private registerUserPurchasingUseCase: IRegisterUserPurchasingUseCase

  constructor(registerUserPurchasingUseCase: IRegisterUserPurchasingUseCase) {
    this.registerUserPurchasingUseCase = registerUserPurchasingUseCase
  }

  async executed(request: any, reply: any): Promise<void> {
    try {
      const data: EntityUser = request.body

      const res = await this.registerUserPurchasingUseCase.executed(data)

      return ApiResponse.created(request, reply, {
        success: true,
        message: 'Data customer berhasil diinput',
        id: res[0].insertId,
      })
    } catch (error) {
      throw new AppError(
        500,
        false,
        'Terjadi kesalahan register user purchasing handler',
        '501'
      )
    }
  }
}
